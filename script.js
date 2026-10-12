/*
 * 상식 퀴즈 화면 동작
 * 규칙 계산은 quiz-logic.js, 문항 데이터는 questions.js에 있습니다.
 */
(function () {
  "use strict";

  var L = window.QuizLogic;
  var QUESTIONS = window.QUESTIONS;
  var app = document.getElementById("app");
  var studentEl = document.getElementById("student");

  var state = null;    // 지금 진행 중인 한 판
  var timerId = null;  // 스피드 모드 타이머. 항상 하나만 돌아야 한다.

  // ---------- 작은 도구 ----------

  function el(tag, props, kids) {
    var node = document.createElement(tag);
    var p = props || {};
    Object.keys(p).forEach(function (key) {
      var value = p[key];
      if (key === "class") {
        node.className = value;
      } else if (key === "text") {
        node.textContent = value;
      } else if (key.indexOf("on") === 0) {
        node.addEventListener(key.slice(2), value);
      } else if (value === true) {
        node.setAttribute(key, "");
      } else if (value !== false && value != null) {
        node.setAttribute(key, value);
      }
    });
    (kids || []).forEach(function (kid) {
      if (!kid) { return; }
      node.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
    });
    return node;
  }

  function render(nodes) {
    app.textContent = "";
    nodes.forEach(function (n) { app.appendChild(n); });
    var heading = app.querySelector("[data-heading]");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
    window.scrollTo(0, 0);
  }

  // ---------- 타이머 (스피드 모드) ----------

  function stopTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function updateTimerView() {
    var view = document.getElementById("timer");
    if (!view) { return; }
    view.textContent = "남은 시간 " + state.remaining + "초";
    view.classList.toggle("danger", state.remaining <= L.CONFIG.dangerSeconds);
  }

  function startTimer() {
    stopTimer(); // 이전 타이머가 남아 있으면 겹쳐 돌기 때문에 먼저 끈다.
    state.remaining = L.CONFIG.speedSeconds;
    updateTimerView();
    timerId = setInterval(function () {
      state.remaining -= 1;
      updateTimerView();
      if (state.remaining <= 0) {
        finishQuestion(-1, true);
      }
    }, 1000);
  }

  // ---------- 시작 화면 ----------

  function showStart() {
    stopTimer();
    state = null;
    var buttons = Object.keys(QUESTIONS).map(function (name) {
      return el("button", {
        class: "card-btn",
        type: "button",
        onclick: function () { showModes(name); }
      }, [name]);
    });
    render([
      el("h1", { "data-heading": true, text: "상식 퀴즈" }),
      el("p", { class: "lead", text: "카테고리를 고르세요. 한 판은 " + L.CONFIG.roundSize + "문제입니다." }),
      el("div", { class: "stack" }, buttons)
    ]);
  }

  // ---------- 모드 선택 화면 ----------

  function showModes(category) {
    stopTimer();
    var cards = L.MODES.map(function (mode) {
      var kids = [
        el("strong", { class: "mode-name", text: mode.name }),
        el("span", { class: "mode-rule", text: mode.rule })
      ];
      if (mode.badge) { kids.push(el("span", { class: "badge", text: mode.badge })); }
      return el("button", {
        class: "card-btn mode-card",
        type: "button",
        onclick: function () { startRound(category, mode.id); }
      }, kids);
    });
    render([
      el("h2", { "data-heading": true, class: "screen-title", text: category + " · 모드를 고르세요" }),
      el("div", { class: "stack" }, cards),
      el("button", { class: "secondary back-btn", type: "button", text: "뒤로", onclick: showStart })
    ]);
  }

  // ---------- 한 판 시작 ----------

  function newState(category, modeId, questions) {
    return {
      category: category,
      modeId: modeId,
      retry: false,
      questions: questions,
      index: 0,
      score: 0,
      results: [],
      hintUsed: false,
      answered: false,
      remaining: 0,
      choiceBtns: [],
      hintBtn: null,
      feedbackBox: null,
      firstScore: 0,
      firstTotal: 0
    };
  }

  function startRound(category, modeId) {
    var round = L.pickRound(QUESTIONS[category]).map(function (q) {
      return L.prepareQuestion(q);
    });
    state = newState(category, modeId, round);
    renderQuestion();
  }

  // ---------- 문제 화면 ----------

  function renderQuestion() {
    stopTimer();
    var q = state.questions[state.index];
    var isSpeed = state.modeId === "speed";
    var isHint = state.modeId === "hint";
    var modeLabel = state.retry ? "틀린 문제 다시 풀기" : L.modeById(state.modeId).name;

    state.hintUsed = false;
    state.answered = false;

    var meta = el("div", { class: "meta" }, [
      el("span", { text: state.category + " · " + modeLabel }),
      el("span", { text: (state.index + 1) + " / " + state.questions.length }),
      el("span", {
        id: "score",
        text: state.retry ? "점수 기록 안 함" : "점수 " + L.formatScore(state.score)
      }),
      isSpeed ? el("span", { id: "timer", class: "timer" }) : null
    ]);

    state.choiceBtns = q.choices.map(function (choice, i) {
      return el("button", {
        class: "choice",
        type: "button",
        onclick: function () { finishQuestion(i, false); }
      }, [el("span", { class: "choice-text", text: choice.text })]);
    });

    var children = [
      meta,
      el("h2", { class: "question", "data-heading": true, text: q.text }),
      el("div", { class: "stack" }, state.choiceBtns)
    ];

    state.hintBtn = null;
    if (isHint) {
      state.hintBtn = el("button", {
        class: "secondary hint-btn",
        type: "button",
        text: "힌트 (오답 " + L.CONFIG.hintRemoveCount + "개 지우기)",
        onclick: useHint
      });
      children.push(state.hintBtn);
    }

    state.feedbackBox = el("div", { class: "feedback-slot", "aria-live": "polite" });
    children.push(state.feedbackBox);

    render(children);
    if (isSpeed) { startTimer(); }
  }

  // ---------- 힌트 ----------

  function useHint() {
    if (state.answered || state.hintUsed) { return; }
    var q = state.questions[state.index];
    state.hintUsed = true;
    L.pickHintRemovals(q.choices).forEach(function (i) {
      var btn = state.choiceBtns[i];
      btn.classList.add("removed");
      btn.disabled = true;
    });
    state.hintBtn.textContent = "힌트 사용함";
    state.hintBtn.disabled = true;
  }

  // ---------- 답 확정(보기 선택 또는 시간 초과) ----------

  function finishQuestion(selected, timedOut) {
    if (state.answered) { return; }
    state.answered = true;
    stopTimer(); // 답을 고르면 남은 시간이 그 자리에서 멈춘다.

    var q = state.questions[state.index];
    var correct = !timedOut && q.choices[selected].correct;

    if (!state.retry) { state.score += L.scoreFor(correct, state.hintUsed); }
    state.results.push({
      question: q,
      correct: correct,
      hintUsed: state.hintUsed,
      timedOut: timedOut
    });

    state.choiceBtns.forEach(function (btn, i) {
      btn.disabled = true;
      if (q.choices[i].correct) {
        btn.classList.add("correct");
        btn.appendChild(el("span", { class: "verdict", text: "정답" }));
      } else if (!timedOut && i === selected) {
        btn.classList.add("wrong");
        btn.appendChild(el("span", { class: "verdict", text: "오답" }));
      } else {
        btn.classList.add("dim");
      }
    });
    if (state.hintBtn) { state.hintBtn.disabled = true; }
    if (!state.retry) {
      document.getElementById("score").textContent = "점수 " + L.formatScore(state.score);
    }

    var title = timedOut ? "시간 초과" : (correct ? "정답입니다" : "오답입니다");
    var isLast = state.index + 1 >= state.questions.length;
    var nextBtn = el("button", {
      class: "primary",
      type: "button",
      text: isLast ? "결과 보기" : "다음",
      onclick: goNext
    });

    state.feedbackBox.appendChild(el("section", { class: "feedback" }, [
      el("h3", { class: "feedback-title " + (correct ? "good" : "bad"), text: title }),
      el("p", { class: "explain", text: q.explanation }),
      el("p", { class: "source" }, [
        "출처: ",
        el("a", { href: q.source.url, target: "_blank", rel: "noopener noreferrer", text: q.source.title })
      ]),
      nextBtn
    ]));
    nextBtn.focus();
  }

  function goNext() {
    if (state.index + 1 < state.questions.length) {
      state.index += 1;
      renderQuestion(); // 스피드 모드면 여기서 15초부터 다시 센다.
    } else {
      showResult();
    }
  }

  // ---------- 결과 화면 ----------

  function showResult() {
    stopTimer();
    var total = state.questions.length;
    var wrong = L.wrongEntries(state.results);
    var children = [el("h2", { "data-heading": true, class: "screen-title", text: "결과" })];

    if (state.retry) {
      children.push(el("p", {
        class: "score-line",
        text: "처음 점수 " + L.formatScore(state.firstScore) + " / " + state.firstTotal
      }));
      children.push(el("p", {
        class: "lead",
        text: "다시 푼 " + total + "문제 중 " + (total - wrong.length) + "문제를 맞혔습니다. 다시 풀기는 점수에 넣지 않습니다."
      }));
    } else {
      children.push(el("p", {
        class: "score-line",
        text: "점수 " + L.formatScore(state.score) + " / " + total
      }));
      children.push(el("p", {
        class: "lead",
        text: state.category + " · " + L.modeById(state.modeId).name
      }));
    }

    var items = state.results.map(function (r, i) {
      return el("li", { class: "result-item" }, [
        el("span", { class: "result-q", text: (i + 1) + ". " + r.question.text }),
        el("span", { class: "tag " + (r.correct ? "good" : "bad"), text: L.resultLabel(r) })
      ]);
    });
    children.push(el("ul", { class: "result-list" }, items));

    var actions = [];
    // 틀린 문제 다시 풀기는 연습 모드에만 있다. 틀린 문제가 없으면 버튼도 없다.
    if (state.modeId === "practice" && wrong.length > 0) {
      actions.push(el("button", {
        class: "primary",
        type: "button",
        text: "틀린 문제 다시 풀기",
        onclick: startRetry
      }));
    }
    actions.push(el("button", {
      class: "secondary",
      type: "button",
      text: "같은 모드 다시",
      onclick: function () { startRound(state.category, state.modeId); }
    }));
    actions.push(el("button", {
      class: "secondary",
      type: "button",
      text: "처음으로",
      onclick: showStart
    }));
    children.push(el("div", { class: "actions" }, actions));

    render(children);
  }

  // ---------- 틀린 문제 다시 풀기 ----------

  function startRetry() {
    var wrong = L.wrongEntries(state.results);
    var firstScore = state.retry ? state.firstScore : state.score;
    var firstTotal = state.retry ? state.firstTotal : state.questions.length;
    var category = state.category;
    var questions = wrong.map(function (entry) {
      return L.prepareQuestion(entry.question.original);
    });
    state = newState(category, "practice", questions);
    state.retry = true;           // 점수를 매기지 않는다.
    state.firstScore = firstScore; // 처음 점수를 그대로 보여 주기 위해 들고 간다.
    state.firstTotal = firstTotal;
    renderQuestion();
  }

  // ---------- 시작 ----------

  function warnIfPlaceholder() {
    if (/x{2,}|홍길동/i.test(studentEl.textContent)) {
      var note = el("p", {
        class: "warn",
        role: "alert",
        text: "index.html 맨 위의 학번과 이름이 아직 예시입니다. 본인 학번과 이름으로 고쳐 주세요."
      });
      studentEl.parentNode.insertBefore(note, studentEl.nextSibling);
    }
  }

  if (!L || !QUESTIONS) {
    app.textContent = "문항 데이터를 불러오지 못했습니다. 페이지를 새로고침해 보세요.";
    return;
  }
  warnIfPlaceholder();
  showStart();
})();
