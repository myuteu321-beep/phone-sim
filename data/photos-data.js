/* =========================================================
   photos-data.js  —  사진 앱의 모든 내용 (가상 시뮬레이션)
   ---------------------------------------------------------
   ※ 지금은 색깔 상자(임시 사진)로 채워져 있어요.
      나중에 진짜 사진을 넣는 방법:
        1) images 폴더에 사진을 올리세요. (예: images/photo01.jpg)
        2) 아래 사진 한 줄에서 img: "" 를 img: "images/photo01.jpg" 로 바꾸세요.
        3) date 는 찍은 날짜/시간이에요. ("2026-10-24 07:12" 형식)
      사진을 더 넣고 싶으면 { } 한 줄을 복사해서 붙이세요. (id 는 겹치지 않게!)
   - 따옴표 "" 안의 글자만 바꾸세요. 쉼표 , 는 지우지 마세요.
   - fav: true 면 "즐겨찾는 항목" 앨범에 들어가요.
   ========================================================= */

window.PHOTOS_DATA = {

  /* ---------- 사진 목록 ---------- */
  photos: [
    { id: "p01", img: "images/photo01.jpg", label: "", date: "2026-04-05 14:57", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p02", img: "images/photo02.jpg", label: "", date: "2026-11-01 23:54", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p03", img: "images/photo03.jpg", label: "", date: "2026-09-14 12:30", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p04", img: "images/photo04.jpg", label: "", date: "2026-09-21 22:01", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p05", img: "images/photo05.jpg", label: "", date: "2026-09-28 14:10", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p06", img: "images/photo06.jpg", label: "", date: "2026-10-05 17:26", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p07", img: "images/photo07.jpg", label: "", date: "2026-10-09 09:50", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p08", img: "images/photo08.jpg", label: "", date: "2026-10-12 20:15", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p09", img: "images/photo09.jpg", label: "", date: "2026-10-15 11:02", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p10", img: "images/photo10.jpg", label: "", date: "2026-10-18 19:33", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p11", img: "images/photo11.jpg", label: "", date: "2026-03-20 18:50", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p12", img: "images/photo12.jpg", label: "", date: "2026-04-22 23:11", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p13", img: "images/photo13.jpg", label: "", date: "2026-07-31 03:14", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p14", img: "images/photo14.jpg", label: "", date: "2026-11-01 23:56", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p15", img: "images/photo15.jpg", label: "", date: "2026-08-15 15:55", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p16", img: "images/photo16.jpg", label: "", date: "2026-08-27 19:19", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p17", img: "images/photo17.jpg", label: "", date: "2026-09-03 08:45", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p18", img: "images/photo18.jpg", label: "", date: "2025-09-10 00:04", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p19", img: "images/photo19.jpg", label: "", date: "2026-07-04 21:18", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p20", img: "images/photo20.jpg", label: "", date: "2026-03-27 21:02", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p21", img: "images/photo21.jpg", label: "", date: "2026-04-05 19:36", c1: "#cccccc", c2: "#999999", fav: false },
    { id: "p22", img: "images/photo22.jpg", label: "", date: "2026-04-05 21:45", c1: "#cccccc", c2: "#999999", fav: false }
  ],

  /* ---------- 앨범 ----------
     ids : 앨범에 넣을 사진의 id 들 (위 photos 의 id)
     (즐겨찾는 항목 / 최근 삭제된 항목은 자동으로 만들어져요) */
  albums: [
    { id: "a1", name: "일상",   ids: ["p01", "p02", "p03", "p04"] },
    { id: "a2", name: "음식",   ids: ["p05", "p06"] },
    { id: "a3", name: "여행",   ids: ["p07", "p08", "p09"] },
    { id: "a4", name: "셀카",   ids: ["p10", "p11", "p12"] }
  ],

  /* ---------- 최근 삭제된 항목 ----------
     days : 영구 삭제까지 남은 날 */
  deleted: [
    { id: "d01", img: "images/del01.jpg", label: "", date: "2026-10-23 12:00", days: 29, c1: "#cccccc", c2: "#999999" },
    { id: "d02", img: "images/del02.jpg", label: "", date: "2026-10-21 12:00", days: 27, c1: "#cccccc", c2: "#999999" },
    { id: "d03", img: "images/del03.jpg", label: "", date: "2026-10-20 12:00", days: 26, c1: "#cccccc", c2: "#999999" },
    { id: "d04", img: "images/del04.jpg", label: "", date: "2026-10-18 12:00", days: 24, c1: "#cccccc", c2: "#999999" },
    { id: "d05", img: "images/del05.jpg", label: "", date: "2026-10-17 12:00", days: 23, c1: "#cccccc", c2: "#999999" },
    { id: "d06", img: "images/del06.jpg", label: "", date: "2026-10-15 12:00", days: 21, c1: "#cccccc", c2: "#999999" },
    { id: "d07", img: "images/del07.jpg", label: "", date: "2026-10-14 12:00", days: 20, c1: "#cccccc", c2: "#999999" },
    { id: "d08", img: "images/del08.jpg", label: "", date: "2026-10-12 12:00", days: 18, c1: "#cccccc", c2: "#999999" },
    { id: "d09", img: "images/del09.jpg", label: "", date: "2026-10-10 12:00", days: 16, c1: "#cccccc", c2: "#999999" },
    { id: "d10", img: "images/del10.jpg", label: "", date: "2026-10-09 12:00", days: 15, c1: "#cccccc", c2: "#999999" },
    { id: "d11", img: "images/del11.jpg", label: "", date: "2026-10-06 12:00", days: 12, c1: "#cccccc", c2: "#999999" },
    { id: "d12", img: "images/del12.jpg", label: "", date: "2026-10-03 12:00", days: 9, c1: "#cccccc", c2: "#999999" },
    { id: "d13", img: "images/del13.jpg", label: "", date: "2026-10-01 12:00", days: 7, c1: "#cccccc", c2: "#999999" },
    { id: "d14", img: "images/del14.jpg", label: "", date: "2026-09-29 12:00", days: 5, c1: "#cccccc", c2: "#999999" },
    { id: "d15", img: "images/del15.jpg", label: "", date: "2026-09-28 12:00", days: 4, c1: "#cccccc", c2: "#999999" },
    { id: "d16", img: "images/del16.jpg", label: "", date: "2026-09-27 12:00", days: 3, c1: "#cccccc", c2: "#999999" },
    { id: "d17", img: "images/del17.jpg", label: "", date: "2026-09-26 12:00", days: 2, c1: "#cccccc", c2: "#999999" },
    { id: "d18", img: "images/del18.jpg", label: "", date: "2026-09-25 12:00", days: 1, c1: "#cccccc", c2: "#999999" }
  ]
};
