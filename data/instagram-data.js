/* =========================================================
   instagram-data.js  —  인스타그램 앱의 모든 내용 (가상 시뮬레이션)
   ---------------------------------------------------------
   ※ 이 안의 인물, 그룹, 언론사, 게시물, 댓글, DM은 모두 지어낸 내용이에요.
      실제 인물이나 사건과 관계없어요. (X 앱과 같은 가상 인물 설정을 이어서 써요)

   고치는 방법
   - 따옴표 "" 안의 글자만 바꾸세요. 쉼표 , 는 지우지 마세요.
   - 게시물/댓글/알림 한 개 = { } 한 덩어리. 복사해서 붙이면 늘어나고, 지우면 줄어요.
   - 사진을 쓰려면 images 폴더에 올리고 img: "images/파일이름.jpg" 처럼 적으세요.
     (사진 자리는 { label:"설명", c1:"#색", c2:"#색" } 로 임시 그림이 나와요.
      같은 자리에 img:"images/..." 를 같이 적으면 사진이 우선 나와요.)
   ========================================================= */

window.IG_DATA = {

  /* ---------- 내 계정 ---------- */
  me: {
    id: "me",
    handle: "leo_jungtw",          // ← 아이디 (원하는 걸로 바꾸세요)
    name: "Leo / 정택운",
    bio: "정택운",
    link: "youtube.com/@jungtw_leo",
    posts: "495",
    followers: "121.7만",
    following: "4",
    img: "images/ig-ian.jpg",     // 프로필 사진 (예: "images/profile.jpg"). 비우면 기본 아바타
    color: "#5b6bd6"
  },

  /* ---------- 다른 계정들 (id: 정보) ----------
     verified : 파란 체크 / storyGone : 스토리를 볼 수 없는 계정 */
  users: {
    seoyun:   { handle: "seoyun_0307",   name: "서윤", color: "#d98aa6", bio: "☕ 🎞 일상 기록\n조용히 지내는 중", followers: "842", following: "311", storyGone: true, partner: true },
    haon:     { handle: "achahakyeon",     name: "차학연", color: "#3b82a0", img: "images/ig-haon.jpg", noEnter: true, verified: true, bio: "VIXX", followers: "98.4만", following: "3" },
    ian:      { handle: "nyangwoon",      name: "냥운 nyangwoon", color: "#a05a3b", img: "images/ig-me.jpg", noEnter: true, verified: true, bio: "nyangwoon", followers: "87.1만", following: "4" },
    sion:     { handle: "keken_0406",     name: "이재환", color: "#5a8f3b", img: "images/ig-sion.jpg", noEnter: true, verified: true, bio: "VIXX", followers: "92.6만", following: "2" },
    official: { handle: "vixx_stargram", name: "VIXX OFFICIAL", color: "#111827", img: "images/ig-official.jpg", noEnter: true, verified: true, bio: "VIXX 공식 계정", followers: "310만", following: "6" },
    news:     { handle: "izitmag_", name: "이짓매거진 izitmag", color: "#2b2f36", img: "images/a22.jpg", bio: "연예 이슈 · 제보 DM", followers: "5.2만", following: "112" },
    gasang2:  { handle: "starpick.daily", name: "스타픽 데일리", color: "#7a4f9a", bio: "오늘의 스타 소식", followers: "1.9만", following: "204" },
    starlit:  { handle: "yoon_seul0412",  name: "윤슬", color: "#e0709b", followers: "1,204", following: "388" },
    moon:     { handle: "dahee.0614",     name: "다희", color: "#6b7fd7", followers: "3,310", following: "612" },
    mina:     { handle: "mina.hyun_",     name: "현민아", color: "#c065c9", followers: "905", following: "421" },
    pol:      { handle: "polly.jh",      name: "지현", color: "#e08a4c", followers: "2,018", following: "299" },
    haru:     { handle: "haru_0919",     name: "하루", color: "#d1a13d", followers: "677", following: "502" },
    jun:      { handle: "junimom_",      name: "준이맘", color: "#8a6bd1", followers: "1,530", following: "210" },
    yeon:     { handle: "seoyeon_ds",     name: "서연", color: "#5aa65a", followers: "412", following: "380" },
    bomi:     { handle: "bomi.k_k",    name: "김보미", color: "#d16b6b", followers: "1,020", following: "700" },
    ara:      { handle: "ara_0222",      name: "아라", color: "#4f7fb5", followers: "530", following: "310" },
    nuri:     { handle: "nuri.park_",      name: "박누리", color: "#b5704f", followers: "288", following: "260" },
    tv:       { handle: "gasang_tv",    name: "가상뉴스TV", color: "#3a3f4b", verified: true, bio: "가상 시뮬레이션 속 방송 매체", followers: "9.8만", following: "5" },
    a01: { handle: "jiwoo.0912", name: "지우", color: "#e58aa0", followers: "271", following: "141" },
    a02: { handle: "_hyerin__", name: "혜린", color: "#7aa7d9", followers: "595", following: "465" },
    a03: { handle: "minjae_k", name: "김민재", color: "#6b8f71", followers: "463", following: "133" },
    a04: { handle: "soo.bin_93", name: "수빈", color: "#c79a5b", followers: "524", following: "394" },
    a05: { handle: "yuna_daily", name: "Yuna", color: "#b57edc", followers: "831", following: "101" },
    a06: { handle: "chaewon.lee", name: "채원", color: "#e07a5f", followers: "1008", following: "178" },
    a07: { handle: "dayoung_0228", name: "다영", color: "#5fa8a0", followers: "857", following: "427" },
    a08: { handle: "seungmin.j", name: "승민", color: "#6f7fb8", followers: "605", following: "575" },
    a09: { handle: "haeun_ee", name: "하은", color: "#d98fb0", followers: "886", following: "156" },
    a10: { handle: "ro.ro_ro", name: "로로", color: "#a0a76a", followers: "757", following: "227" },
    a11: { handle: "jeong_hwan", name: "정환", color: "#7a7f8c", followers: "507", following: "377" },
    a12: { handle: "sohee.kr", name: "소희", color: "#e0a15a", followers: "728", following: "298" },
    a13: { handle: "eunbi_0721", name: "은비", color: "#c0709e", followers: "197", following: "467" },
    a14: { handle: "taeyang.p", name: "태양", color: "#5c8fc7", followers: "146", following: "416" },
    a15: { handle: "nayeon_nn", name: "나연", color: "#d98a6a", followers: "261", following: "231" },
    a16: { handle: "kyungmin_s", name: "경민", color: "#6aa58b", followers: "151", following: "321" },
    a17: { handle: "yerim.moon", name: "예림", color: "#9b7fd1", followers: "337", following: "207" },
    a18: { handle: "j.seo_yeon", name: "서연재", color: "#d1708a", followers: "741", following: "511" },
    a19: { handle: "doha_0505", name: "도하", color: "#5d7f9b", followers: "994", following: "264" },
    a20: { handle: "mi.rae_09", name: "미래", color: "#c8a04a", followers: "426", following: "196" },
    a21: { handle: "sunwoo_c", name: "선우", color: "#7f8f5f", followers: "610", following: "380" },
    a22: { handle: "hyunji.oo", name: "현지", color: "#cf7aa0", followers: "957", following: "427" },
    a23: { handle: "ari_ari22", name: "아리", color: "#6fa3c4", followers: "211", following: "381" },
    a24: { handle: "juhee.park", name: "박주희", color: "#b9806a", followers: "718", following: "388" },
    a25: { handle: "woojin__w", name: "우진", color: "#6c7aa8", followers: "224", following: "94" },
    a26: { handle: "bora_0830", name: "보라", color: "#a56fc2", followers: "889", following: "459" },
    a27: { handle: "iseul.n", name: "이슬", color: "#58a2a8", followers: "763", following: "533" },
    a28: { handle: "chanhee_97", name: "찬희", color: "#8a8f98", followers: "313", following: "583" }
  },

  /* ---------- 스토리 (홈 맨 위 동그라미) ----------
     frames : 한 사람의 스토리 장면들 */
  stories: [
    { u: "me", label: "내 스토리", seen: false, frames: [
      { img: "images/a33.webp", time: "3시간" },
      { img: "images/a31.jpg", time: "5시간" }
    ]},
    { u: "haon", seen: false, frames: [
      { img: "images/a27.jpg", time: "4시간" }
    ]},
    { u: "ian", seen: false, frames: [
      { img: "images/a38.jpg", time: "6시간" },
      { img: "images/a39.webp", text: "왜요 뭐요", time: "6시간" }
    ]},
    { u: "sion", seen: true, frames: [
      { img: "images/a26.jpg", text: "촬영 야-호", time: "9시간" }
    ]},
    { u: "official", seen: true, frames: [
      { img: "images/a28.jpg", time: "9시간" }
    ]},
  ],

  /* ---------- 하이라이트 (내 프로필) ---------- */
  highlights: [],

  /* ---------- 게시물 ----------
     u        : 쓴 사람 (users 의 id, 내가 쓴 건 "me")
     time     : 올린 시간 글자
     feed     : true 면 홈 피드에 보임
     loc      : 위치(선택)
     media    : 사진 목록 (여러 장이면 좌우로 넘겨요)
     caption  : 본문
     likes    : 좋아요 수 / commentCount : 댓글 수 표시
     tagMe    : true 면 "내가 태그된 게시물" (프로필 태그됨 탭에 보여요)
     comments : 댓글 목록 { u, text, time, likes }
  */
  posts: [
    {
      id: "p1", u: "news", time: "2시간", feed: true, tagMe: true,
      media: [
        {  img: "images/a21.jpg"  }
       
      ],
      caption: "[단독] 인기 그룹 VIXX 레오, 지인과 심야 데이트 포착… 소속사 \"사실 확인 중\"\n\n #VIXX #정택운 #동성애자",
      likes: 48210, commentCount: 6342,
      comments: [
        { u: "moon", text: "뭐? 잠만 기사 제목 읽고 다시 옴", time: "1시간", likes: 2310 },
        { u: "mina", text: "2026년에 아직도 이런 댓글들을 봐야하네ㅉ", time: "1시간", likes: 1804 },
        { u: "pol", text: "빅스 정도면 괜찮지ㅇㅇ 했는데 남자??", time: "58분", likes: 1290 },
        { u: "bomi", text: "갑자기 왜 이렇게 연예계가 시끄럽냐", time: "50분", likes: 977 },
        { u: "jun", text: "댓글 보다가 멘탈 나감...전 나갑니다", time: "47분", likes: 91 },
        { u: "haru", text: "축하할 일이면 축하하고 아니면 아닌 거지 ㅈㄴ유난", time: "40분", likes: 534 },
        { u: "ara", text: "저는 택운님 믿어요. 기다릴게요 🤍", time: "33분", likes: 402 },
        { u: "nuri", text: "이걸 무조건 축하해야 한다는 분위기도 부담스럽다..;;", time: "20분", likes: 87 }
      ]
    },
    {
      id: "p2", u: "me", time: "어제", feed: true,
      media: [
        {  img: "images/a19.jpg"  }
        
      ],
      loc: "",
      caption: "리허설 끝! 내일 무대에서 만나요 🎤\n오늘도 응원 고마워요 별빛 🤍",
      likes: 612400, commentCount: 9871,
      comments: [
        { u: "starlit", text: "내일 꼭 갑니다!!! 사랑해요 ❤️", time: "20시간", likes: 8120 },
        { u: "haon", text: "형 너무 멋져요 👍", time: "19시간", likes: 5320 },
        { u: "ian", text: "횽아 저도 갈게요~~!", time: "19시간", likes: 3110 },
        { u: "mina", text: "리허설 사진 미쳤다 진짜ㅜ아", time: "18시간", likes: 2204 },
        { u: "yeon", text: "응원봉 충전 완료 🔋", time: "17시간", likes: 1530 }
      ]
    },
    {
      id: "p3", u: "official", time: "5시간", feed: true,
      media: [{ img: "images/a20.jpg" }],
      caption: "2026 VIXX FAN CONCERT 'Case No. VIXX' 공연 관람 가이드\n\n별빛 더 즐거운 시간을 만들기 위하 공연 전 안내 사항을 미리 확인해 주세요",
      likes: 83200, commentCount: 2410,
      comments: [
        { u: "jun", text: "티켓팅 준비 완료입니다 🔥", time: "4시간", likes: 920 },
        { u: "bomi", text: "따흑 감사합니다 ㅠㅠ", time: "4시간", likes: 411 }
      ]
    },
    {
      id: "p4", u: "me", time: "3일", feed: true,
      media: [
        {  img: "images/a18.jpg"  },
        
      ],
      caption: "퇴근 🌙",
      likes: 540100, commentCount: 7320,
      comments: [
        { u: "sion", text: "횽 같이 밥 먹고 가요~", time: "3일", likes: 6210 },
        { u: "pol", text: "퇴근하고 푹 쉬어요 ㅠㅠ", time: "3일", likes: 1802 },
        { u: "ara", text: "고생했어요 🤍", time: "3일", likes: 1210 }
      ]
    },
    {
      id: "p6", u: "me", time: "1주", feed: true,
      media: [{ img: "images/a16.jpg" }],
      caption: "기대된다",
      likes: 702300, commentCount: 11230,
      comments: [
        { u: "ian", text: "앞날을 응원해!!", time: "1주", likes: 9120 },
        { u: "haru", text: "이쁘네..", time: "1주", likes: 4410 }
      ]
    },
    {
      id: "p7", u: "me", time: "2주", feed: true,
      media: [
        { img: "images/a15.jpg" },
        
      ],
      loc: "",
      caption: "...",
      likes: 488900, commentCount: 5120,
      comments: [{ u: "starlit", text: "오빠 보고 힐링했어요", time: "2주", likes: 1420 }]
    },
    {
      id: "p8", u: "me", time: "3주", feed: true,
      media: [{ img: "images/a14.jpg" }],
      caption: "..",
      likes: 391000, commentCount: 4330,
      comments: [{ u: "haon", text: "역시 예쁘다", time: "3주", likes: 2310 }]
    },
    {
      id: "p9", u: "me", time: "1개월", feed: false,
      media: [{ img: "images/a40.jpg" }],
      caption: "🎸", likes: 322000, commentCount: 3012,
      comments: [{ u: "ian", text: "예쁜 코냥이(날 닮은)", time: "1개월", likes: 1020 }]
    },
    {
      id: "p10", u: "me", time: "1개월", feed: false,
      media: [{ img: "images/a41.jpg" }],
      caption: "...", likes: 288000, commentCount: 2711,
      comments: [{ u: "mina", text: "넘 아랑해!!", time: "1개월", likes: 890 }]
    },
    {
      id: "p11", u: "me", time: "2개월", feed: false,
      media: [{ img: "images/a42.jpg" }],
      caption: "~", likes: 412000, commentCount: 4020,
      comments: [{ u: "bomi", text: "미모ㄷㄷ", time: "2개월", likes: 701 }]
    },
    {
      id: "p12", u: "me", time: "2개월", feed: false,
      media: [{ img: "images/a45.jpg" }],
      caption: "...", likes: 530000, commentCount: 5120,
      comments: [{ u: "sion", text: "택우니횽아아아아아 보고싶드아", time: "2개월", likes: 1530 }]
    },
    {
      id: "p13", u: "me", time: "3개월", feed: false,
      media: [{ img: "images/a46.jpg" }],
      caption: "☕", likes: 251000, commentCount: 2010,
      comments: [{ u: "ara", text: "고양이 그림자 해주세욤", time: "3개월", likes: 402 }]
    },
    {
      id: "p14", u: "me", time: "3개월", feed: false,
      media: [{ img: "images/a43.jpg" }],
      caption: "우리 VIXX 🤍", likes: 702000, commentCount: 8310,
      comments: [{ u: "haon", text: "우리 최고지 그치?", time: "3개월", likes: 4120 }]
    },
    {
      id: "p15", u: "starlit", time: "4시간", feed: false, tagMe: true,
      media: [{ label: "팬아트", c1: "#e0709b", c2: "#6a1f3d" }],
      caption: "오늘 같은 날에도 응원합니다 @doyun_seo 🤍 #NOVA #서도윤",
      likes: 1204, commentCount: 88,
      comments: [{ u: "mina", text: "그림 너무 예뻐요 ㅠㅠ", time: "3시간", likes: 40 }]
    },
    {
      id: "p16", u: "gasang2", time: "3시간", feed: false, tagMe: true,
      media: [{ label: "카드뉴스 1", c1: "#7a4f9a", c2: "#2a1a3b" }],
      caption: "VIXX 레오 열애설 정리\n\n",
      likes: 9210, commentCount: 1520,
      comments: [
        { u: "moon", text: "정리해줘서 고마운데 확인된 건 없죠?", time: "2시간", likes: 540 },
        { u: "jun", text: "추측성 카드뉴스는 좀…", time: "2시간", likes: 402 }
      ]
    }
  ],

  /* ---------- 릴스 ----------
     tagMe : 나를 태그한 릴스 */
  reels: [
    {
      id: "r1", u: "moon", tagMe: true, img: "images/a51.png", label: "",
      caption: "지금 난리난 열애설 한 번에 정리 🧵 @doyun_seo  #남자아이돌 #화제",
      music: "원본 오디오", likes: 21400, commentCount: 3420,
      comments: [
        { u: "bomi", text: "@doyun_seo 이 ㅅㄲ 아님?", time: "1시간", likes: 18 },
        { u: "pol", text: "@doyun_seo 님게이임? ㅋㅋㅋ", time: "1시간", likes: 20 },
        { u: "jun", text: "남의 연애를 왜 이렇게 파헤쳐 꺼져좀;", time: "52분", likes: 1320 },
        { u: "ara", text: "확인된 거 하나도 없는데 릴스부터 올리네", time: "40분", likes: 610 },
        { u: "yeon", text: "편집 잘하긴 했네 ㅋㅋㅋㅋ", time: "30분", likes: 33 }
      ]
    },
    {
      id: "r3", u: "me", img: "images/a53.jpg", label: "",
      caption: "엄청난 중독성 🎶 #VIXX #고양이",
      music: "꽁꽁 얼어붙은..", likes: 812000, commentCount: 14210,
      comments: [
        { u: "starlit", text: "개귀엽다 진짜…", time: "5일", likes: 12310 },
        { u: "haon", text: "나랑 같이 찍자", time: "5일", likes: 7210 },
        { u: "sion", text: "귀여워우이우니이이잉이ㅠㅠㅜ", time: "5일", likes: 4310 }
      ]
    },
    {
      id: "r5", u: "official", img: "images/a52.jpg", label: "",
      caption: "별빛 뭘 해도 예쁘니까",
      music: "Leellamarz, TOIL-하지마", likes: 123000, commentCount: 2210,
      comments: [{ u: "jun", text: "아 이뽀..", time: "5시간", likes: 801 }]
    },
    {
      id: "r6", u: "tv", img: "images/a59.jpg", label: "",
      caption: "[속보] 빅스 레오 열애설, 소속사 \"사실 확인 중\"",
      music: "원본 오디오", likes: 15300, commentCount: 2840,
      comments: [
        { u: "moon", text: "확인 중이라는 말만 반복하네", time: "2시간", likes: 920 },
        { u: "pol", text: "입장문 언제 나오냐..ㅠㅠ", time: "2시간", likes: 410 }
      ]
    }
  ],

  /* ---------- 하트 알림 ----------
     type   : tag-post(게시물 태그) / tag-reel(릴스 태그) / mention(댓글 멘션) /
              comment(댓글) / like(좋아요) / follow(팔로우)
     target : 누르면 이동할 곳 { kind:"post"|"reel", id:"..." , comments:true(댓글창도 열기) }
     section: new(새로운 알림) / week(이번 주) / month(이번 달) / earlier(이전 활동)
     unread : true 면 파란 점/연한 배경 */
  notifs: [
    { id: "n1", type: "tag-reel", u: "moon", text: "님이 릴스에서 회원님을 태그했습니다.", time: "1시간", section: "new", unread: true, target: { kind: "reel", id: "r1" } },
    { id: "n3", type: "tag-post", u: "news", text: "님이 게시물에서 회원님을 태그했습니다.", time: "2시간", section: "new", unread: true, target: { kind: "post", id: "p1" } },
    { id: "n4", type: "tag-post", u: "gasang2", text: "님이 게시물에서 회원님을 태그했습니다.", time: "3시간", section: "new", unread: true, target: { kind: "post", id: "p16" } },
    { id: "n5", type: "tag-post", u: "starlit", text: "님이 게시물에서 회원님을 태그했습니다.", time: "4시간", section: "new", unread: true, target: { kind: "post", id: "p15" } },
    { id: "n6", type: "mention", u: "pol", text: "님이 댓글에서 회원님을 언급했습니다: @doyun_seo 이 분 맞죠? ㅋㅋㅋ", time: "1시간", section: "new", unread: true, target: { kind: "reel", id: "r1", comments: true } },
    { id: "n7", type: "tag-post", u: "seoyun", text: "님이 게시물에서 회원님을 태그했습니다.", time: "6시간", section: "new", unread: true, target: { kind: "post", id: "p5" } },
    { id: "n8", type: "follow", u: "yeon", text: "님이 회원님을 팔로우하기 시작했습니다.", time: "1일", section: "week", target: { kind: "user", id: "yeon" } },
    { id: "w1", type: "like", u: "a01", text: "님이 회원님의 게시물을 좋아합니다.", time: "2일", section: "week", target: { kind: "post", id: "p2" } },
    { id: "w2", type: "like", u: "a02", text: "님 외 23명이 회원님의 게시물을 좋아합니다.", time: "3일", section: "week", target: { kind: "post", id: "p4" } },
    { id: "w3", type: "follow", u: "a03", text: "님이 회원님을 팔로우하기 시작했습니다.", time: "4일", section: "week", target: { kind: "user", id: "a03" } },
    { id: "m1", type: "like", u: "a04", text: "님이 회원님의 게시물을 좋아합니다.", time: "1주", section: "month", target: { kind: "post", id: "p6" } },
    { id: "m2", type: "comment", u: "a05", text: "님이 댓글을 남겼습니다: 심드렁한 표정 너무 귀여워요 ㅋㅋㅋ", time: "1주", section: "month", target: { kind: "post", id: "p6" } },
    { id: "m3", type: "follow", u: "a06", text: "님이 회원님을 팔로우하기 시작했습니다.", time: "1주", section: "month", target: { kind: "user", id: "a06" } },
    { id: "m4", type: "like", u: "a07", text: "님 외 58명이 회원님의 게시물을 좋아합니다.", time: "1주", section: "month", target: { kind: "post", id: "p6" } },
    { id: "m5", type: "like", u: "mina", text: "님이 회원님의 릴스를 좋아합니다.", time: "2주", section: "month", target: { kind: "reel", id: "r3" } },
    { id: "m6", type: "comment", u: "a08", text: "님이 댓글을 남겼습니다: 바다 사진 보고 힐링했어요 🌊", time: "2주", section: "month", target: { kind: "post", id: "p7" } },
    { id: "m7", type: "follow", u: "a09", text: "님이 회원님을 팔로우하기 시작했습니다.", time: "2주", section: "month", target: { kind: "user", id: "a09" } },
    { id: "m8", type: "like", u: "a10", text: "님이 회원님의 게시물을 좋아합니다.", time: "2주", section: "month", target: { kind: "post", id: "p7" } },
    { id: "m9", type: "like", u: "a11", text: "님이 회원님의 릴스를 좋아합니다.", time: "2주", section: "month", target: { kind: "reel", id: "r3" } },
    { id: "m10", type: "comment", u: "a12", text: "님이 댓글을 남겼습니다: 국밥 어디예요?? 저도 가보고 싶어요", time: "3주", section: "month", target: { kind: "post", id: "p8" } },
    { id: "m11", type: "follow", u: "nuri", text: "님이 회원님을 팔로우하기 시작했습니다.", time: "3주", section: "month", target: { kind: "user", id: "nuri" } },
    { id: "m12", type: "like", u: "a14", text: "님 외 12명이 회원님의 게시물을 좋아합니다.", time: "3주", section: "month", target: { kind: "post", id: "p8" } },
    { id: "m13", type: "follow", u: "a13", text: "님이 회원님을 팔로우하기 시작했습니다.", time: "3주", section: "month", target: { kind: "user", id: "a13" } },
    { id: "m14", type: "like", u: "a15", text: "님이 회원님의 게시물을 좋아합니다.", time: "3주", section: "month", target: { kind: "post", id: "p8" } },
    { id: "e1", type: "follow", u: "a16", text: "님이 회원님을 팔로우하기 시작했습니다.", time: "1개월", section: "earlier", target: { kind: "user", id: "a16" } },
    { id: "e2", type: "like", u: "a17", text: "님이 회원님의 게시물을 좋아합니다.", time: "1개월", section: "earlier", target: { kind: "post", id: "p9" } },
    { id: "e3", type: "comment", u: "a18", text: "님이 댓글을 남겼습니다: 합주 소리 좋다 ㅠㅠ", time: "1개월", section: "earlier", target: { kind: "post", id: "p9" } },
    { id: "e4", type: "like", u: "a19", text: "님 외 31명이 회원님의 게시물을 좋아합니다.", time: "1개월", section: "earlier", target: { kind: "post", id: "p10" } },
    { id: "e5", type: "follow", u: "a20", text: "님이 회원님을 팔로우하기 시작했습니다.", time: "1개월", section: "earlier", target: { kind: "user", id: "a20" } },
    { id: "e6", type: "comment", u: "a21", text: "님이 댓글을 남겼습니다: 신곡 기대돼요!!", time: "1개월", section: "earlier", target: { kind: "post", id: "p10" } },
    { id: "e7", type: "like", u: "a22", text: "님이 회원님의 게시물을 좋아합니다.", time: "2개월", section: "earlier", target: { kind: "post", id: "p11" } },
    { id: "e8", type: "follow", u: "a23", text: "님이 회원님을 팔로우하기 시작했습니다.", time: "2개월", section: "earlier", target: { kind: "user", id: "a23" } },
    { id: "e9", type: "comment", u: "a24", text: "님이 댓글을 남겼습니다: 조심히 다녀와요 ✈️", time: "2개월", section: "earlier", target: { kind: "post", id: "p11" } },
    { id: "e10", type: "like", u: "a25", text: "님 외 9명이 회원님의 게시물을 좋아합니다.", time: "2개월", section: "earlier", target: { kind: "post", id: "p12" } },
    { id: "e11", type: "follow", u: "a26", text: "님이 회원님을 팔로우하기 시작했습니다.", time: "2개월", section: "earlier", target: { kind: "user", id: "a26" } },
    { id: "e12", type: "like", u: "a27", text: "님이 회원님의 게시물을 좋아합니다.", time: "3개월", section: "earlier", target: { kind: "post", id: "p13" } },
    { id: "e13", type: "comment", u: "a28", text: "님이 댓글을 남겼습니다: 커피 취향 비슷해요 ☕", time: "3개월", section: "earlier", target: { kind: "post", id: "p13" } },
    { id: "e14", type: "like", u: "a01", text: "님 외 44명이 회원님의 게시물을 좋아합니다.", time: "3개월", section: "earlier", target: { kind: "post", id: "p14" } }
  ],

  /* ---------- DM (채팅방) ----------
     msgs 의 k :
       "them" 상대 메시지 / "me" 내 메시지
       "tag"  스토리 태그 알림 줄 / "gone" 스토리를 볼 수 없다는 카드 (side:"me" 면 내 쪽, 없으면 상대 쪽)
       "day"  날짜 구분선
     unread : 안 읽은 개수 (목록에 표시) */
  dms: [
    {
      id: "d3", u: "haon", unread: 0, last: "택운아 괜찮아? 일단 연락 줘", time: "7:30",
      msgs: [
        { k: "day", text: "어제" },
        { k: "them", text: "운아 수고했어!", time: "오후 8:10" },
        { k: "me", text: "너도 고생했어~ 내일 잘하자", time: "오후 8:15" },
        { k: "day", text: "오늘" },
        { k: "them", text: "택운아 괜찮아? 일단 연락 줘", time: "오전 7:30" }
      ]
    },
    {
      id: "d4", u: "ian", unread: 0, last: "??", time: "7:10",
      msgs: [
        { k: "day", text: "오늘" },
        { k: "them", text: "?", time: "오전 7:10" },
        { k: "me", text: "??", time: "오전 7:12" }
      ]
    },
    {
      id: "d5", u: "sion", unread: 0, last: "금방갈게", time: "어제",
      msgs: [
        { k: "day", text: "어제" },
        { k: "them", text: "형 밥 안먹어요?? 어디감", time: "오후 6:30" },
        { k: "me", text: "금방 갈게", time: "오후 6:41" }
      ]
    }
  ]
};
