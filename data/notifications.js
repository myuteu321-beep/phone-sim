/* =========================================================
   notifications.js  —  잠금화면에 뜨는 알림 목록
   ---------------------------------------------------------
   알림 하나는 아래처럼 { } 한 덩어리예요.
   복사해서 붙여넣으면 알림이 늘어나고, 한 덩어리를 지우면 줄어요.
   (각 덩어리 끝의 쉼표 , 는 지우지 마세요. 맨 마지막은 있어도 없어도 돼요.)

     app     : 어떤 앱 알림인지 (아래 중에서 고르세요)
               "kakao"(카카오톡) "x" "instagram" "messages"(메시지)
               "phone"(전화) "youtube"
     title   : 굵은 글씨 제목 (사람 이름, "새 쪽지", "알림" 등)
     message : 내용 (길면 두 줄까지만 보여요)
     time    : 오른쪽에 뜨는 시간 ("방금", "07:56" 등 아무 글자나 가능)

   위에 있을수록 맨 위에 표시돼요.
   알림을 누르면 비밀번호 입력 후 해당 앱으로 이동해요.
   ========================================================= */

window.NOTIFICATIONS = [

  {
    app: "x",
    title: "알림",
    message: "새로운 팔로워 203명이 회원님을 팔로우했습니다",
    time: "07:05"
  },

  {
    app: "kakao",
    title: "V 재환",
    message: "우선 일어나면 연락해요",
    time: "07:03"
  },

  {
    app: "kakao",
    title: "V 학연",
    message: "아니면 지금 바로 혁이랑 갈게",
    time: "07:01"
  },

  {
    app: "instagram",
    title: "인스타그램",
    message: "jiwoo.0912님이 회원님을 팔로우하기 시작했습니다",
    time: "06:58"
  },

  {
    app: "instagram",
    title: "인스타그램",
    message: "_hyerin__님이 회원님을 팔로우하기 시작했습니다",
    time: "06:55"
  },

  {
    app: "instagram",
    title: "인스타그램",
    message: "minjae_k님이 회원님을 팔로우하기 시작했습니다",
    time: "06:52"
  },

  {
    app: "instagram",
    title: "인스타그램",
    message: "soo.bin_93님이 회원님을 팔로우하기 시작했습니다",
    time: "06:48"
  },

  {
    app: "instagram",
    title: "인스타그램",
    message: "yuna_daily님이 회원님을 팔로우하기 시작했습니다",
    time: "06:45"
  },

  {
    app: "instagram",
    title: "인스타그램",
    message: "chaewon.lee님이 회원님을 팔로우하기 시작했습니다",
    time: "06:42"
  },

  {
    app: "instagram",
    title: "인스타그램",
    message: "dayoung_0228님이 회원님을 팔로우하기 시작했습니다",
    time: "06:38"
  },

  {
    app: "instagram",
    title: "인스타그램",
    message: "seungmin.j님이 회원님을 팔로우하기 시작했습니다",
    time: "06:35"
  }

];
