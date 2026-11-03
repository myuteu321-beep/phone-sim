/* =========================================================
   links.js  —  링크로 연결되는 앱 (유튜브, 위버스)
   data/links.js 에 적힌 앱을 누르면 폰 안에서 앱 화면을 열지 않고
   해당 링크를 새 탭으로 열어요. 고칠 일은 거의 없어요.
   ========================================================= */

(function () {
  "use strict";

  var Phone = window.Phone, links = window.APP_LINKS || {};
  var original = Phone.openApp;

  Phone.openApp = function (id, fromEl) {
    var url = links[id];
    if (!url) { original.call(Phone, id, fromEl); return; }   // 링크가 없는 앱은 원래대로
    if (Phone.state !== "home") return;
    var w = window.open(url, "_blank", "noopener");
    if (!w) Phone.toast("팝업이 막혔어요. 주소창 옆에서 팝업을 허용해 주세요");
  };
})();
