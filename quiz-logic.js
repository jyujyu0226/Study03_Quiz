/*
 * 퀴즈 규칙 로직
 * 화면(DOM)을 건드리지 않는 순수 함수만 둡니다.
 * 브라우저에서는 window.QuizLogic, node에서는 require()로 같은 코드를 씁니다.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.QuizLogic = api;
  }
})(typeof window !== "undefined" ? window : this, function () {
  "use strict";

  var CONFIG = {
    roundSize: 10,        // 한 판의 문항 수
    speedSeconds: 15,     // 스피드 모드 제한 시간(초)
    dangerSeconds: 5,     // 이 값 이하이면 남은 시간을 빨간색으로
    fullScore: 1,         // 힌트 없이 맞혔을 때 점수
    hintScore: 0.5,       // 힌트를 쓰고 맞혔을 때 점수
    hintRemoveCount: 2    // 힌트 한 번에 지우는 오답 보기 수
  };

  var MODES = [
    {
      id: "practice",
      name: "연습",
      rule: "시간 제한과 힌트 없음, 맞히면 1점",
      badge: "순위표에 기록되지 않음"
    },
    {
      id: "speed",
      name: "스피드",
      rule: "문항마다 " + CONFIG.speedSeconds + "초, 시간이 지나면 오답"
    },
    {
      id: "hint",
      name: "힌트",
      rule: "문항마다 힌트 1번, 힌트를 쓰고 맞히면 " + CONFIG.hintScore + "점"
    }
  ];

  function modeById(id) {
    for (var i = 0; i < MODES.length; i++) {
      if (MODES[i].id === id) { return MODES[i]; }
    }
    return null;
  }

  // 원본 배열은 건드리지 않고 섞은 복사본을 돌려준다. rnd는 테스트용으로 바꿀 수 있다.
  function shuffle(list, rnd) {
    var random = rnd || Math.random;
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function pickRound(pool, size, rnd) {
    return shuffle(pool, rnd).slice(0, size || CONFIG.roundSize);
  }

  // 문항 하나를 화면에 내기 좋게 바꾼다: 보기 순서를 섞고 어느 것이 정답인지 표시한다.
  function prepareQuestion(q, rnd) {
    var order = shuffle(q.choices.map(function (_, i) { return i; }), rnd);
    return {
      id: q.id,
      text: q.question,
      choices: order.map(function (i) {
        return { text: q.choices[i], correct: i === q.answer };
      }),
      explanation: q.explanation,
      source: q.source,
      original: q
    };
  }

  // 힌트: 오답 보기 중에서 무작위로 hintRemoveCount개의 위치를 고른다.
  function pickHintRemovals(choices, rnd) {
    var wrongIndexes = [];
    choices.forEach(function (c, i) {
      if (!c.correct) { wrongIndexes.push(i); }
    });
    return shuffle(wrongIndexes, rnd).slice(0, CONFIG.hintRemoveCount);
  }

  function scoreFor(correct, hintUsed) {
    if (!correct) { return 0; }
    return hintUsed ? CONFIG.hintScore : CONFIG.fullScore;
  }

  function formatScore(n) {
    return Number.isInteger(n) ? String(n) : n.toFixed(1);
  }

  function resultLabel(entry) {
    if (entry.timedOut) { return "시간 초과"; }
    if (!entry.correct) { return "오답"; }
    return entry.hintUsed ? "정답 (힌트 " + CONFIG.hintScore + "점)" : "정답";
  }

  function wrongEntries(results) {
    return results.filter(function (r) { return !r.correct; });
  }

  return {
    CONFIG: CONFIG,
    MODES: MODES,
    modeById: modeById,
    shuffle: shuffle,
    pickRound: pickRound,
    prepareQuestion: prepareQuestion,
    pickHintRemovals: pickHintRemovals,
    scoreFor: scoreFor,
    formatScore: formatScore,
    resultLabel: resultLabel,
    wrongEntries: wrongEntries
  };
});
