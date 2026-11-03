/* =========================================================
   phone.js  —  폰 공통 기능
   - 설정(config.js) 적용
   - 시간/날짜 표시
   - PC 화면 크기에 맞게 폰 크기 자동 조절
   - 다른 파일들이 같이 쓰는 Phone 도구함 (상태, 안내 메시지, 앱 열기)
   ========================================================= */

(function () {
  "use strict";

  var CONFIG = window.CONFIG || {};

  var phone         = document.getElementById("phone");
  var wallpaper     = document.getElementById("wallpaper");
  var lockWallpaper = document.getElementById("lock-wallpaper");
  var sbTime        = document.getElementById("sb-time");
  var sbCarrier     = document.getElementById("sb-carrier");
  var sbCarrierLock = document.getElementById("sb-carrier-lock");
  var battFill      = document.getElementById("battery-fill");
  var lockTime      = document.getElementById("lock-time");
  var lockDate      = document.getElementById("lock-date");
  var toastEl       = document.getElementById("toast");

  /* ---------- 1. Phone 도구함 ---------- */

  var toastTimer = null;

  window.Phone = {
    // 현재 화면 상태: "locked"(잠금) / "passcode"(비밀번호 입력) / "home"(해제됨)
    state: "locked",

    setState: function (s) {
      this.state = s;
      phone.setAttribute("data-state", s);
    },

    // 화면 아래에 잠깐 떴다 사라지는 안내 메시지
    toast: function (msg) {
      toastEl.textContent = msg;
      toastEl.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toastEl.classList.remove("show");
      }, 1800);
    },

    // 앱 열기 (앱들이 만들어지면 이 부분이 진짜 앱을 열도록 바뀌어요)
    openApp: function (id) {
      this.toast("이 앱은 아직 준비 중이에요");
    }
  };

  /* ---------- 2. 설정 적용 ---------- */

  // 통신사
  if (CONFIG.carrier) {
    sbCarrier.textContent = CONFIG.carrier;
    sbCarrierLock.textContent = CONFIG.carrier;
  } else {
    sbCarrier.textContent = "";
    sbCarrierLock.textContent = "";
  }

  // 배터리
  var level = Number(CONFIG.batteryLevel);
  if (isNaN(level)) level = 80;
  level = Math.max(0, Math.min(100, level));
  battFill.style.width = level + "%";
  if (level <= 20) battFill.style.background = "#ff453a";

  // 배경화면 (홈 화면 + 잠금화면)
  if (CONFIG.wallpaper) {
    wallpaper.style.backgroundImage = "url('" + CONFIG.wallpaper + "')";
  }
  var lockPic = CONFIG.lockWallpaper || CONFIG.wallpaper;
  if (lockPic) {
    lockWallpaper.style.backgroundImage = "url('" + lockPic + "')";
  }

  /* ---------- 3. 시간 / 날짜 ---------- */

  var WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

  function timeText() {
    if (CONFIG.fixedTime) return CONFIG.fixedTime;
    var now = new Date();
    var h = now.getHours() % 12;
    if (h === 0) h = 12;
    var m = now.getMinutes();
    return h + ":" + (m < 10 ? "0" + m : m);
  }

  function dateText() {
    if (CONFIG.fixedDate) return CONFIG.fixedDate;
    var now = new Date();
    return (now.getMonth() + 1) + "월 " + now.getDate() + "일 " +
           WEEKDAYS[now.getDay()] + "요일";
  }

  function updateClock() {
    var t = timeText();
    sbTime.textContent = t;
    lockTime.textContent = t;
    lockDate.textContent = dateText();
  }

  updateClock();
  setInterval(updateClock, 1000);

  /* ---------- 4. PC에서 폰 크기 자동 조절 ---------- */

  function fitPhone() {
    // 스마트폰(가로 500px 이하)에서는 CSS가 전체 화면으로 처리해요
    if (window.innerWidth <= 500) {
      phone.style.setProperty("--scale", 1);
      return;
    }
    var scale = Math.min(
      1,
      (window.innerWidth - 40) / phone.offsetWidth,
      (window.innerHeight - 40) / phone.offsetHeight
    );
    phone.style.setProperty("--scale", scale);
  }

  fitPhone();
  window.addEventListener("resize", fitPhone);

})();
