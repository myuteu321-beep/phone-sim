/* =========================================================
   apps.js  —  앱 관리자 (모든 앱이 같이 쓰는 도구)
   - 앱 등록 / 열기 / 닫기 (한 번 열린 앱은 화면이 그대로 유지돼요)
   - 홈바를 누르거나 위로 밀면 홈으로
   - 마우스로 끌어서 스크롤하는 도우미 (PC용)
   ========================================================= */

(function () {
  "use strict";

  var Phone    = window.Phone;
  var phone    = document.getElementById("phone");
  var screen   = document.getElementById("screen");
  var layer    = document.getElementById("app-layer");
  var homebar  = document.getElementById("homebar");

  var registry = {};   // 등록된 앱 정의
  var wins = {};       // 한 번 만들어진 앱 화면 (다시 열어도 그대로)
  var current = null;  // 지금 열려 있는 앱

  function setOrigin(win, fromEl) {
    // 눌린 아이콘 위치에서 앱이 커지며 열리게
    var x = "50%", y = "50%";
    if (fromEl) {
      var sr = screen.getBoundingClientRect();
      var r = fromEl.getBoundingClientRect();
      var sc = sr.width / screen.offsetWidth || 1;
      x = ((r.left + r.width / 2 - sr.left) / sc) + "px";
      y = ((r.top + r.height / 2 - sr.top) / sc) + "px";
    }
    win.style.transformOrigin = x + " " + y;
  }

  var Apps = window.Apps = {

    // 앱 등록: Apps.register("x", { theme: "light", build: function(root){...} })
    register: function (id, def) { registry[id] = def; },
    has: function (id) { return !!registry[id]; },
    current: function () { return current; },

    open: function (id, fromEl) {
      if (!registry[id]) { Phone.toast("이 앱은 아직 준비 중이에요"); return; }
      if (Phone.state !== "home" || current === id) return;
      if (current) Apps.close(true);

      var win = wins[id];
      if (!win) {
        win = document.createElement("div");
        win.className = "app-win";
        layer.appendChild(win);
        wins[id] = win;
        registry[id].build(win);
      }
      setOrigin(win, fromEl);
      void win.offsetWidth;
      win.classList.add("open");
      current = id;
      phone.setAttribute("data-theme", registry[id].theme || "dark");
      if (registry[id].onShow) registry[id].onShow(win);
    },

    close: function (instant) {
      if (!current) return;
      var win = wins[current];
      if (instant) {
        win.style.transition = "none";
        win.classList.remove("open");
        void win.offsetWidth;
        win.style.transition = "";
      } else {
        win.classList.remove("open");
      }
      current = null;
      phone.removeAttribute("data-theme");
    },

    // PC에서 마우스로 끌어서 스크롤 (스마트폰 터치는 기본 스크롤을 써요)
    dragScroll: function (el) {
      var down = false, moved = false, sy = 0, st = 0;
      el.addEventListener("pointerdown", function (e) {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        if (e.target.closest("input, textarea")) return;
        down = true; moved = false; sy = e.clientY; st = el.scrollTop;
      });
      window.addEventListener("pointermove", function (e) {
        if (!down) return;
        var dy = e.clientY - sy;
        if (Math.abs(dy) > 5) moved = true;
        if (moved) {
          var sc = parseFloat(phone.style.getPropertyValue("--scale")) || 1;
          el.scrollTop = st - dy / sc;
        }
      });
      window.addEventListener("pointerup", function () { down = false; });
      el.addEventListener("click", function (e) {
        if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; }
      }, true);
    }
  };

  // 앱이 열려 있을 때 폰이 잠기면(전원 버튼 등) 앱을 닫아요
  new MutationObserver(function () {
    if (Phone.state === "locked") Apps.close(true);
  }).observe(phone, { attributes: true, attributeFilter: ["data-state"] });

  // 홈바: 누르거나 위로 밀면 홈으로
  var sy = null;
  homebar.addEventListener("pointerdown", function (e) { sy = e.clientY; });
  document.addEventListener("pointerup", function (e) {
    if (sy === null) return;
    var dy = e.clientY - sy;
    sy = null;
    if (dy < -25 && Phone.state === "home") Apps.close();
  });
  homebar.addEventListener("click", function () {
    if (Phone.state === "home") Apps.close();
  });

  // 잠금화면 알림 등에서 쓰는 앱 열기를 진짜 앱 열기로 연결
  Phone.openApp = function (id, fromEl) { Apps.open(id, fromEl); };

})();
