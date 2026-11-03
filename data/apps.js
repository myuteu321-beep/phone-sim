/* =========================================================
   apps.js  —  홈 화면에 놓이는 앱 목록
   ---------------------------------------------------------
   page1 / page2 : 홈 화면 1페이지, 2페이지에 놓일 앱 (위→아래, 왼쪽→오른쪽 순서)
   dock          : 맨 아래 독(Dock)에 놓일 앱 (최대 4개)
   앱 이름은 NAMES 에서 바꿀 수 있어요.
   ========================================================= */

window.HOME_LAYOUT = {
  page1: ["x", "instagram", "youtube", "weverse", "photos", "news", "settings"],
  page2: [],
  dock:  ["phone", "browser", "messages", "kakao"]
};

window.APP_NAMES = {
  x: "X", instagram: "Instagram", youtube: "YouTube", weverse: "Weverse",
  photos: "사진", news: "뉴스", settings: "설정",
  phone: "전화", browser: "인터넷", messages: "메시지", kakao: "카카오톡"
};
