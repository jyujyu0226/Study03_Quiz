/*
 * 점검 명령: node check.js
 * 문항 데이터가 규칙을 지키는지, 퀴즈 규칙 로직이 맞게 계산하는지 확인하고
 * 마지막 줄에 "통과 N, 실패 M"을 출력합니다. 실패가 있으면 종료 코드 1로 끝납니다.
 */
var fs = require("fs");
var path = require("path");
var vm = require("vm");
var L = require("./quiz-logic.js");

var passed = 0;
var failed = 0;

function test(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    failed += 1;
    console.log("실패: " + name + " - " + err.message);
  }
}

function assert(cond, message) {
  if (!cond) { throw new Error(message || "조건이 맞지 않음"); }
}

// 같은 결과가 나오도록 고정된 난수
function seeded(seed) {
  var s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

// questions.js는 window.QUESTIONS를 만드는 파일이라 가짜 window를 주고 실행한다.
var sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "questions.js"), "utf8"), sandbox);
var DATA = sandbox.window.QUESTIONS;

// ---------- 문항 데이터 ----------

test("카테고리가 4개", function () {
  assert(Object.keys(DATA).length === 4, "카테고리 수 " + Object.keys(DATA).length);
});

var seenIds = {};
Object.keys(DATA).forEach(function (category) {
  var list = DATA[category];

  test(category + ": 한 판(" + L.CONFIG.roundSize + "문항) 이상", function () {
    assert(list.length >= L.CONFIG.roundSize, "문항 수 " + list.length);
  });

  test(category + ": 모든 문항이 형식을 지킴", function () {
    list.forEach(function (q) {
      assert(q.id && !seenIds[q.id], "id 없음 또는 중복: " + q.id);
      seenIds[q.id] = true;
      assert(typeof q.question === "string" && q.question.length > 0, q.id + " question");
      assert(Array.isArray(q.choices) && q.choices.length === 4, q.id + " 보기가 4개가 아님");
      assert(new Set(q.choices).size === 4, q.id + " 보기가 서로 같음");
      assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, q.id + " answer 범위");
      assert(typeof q.explanation === "string" && q.explanation.length > 0, q.id + " 해설 없음");
      assert(q.source && q.source.title && /^https:\/\//.test(q.source.url), q.id + " 출처(title, https url)");
    });
  });
});

// ---------- 규칙 로직 ----------

test("shuffle은 원본을 바꾸지 않고 같은 원소를 돌려줌", function () {
  var src = [1, 2, 3, 4, 5];
  var out = L.shuffle(src, seeded(1));
  assert(src.join() === "1,2,3,4,5", "원본이 바뀜");
  assert(out.slice().sort().join() === "1,2,3,4,5", "원소가 달라짐");
});

test("pickRound는 10문항을 중복 없이 고름", function () {
  var pool = DATA["과학"];
  var round = L.pickRound(pool, undefined, seeded(2));
  assert(round.length === 10, "길이 " + round.length);
  assert(new Set(round.map(function (q) { return q.id; })).size === 10, "중복");
});

test("prepareQuestion은 정답이 정확히 하나이고 보기 내용이 보존됨", function () {
  var q = DATA["한국사"][0];
  var p = L.prepareQuestion(q, seeded(3));
  var correct = p.choices.filter(function (c) { return c.correct; });
  assert(correct.length === 1, "정답 수 " + correct.length);
  assert(correct[0].text === q.choices[q.answer], "정답 내용이 달라짐");
  assert(p.choices.map(function (c) { return c.text; }).sort().join() === q.choices.slice().sort().join(), "보기 내용");
});

test("모든 문항을 섞어도 정답이 하나", function () {
  Object.keys(DATA).forEach(function (cat) {
    DATA[cat].forEach(function (q) {
      var p = L.prepareQuestion(q, seeded(7));
      assert(p.choices.filter(function (c) { return c.correct; }).length === 1, q.id);
    });
  });
});

test("힌트는 오답 2개만 지우고 정답은 남김", function () {
  var p = L.prepareQuestion(DATA["세계지리"][0], seeded(4));
  var removed = L.pickHintRemovals(p.choices, seeded(5));
  assert(removed.length === 2, "지운 개수 " + removed.length);
  assert(new Set(removed).size === 2, "같은 보기를 두 번 지움");
  removed.forEach(function (i) { assert(!p.choices[i].correct, "정답을 지움"); });
});

test("점수: 힌트 없이 1, 힌트 쓰고 0.5, 오답 0", function () {
  assert(L.scoreFor(true, false) === 1, "힌트 없이 정답");
  assert(L.scoreFor(true, true) === 0.5, "힌트 쓰고 정답");
  assert(L.scoreFor(false, false) === 0 && L.scoreFor(false, true) === 0, "오답");
});

test("점수 표기: 정수는 그대로, 소수는 한 자리", function () {
  assert(L.formatScore(7) === "7", "정수");
  assert(L.formatScore(6.5) === "6.5", "소수");
});

test("결과 표시 문구", function () {
  assert(L.resultLabel({ correct: true, hintUsed: false }) === "정답", "정답");
  assert(L.resultLabel({ correct: true, hintUsed: true }) === "정답 (힌트 0.5점)", "힌트 정답");
  assert(L.resultLabel({ correct: false, hintUsed: true }) === "오답", "오답");
  assert(L.resultLabel({ correct: false, timedOut: true }) === "시간 초과", "시간 초과");
});

test("wrongEntries는 틀린 것(시간 초과 포함)만 고름", function () {
  var results = [
    { correct: true },
    { correct: false },
    { correct: false, timedOut: true }
  ];
  assert(L.wrongEntries(results).length === 2, "틀린 문항 수");
  assert(L.wrongEntries([{ correct: true }]).length === 0, "다 맞히면 빈 목록");
});

test("모드는 연습·스피드·힌트 세 개, 스피드는 15초", function () {
  assert(L.MODES.map(function (m) { return m.name; }).join() === "연습,스피드,힌트", "모드 이름");
  assert(L.CONFIG.speedSeconds === 15, "제한 시간");
  assert(L.MODES[0].badge === "순위표에 기록되지 않음", "연습 모드 안내");
  assert(!L.MODES[1].badge && !L.MODES[2].badge, "다른 모드에는 안내가 없어야 함");
});

// ---------- 파일 점검 ----------

var html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

test("index.html이 세 스크립트를 순서대로 불러옴", function () {
  var a = html.indexOf("questions.js");
  var b = html.indexOf("quiz-logic.js");
  var c = html.indexOf("script.js");
  assert(a > -1 && b > a && c > b, "스크립트 순서");
});

test("index.html에 학번·이름 줄이 있음", function () {
  assert(/id="student"[^>]*>\s*학번 \S+ 이름 \S+/.test(html), "학번·이름 줄 없음");
});

console.log("통과 " + passed + ", 실패 " + failed);

if (/학번 2026xxxx 이름 홍길동/.test(html)) {
  console.log("주의: index.html의 학번·이름이 아직 예시 값입니다. 본인 것으로 고친 뒤 제출하세요.");
}

process.exit(failed === 0 ? 0 : 1);
