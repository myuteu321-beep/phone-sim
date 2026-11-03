/* =========================================================
   kakao-data.js  —  카카오톡 앱의 모든 내용 (가상 시뮬레이션)
   ---------------------------------------------------------
   ※ 이 안의 인물과 대화는 모두 지어낸 내용이에요. 실제 인물과 관계없어요.
      대화 내용은 임시예요. 나중에 원하는 내용으로 통째로 바꾸면 돼요.

   고치는 방법
   - 따옴표 "" 안의 글자만 바꾸세요. 쉼표 , 는 지우지 마세요.
   - 말풍선 하나 = { } 한 덩어리. 복사해서 붙이면 늘어나고, 지우면 줄어요.
   - 사진 말풍선: k: "photo", from: "me"(내가 보냄) / "them"(상대가 보냄)
       지금은 색깔 상자로 표시돼요. 진짜 사진을 쓰려면 images 폴더에 올리고
       img: "images/파일이름.jpg" 를 한 줄 추가하세요.
   ========================================================= */

window.KAKAO_DATA = {

  /* ---------- 내 프로필 ---------- */
  me: { name: "정택운", status: "늘 오래가자", img: "images/kk-me.jpg", color: "#8a7be0" },

  /* ---------- 친구들 (id: 정보) ----------
     fav : true 면 즐겨찾기에 보여요 */
  friends: {
    jihyo: { name: "효기",   status: "오늘도 화이팅 💪", img: "images/kk-hyogi.jpg", color: "#e0709b", fav: true },
    haon:  { name: "V 학연",   status: "작업 중",         img: "images/kk-hakyeon.jpg", color: "#3b82a0" },
    ian:   { name: "V 재환",   status: "",                img: "images/kk-jaehwan.jpg", color: "#a05a3b" },
    dad:   { name: "아빠",   status: "",                color: "#6b7280" },
    mom:   { name: "엄마",   status: "우리 아들 밥 잘 챙겨 먹어", color: "#d98a4c" },
    sion:  { name: "우현",   status: "",                color: "#5a8f3b" },
    minseok: { name: "민석이", status: "🍜",             color: "#7a64c9" },
    dongseok: { name: "동석이형", status: "",             color: "#4f8f8b" }
  },

  /* 친구 목록에 보일 순서 (즐겨찾기는 따로 맨 위에 나와요) */
  order: ["haon", "ian", "dad", "mom", "sion", "minseok", "dongseok"],

  /* ---------- 채팅방 ----------
     f      : 친구 id
     unread : 안 읽은 메시지 개수 (맨 끝의 상대 메시지 N개가 안 읽은 메시지로 표시돼요)
     msgs   : k 가 "them"(상대) / "me"(나) / "day"(날짜 줄) / "photo"(사진)
  */
  chats: [
    {
      id: "c_haon", f: "haon", unread: 3,
      msgs: [
        { k: "day", text: "2026년 10월 12일 월요일" },
        { k: "them", text: "택운아 몸은 좀 어때?", time: "오후 7:10" },
        { k: "me", text: "괜찮아 많이 나았어", time: "오후 7:14" },
        { k: "me", text: "아플때마다 연락하려고?", time: "오후 7:15" },
        { k: "them", text: "ㅋㅋㅋㅋㅋ", time: "오후 7:19" },
        { k: "them", text: "걱정되니까 그렇지", time: "오후 7:20" },
        { k: "them", text: "아프지마", time: "오후 7:21" },
        { k: "me", text: "알겠어 고마워", time: "오후 7:25" },
        { k: "day", text: "2026년 10월 18일 일요일" },
        { k: "photo", from: "them", text: "", img: "images/a65.jpg", time: "오후 2:30" },
        { k: "them", text: "택운아 모기", time: "오후 2:31" },
        { k: "me", text: "와 대박ㅋㅋㅋㅋㅋ", time: "오후 2:35" },
        { k: "me", text: "엌떻게 찾엌ㅅ냐ㅋㅋㅋ", time: "오후 2:36" },
        { k: "them", text: "ㅋㅋㅋㅋㅋㅋ", time: "오후 2:40" },
        { k: "them", text: "안 따가웠어?", time: "오후 2:41" },
        { k: "them", text: "있는지도 몰랏ㅅ는뎈ㅋㅋㅋ", time: "오후 2:42" },
        { k: "them", text: "너 눈썰미 좋다", time: "오후 2:43" },
        { k: "me", text: "🤭🤭", time: "오후 2:47" },
        { k: "day", text: "2026년 10월 22일 목요일" },
        { k: "photo", from: "me", text: "", img: "images/a69.jpg", time: "오후 9:05" },
        { k: "me", text: "잘 나온다", time: "오후 9:06" },
        { k: "them", text: "오오 보고있어?", time: "오후 9:10" },
        { k: "them", text: "재밌었어?", time: "오후 9:11" },
        { k: "me", text: "응~", time: "오후 9:15" },
        { k: "me", text: "재밌더라", time: "오후 9:16" },
        { k: "them", text: "내 연기 어땠어", time: "오후 9:20" },
        { k: "me", text: "좋았어", time: "오후 9:24" },
        { k: "them", text: "좀 더 구체적으로", time: "오후 9:28" },
        { k: "me", text: "너무 좋았어", time: "오후 9:32" },
        { k: "them", text: "ㅋㅋㅋㅋ하", time: "오후 9:36" },
        { k: "them", text: "꽤 구체적인 답변했네", time: "오후 9:37" },
        { k: "them", text: "수고했어", time: "오후 9:38" },
        { k: "me", text: "응ㅋㅋㅋㅋㅋ", time: "오후 9:42" },
        { k: "day", text: "2026년 10월 27일 화요일" },
        { k: "me", text: "너 혁이랑 있어?", time: "오후 6:20" },
        { k: "them", text: "나?? 아니?", time: "오후 6:24" },
        { k: "me", text: "그래?", time: "오후 6:28" },
        { k: "them", text: "왜?", time: "오후 6:32" },
        { k: "me", text: "전에 형 보러 간다고 말했었는데", time: "오후 6:36" },
        { k: "me", text: "난 너 보러 간줄 알았는데", time: "오후 6:37" },
        { k: "them", text: "나나 재환이 보러 가는거였으면", time: "오후 6:41" },
        { k: "them", text: "너랑 같이 가지 않았을까?", time: "오후 6:42" },
        { k: "me", text: "그치?", time: "오후 6:46" },
        { k: "me", text: "그니까", time: "오후 6:47" },
        { k: "them", text: "그래~ 곧 연락주겠지", time: "오후 6:51" },
        { k: "photo", from: "me", text: "", img: "images/a68.jpg", time: "오후 6:55" },
        { k: "me", text: "이재환 보러간거 맞았ㅅ어", time: "오후 6:56" },
        { k: "me", text: "나쁜넘", time: "오후 6:57" },
        { k: "them", text: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋ", time: "오후 7:01" },
        { k: "them", text: "혁이 혼나야겠네~", time: "오후 7:02" },
        { k: "me", text: "ㅠ", time: "오후 7:06" },
        { k: "me", text: "혼내야지 진짜", time: "오후 7:07" },
        { k: "me", text: "만나면 혼내줘 너도", time: "오후 7:08" },
        { k: "them", text: "그럼그럼 혼내야지", time: "오후 7:12" },
        { k: "day", text: "2026년 11월 2일 월요일" },
        { k: "them", text: "운아 SNS나 다른곳 들어가지 말고 연락 보면 바로 나한테 전화해", time: "오전 6:59" },
        { k: "them", text: "회사랑 얘기하기 전까지 누구한테도 따로 해명하지 말고", time: "오전 7:00" },
        { k: "them", text: "아니면 지금 바로 혁이랑 갈게", time: "오전 7:01" }
      ]
    },
    {
      id: "c_ian", f: "ian", unread: 3,
      msgs: [
        { k: "day", text: "2026년 10월 6일 화요일" },
        { k: "them", text: "형", time: "오후 11:10" },
        { k: "them", text: "횽아", time: "오후 11:11" },
        { k: "photo", from: "them", text: "", img: "images/a61.jpg", time: "오후 11:12" },
        { k: "them", text: "오고싶어 죽겠지 아주?ㅋㅋ", time: "오후 11:13" },
        { k: "me", text: "ㅋㅋㅋ뭐 만드르어", time: "오후 11:17" },
        { k: "me", text: "팟ㅜㅡ타?", time: "오후 11:18" },
        { k: "them", text: "아 형", time: "오후 11:22" },
        { k: "them", text: "술 마셨어요???", time: "오후 11:23" },
        { k: "them", text: "ㅡㅡ", time: "오후 11:24" },
        { k: "them", text: "ㅡㅡ", time: "오후 11:25" },
        { k: "them", text: "놀러온다면서!!!!!!!", time: "오후 11:26" },
        { k: "them", text: "몇시까지마셔요???", time: "오후 11:27" },
        { k: "me", text: "나 세수", time: "오후 11:31" },
        { k: "me", text: "시", time: "오후 11:32" },
        { k: "me", text: "세시", time: "오후 11:33" },
        { k: "them", text: "취했네", time: "오후 11:37" },
        { k: "them", text: "아 진짜ㅠㅍ", time: "오후 11:38" },
        { k: "them", text: "데리러 갈까요?", time: "오후 11:39" },
        { k: "them", text: "혀엉 바빠요?", time: "오후 11:40" },
        { k: "them", text: "찾아간다", time: "오후 11:41" },
        { k: "them", text: "진짜 찾아간다!!!", time: "오후 11:42" },
        { k: "them", text: "어딘지 알 것 같네.. 갈게요ㅡㅡ;", time: "오후 11:43" },
        { k: "day", text: "2026년 10월 7일 수요일" },
        { k: "them", text: "일어났어요?", time: "오전 11:20" },
        { k: "them", text: "보는대로 연락해요", time: "오전 11:21" },
        { k: "me", text: "미ㅣ안 나 지금 전화가 안돼", time: "오전 11:25" },
        { k: "me", text: "술 이렇게 많이 마실줄 몰랐어ㅠㅠ", time: "오전 11:26" },
        { k: "them", text: "할 말 그것뿐이에요?", time: "오전 11:30" },
        { k: "them", text: "내가 어제 형 얼마나 기다렸는데요", time: "오전 11:31" },
        { k: "them", text: "너무해", time: "오전 11:32" },
        { k: "me", text: "미안해..ㅠㅠ", time: "오전 11:36" },
        { k: "me", text: "내일 만날까?", time: "오전 11:37" },
        { k: "them", text: "넹!!!!!!!", time: "오전 11:41" },
        { k: "me", text: "응 끝나면 연락해", time: "오전 11:45" },
        { k: "them", text: "넹😘😘😍😍", time: "오전 11:49" },
        { k: "day", text: "2026년 10월 13일 화요일" },
        { k: "me", text: "재환아", time: "오후 8:15" },
        { k: "me", text: "집에 있어?", time: "오후 8:16" },
        { k: "them", text: "넹", time: "오후 8:20" },
        { k: "them", text: "왜용~~~~~~", time: "오후 8:21" },
        { k: "them", text: "형 제가 정택운으로 삼행시해줄게욯ㅎㅎ", time: "오후 8:22" },
        { k: "them", text: "어제 새벽에 뭐할까 생각했는데", time: "오후 8:23" },
        { k: "them", text: "혁이는 너무 어렵곸ㅋㅋㅋ", time: "오후 8:24" },
        { k: "me", text: "그만", time: "오후 8:28" },
        { k: "them", text: "눼", time: "오후 8:32" },
        { k: "me", text: "나 놀러가도 돼?", time: "오후 8:36" },
        { k: "them", text: "헐 웬일로요???", time: "오후 8:40" },
        { k: "them", text: "오데욤☺☺☺", time: "오후 8:41" },
        { k: "me", text: "알겠어 갈때 뭐 사갈까?", time: "오후 8:45" },
        { k: "them", text: "아", time: "오후 8:49" },
        { k: "them", text: "아놔 잠만 형", time: "오후 8:50" },
        { k: "them", text: "한상혁한테 거절당해서 온거에요?", time: "오후 8:51" },
        { k: "them", text: "하 진짜 웬일인가 했다......ㅡㅡ;;;", time: "오후 8:52" },
        { k: "me", text: "ㅋㅋㅋㅋ아니 어떻게 알았어;", time: "오후 8:56" },
        { k: "me", text: "너 보고싶어서 가는것도 있지", time: "오후 8:57" },
        { k: "me", text: "문 열어놔", time: "오후 8:58" },
        { k: "them", text: "쳇 넹", time: "오후 9:02" },
        { k: "day", text: "2026년 10월 16일 금요일" },
        { k: "photo", from: "them", text: "", img: "images/a62.jpg", time: "오후 5:40" },
        { k: "them", text: "미쳤다 그쵸ㅋㅋㅋ", time: "오후 5:41" },
        { k: "them", text: "이 멋진그뉵 오뜨칼거야어뜨칼꺼양", time: "오후 5:42" },
        { k: "me", text: "오ㅋㅋㅋ", time: "오후 5:46" },
        { k: "me", text: "근데 근육 별로 없는데?", time: "오후 5:47" },
        { k: "them", text: "아~거참 이제 시작이잖아요", time: "오후 5:51" },
        { k: "them", text: "혁이보다 더 커진다.이제", time: "오후 5:52" },
        { k: "them", text: "음하하하 놀라지마라😁😁😁", time: "오후 5:53" },
        { k: "me", text: "그래~화이팅", time: "오후 5:57" },
        { k: "them", text: "형 운동하러안와요???", time: "오후 6:01" },
        { k: "them", text: "같이해요", time: "오후 6:02" },
        { k: "me", text: "근육 너무 붙어서 당분간 쉴거야", time: "오후 6:06" },
        { k: "them", text: "ㅜㅜㅜㅜㅜㅜ아왱", time: "오후 6:10" },
        { k: "them", text: "알겠떠염ㅜㅜ", time: "오후 6:11" },
        { k: "me", text: "ㅋㅋㅋㅋ오냐 쉬어", time: "오후 6:15" },
        { k: "them", text: "넹", time: "오후 6:19" },
        { k: "day", text: "2026년 10월 19일 월요일" },
        { k: "photo", from: "them", text: "", img: "images/a60.jpg", time: "오후 10:05" },
        { k: "me", text: "오 뭐ㅑ야", time: "오후 10:09" },
        { k: "them", text: "어떤데ㅋㅋㅋ", time: "오후 10:13" },
        { k: "them", text: "대박이죠", time: "오후 10:14" },
        { k: "them", text: "대박", time: "오후 10:15" },
        { k: "them", text: "대애애앵박 재화니완전대박", time: "오후 10:16" },
        { k: "me", text: "말해주기 싫네", time: "오후 10:20" },
        { k: "them", text: "아", time: "오후 10:24" },
        { k: "them", text: "ㅡㅡ", time: "오후 10:25" },
        { k: "them", text: "ㅡㅡ;;;;", time: "오후 10:26" },
        { k: "them", text: "빨리ㅃㄹㅃㄹ어떤데재환이어떤데", time: "오후 10:27" },
        { k: "me", text: "멋지네", time: "오후 10:31" },
        { k: "them", text: "오예", time: "오후 10:35" },
        { k: "me", text: "ㅋㅋㅋㅋㅋ", time: "오후 10:39" },
        { k: "them", text: "저 요새 러닝도 해요", time: "오후 10:43" },
        { k: "me", text: "진짜?", time: "오후 10:47" },
        { k: "me", text: "갑자기 운동 많이하네", time: "오후 10:48" },
        { k: "me", text: "작품 들어가?", time: "오후 10:49" },
        { k: "them", text: "그냥여~~~", time: "오후 10:53" },
        { k: "them", text: "절대 혁이 옆에 서있으니까 비참해져서라곤 못하죠ㅋ", time: "오후 10:54" },
        { k: "me", text: "ㅋㅋㅋㅋㅋㅋ", time: "오후 10:58" },
        { k: "me", text: "혁이가 크긴하지", time: "오후 10:59" },
        { k: "them", text: "어차피 제가 더 커질거라서요", time: "오후 11:03" },
        { k: "them", text: "기대해요", time: "오후 11:04" },
        { k: "me", text: "그래", time: "오후 11:08" },
        { k: "day", text: "2026년 10월 24일 토요일" },
        { k: "them", text: "재화니만두먹는중", time: "오후 9:30" },
        { k: "them", text: "버블안되니까너ㅜ머너무너누심시매여", time: "오후 9:31" },
        { k: "them", text: "이거 형 집 근처 동동에서 산건데 먹었어요??? 진짜 맛집임대박이야", time: "오후 9:32" },
        { k: "me", text: "재환아", time: "오후 9:36" },
        { k: "me", text: "혹시 너희집에 내 시계 있어?", time: "오후 9:37" },
        { k: "them", text: "..", time: "오후 9:41" },
        { k: "me", text: "바쁘면 내일 봐줘도 돼", time: "오후 9:45" },
        { k: "me", text: "뮤지컬 잘 끝났어?", time: "오후 9:46" },
        { k: "them", text: "이제 집 도착해서 한번 볼게요", time: "오후 9:50" },
        { k: "them", text: "전 비록 모든말을 씹혔지만", time: "오후 9:51" },
        { k: "them", text: "제 만두와 저는 울고있지만", time: "오후 9:52" },
        { k: "me", text: "미안", time: "오후 9:56" },
        { k: "me", text: "너무 정신없어서..", time: "오후 9:57" },
        { k: "me", text: "맛있겠네 다음에 가볼게", time: "오후 9:58" },
        { k: "them", text: "넹~~~", time: "오후 10:02" },
        { k: "them", text: "어디뒀어요? 기억나요?", time: "오후 10:03" },
        { k: "me", text: "혹시 서랍에 있어?", time: "오후 10:07" },
        { k: "me", text: "너거랑 착각했나 싶어서", time: "오후 10:08" },
        { k: "them", text: "서랍없어여", time: "오후 10:12" },
        { k: "them", text: "아래쪽위쪽", time: "오후 10:13" },
        { k: "them", text: "옆쪽밑쪽", time: "오후 10:14" },
        { k: "them", text: "반대쪽 천장쪽", time: "오후 10:15" },
        { k: "them", text: "다없음!!!", time: "오후 10:16" },
        { k: "them", text: "와 제 사진 찾았어요 여깄었네", time: "오후 10:17" },
        { k: "them", text: "형 제 학생시절 사진 봤어요??", time: "오후 10:18" },
        { k: "them", text: "크으으으ㅏㄱㅊ학창시절에 장난아니였는데", time: "오후 10:19" },
        { k: "them", text: "형 저 만났으면 바로 기절각ㅋㅋㅋ", time: "오후 10:20" },
        { k: "them", text: "장난", time: "오후 10:21" },
        { k: "me", text: "재환아", time: "오후 10:25" },
        { k: "me", text: "시그러워", time: "오후 10:26" },
        { k: "them", text: "ㅋㅋㅋㅋㅋㅋㅋ", time: "오후 10:30" },
        { k: "them", text: "시그러워여?", time: "오후 10:31" },
        { k: "me", text: "조용해", time: "오후 10:35" },
        { k: "them", text: "글인데요???", time: "오후 10:39" },
        { k: "them", text: "어떻게 조용하지", time: "오후 10:40" },
        { k: "me", text: "아니야..", time: "오후 10:44" },
        { k: "me", text: "찾아봐줘서 고마워 내가 어디 두고왔나보다", time: "오후 10:45" },
        { k: "them", text: "힝 안 찾은곳도 많은데", time: "오후 10:49" },
        { k: "them", text: "한번 찾아볼게여", time: "오후 10:50" },
        { k: "me", text: "응 고마워", time: "오후 10:54" },
        { k: "them", text: "네~~~~", time: "오후 10:58" },
        { k: "day", text: "2026년 10월 28일 수요일" },
        { k: "me", text: "야", time: "오후 11:50" },
        { k: "them", text: "넴?", time: "오후 11:54" },
        { k: "them", text: "네~~~~", time: "오후 11:55" },
        { k: "them", text: "네???", time: "오후 11:56" },
        { k: "them", text: "저 또 뭐 잘못했어요?ㅠㅠㅠㅜ..", time: "오후 11:57" },
        { k: "me", text: "너 혁이랑 있어?", time: "오후 12:01" },
        { k: "them", text: "??", time: "오후 12:05" },
        { k: "them", text: "넹", time: "오후 12:06" },
        { k: "them", text: "왜요?", time: "오후 12:07" },
        { k: "me", text: "너", time: "오후 12:11" },
        { k: "me", text: "아냐", time: "오후 12:12" },
        { k: "them", text: "???", time: "오후 12:16" },
        { k: "them", text: "뭔데요??", time: "오후 12:17" },
        { k: "me", text: "아냐..", time: "오후 12:21" },
        { k: "me", text: "나중에", time: "오후 12:22" },
        { k: "them", text: "넴..", time: "오후 12:26" },
        { k: "them", text: "형 저 필요해요? 갈까요?", time: "오후 12:27" },
        { k: "me", text: "아니", time: "오후 12:31" },
        { k: "them", text: "넹ㅠ", time: "오후 12:35" },
        { k: "day", text: "2026년 11월 2일 월요일" },
        { k: "them", text: "형 괜찮아요?", time: "오전 7:01" },
        { k: "them", text: "뭐라고 해야할지 모르겠어요..", time: "오전 7:02" },
        { k: "them", text: "우선 일어나면 연락해요", time: "오전 7:03" }
      ]
    },
    {
      id: "c_jihyo", f: "jihyo", unread: 3,
      msgs: [
        { k: "day", text: "2026년 10월 5일 월요일" },
        { k: "photo", from: "them", text: "팔 사진", c1: "#d9b8a0", c2: "#7a4a3a", img: "images/chat-hand.jpg", time: "오후 7:20" },
        { k: "me", text: "핏줄대박", time: "오후 7:21" },
        { k: "them", text: "모기물렸어요ㅜ", time: "오후 7:22" },
        { k: "them", text: "예?", time: "오후 7:23" },
        { k: "me", text: "아 그렇네", time: "오후 7:24" },
        { k: "me", text: "미안ㅋㅋㅋ", time: "오후 7:25" },
        { k: "me", text: "간지럽겠다", time: "오후 7:26" },
        { k: "them", text: "이봐요 ㅡㅡ;;", time: "오후 7:30" },
        { k: "them", text: "사진 저장한거 아니죠?", time: "오후 7:31" },
        { k: "them", text: "변태가 따로 없네", time: "오후 7:32" },
        { k: "me", text: "저장안햇ㅅ어", time: "오후 7:33" },
        { k: "me", text: "날 뭘로 보고", time: "오후 7:34" },
        { k: "them", text: "변태고양이", time: "오후 7:35" },
        { k: "me", text: "아니라거", time: "오후 7:36" },
        { k: "them", text: "ㅋㅋㅋㅋ", time: "오후 7:40" },
        { k: "them", text: "저녁은요?", time: "오후 7:41" },
        { k: "them", text: "형들이랑 먹어요?", time: "오후 7:42" },
        { k: "me", text: "아니 너랑 먹으려고", time: "오후 7:43" },
        { k: "them", text: "된다고 안했는데?", time: "오후 7:44" },
        { k: "me", text: "또 장난치지", time: "오후 7:45" },
        { k: "them", text: "안통하네..", time: "오후 7:46" },
        { k: "them", text: "오래 만나긴 했나봐요", time: "오후 7:50" },
        { k: "me", text: "그래서 싫어?", time: "오후 7:51" },
        { k: "me", text: "오래 봐서 질려?", time: "오후 7:52" },
        { k: "them", text: "헐~ 아녀", time: "오후 7:53" },
        { k: "me", text: "전화 왜 안받아", time: "오후 7:54" },
        { k: "me", text: "어ㅐ", time: "오후 7:55" },
        { k: "me", text: "왜", time: "오후 7:56" },
        { k: "them", text: "오래 보면 질릴까봐~", time: "오후 8:00" },
        { k: "me", text: "아 진짜", time: "오후 8:01" },
        { k: "them", text: "ㅋㅋㅋㅋㅋㅋㅋㅋ", time: "오후 8:02" },
        { k: "them", text: "아재밌다", time: "오후 8:03" },
        { k: "them", text: "통화", time: "오후 8:04" },
        { k: "day", text: "2026년 10월 9일 금요일" },
        { k: "me", text: "바보", time: "오후 3:10" },
        { k: "them", text: "심심하신가봐", time: "오후 3:11" },
        { k: "them", text: "안 바빠요?", time: "오후 3:12" },
        { k: "me", text: "심심한거 알면 좀 놀러와..", time: "오후 3:13", rp: { to: "효기", text: "안 바빠요?" } },
        { k: "me", text: "나보다 더 바빠", time: "오후 3:14" },
        { k: "me", text: "바보야", time: "오후 3:15" },
        { k: "me", text: "바보보바보ㅗ", time: "오후 3:16" },
        { k: "them", text: "안 놀아준다고 엿날린다고요?", time: "오후 3:20" },
        { k: "them", text: "애인한테 너무하네", time: "오후 3:21" },
        { k: "me", text: "이때만 답장 빠르지", time: "오후 3:22" },
        { k: "me", text: "실스야", time: "오후 3:23" },
        { k: "me", text: "놀자", time: "오후 3:24" },
        { k: "them", text: "아우", time: "오후 3:25" },
        { k: "them", text: "민석이형은요", time: "오후 3:26" },
        { k: "me", text: "남자친구 앞에서 외간남자 이름을 거내", time: "오후 3:30" },
        { k: "me", text: "꺼내", time: "오후 3:31" },
        { k: "them", text: "뭘 거내요", time: "오후 3:32", rp: { to: "나", text: "꺼내" } },
        { k: "me", text: "이재환싫러", time: "오후 3:33" },
        { k: "them", text: "ㅋㅋㅋㅋㅋㅋ", time: "오후 3:34" },
        { k: "them", text: "흠", time: "오후 3:35" },
        { k: "them", text: "가야하는 이유는요?", time: "오후 3:36" },
        { k: "me", text: "나 너 애인이야..ㅠㅠ", time: "오후 3:40" },
        { k: "me", text: "형 보러오는거면 충분하지", time: "오후 3:41" },
        { k: "them", text: "😅", time: "오후 3:42" },
        { k: "me", text: "아 빨리", time: "오후 3:43" },
        { k: "me", text: "로랑이도 너 보고싶대", time: "오후 3:44" },
        { k: "them", text: "ㅋㅋㅋㅋ어떻게 아는데요", time: "오후 3:45" },
        { k: "me", text: "난 느낄 수 있지", time: "오후 3:46" },
        { k: "me", text: "너도 나 보고싶지?", time: "오후 3:50" },
        { k: "them", text: "커피는 보고싶긴한데", time: "오후 3:51" },
        { k: "me", text: "커피?", time: "오후 3:52" },
        { k: "me", text: "너 또 놀리지", time: "오후 3:53" },
        { k: "them", text: "로랑이보다 커피가 더 잘 어울려요", time: "오후 3:54" },
        { k: "them", text: "커피 보러가야겠다", time: "오후 3:55" },
        { k: "me", text: "아 오지마", time: "오후 3:56" },
        { k: "them", text: "ㅋㅋㅋ아 왜요", time: "오후 4:00" },
        { k: "them", text: "형", time: "오후 4:01" },
        { k: "me", text: "왜", time: "오후 4:02" },
        { k: "them", text: "형 보고싶은데", time: "오후 4:03" },
        { k: "me", text: "오든가", time: "오후 4:04" },
        { k: "them", text: "넵~^^", time: "오후 4:05" },
        { k: "day", text: "2026년 10월 13일 화요일" },
        { k: "me", text: "너 프사뭐냐?", time: "오후 8:40" },
        { k: "them", text: "예?", time: "오후 8:41", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "지워라지니짜", time: "오후 8:42" },
        { k: "them", text: "뭐가요 뭘요?", time: "오후 8:43", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "나랑 대화하고ㅓ잇잖아", time: "오후 8:44" },
        { k: "them", text: "너와 함께~~~", time: "오후 8:45", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "하지맟라고", time: "오후 8:46" },
        { k: "me", text: "그리고 그거 락교바디 노래잖아ㅋㅋㅋㅋ", time: "오후 8:50" },
        { k: "me", text: "바보야", time: "오후 8:51" },
        { k: "them", text: "아", time: "오후 8:52", av: { img: "images/kk-tiger.jpg" } },
        { k: "them", text: "헷갈렸다", time: "오후 8:53", av: { img: "images/kk-tiger.jpg" } },
        { k: "them", text: "원하는건 다 줄 수 있잖아 뭘 원해~~", time: "오후 8:54", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "바꿔라", time: "오후 8:55" },
        { k: "them", text: "뭘 바꿔요", time: "오후 8:56", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "너 집에 안경 두고갔지", time: "오후 9:00" },
        { k: "them", text: "헐", time: "오후 9:01", av: { img: "images/kk-tiger.jpg" } },
        { k: "them", text: "제 안경 거기있었어요?", time: "오후 9:02", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "응", time: "오후 9:03" },
        { k: "them", text: "뭘 원해", time: "오후 9:04", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "카턱 바꾸라고", time: "오후 9:05" },
        { k: "them", text: "넌 날 믿어 oh", time: "오후 9:06", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "오ㅐ 이럼 ", time: "오후 9:10" },
        { k: "me", text: "집에 놓고간 안경 내꺼다", time: "오후 9:11" },
        { k: "them", text: "아 너무하시네", time: "오후 9:12", av: { img: "images/kk-tiger.jpg" } },
        { k: "them", text: "애인을 이렇게 대해도 돼요?", time: "오후 9:13", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "넌 지금 그게 할말이야?", time: "오후 9:14" },
        { k: "them", text: "됐어요?", time: "오후 9:15", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "ㅋㅋㅋ어", time: "오후 9:16" },
        { k: "me", text: "안경 잘 쓸게", time: "오후 9:20" },
        { k: "them", text: "흠 무슨 프사해볼까", time: "오후 9:21", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "아 장난이자나..", time: "오후 9:22" },
        { k: "them", text: "ㅋㅋㅋㅋㅋㅋ", time: "오후 9:23", av: { img: "images/kk-tiger.jpg" } },
        { k: "them", text: "언제 가지러 갈까요", time: "오후 9:24", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "오늘", time: "오후 9:25" },
        { k: "them", text: "오늘?", time: "오후 9:26", av: { img: "images/kk-tiger.jpg" } },
        { k: "them", text: "수요일에 갈게여", time: "오후 9:30", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "왜에", time: "오후 9:31" },
        { k: "me", text: "수요일 안돼", time: "오후 9:32" },
        { k: "them", text: "오케이 수요일에 봐요", time: "오후 9:33", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "아니 안된다고ㅜㅜ", time: "오후 9:34" },
        { k: "them", text: "왜여", time: "오후 9:35", av: { img: "images/kk-tiger.jpg" } },
        { k: "them", text: "약속?", time: "오후 9:36", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "민석이 형 만나", time: "오후 9:40" },
        { k: "them", text: "뭐야 싫다면서요", time: "오후 9:41", av: { img: "images/kk-tiger.jpg" } },
        { k: "them", text: "하여간 깍쟁이", time: "오후 9:42", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "ㅋㅋㅋㅋㅋㅋㅋ", time: "오후 9:43" },
        { k: "me", text: "야 형한테깍쟁이ㅣㅜ가뭐야", time: "오후 9:44" },
        { k: "them", text: "그럼 바보네", time: "오후 9:45", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "너밖에 모르는?", time: "오후 9:46" },
        { k: "them", text: "그냥 바보", time: "오후 9:50", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "야", time: "오후 9:51" },
        { k: "them", text: "🦁", time: "오후 9:52", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "하..", time: "오후 9:53" },
        { k: "them", text: "형", time: "오후 9:54", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "왜", time: "오후 9:55" },
        { k: "them", text: "귀엽게 대답해봐요", time: "오후 9:56", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "갑자기?", time: "오후 10:00" },
        { k: "them", text: "네", time: "오후 10:01", av: { img: "images/kk-tiger.jpg" } },
        { k: "them", text: "너무 딱딱하잖아요", time: "오후 10:02", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "왜에에", time: "오후 10:03" },
        { k: "them", text: "ㅋㅋㅋㅋ귀여운거에요?", time: "오후 10:04", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "하라며", time: "오후 10:05" },
        { k: "me", text: "안귀여워?", time: "오후 10:06" },
        { k: "them", text: "네 귀엽네요", time: "오후 10:10", av: { img: "images/kk-tiger.jpg" } },
        { k: "them", text: "갑자기 보고싶네", time: "오후 10:11", av: { img: "images/kk-tiger.jpg" } },
        { k: "them", text: "집으로 갈게요~", time: "오후 10:12", av: { img: "images/kk-tiger.jpg" } },
        { k: "me", text: "뭐래", time: "오후 10:13" },
        { k: "me", text: "뭐야? 진짜 와?", time: "오후 10:14" },
        { k: "me", text: "???", time: "오후 10:15" },
        { k: "day", text: "2026년 10월 17일 토요일" },
        { k: "them", text: "이상하다", time: "오후 6:30" },
        { k: "them", text: "정택운 왜 연락이 없지", time: "오후 6:31" },
        { k: "them", text: "두시간씩 오던 찡찡이 어디갔지", time: "오후 6:32" },
        { k: "me", text: "찡찡이가 뭐야..", time: "오후 6:33" },
        { k: "me", text: "너한테 이제 안하거든", time: "오후 6:34" },
        { k: "them", text: "누구한테 하는데요?", time: "오후 6:35" },
        { k: "them", text: "질투나요", time: "오후 6:36" },
        { k: "me", text: "진짜?", time: "오후 6:40" },
        { k: "them", text: "네", time: "오후 6:41" },
        { k: "me", text: "진짜 질투나?", time: "오후 6:42" },
        { k: "them", text: "ㅋㅋㅋㅋ아니 뭘 물어봐요?", time: "오후 6:43" },
        { k: "me", text: "아니 넌 티를 안내니까", time: "오후 6:44" },
        { k: "me", text: "아무튼 다른 사람 아니고 바빴어..", time: "오후 6:45" },
        { k: "them", text: "못 믿겠는데요", time: "오후 6:46" },
        { k: "them", text: "사진 보내봐요", time: "오후 6:50" },
        { k: "photo", from: "me", text: "방 사진", c1: "#c9c2b6", c2: "#6a6358", img: "images/chat-room.jpg", time: "오후 6:51" },
        { k: "me", text: "나 진짜 아무도 안ㅁㅆ어", time: "오후 6:52" },
        { k: "them", text: "누가 뽀뽀한거 아니에요?", time: "오후 6:53" },
        { k: "them", text: "자국 있는지 확인해야겠는데", time: "오후 6:54" },
        { k: "them", text: "얼굴 사진 보내봐요", time: "오후 6:55" },
        { k: "photo", from: "me", text: "얼굴 사진", c1: "#d8c3b0", c2: "#6b5444", img: "images/chat-mark.jpg", time: "오후 6:56" },
        { k: "me", text: "된거야?", time: "오후 7:00" },
        { k: "me", text: "뽀뽀를 너 아니면 왜 받아", time: "오후 7:01" },
        { k: "me", text: "자국없어", time: "오후 7:02" },
        { k: "them", text: "ㅋㅋㅋㅋㅋ", time: "오후 7:03" },
        { k: "them", text: "귀엽네요 형", time: "오후 7:04" },
        { k: "me", text: "뭐가?", time: "오후 7:05" },
        { k: "them", text: "아니에요~", time: "오후 7:06" },
        { k: "them", text: "바쁜거 언제 끝나는데요", time: "오후 7:10" },
        { k: "me", text: "곧", time: "오후 7:11" },
        { k: "me", text: "나 보러올거야?", time: "오후 7:12" },
        { k: "me", text: "아니다 오랜만에 내가 갈게", time: "오후 7:13" },
        { k: "me", text: "너 너무 자주 왔다 바쁠텐데..", time: "오후 7:14" },
        { k: "them", text: "제가 보고싶으니까 가는거죠", time: "오후 7:15" },
        { k: "them", text: "기다릴게요~", time: "오후 7:16" },
        { k: "me", text: "응ㅎㅎ", time: "오후 7:20" },
        { k: "day", text: "2026년 10월 21일 수요일" },
        { k: "photo", from: "me", text: "사진", c1: "#b9c4d4", c2: "#3e4c66", img: "images/chat-nothink.jpg", time: "오후 9:05" },
        { k: "them", text: "??", time: "오후 9:06" },
        { k: "them", text: "잘 나왔다고요?", time: "오후 9:07" },
        { k: "me", text: "이 사진 보고 아무 생각 안들어?", time: "오후 9:08" },
        { k: "them", text: "뭔 생각이요?", time: "오후 9:09" },
        { k: "them", text: "설마 지금 질투한다고 올려둔거에요??", time: "오후 9:10" },
        { k: "them", text: "읽고 대답안하는거봐", time: "오후 9:11" },
        { k: "them", text: "여보세요", time: "오후 9:15" },
        { k: "them", text: "또 사진 지우러 갔네", time: "오후 9:16" },
        { k: "me", text: "아니거든", time: "오후 9:17" },
        { k: "them", text: "형", time: "오후 9:18" },
        { k: "them", text: "무슨 남도 아니고 재환이형 상대로 질투를 해요", time: "오후 9:19" },
        { k: "them", text: "가족같은 사이라더니..", time: "오후 9:20" },
        { k: "them", text: "애초에 우리 둘이 뭔 접점이 있는데요?;;", time: "오후 9:21" },
        { k: "me", text: "만나잖아", time: "오후 9:25" },
        { k: "me", text: "약속가면 둘만 만나고", time: "오후 9:26" },
        { k: "them", text: "아 어이없어..", time: "오후 9:27" },
        { k: "them", text: "형은 매일 붙어있으면서", time: "오후 9:28" },
        { k: "them", text: "진짜 뭐하자는거지 이 형", time: "오후 9:29" },
        { k: "me", text: "모", time: "오후 9:30" },
        { k: "me", text: "아니 사진 찍는건 그렇다쳐도", time: "오후 9:31" },
        { k: "me", text: "너무 꽉 안고 있으니까..", time: "오후 9:35" },
        { k: "them", text: "아이고", time: "오후 9:36" },
        { k: "them", text: "알겠어요", time: "오후 9:37" },
        { k: "them", text: "이제 누구 안기만 해봐라", time: "오후 9:38" },
        { k: "me", text: "아니", time: "오후 9:39" },
        { k: "me", text: "나는 스킨십이 원래 많잖아ㅠ", time: "오후 9:40" },
        { k: "them", text: "형", time: "오후 9:41" },
        { k: "them", text: "사진에서 지금 제가 뭘 하고 있어요", time: "오후 9:45" },
        { k: "them", text: "가만히 서있잖아요", time: "오후 9:46" },
        { k: "me", text: "나랑 찍을때도 저러면서", time: "오후 9:47" },
        { k: "them", text: "전에 뽀뽀사진 찍었잖아", time: "오후 9:48" },
        { k: "me", text: "기억안나", time: "오후 9:49" },
        { k: "me", text: "다시 찍자", time: "오후 9:50" },
        { k: "them", text: "거절합니다", time: "오후 9:51" },
        { k: "me", text: "ㅠ", time: "오후 9:55" },
        { k: "day", text: "2026년 10월 25일 일요일" },
        { k: "them", text: "새벽부터 바쁘네 우리형", time: "오전 7:15" },
        { k: "them", text: "반쯤 눈 감겨있는거 아니에요?", time: "오전 7:16" },
        { k: "photo", from: "me", text: "사진", c1: "#a9b3c4", c2: "#36425a", img: "images/chat-tired.jpg", time: "오전 7:17" },
        { k: "me", text: "피ㅣㄱㄴ해", time: "오전 7:18" },
        { k: "them", text: "ㅋㅋㅋㅋㅋㅋ", time: "오전 7:19" },
        { k: "me", text: "저장라지마", time: "오전 7:20" },
        { k: "them", text: "이미 했는데요?", time: "오전 7:21" },
        { k: "me", text: "지워", time: "오전 7:25" },
        { k: "them", text: "흠", time: "오전 7:26" },
        { k: "me", text: "ㅡㅡ", time: "오전 7:27" },
        { k: "day", text: "2026년 10월 29일 목요일" },
        { k: "photo", from: "them", text: "사진", c1: "#c8d0da", c2: "#4a5668", img: "images/chat-manage.jpg", time: "오후 10:20" },
        { k: "them", text: "관리하는 남자 어때요", time: "오후 10:21" },
        { k: "them", text: "형 오면 좋아할 것 같은데", time: "오후 10:22" },
        { k: "me", text: "가고싶다..", time: "오후 10:23" },
        { k: "me", text: "보고싶어", time: "오후 10:24" },
        { k: "them", text: "저도염", time: "오후 10:25" },
        { k: "them", text: "바쁘죠ㅠ", time: "오후 10:26" },
        { k: "me", text: "응..ㅠㅠ", time: "오후 10:30" },
        { k: "me", text: "다음주에 시간돼", time: "오후 10:31" },
        { k: "them", text: "시간될때 연락해요", time: "오후 10:32" },
        { k: "them", text: "형 보러갈 시간은 언제든지 있어요", time: "오후 10:33" },
        { k: "me", text: "ㅠㅠㅠㅜ", time: "오후 10:34" },
        { k: "me", text: "사랑해 려가", time: "오후 10:35" },
        { k: "them", text: "려기 누군데", time: "오후 10:36", rp: { to: "나", text: "사랑해 려가" } },
        { k: "me", text: "혁이", time: "오후 10:40" },
        { k: "me", text: "혁이라고 혀기 알면서", time: "오후 10:41" },
        { k: "them", text: "ㅋㅋㅋㅋㅋㅋㅋ", time: "오후 10:42" },
        { k: "them", text: "사랑해요", time: "오후 10:43" },
        { k: "me", text: "나두❤", time: "오후 10:44" },
        { k: "day", text: "2026년 11월 2일 월요일" },
        { k: "them", text: "형", time: "오전 6:50" },
        { k: "them", text: "괜찮아요?", time: "오전 6:56" },
        { k: "them", text: "저는 괜찮으니까 형부터 챙겨요 보면 연락 꼭 하고요", time: "오전 6:57" }
      ]
    }

  ],

  /* =========================================================
     효기 채팅방 선택지 (메시지 입력창을 누르면 뜨는 선택지)
     ---------------------------------------------------------
     choices : 선택지 목록 (한 개 또는 두 개)
       label   : 버튼에 보이는 글자
       me      : 선택하면 내가 보내는 말 (없으면 보내지 않아요)
       replies : 효기가 이어서 보내는 답장들 (말풍선 하나 = 한 줄)
       script  : me/replies 대신, 나와 효기가 번갈아 주고받는 대화를
                 순서대로 적고 싶을 때 써요.
                 { me: "내가 보내는 말" }  /  { them: "효기가 보내는 말" }
       next    : 대화가 끝난 뒤 또 뜨는 다음 선택지 (없으면 null)
     선택지가 모두 끝나면 입력창은 평소처럼 직접 타이핑할 수 있어요.
     ========================================================= */
  choiceFlow: {
    /* ===== 재환 채팅방 (입력창을 누르면 선택지가 떠요) ===== */
    ian: {
      choices: [

        /* ----- 첫 번째 - 위 ----- */
        {
          label: "걱정해줘서 고마워",
          me: "걱정해줘서 고마워",
          replies: ["아니에요 마음 잘 추스려요 형"],
          next: {
            choices: [
              { label: "응 보고싶어", me: "응 보고싶어",
                replies: [
                  "저한테 미리 말이라도 해주지 그랬어요..",
                  "제가 형 좋아하는 거 몰랐으니까 그랬던 거겠죠",
                  "알아도 달라지는 건 없었겠지만",
                  "형 힘들때 이런말 하기 싫은데",
                  "그래도 저는 형이 누구 만나는지, 누구 좋아하는지 하나하나 신경 쓰면서 지냈는데",
                  "왜 하필 상혁이예요..",
                  "진짜 이런식으로 고백하기 싫었는데.."
                ],
                next: null },
              { label: "보고싶지 우리 동생인데", me: "보고싶지 우리 동생인데",
                replies: [
                  "그쵸 형 동생이죠ㅎㅎ..",
                  "저도 형 보고싶어요",
                  "저 지금은 조금 정신 없어서요",
                  "기다리고 있으면 곧 갈게요",
                  "형은 아무 데도 가지 말고 있어요."
                ],
                next: {
                  auto: true,   /* 입력창을 안 눌러도 저절로 떠요 */
                  choices: [ { label: "재환의 애정이 위험한 방향으로 기울었습니다.", final: true } ]
                } }
            ]
          }
        },

        /* ----- 첫 번째 - 아래 ----- */
        {
          label: "보고싶어 재환아",
          me: "보고싶어 재환아",
          replies: ["저 보고싶어요?"],
          next: {
            choices: [
              { label: "응 보고싶어", me: "응 보고싶어",
                replies: [
                  "저한테 미리 말이라도 해주지 그랬어요..",
                  "제가 형 좋아하는 거 몰랐으니까 그랬던 거겠죠",
                  "알아도 달라지는 건 없었겠지만",
                  "형 힘들때 이런말 하기 싫은데",
                  "그래도 저는 형이 누구 만나는지, 누구 좋아하는지 하나하나 신경 쓰면서 지냈는데",
                  "왜 하필 상혁이예요..",
                  "진짜 이런식으로 고백하기 싫었는데.."
                ],
                next: null },
              { label: "보고싶지 우리 동생인데", me: "보고싶지 우리 동생인데",
                replies: [
                  "그쵸 형 동생이죠ㅎㅎ..",
                  "저도 형 보고싶어요",
                  "저 지금은 조금 정신 없어서요",
                  "기다리고 있으면 곧 갈게요",
                  "형은 아무 데도 가지 말고 있어요."
                ],
                next: {
                  auto: true,
                  choices: [ { label: "재환의 애정이 위험한 방향으로 기울었습니다.", final: true } ]
                } }
            ]
          }
        }
      ]
    },

    jihyo: {
      choices: [

        /* ===== 첫 번째 선택지 - 위 ===== */
        {
          label: "너 왜 이렇게 늦게 연락해?",
          me: "너 왜 이렇게 늦게 연락해?",
          replies: [
            "정신 없어서 조금 늦었어요",
            "아까부터 전화도 계속 오고 연락도 많이 와서요..",
            "형 괜찮아요?",
            "회사에서 연락 왔어요?",
            "형이 감당해야 할 게 너무 많아진 것 같아요"
          ],
          /* 두 번째 선택지 (두 개) */
          next: {
            choices: [

              /* ----- 두 번째 - 위 : 관계 부담 ----- */
              {
                label: "이런 일 생기니까 갑자기 우리 관계 부담스러워 진 거 아니고?",
                me: "이런 일 생기니까 갑자기 우리 관계 부담스러워 진 거 아니고?",
                replies: [
                  "물어보는 게 아니라",
                  "형이 그렇게 생각 하나 보네"
                ],
                /* 세 번째 선택지 (두 개) */
                next: {
                  choices: [

                    /* 싸우시겠습니까? */
                    {
                      label: "싸우시겠습니까?",
                      script: [
                        { me: "무슨 뜻이야?" },
                        { them: "형은 제가 후회 할 거라고 생각하고 있잖아요" },
                        { them: "아니면 나랑 계속 만나는 게 힘들어졌어요?" },
                        { me: "그런 식으로 말하지 마" },
                        { me: "어떻게 해야 할지 모르겠어서 그래" },
                        { them: "형 혼자 결론 내리지 말라고요" },
                        { them: "어려운 거 아니잖아.." },
                        { them: "먼저 포기할까 봐 무서운 건 저예요" },
                        { me: "나 하나 때문에 네 인생까지 바뀌는 거 원하지 않아" },
                        { me: "혁아.." },
                        { them: "그냥 저랑 계속 만나고 싶다고 말해주면 안돼요?" }
                      ],
                      next: null
                    },

                    /* 화해하시겠습니까? */
                    {
                      label: "화해하시겠습니까?",
                      script: [
                        { me: "미안해.. 내가 잠깐 겁이 났었나 봐." },
                        { me: "네 마음 아는데 불안해서 그랬어" },
                        { them: "저도 괜찮은 척 하는 거예요" },
                        { them: "형까지 힘들까 봐" },
                        { them: "사랑하는 거 알아요 몰라요" },
                        { me: "알아.." },
                        { me: "목소리 듣고 싶어" },
                        { them: "듣기만 하게요?" },
                        { them: "갈게요" }
                      ],
                      next: null
                    }
                  ]
                }
              },

              /* ----- 두 번째 - 아래 : 신중했으면 ----- */
              {
                label: "내가 조금만 더 신중했으면 이런 일 없었을 텐데..",
                me: "내가 조금만 더 신중했으면 이런 일 없었을 텐데..",
                replies: [
                  "이미 일어난 일이잖아요",
                  "그리고 누가 후회라도 한대요?"
                ],
                /* 세 번째 선택지 (한 개) */
                next: {
                  choices: [
                    {
                      label: "고마워.. 보고싶어",
                      me: "고마워.. 보고싶어",
                      replies: [
                        "제가 보러 갈게요",
                        "앞으로 저한테 잘해주세요",
                        "저도 형한테 잘할게요"
                      ],
                      next: null
                    }
                  ]
                }
              }
            ]
          }
        },

        /* ===== 첫 번째 선택지 - 아래 ===== */
        {
          label: "혁아 너 괜찮아?",
          me: "혁아 너 괜찮아?",
          replies: [
            "전 괜찮아요",
            "형 정신 없을 텐데..",
            "이상한 연락 오면 다 무시해요"
          ],
          /* 두 번째 선택지 (한 개) */
          next: {
            choices: [
              {
                label: "고마워.. 보고싶어.",
                me: "고마워.. 보고싶어.",
                replies: [
                  "얼마나 보고 싶은데요ㅋㅋ",
                  "우리애기 안아주러 가야겠네"
                ],
                next: null
              }
            ]
          }
        }

      ]
    }
  }
};
