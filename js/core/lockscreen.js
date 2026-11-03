/* =========================================================
   lockscreen.js  —  잠금화면 동작 (2단계)
   - 알림 목록 만들기 (data/notifications.js)
   - 위로 밀어서 비밀번호 화면 열기
   - 비밀번호 키패드 / 잠금 해제 / 다시 잠그기
   ========================================================= */

(function () {
  "use strict";

  var CONFIG = window.CONFIG || {};
  var NOTIFS = window.NOTIFICATIONS || [];
  var Phone  = window.Phone;

  var lock      = document.getElementById("lockscreen");
  var main      = document.getElementById("lock-main");
  var list      = document.getElementById("notif-list");
  var hint      = document.getElementById("lock-hint");
  var homebar   = document.getElementById("homebar");
  var btnFlash  = document.getElementById("btn-flash");
  var btnCamera = document.getElementById("btn-camera");
  var btnRelock = document.getElementById("relock-btn");
  var btnPower  = document.querySelector(".btn-power");
  var dotsEl    = document.getElementById("pc-dots");
  var padEl     = document.getElementById("pc-pad");
  var cancelBtn = document.getElementById("pc-cancel");
  var emergency = document.getElementById("pc-emergency");

  // 설정한 비밀번호 (숫자만 사용)
  var code = String(CONFIG.passcode == null ? "" : CONFIG.passcode).replace(/\D/g, "");
  var entered = "";
  var pendingApp = null;   // 알림을 눌러서 들어온 경우, 해제 후 열 앱

  /* ---------- 1. 알림 목록 만들기 ---------- */

  var ICONS = {
    kakao: '<i class="k-bubble">TALK</i>',
    x: '<svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="#fff" stroke="none"/></svg>',
    messages: '<svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.3 1.2 4.4 3.2 5.8-.2 1.2-.8 2.6-1.7 3.7 2-.2 3.7-1 4.9-1.9.8.2 1.7.4 2.6.4 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M9 7l8 5-8 5z"/></svg>',
    "default": '<svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><circle cx="12" cy="12" r="5"/></svg>'
  };

  function buildNotifs() {
    list.innerHTML = "";
    NOTIFS.forEach(function (n) {
      var app = ICONS[n.app] ? n.app : "default";

      var card = document.createElement("div");
      card.className = "notif";
      card.setAttribute("role", "button");

      var icon = document.createElement("div");
      icon.className = "ni ni-" + app;
      icon.innerHTML = ICONS[app];

      var body = document.createElement("div");
      body.className = "n-body";

      var top = document.createElement("div");
      top.className = "n-top";

      // 사용자가 쓴 글은 textContent로 넣어요 (특수문자가 있어도 안전)
      var title = document.createElement("span");
      title.className = "n-title";
      title.textContent = n.title || "";

      var time = document.createElement("span");
      time.className = "n-time";
      time.textContent = n.time || "";

      var msg = document.createElement("div");
      msg.className = "n-msg";
      msg.textContent = n.message || "";

      top.appendChild(title);
      top.appendChild(time);
      body.appendChild(top);
      body.appendChild(msg);
      card.appendChild(icon);
      card.appendChild(body);

      card.addEventListener("click", function () {
        if (Phone.state !== "locked") return;
        pendingApp = n.app;
        requestUnlock();
      });

      list.appendChild(card);
    });
  }

  /* ---------- 2. 비밀번호 키패드 만들기 ---------- */

  var LETTERS = {
    "1": "", "2": "ABC", "3": "DEF", "4": "GHI", "5": "JKL",
    "6": "MNO", "7": "PQRS", "8": "TUV", "9": "WXYZ", "0": ""
  };

  function buildPad() {
    padEl.innerHTML = "";
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].forEach(function (d) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "pc-key" + (d === "0" ? " zero" : "");
      b.innerHTML = '<span class="pc-num">' + d + '</span>' +
                    '<span class="pc-sub">' + LETTERS[d] + '</span>';
      b.addEventListener("click", function () { pressDigit(d); });
      padEl.appendChild(b);
    });
  }

  function dotCount() {
    return code.length || 4;
  }

  function buildDots() {
    dotsEl.innerHTML = "";
    for (var i = 0; i < dotCount(); i++) {
      var d = document.createElement("span");
      d.className = "pc-dot";
      dotsEl.appendChild(d);
    }
  }

  function renderDots() {
    var dots = dotsEl.children;
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle("filled", i < entered.length);
    }
    cancelBtn.textContent = entered.length ? "삭제" : "취소";
  }

  /* ---------- 3. 화면 전환 ---------- */

  function showPasscode() {
    if (Phone.state !== "locked") return;
    entered = "";
    renderDots();
    lock.classList.add("show-passcode");
    Phone.setState("passcode");
  }

  function hidePasscode() {
    if (Phone.state !== "passcode") return;
    lock.classList.remove("show-passcode");
    Phone.setState("locked");
    entered = "";
    renderDots();
    pendingApp = null;
  }

  // 비밀번호가 설정돼 있으면 입력 화면, 없으면 바로 해제
  function requestUnlock() {
    if (code === "") {
      unlock();
    } else {
      showPasscode();
    }
  }

  function unlock() {
    lock.classList.add("unlocked");
    Phone.setState("home");
    entered = "";
    setTimeout(renderDots, 500);

    var app = pendingApp;
    pendingApp = null;
    if (app) {
      setTimeout(function () { Phone.openApp(app); }, 450);
    }
  }

  function relock() {
    if (Phone.state === "locked") return;
    lock.classList.remove("unlocked");
    lock.classList.remove("show-passcode");
    Phone.setState("locked");
    entered = "";
    renderDots();
    list.scrollTop = 0;
  }

  Phone.lock = relock;

  /* ---------- 4. 키패드 입력 ---------- */

  function pressDigit(d) {
    if (Phone.state !== "passcode") return;
    if (entered.length >= dotCount()) return;
    entered += d;
    renderDots();
    if (entered.length === code.length) {
      setTimeout(checkCode, 150);
    }
  }

  function checkCode() {
    if (Phone.state !== "passcode") return;
    if (entered === code) {
      unlock();
    } else {
      // 틀리면 점이 흔들리고 처음부터 다시
      dotsEl.classList.add("shake");
      setTimeout(function () {
        dotsEl.classList.remove("shake");
        entered = "";
        renderDots();
      }, 400);
    }
  }

  function pressCancel() {
    if (Phone.state !== "passcode") return;
    if (entered.length) {
      entered = entered.slice(0, -1);
      renderDots();
    } else {
      hidePasscode();
    }
  }

  cancelBtn.addEventListener("click", pressCancel);
  emergency.addEventListener("click", function () {
    Phone.toast("긴급 전화는 지원하지 않아요");
  });

  // PC 키보드로도 입력 가능
  document.addEventListener("keydown", function (e) {
    if (Phone.state === "passcode") {
      if (/^[0-9]$/.test(e.key)) pressDigit(e.key);
      else if (e.key === "Backspace") pressCancel();
      else if (e.key === "Escape") hidePasscode();
    } else if (Phone.state === "locked") {
      if (e.key === "Enter" || e.key === "ArrowUp") requestUnlock();
    }
  });

  /* ---------- 5. 위로 쓸어올리기 (스와이프) ---------- */

  var startY = null;
  var startT = 0;

  main.addEventListener("pointerdown", function (e) {
    if (Phone.state !== "locked") return;
    // 알림 목록과 아래 버튼들은 스와이프에서 제외
    if (e.target.closest("#notif-list") || e.target.closest(".round-btn")) return;
    startY = e.clientY;
    startT = Date.now();
    main.style.transition = "none";
  });

  document.addEventListener("pointermove", function (e) {
    if (startY === null) return;
    var dy = Math.min(0, e.clientY - startY);
    main.style.transform = "translateY(" + (dy * 0.4) + "px)";
  });

  function endSwipe(e) {
    if (startY === null) return;
    var dy = e.clientY - startY;
    var dt = Math.max(1, Date.now() - startT);
    startY = null;

    main.style.transition = "";
    main.style.transform = "";

    if (dy < -70 || (dy < -30 && dy / dt < -0.5)) {
      requestUnlock();
    }
  }

  document.addEventListener("pointerup", endSwipe);
  document.addEventListener("pointercancel", endSwipe);

  /* ---------- 6. 그 밖의 버튼들 ---------- */

  // 홈바 / 안내 문구를 눌러도 열려요 (PC에서 마우스로 쓰기 편하게)
  homebar.addEventListener("click", function () {
    if (Phone.state === "locked") requestUnlock();
  });
  hint.addEventListener("click", function () {
    if (Phone.state === "locked") requestUnlock();
  });

  // 손전등: 켜기/끄기
  btnFlash.addEventListener("click", function () {
    btnFlash.classList.toggle("on");
  });

  // 카메라
  btnCamera.addEventListener("click", function () {
    Phone.toast("카메라는 아직 준비 중이에요");
  });

  // 다시 잠그기 버튼 / 폰 옆면 전원 버튼
  btnRelock.addEventListener("click", relock);
  if (btnPower) btnPower.addEventListener("click", relock);

  /* ---------- 시작 ---------- */

  buildNotifs();
  buildPad();
  buildDots();
  renderDots();
  Phone.setState("locked");

})();
