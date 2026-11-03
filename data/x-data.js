/* =========================================================
   x-data.js  —  X(트위터) 앱의 모든 내용 (가상 시뮬레이션)
   ---------------------------------------------------------
   ※ 이 안의 인물, 그룹, 언론사, 게시물, 쪽지는 모두 지어낸 내용이에요.
      실제 인물이나 사건과 관계없어요.

   고치는 방법
   - 따옴표 "" 안의 글자만 바꾸세요. 쉼표 , 는 지우지 마세요.
   - 게시물 한 개 = { } 한 덩어리. 복사해서 붙이면 늘어나고, 지우면 줄어요.
   - 사진을 쓰려면 images 폴더에 올리고 img: "images/파일이름.jpg" 처럼 적으세요.
   ========================================================= */

window.X_DATA = {

  /* ---------- 내 계정 ---------- */
  me: {
    name: "VIXX LEO 정택운",
    handle: "@JUNGTW LEO",
    bio: "정택운. leo of muse 늘 오래가자",
    joined: "2015년 9월",
    following: "9",
    followers: "49.5만",
    postCount: "2,184",
    img: "images/x-profile.jpg",          // 프로필 사진 (예: "images/profile.jpg"). 비우면 기본 아바타
    headerImg: "images/x-header.jpg",    // 헤더 사진 (예: "images/header.jpg"). 비우면 기본 배경
    color: "#5b6bd6",
    verified: true
  },

  /* ---------- 다른 계정들 (id: 정보) ---------- */
  users: {
    starlit:  { name: "별멍뭉",      handle: "@starlit_0412",  color: "#e0709b", img: "images/x-av-1.jpg" },
    moon:     { name: "달달이..",         handle: "@dalmuri_o",     color: "#6b7fd7", img: "images/x-av-2.jpg" },
    pol:      { name: "폴짝",           handle: "@poleee_n",      color: "#e08a4c", img: "images/x-av-3.jpg" },
    file:     { name: "파일뭉",           handle: "@file_1170",     color: "#4aa88f", img: "images/x-av-6.jpg" },
    mina:     { name: "요니",           handle: "@mina_nova",     color: "#c065c9", img: "images/x-av-5.jpg" },
    sora:     { name: "별무리..",           handle: "@sora_nv",       color: "#3d9bd1", img: "images/x-default.jpg" },
    haru:     { name: "하루",           handle: "@haru_0919",     color: "#d1a13d", img: "images/x-default.jpg" },
    jun:      { name: "준냥",         handle: "@junimom_",      color: "#8a6bd1", img: "images/x-av-4.jpg" },
    yeon:     { name: "연두부",           handle: "@yeondu_ss",     color: "#5aa65a", img: "images/x-default.jpg" },
    bomi:     { name: "보밍",           handle: "@bomi_bomi7",    color: "#d16b6b", img: "images/x-default.jpg" },
    ara:      { name: "아라뜨",           handle: "@ara_0222",      color: "#4f7fb5", img: "images/x-default.jpg" },
    nuri:     { name: "누리꿍",           handle: "@nuri_lov",      color: "#b5704f", img: "images/x-default.jpg" },
    news:     { name: "가상연예뉴스",   handle: "@gasang_ent",    color: "#2b2f36", verified: true },
    official: { name: "LEO 정택운",  handle: "@OFFICIALJTW_LEO", color: "#111827", verified: true },
    haon:     { name: "VIXX_KEN",      handle: "@jaehwany0406",     color: "#3b82a0", verified: true, img: "images/a4.jpg" },
    ian:      { name: "차학연 VIXX_N",      handle: "@CHA_NNNNN",      color: "#a05a3b", verified: true, img: "images/a3.jpg" },
    sion:     { name: "냥운 NYANGWOON",      handle: "@nyangwoon",     color: "#5a8f3b", verified: true, img: "images/a1.jpg" },
    f01: { name: "밤톨", handle: "@bamhaneul_88", color: "#8899a6", img: "images/x-default.jpg" },
    f02: { name: "쪼꼬", handle: "@choco_uyu", color: "#8899a6", img: "images/x-default.jpg" },
    f03: { name: "새벽냥", handle: "@dawn_mood_", color: "#8899a6", img: "images/x-default.jpg" },
    f04: { name: "라일..락", handle: "@lilac_0307", color: "#8899a6", img: "images/x-default.jpg" },
    f05: { name: "몽실몽실", handle: "@mongsil_ii", color: "#8899a6", img: "images/x-default.jpg" },
    f06: { name: "하늘멍", handle: "@skyhue_1", color: "#8899a6", img: "images/x-default.jpg" },
    f07: { name: "말랑♡", handle: "@marshmal_lo", color: "#8899a6", img: "images/x-default.jpg" },
    f08: { name: "쟌쟌", handle: "@yunseul_nv", color: "#8899a6", img: "images/x-default.jpg" },
    f09: { name: "소금뭉", handle: "@saltbread_9", color: "#8899a6", img: "images/x-default.jpg" },
    f10: { name: "재환45", handle: "@cloud_gureum", color: "#8899a6", img: "images/x-default.jpg" },
    f11: { name: "귤귤", handle: "@oj_juice00", color: "#8899a6", img: "images/x-default.jpg" },
    f12: { name: "켄뭉이", handle: "@film_cam_", color: "#8899a6", img: "images/x-default.jpg" },
    f13: { name: "별냥", handle: "@stardrop_7", color: "#8899a6", img: "images/x-default.jpg" },
    f14: { name: "한밤♡", handle: "@midnight_ok", color: "#8899a6", img: "images/x-default.jpg" },
    f15: { name: "두부냥", handle: "@dubu_dubu_", color: "#8899a6", img: "images/x-default.jpg" },
    q1: { name: "택운공듀", handle: "@mango_bingsu_", color: "#8899a6", img: "images/x-default.jpg" },
    q2: { name: "72", handle: "@dubu_dduk", color: "#8899a6", img: "images/x-default.jpg" },
    q3: { name: "하늘", handle: "@bamhaneul_9", color: "#8899a6", img: "images/x-default.jpg" },
    q4: { name: "Ree", handle: "@somsatang_n", color: "#8899a6", img: "images/x-default.jpg" },
    q5: { name: "오월이..", handle: "@omwol_0501", color: "#8899a6", img: "images/x-default.jpg" },
    q6: { name: "차도", handle: "@cherry_cc0", color: "#8899a6", img: "images/x-default.jpg" },
    q7: { name: "나루", handle: "@naru_nv", color: "#8899a6", img: "images/x-default.jpg" },
    q8: { name: "Nnn", handle: "@byeolddong_", color: "#8899a6", img: "images/x-default.jpg" },
    q9: { name: "라떼", handle: "@latte_0807", color: "#8899a6", img: "images/x-default.jpg" },
    q10: { name: "냐나냥", handle: "@yuna_nova1", color: "#8899a6", img: "images/x-default.jpg" },
    q11: { name: "해일이..", handle: "@haeil_00", color: "#8899a6", img: "images/x-default.jpg" },
    q12: { name: "빅스기억상자", handle: "@kongi_nv", color: "#8899a6", img: "images/x-default.jpg" },
    q13: { name: "미소♡", handle: "@miso_0214", color: "#8899a6", img: "images/x-default.jpg" },
    q14: { name: "별뭉", handle: "@horang_nv", color: "#8899a6", img: "images/x-default.jpg" },
    q15: { name: "다온이", handle: "@daon_nova", color: "#8899a6", img: "images/x-default.jpg" },
    q16: { name: "김운진", handle: "@luna_0630", color: "#8899a6", img: "images/x-default.jpg" },
    q17: { name: "택구", handle: "@saebyeok_s", color: "#8899a6", img: "images/x-default.jpg" },
    q18: { name: "가을멍", handle: "@gaeul_1019", color: "#8899a6", img: "images/x-default.jpg" },
    q19: { name: "리온", handle: "@rion_nv", color: "#8899a6", img: "images/x-default.jpg" },
    q20: { name: "수련♡", handle: "@suryeon_n", color: "#8899a6", img: "images/x-default.jpg" },
    q21: { name: "minaa♡", handle: "@minak_nova", color: "#8899a6", img: "images/x-default.jpg" },
    q22: { name: "하늘냥", handle: "@haneul_0723", color: "#8899a6", img: "images/x-default.jpg" },
    q23: { name: "뭉", handle: "@bori_nv", color: "#8899a6", img: "images/x-default.jpg" },
    q24: { name: "토리..", handle: "@dami_dm", color: "#8899a6", img: "images/x-default.jpg" },
    q25: { name: "별랑", handle: "@onyu_nova", color: "#8899a6", img: "images/x-default.jpg" },
    d1: { name: "누룽", handle: "@_nurun9", color: "#8899a6", img: "images/x-dm-n1.jpg" },
    d2: { name: "듀", handle: "@dyu1110", color: "#8899a6", img: "images/x-dm-n2.jpg" },
    d3: { name: "묘", handle: "@myomyom_", color: "#8899a6", img: "images/x-dm-n3.jpg" },
    d4: { name: "우연", handle: "@thethingabtlove", color: "#8899a6", img: "images/x-dm-n4.png" },
    d5: { name: "도리", handle: "@20160421_", color: "#8899a6", img: "images/x-dm-n5.jpg" },
    ask: { name: "질문함", handle: "@ask_box_", color: "#8899a6", img: "images/x-default.jpg" },
    qa: { name: "익명", handle: "@anon_say", color: "#8899a6", img: "images/x-default.jpg" },
    chill: { name: "Chilling", handle: "@chilling_off", color: "#8899a6", img: "images/x-black.jpg" },
    nyang: { name: "낭운이", handle: "@nyangyun_doll", color: "#8899a6", img: "images/x-a1.jpg" }
  },

  /* ---------- 게시물 ----------
     u      : 쓴 사람 (위 users 의 id, 내가 쓴 건 "me")
     time   : 올린 시간 글자
     feed   : 어느 탭에 보일지 ["rec"]=추천, ["fol"]=팔로잉
     media  : 사진 자리 { label:"설명", c1:"#색", c2:"#색" } (img:"images/..." 도 가능)
     quote  : 인용 게시물 { name, handle, text }
     replies: 답글 목록 (없으면 기본 답글이 나와요)
     quotes : 인용 목록
     pinned : true 면 프로필 맨 위에 고정
  */
  tweets: [
    {
      id: "t5", u: "me", time: "30초", feed: ["rec", "fol"], pinned: true, repliesOff: true,
      text: "먼저 걱정 끼쳐드려서 미안해요.\n\n기사에 나온 내용을 하나하나 말씀드리기는 조심스럽지만, 제가 가장 소중하게 생각하는 건 여러분과 함께 보낸 시간이라는 것만은 분명히 말하고 싶었어요.\n\n앞으로도 무대 위에서 더 좋은 모습으로 보답할게요. 늘 오래가자.",
      likes: 43200, rts: 12900, rep: 0, views: 1280000,
      replies: [],
      quotes: []
    },
    {
      id: "t4", u: "official", time: "50초", feed: ["rec", "fol"],
      text: "안녕하세요, LEO OFFICIAL입니다.\n\n금일 보도된 소속 아티스트 정택운 관련 내용에 대해 현재 사실관계를 확인 중입니다. 확인되는 대로 공식 입장을 안내드리겠습니다.\n\n아티스트의 사생활에 대한 무분별한 추측과 게시물 확산은 자제해 주시기를 부탁드립니다.",
      likes: 8920, rts: 6310, rep: 2480, views: 510000,
      replies: [
        { u: "moon",  time: "45초", text: "확인 중이라는 말만 몇 번째인지… 입장문 언제 나오나요?", likes: 912 },
        { u: "jun",   time: "40초", text: "팬들 마음도 좀 헤아려주세요. 무대응은 답이 아니에요", likes: 640 },
        { u: "yeon",  time: "35초", text: "일단 기다릴게요. 아티스트도 많이 힘들 거 같아요", likes: 388 },
        { u: "sora",  time: "30초", text: "악플 다는 분들은 제발 그만해주세요 ㅠㅠ", likes: 301 }
      ],
      quotes: [
        { u: "bomi", text: "또 '확인 중'…ㅜㅜ 이번엔 정말 정리된 말이 나오길" },
        { u: "ara",  text: "일단 공식 입장 나왔으니 다들 진정하고 기다려보자" }
      ]
    },
    {
      id: "r01", u: "f01", time: "1분", feed: ["rec"],
      text: "아니 연애를 한 게 죄도 아니고 기사로 강제 아웃팅 당한 게 존나 기괴함…",
      likes: 3120, rts: 1840, rep: 214, views: 64000
    },
    {
      id: "r02", u: "f02", time: "2분", feed: ["rec"],
      text: "미친 이게 무슨 일임 지금 내 눈이 이상한건가 아니 나 진짜 손떨려",
      likes: 2410, rts: 980, rep: 153, views: 41000
    },
    {
      id: "r03", u: "f03", time: "4분", feed: ["rec"],
      text: "시발 왜이렇게 다들 호들갑임; 게이인거 몰랐던 사람이 있었다는게 난 더 놀랍다ㅋㅋㅋㅋㅋ",
      likes: 4720, rts: 2210, rep: 402, views: 98000
    },
    {
      id: "r04", u: "f04", time: "6분", feed: ["rec"],
      text: "내가 꿈을 꾸고 있는 거겠지 제발 아니라고 해줘 기사 오보라고 해줘 열애설 터진건 둘째치고 일반인 남친은 진짜 궤가 다르잖아…. 나 지금 뇌정지 와서 아무것도 못함",
      likes: 1980, rts: 720, rep: 118, views: 33000
    },
    {
      id: "r05", u: "f05", time: "7분", feed: ["rec"],
      text: "덕질 10년차… 이젠 기자로 강제 아웃팅 당하는 것까지 실시간으로 보네ㅠㅠㅠㅋㅋㅋㅋ",
      likes: 2260, rts: 830, rep: 96, views: 37000
    },
    {
      id: "r06", u: "f06", time: "9분", feed: ["rec"],
      text: "그룹 전체에 게이 열애설 딱지 붙게 만든 거 멤버들한테 미안하지도 않냐? 이제 뭐만하면 게이 소리 들을텐데 존나싫음",
      likes: 1130, rts: 390, rep: 267, views: 52000
    },
    {
      id: "r07", u: "f07", time: "11분", feed: ["rec"],
      text: "지난달에 올린 커스텀 반지 사진 그거 협찬 아니었음?",
      quote: { name: "질문함", handle: "@ask_box_", text: "커스텀 반지 커플링이였나보네" },
      likes: 1840, rts: 602, rep: 88, views: 29000
    },
    {
      id: "r08", u: "f08", time: "12분", feed: ["rec"],
      text: "기사에서 아웃팅한 의도가 너무 뻔해서 소름 돋는데, 정작 소속사는 그거 통제도 못 하고 팬덤 전체를 이 꼴로 만든 게 진짜 무능함의 끝판왕이다.",
      likes: 5230, rts: 2480, rep: 331, views: 120000
    },
    {
      id: "r09", u: "f09", time: "14분", feed: ["rec"],
      text: "순덕이 아니라ㅆ 사리분별 못하고 무지성으로 욕하는 너네가 ㅁㅊ거임 이건 순덕을 떠나서 이제는 걍 애가 어떻게 될까 ㅈㄴ걱정된다 아웃팅 ㅈㅂ그만해 제발",
      quote: { name: "포근이", handle: "@cloud_gureum", text: "뭘 어떡해 강철멘탈인데 뭘 걱정하누\n대놓고 남친 자랑하고 다니는 오빤데 ㅋㅋㅋ" },
      likes: 3410, rts: 1520, rep: 204, views: 71000
    },
    {
      id: "r10", u: "f10", time: "16분", feed: ["rec"],
      text: "ㅈㅌㅇ 남친 계정이라고 도는 캡처 가짜임 퍼나르지마라",
      media: { img: "images/a10.jpg" },
      likes: 2870, rts: 1990, rep: 176, views: 64000
    },
    {
      id: "r11", u: "f11", time: "18분", feed: ["rec"],
      text: "난 모르겠다.. 연차 찰대로 찬 사람이니까 걍 행복하시길",
      likes: 1620, rts: 430, rep: 71, views: 26000
    },
    {
      id: "r12", u: "f12", time: "19분", feed: ["rec"],
      text: "탈덕합니다. 양도글 타래로 올릴 테니까 필요한 거 가져가세요.",
      likes: 902, rts: 610, rep: 45, views: 19000
    },
    {
      id: "r13", u: "chill", time: "20분", feed: ["rec"],
      text: "Close.",
      replies: [],
      likes: 120, rts: 12, rep: 0, views: 6400
    },
    {
      id: "r14", u: "nyang", time: "21분", feed: ["rec"],
      text: "인형 무산 안합니다.\n환불 원하시는분들은 따로 디엠으로 연락 부탁드려요.\n\nI will not be canceling the doll project. If you would like a refund, please contact me separately via DM.",
      quote: { name: "낭운이", handle: "@nyangyun_doll", text: "❥･• 10cm 냥운 인형 수요조사\n\n수요조사 기간 : 26.08.14 ~ 26.09.14 23:59\n타래에 인형 바디 및 촉감 참고🫶\n\n🔗tmm.im/d/0000" },
      likes: 1240, rts: 402, rep: 133, views: 31000
    },
    {
      id: "r15", u: "f13", time: "22분", feed: ["rec"],
      text: "사방에서 억까하는 거 진짜 기괴하다… 정탟욶 연차가 얼만데 사생활 좀 보장해줘라",
      likes: 1710, rts: 520, rep: 92, views: 28000
    },
    {
      id: "r16", u: "f14", time: "23분", feed: ["rec"],
      text: "당분간 트위터 안 들어옵니다. 그동안 함께 덕질해 주신 분들 감사했습니다. 계정은 조용히 정리하겠습니다. 다들 건강하세요.",
      likes: 980, rts: 230, rep: 61, views: 17000
    },
    {
      id: "r17", u: "f15", time: "23분", feed: ["rec"],
      text: "아 씨발...",
      quote: { name: "가상연예뉴스", handle: "@gasang_ent", text: "[단독] 보이그룹 VIXX 정택운, 일반인男와 열애설…“묵묵부답”\n\n※ "},
      likes: 902, rts: 12000, rep: 540, views: 380000
    },
    {
      id: "n0", u: "q1", time: "24분", feed: ["rec"],
      text: "일반인 남자라고???",
      likes: 2840, rts: 1210, rep: 486, views: 96000
    },
{
      id: "t3", u: "news", time: "24분", feed: ["rec"], repliesOff: true,
      text: "[단독] 인기 그룹 VIXX 레오, 지인과 심야 데이트 포착… 소속사 \"사실 확인 중\"\n\n※",
      media: { img: "images/a8.jpg" },
      likes: 5210, rts: 3890, rep: 0, views: 412000,
      quotes: [
        { u: "moon", text: "기사 진짜임…? 일단 입장 기다려본다" },
        { u: "mina", text: "아침부터 ㅈㄹ 난리났다 진짜 하…" }
      ]
    },
   
    {
      id: "n1", u: "q2", time: "3시간", feed: ["rec"],
      text: "실드 치는 애들 타래 보다가 열불 나서 비계로 피신함 ㅋㅋㅋ 기자한테 아웃팅 당한 건 안됐는데 그렇다고 팬들 앞에서 시침 뚝 떼고 모른 척했던 게 안 불쌍한 건 아니잖아?",
      likes: 1920, rts: 402, rep: 118, views: 41000
    },
    {
      id: "n2", u: "q3", time: "3시간", feed: ["rec"],
      text: "이유 설명할 생각도 없음. 그냥 더 이상 좋아할 수가 없어졌음.",
      likes: 3410, rts: 980, rep: 205, views: 67000
    },
    {
      id: "n3", u: "q4", time: "3시간", feed: ["rec"],
      text: "남자랑 사귀는 게 문제가 아니라 지금까지 쌓아온 이미지랑 팬들 기만한 게 문제라는 걸 모르는 사람들이 너무 많다고",
      likes: 2210, rts: 640, rep: 311, views: 48000
    },
    {
      id: "n4", u: "q5", time: "4시간", feed: ["rec"],
      text: "축하해 주지는 못해도 인간적으로 존중은 하자\n본인의사도 아닌데 아웃팅 당한거잖아..",
      likes: 6120, rts: 2840, rep: 402, views: 134000
    },
    {
      id: "n5", u: "q6", time: "4시간", feed: ["rec"],
      text: "실시간으로 팬덤 갈라지는 거 보니까 진ㄴ짜 ㅈㄴ속상하다 썅.. 좋아했던 사람 하나 때문에 서로를 이렇게까지 미워해야 하냐...",
      likes: 1740, rts: 288, rep: 96, views: 29000
    },
    {
      id: "n6", u: "q7", time: "4시간", feed: ["rec"],
      text: "상대방이 일반인인 만큼 더 조심해야 하는 거 아닌가",
      likes: 1530, rts: 402, rep: 120, views: 33000
    },
    {
      id: "n7", u: "q8", time: "5시간", feed: ["rec"],
      text: "아이돌은 공인이지만 상대방은 일반인임 정신차리자 이 사건에 끌려 들어온 것만으로도 이미 피해가 상당할 텐데.",
      likes: 4820, rts: 1904, rep: 236, views: 92000
    },
    {
      id: "n8", u: "q9", time: "5시간", feed: ["rec"],
      text: "뭐임?? ㅈㅌㅇ 머 터졌어요?",
      likes: 412, rts: 31, rep: 88, views: 14000
    },
    {
      id: "n9", u: "q10", time: "5시간", feed: ["rec"],
      text: "상대가 남자라는 게 이렇게까지 큰일인가",
      likes: 3050, rts: 820, rep: 264, views: 71000
    },
    {
      id: "n10", u: "q11", time: "6시간", feed: ["rec"],
      text: "10년 좋아했는데 이렇게 끝나네. 환불받을 수 있는 것도 아니고 참..",
      likes: 2640, rts: 512, rep: 177, views: 52000
    },
    {
      id: "n11", u: "q12", time: "6시간", feed: ["rec"],
      text: "Why is everyone acting like this is a crime? Let him live.",
      likes: 5310, rts: 2120, rep: 190, views: 118000
    },
    {
      id: "n12", u: "q13", time: "6시간", feed: ["rec"],
      text: "이게 지금 2026년이 맞냐 아웃팅 기사 터졌는데\n욕을 한다고? 심지어 상대가 일반인인데? 본인이 원한 관심도 아니잖아",
      likes: 7210, rts: 3102, rep: 540, views: 190000
    },
    {
      id: "n13", u: "q14", time: "7시간", feed: ["rec"],
      text: "ㄴㄴ 멤버 말고 옛날에 ㅈㅎ이라는 돌에서 일반된 사람 있었음 무관한 사람임 이 사람 아냐",
      card: { site: "Spin spin", title: "ㅈㅎ이라는 애들은 뭐냐? 와중에 알페스 처하냐? 수준", src: "spin-spin.com" },
      likes: 980, rts: 142, rep: 71, views: 21000
    },
    {
      id: "n14", u: "q15", time: "7시간", feed: ["rec"],
      text: "근데 일반인 남친 ㅈㅎ이라는 사람은 대체 누구임? \n걘 아이돌에서 일반인 된 사람 아님?",
      likes: 1210, rts: 98, rep: 164, views: 34000
    },
    {
      id: "n15", u: "q16", time: "8시간", feed: ["rec"],
      text: "내가 언제 신상을 털었음ㅋㅋㅋㅋㅋㅋ걱정도 못함? \n미친새끼들아",
      likes: 880, rts: 64, rep: 102, views: 17000
    },

    /* --- 팔로잉 탭 전용 (팔로우 중인 계정들) --- */
    {
      id: "m1", u: "haon", time: "2시간", feed: ["fol"],
      text: "우리애기드으으으으을~~~꿈에서 만나!!!! 🌙",
      likes: 18200, rts: 2300, rep: 1120, views: 402000
    },
    {
      id: "m2", u: "ian", time: "4시간", feed: ["fol"],
      text: "연습실 도착! 오늘도 같이 힘내요",
      media: { img: "images/a12.jpg" },
      likes: 12400, rts: 1400, rep: 702, views: 260000
    },
    {
      id: "m3", u: "sion", time: "6시간", feed: ["fol"],
      text: "횽아 힘내요~~",
      likes: 22100, rts: 3920, rep: 1802, views: 590000
    },

    /* --- 내 지난 게시물 (프로필 / 팔로잉 탭에서 보여요) --- */
    {
      id: "p2", u: "me", time: "2일", feed: ["fol"],
      text: "연습 끝 오늘도 고생했어 별빛뮤즈들 🌙",
      likes: 38200, rts: 7100, rep: 2204, views: 910000
    },
    {
      id: "p3", u: "me", time: "5일", feed: ["fol"],
      text: "새 앨범 작업 중… 아직 비밀 😶",
      media: { img: "images/a11.jpg" },
      likes: 51200, rts: 11200, rep: 3300, views: 1400000
    },
    {
      id: "p4", u: "me", time: "2주", feed: ["fol"],
      text: "생일 축하 메시지 전부 읽었어요. 정말 고마워요. 올해도 오래가자!",
      media: { img: "images/a9.jpg" },
      likes: 60400, rts: 14800, rep: 5120, views: 1900000
    }
  ],

  /* 기본 답글 / 인용 (답글이 따로 없는 게시물에 보여요) */
  defaultReplies: [
    { u: "ara",  time: "5분",  text: "ㅠㅠㅠ 진짜 공감", likes: 24 },
    { u: "nuri", time: "9분",  text: "나도 지금 이 상태임 ㅋㅋㅋ", likes: 17 },
    { u: "sora", time: "12분", text: "일단 다들 진정하고 공식 입장 기다리자", likes: 31 },
    { u: "bomi", time: "20분", text: "이 글 보고 조금 위로 됨", likes: 9 }
  ],
  defaultQuotes: [
    { u: "mina", text: "이 말 완전 공감해요" },
    { u: "yeon", text: "결국 기다리는 수밖에…" }
  ],

  /* 내가 단 답글 (프로필 > 답글 탭) */
  myReplies: [
    { to: "@mina_nova",  time: "3일", text: "고마워. 밥 꼭 챙겨 먹고 푹 자 🌙", likes: 12400 },
    { to: "@starlit_0412", time: "1주", text: "ㅋㅋㅋ 오늘 연습 열심히 했어~", likes: 9020 },
    { to: "@sora_nv",    time: "2주", text: "다음 콘서트에서 만나요!", likes: 15200 }
  ],

  /* ---------- 알림 ----------
     type : like / repost / follow / reply / mention / quote
     n    : 이 알림이 몇 개로 세어지는지 (읽지 않은 알림의 n 합계가 배지 숫자예요 → 멘션·답글 정리 후 12)
     ref  : 누르면 열릴 게시물 id */
  notifications: [
    { type: "like",    who: "pol",     more: "외 52명", text: "회원님의 게시물을 마음에 들어합니다", time: "5분", unread: true, n: 3, ref: "t5" },
    { type: "follow",  who: "nuri",    more: "외 13명", text: "회원님을 팔로우했습니다", time: "10분", unread: true, n: 2 },
    { type: "repost",  who: "mina",    more: "외 28명", text: "회원님의 게시물을 리포스트했습니다", time: "14분", unread: true, n: 2, ref: "t5" },
    { type: "like",    who: "haru",    more: "외 108명", text: "회원님의 답글을 마음에 들어합니다", time: "40분", unread: true, n: 3, ref: "t5" },
    { type: "quote",   who: "ara",     text: "팬들한테 직접 말하는 거 쉽지 않았을 텐데 고맙다", time: "1시간", unread: true, n: 2, ref: "t5" },

    { type: "like",    who: "sora",    more: "외 41명", text: "회원님의 게시물을 마음에 들어합니다", time: "어제", unread: false, ref: "p2" },
    { type: "follow",  who: "yeon",    more: "외 6명",  text: "회원님을 팔로우했습니다", time: "어제", unread: false },
    { type: "repost",  who: "pol",     more: "외 90명", text: "회원님의 게시물을 리포스트했습니다", time: "2일", unread: false, ref: "p3" }
  ],

  /* ---------- 쪽지(DM) ----------
     msgs 의 from : "them"(상대) / "me"(나)
     unread: true 면 받은 편지함에 파란 점이 떠요 (지금 24개 → 배지 24) */
  dms: [
    { u: "starlit", unread: true, time: "방금", msgs: [
      { from: "them", day: "오늘", time: "오전 7:05", text: "저 어제 입덕했는데 이거 진짜에요 오빠?" }
    ]},
    { u: "moon", unread: true, time: "7:03", msgs: [
      { from: "them", day: "오늘", time: "오전 7:01", text: "입장문 안 내시나요?" },
      { from: "them", time: "오전 7:03", text: "언제까지 무대응하실 건데요" }
    ]},
    { u: "d1", unread: true, time: "7:00", msgs: [
      { from: "them", day: "오늘", time: "오전 6:58", text: "짜굔이랑 사귀는게 아니였다고?" },
      { from: "them", time: "오전 6:59", text: "말도안돼" },
      { from: "them", time: "오전 7:00", text: "고영이짓잔뜩하더니 날 속였어.." }
    ]},
    { u: "pol", unread: true, time: "6:52", msgs: [
      { from: "them", day: "오늘", time: "오전 6:51", text: "저는 당신의 열혈팬입니다." },
      { from: "them", time: "오전 6:52", text: "당신이 매우 실망스럽습니다. 레오는 남자를 좋아하다" }
    ]},
    { u: "jun", unread: true, time: "6:40", msgs: [
      { from: "them", day: "오늘", time: "오전 6:40", text: "내 티켓 어쩔거임ㅆㅂ" }
    ]},
    { u: "mina", unread: true, time: "6:28", msgs: [
      { from: "them", day: "오늘", time: "오전 6:27", text: "그래도 오래 좋아했는데 이건 아니잖아.." },
      { from: "them", time: "오전 6:28", text: "조용히 만나기라도 하지 왜 이렇게까지 됐어..." }
    ]},
    { u: "d3", unread: true, time: "6:10", msgs: [
      { from: "them", day: "오늘", time: "오전 6:09", text: "왠지 모르게 감사하다.." },
      { from: "them", time: "오전 6:10", text: "혁이랑 오래오래 행복하세요" }
    ]},
    { u: "file", unread: true, time: "5:58", msgs: [
      { from: "them", day: "오늘", time: "오전 5:58", text: "그럴줄 알았다" }
    ]},
    { u: "haru", unread: true, time: "5:40", msgs: [
      { from: "them", day: "오늘", time: "오전 5:40", text: "탈덕 절대 안해요 마음 잘 추스리고 콘서트에서 봐요ㅠㅠㅠㅠㅜㅜ" }
    ]},
    { u: "d4", unread: true, time: "5:20", msgs: [
      { from: "them", day: "오늘", time: "오전 5:19", text: "저였어도 ㅅㅎ님이라는분이랑 결혼 생각 했을 것 같아요" },
      { from: "them", time: "오전 5:20", text: "잘 어울리세요.." }
    ]},
    { u: "q17", unread: true, time: "5:05", msgs: [
      { from: "them", day: "오늘", time: "오전 5:03", text: "택운님 혹시 단독 기사 보셨어요……? " },
      { from: "them", time: "오전 5:04", text: "보자마자 너무 놀라서 디엠드려요 ㅠㅠㅠㅠ" },
      { from: "them", time: "오전 5:05", text: "괜찮으세요……?" }
    ]},
    { u: "d2", unread: true, time: "4:50", msgs: [
      { from: "them", day: "오늘", time: "오전 4:49", text: "되게 잘 어울리세요" },
      { from: "them", time: "오전 4:50", text: "왜이렇게 기분이 날아갈 것 같지" }
    ]},
    { u: "q18", unread: true, time: "4:35", msgs: [
      { from: "them", day: "오늘", time: "오전 4:34", text: "그동안 팬들한테 바쁘다 피곤하다 할 때 뒤에서는 그러고 계셨던 거예요? " },
      { from: "them", time: "오전 4:35", text: "우리가 응원하고 앨범 사준 건 연애 맘 편히 하라고 보탠 게 아닌데요" }
    ]},
    { u: "q19", unread: true, time: "4:20", msgs: [
      { from: "them", day: "오늘", time: "오전 4:19", text: "팀 지키려고 이악물고 뛸 때 기사 메인에 게이 열애설 단독 뜨게 만드네ㅋㅋㅋㅋ 진짜 멤버들한테 안 미안해요? " },
      { from: "them", time: "오전 4:20", text: "팀 이미지는 어떡할 건데" }
    ]},
    { u: "q20", unread: true, time: "4:05", msgs: [
      { from: "them", day: "오늘", time: "오전 4:04", text: "이제 더 이상 응원할 마음은 안 드네요." },
      { from: "them", time: "오전 4:05", text: "그동안 좋은 추억 만들어줘서 고마웠어요. " }
    ]},
    { u: "q21", unread: true, time: "3:50", msgs: [
      { from: "them", day: "오늘", time: "오전 3:49", text: "택운아 기사 보고 너무 놀랐지… 본인 의지도 아닌데 강제로 밝혀져서 얼마나 무섭고 힘들었을까 " },
      { from: "them", time: "오전 3:50", text: "너무 죄책감 갖지 말고 밥 잘 챙겨 먹어… 별빛들은 항상 네 편이야." }
    ]},
    { u: "d5", unread: true, time: "3:30", msgs: [
      { from: "them", day: "오늘", time: "오전 3:28", text: "이 여우같은것." },
      { from: "them", time: "오전 3:29", text: "내가 짝사랑하던 오빠를 뺏어가?........" },
      { from: "them", time: "오전 3:30", text: "구미호 같은것" }
    ]},
    { u: "q22", unread: true, time: "3:15", msgs: [
      { from: "them", day: "오늘", time: "오전 3:14", text: "너가 잘못한거 하나도 없으니까 고개 숙이지 마" },
      { from: "them", time: "오전 3:15", text: "우리가 끝까지 지켜줄게" }
    ]},
    { u: "q23", unread: true, time: "3:00", msgs: [
      { from: "them", day: "오늘", time: "오전 2:58", text: "기사 뜬 거 사실이에요?" },
      { from: "them", time: "오전 2:59", text: "아니라고 한마디만 해주면 안 돼요? " },
      { from: "them", time: "오전 3:00", text: "지금 팬들 사방에서 비웃음 당하고 피눈물 흘리고 있는데 본인 입으로 해명 좀 해주세요 제발.." }
    ]},
    { u: "q24", unread: true, time: "2:45", msgs: [
      { from: "them", day: "오늘", time: "오전 2:45", text: "제발 버블 켜서 밥 잘 먹고 있다고 한마디만 해줘.." }
    ]},
    { u: "q25", unread: true, time: "2:30", msgs: [
      { from: "them", day: "오늘", time: "오전 2:27", text: "본인 연애 관리 하나 못 해서 사진 찍히고 " },
      { from: "them", time: "오전 2:28", text: "멤버들이 수년 동안 쌓아 올린 팀 커리어 한순간에 깎아먹은 건 진짜 너무한 거 아닌가요" },
      { from: "them", time: "오전 2:29", text: "택운님이 이러면 저희는 대체 누굴 믿어요" },
      { from: "them", time: "오전 2:30", text: "덕분에 헛돈 잘 썼다는 거 깨달았습니다" }
    ]},
    { u: "ara", unread: true, time: "1:50", msgs: [
      { from: "them", day: "오늘", time: "오전 1:42", text: "택운님 안녕하세요, 오랫동안 팬으로 지켜보다 처음 쪽지 드려요." },
      { from: "them", time: "오전 1:44", text: "데뷔 때부터 지금까지 무대 위의 모습만 봐 왔는데, 이번 일로 많이 놀랐어요. 솔직히 처음에는 배신감도 들었고, 하루 종일 일이 손에 안 잡혔어요." },
      { from: "them", time: "오전 1:46", text: "그런데 생각해 보니 제가 택운님한테 바라는 건 결국 행복하게 오래 노래해 주는 거더라고요. 사람은 누구나 사랑할 자유가 있는 건데 그걸 잠깐 잊고 있었어요." },
      { from: "them", time: "오전 1:48", text: "그래도 한 가지만 부탁드리고 싶어요. 소속사 입장문 말고, 도윤님의 말로 팬들에게 한 번만 더 이야기해 주세요. 길지 않아도 괜찮아요. 저희는 기다릴 수 있어요." },
      { from: "them", time: "오전 1:50", text: "마지막으로, 밥 꼭 챙겨 드시고 푹 주무세요. 늘 응원하겠습니다. 긴 글 읽어줘서 고마워요." }
    ]},
    { u: "nuri", unread: true, time: "어제", msgs: [
      { from: "them", day: "어제", time: "오후 11:07", text: "오빠 아니죠????" },
      { from: "them", time: "오후 11:08", text: "진짜 게이에요?" },
      { from: "them", time: "오후 11:09", text: "아니죠? 아니라고해" },
      { from: "them", time: "오후 11:10", text: "아니죠??" }
    ]},
    { u: "yeon", unread: true, time: "어제", msgs: [
      { from: "them", day: "어제", time: "오후 8:12", text: "너 때문에 내 인생 망했어" },
      { from: "them", time: "오후 8:13", text: "나랑 결혼하는 줄 알았는데" }
    ]}
  ],

  /* ---------- 검색 > 트렌드 ---------- */
  trends: [
    { cat: "대한민국 트렌드", tag: "#정택운_입장문", count: "게시물 12.4만 개" },
    { cat: "엔터테인먼트 · 트렌드", tag: "빅스 레오", count: "게시물 8.9만 개" },
    { cat: "대한민국 트렌드", tag: "#아웃팅", count: "게시물 3.2만 개" },
    { cat: "엔터테인먼트 · 트렌드", tag: "#정택운_힘내", count: "게시물 2.7만 개" },
    { cat: "대한민국 트렌드", tag: "별빛", count: "게시물 1.8만 개" },
    { cat: "엔터테인먼트 · 트렌드", tag: "VIXX 콘서트 양도", count: "게시물 9,802개" }
  ],

  disclaimer: "※ 가상 시뮬레이션 · 실제 인물/사건과 무관해요"
};
