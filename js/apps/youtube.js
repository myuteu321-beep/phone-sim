/* =========================================================
   youtube.js  —  유튜브 앱 (폰 화면 안에서 영상 재생)
   영상 주소는 data/links.js 의 YOUTUBE_VIDEO 에서 바꿔요.
   홈바를 누르거나 위로 밀면 홈으로 돌아가고, 영상은 멈춰요.

   ※ index.html 을 파일로 바로 열면(주소가 file:// 로 시작) 유튜브가
      "오류 153"으로 재생을 막아요. 그럴 땐 영상 대신 대표 화면을 보여주고,
      누르면 유튜브가 새 탭으로 열려요. 웹 주소(http://, https://)로 열면
      폰 안에서 바로 재생돼요.
   ========================================================= */

(function () {
  "use strict";

  var Apps = window.Apps, V = window.YOUTUBE_VIDEO || {};
  var onFile = location.protocol === "file:";

  function embedUrl() {
    return "https://www.youtube.com/embed/" + encodeURIComponent(V.videoId || "") +
      "?playsinline=1&rel=0&autoplay=1";
  }
  function thumbUrl() {
    return "https://img.youtube.com/vi/" + encodeURIComponent(V.videoId || "") + "/hqdefault.jpg";
  }

  function build(root) {
    root.classList.add("yt-app");
    var player = onFile
      ? '<a class="yt-fake" href="' + (V.url || "#") + '" target="_blank" rel="noopener" ' +
          "style=\"background-image:url('" + thumbUrl() + "')\"><span class=\"yt-play\"></span></a>"
      : '<iframe title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" ' +
          'allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
    root.innerHTML =
      '<div class="yt-top"><b>YouTube</b></div>' +
      '<div class="yt-player">' + player + "</div>" +
      '<div class="yt-info">' +
        "<p>" + (onFile
          ? "화면을 누르면 유튜브에서 영상이 열려요."
          : "영상이 보이지 않으면 아래 버튼으로 유튜브에서 직접 열 수 있어요.") + "</p>" +
        '<a class="yt-open" href="' + (V.url || "#") + '" target="_blank" rel="noopener">YouTube에서 열기</a>' +
      "</div>";

    if (onFile) return;                           // 파일로 열었을 땐 플레이어를 쓰지 않아요

    var frame = root.querySelector("iframe");
    // 앱이 열리면 재생 시작, 닫히면(홈으로 나가면) 영상이 멈추도록 비워요
    function sync() {
      var open = root.classList.contains("open");
      if (open && frame.getAttribute("src") !== embedUrl()) frame.setAttribute("src", embedUrl());
      if (!open && frame.getAttribute("src")) frame.removeAttribute("src");
    }
    new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["class"] });
    setTimeout(sync, 0);
  }

  Apps.register("youtube", { theme: "dark", build: build });
})();
