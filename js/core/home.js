/* =========================================================
   home.js  —  홈 화면 (앱 아이콘, 좌우 페이지, 독)
   앱 목록은 data/apps.js 에서 바꿔요.
   ========================================================= */

(function () {
  "use strict";

  var Phone  = window.Phone;
  var LAYOUT = window.HOME_LAYOUT || { page1: [], page2: [], dock: [] };
  var NAMES  = window.APP_NAMES || {};

  var XPATH = "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";
  var PETALS = ["#f5c242", "#f08a3c", "#e8505b", "#b25fc4", "#4a8fe0", "#3cc3d1", "#5cc86a", "#b4d84a"];

  function petals() {
    var s = "";
    PETALS.forEach(function (c, i) {
      s += '<ellipse cx="30" cy="19" rx="7.5" ry="11.5" fill="' + c + '" opacity=".82" transform="rotate(' + (i * 45) + ' 30 30)" style="mix-blend-mode:multiply"/>';
    });
    return '<svg viewBox="0 0 60 60" width="52" height="52">' + s + '</svg>';
  }

  // 아이콘 모양 (배경색 + 그림)
  var ICONS = {
    x: ['#000', '<svg viewBox="0 0 24 24" width="32" height="32" fill="#fff"><path d="' + XPATH + '"/></svg>'],
    instagram: ['radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
      '<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="#fff" stroke="none"/></svg>'],
    youtube: ['#fff', '<svg viewBox="0 0 48 34" width="44" height="31"><rect width="48" height="34" rx="9" fill="#ee2b3a"/><path d="M19 9l14 8-14 8z" fill="#fff"/></svg>'],
    weverse: ['#080818', '<span style="font:italic 700 40px/1 Georgia,\'Times New Roman\',serif;color:#fff;margin-top:-3px">w</span>'],
    photos: ['#fff', petals()],
    news: ['#fff', '<svg viewBox="0 0 48 48" width="44" height="44"><rect x="6" y="9" width="36" height="30" rx="5" fill="#fff" stroke="#dadce0" stroke-width="1.5"/><rect x="11" y="15" width="14" height="3.6" rx="1.8" fill="#4285f4"/><rect x="11" y="22" width="26" height="3.6" rx="1.8" fill="#ea4335"/><rect x="11" y="29" width="20" height="3.6" rx="1.8" fill="#fbbc04"/><rect x="29" y="15" width="8" height="3.6" rx="1.8" fill="#34a853"/></svg>'],
    settings: ['linear-gradient(160deg,#9a9aa0,#6a6a70)',
      '<svg viewBox="0 0 24 24" width="46" height="46"><circle cx="12" cy="12" r="9.4" fill="none" stroke="#e9e9ee" stroke-width="3.2" stroke-dasharray="2.6 2.32"/><circle cx="12" cy="12" r="6.6" fill="none" stroke="#e9e9ee" stroke-width="3.6"/><circle cx="12" cy="12" r="3" fill="#7b7b82"/></svg>'],
    phone: ['linear-gradient(160deg,#6ee07a,#27b845)',
      '<svg viewBox="0 0 24 24" width="36" height="36" fill="#fff"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>'],
    browser: ['linear-gradient(160deg,#ffffff,#dfe3ea)',
      '<svg viewBox="0 0 48 48" width="52" height="52"><circle cx="24" cy="24" r="19" fill="none" stroke="#2f7cf6" stroke-width="2.2" stroke-dasharray="1 3.1"/><circle cx="24" cy="24" r="17" fill="#e8f1ff" stroke="#2f7cf6" stroke-width="1.5"/><path d="M33 15L27 27 15 33l6-12z" fill="#e5484d"/><path d="M33 15L27 27 21 21z" fill="#fff" stroke="#c9d3e6" stroke-width=".5"/></svg>'],
    messages: ['linear-gradient(160deg,#6ee07a,#27b845)',
      '<svg viewBox="0 0 24 24" width="38" height="38" fill="#fff"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.3 1.2 4.4 3.2 5.8-.2 1.2-.8 2.6-1.7 3.7 2-.2 3.7-1 4.9-1.9.8.2 1.7.4 2.6.4 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg>'],
    kakao: ['#fee500', '<svg viewBox="0 0 60 56" width="50" height="46"><ellipse cx="30" cy="25" rx="24" ry="19" fill="#3c1e1e"/><path d="M18 40l-2 11 14-9z" fill="#3c1e1e"/><text x="30" y="30" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="14" fill="#fee500">TALK</text></svg>']
  };

  function makeIcon(id) {
    var def = ICONS[id] || ["#555", ""];
    var b = document.createElement("button");
    b.type = "button";
    b.className = "app-ico";
    b.setAttribute("data-app", id);
    b.innerHTML = '<span class="ic" style="background:' + def[0] + '">' + def[1] + '</span>' +
                  '<span class="nm"></span>';
    b.querySelector(".nm").textContent = NAMES[id] || id;
    b.addEventListener("click", function () {
      if (swiped) return;
      Phone.openApp(id, b.querySelector(".ic"));
    });
    return b;
  }

  /* ---------- 아이콘 배치 ---------- */
  var pages = document.querySelectorAll(".home-page");
  var swiped = false;

  [LAYOUT.page1, LAYOUT.page2].forEach(function (list, i) {
    (list || []).forEach(function (id) { pages[i].appendChild(makeIcon(id)); });
  });
  var dock = document.getElementById("dock");
  (LAYOUT.dock || []).slice(0, 4).forEach(function (id) { dock.appendChild(makeIcon(id)); });

  document.getElementById("home-search").addEventListener("click", function () {
    Phone.toast("검색은 아직 준비 중이에요");
  });

  /* ---------- 좌우로 넘기기 ---------- */
  var track = document.getElementById("home-track");
  var area  = document.getElementById("home-pages");
  var dots  = document.querySelectorAll("#home-dots i");
  var page = 0, startX = null, dx = 0, w = 390;

  function go(p) {
    page = Math.max(0, Math.min(pages.length - 1, p));
    track.style.transform = "translateX(" + (-page * 100) + "%)";
    for (var i = 0; i < dots.length; i++) dots[i].classList.toggle("on", i === page);
  }

  area.addEventListener("pointerdown", function (e) {
    startX = e.clientX; dx = 0; swiped = false;
    w = area.offsetWidth || 390;
  });
  document.addEventListener("pointermove", function (e) {
    if (startX === null) return;
    dx = e.clientX - startX;
    if (Math.abs(dx) > 8) {
      swiped = true;
      track.classList.add("dragging");
      var sc = w / area.getBoundingClientRect().width || 1;
      track.style.transform = "translateX(" + (-page * w + dx * sc) + "px)";
    }
  });
  function endDrag() {
    if (startX === null) return;
    startX = null;
    track.classList.remove("dragging");
    if (dx < -50) go(page + 1);
    else if (dx > 50) go(page - 1);
    else go(page);
    setTimeout(function () { swiped = false; }, 50);
  }
  document.addEventListener("pointerup", endDrag);
  document.addEventListener("pointercancel", endDrag);

  go(0);

})();
