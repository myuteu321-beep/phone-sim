/* =========================================================
   kakao.js  —  카카오톡 앱 동작
   내용(친구, 대화)은 data/kakao-data.js 에서 바꿔요. 이 파일은 고칠 일이 거의 없어요.
   ========================================================= */

(function () {
  "use strict";

  var D = window.KAKAO_DATA, Apps = window.Apps, Phone = window.Phone;
  var R, els = {}, tab = "friends", stack = [];

  var P = {
    friends: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z"/>',
    chat:    '<path d="M12 3C6.5 3 2 6.6 2 11c0 2.5 1.4 4.7 3.6 6.1L4.5 21l4.3-2.3c1 .2 2 .3 3.2.3 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/>',
    more:    '<circle cx="5" cy="12" r="1.7" fill="currentColor"/><circle cx="12" cy="12" r="1.7" fill="currentColor"/><circle cx="19" cy="12" r="1.7" fill="currentColor"/>',
    search:  '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/>',
    back:    '<path d="M15 4l-8 8 8 8"/>',
    plus:    '<path d="M12 5v14M5 12h14"/>',
    menu:    '<path d="M4 7h16M4 12h16M4 17h16"/>',
    star:    '<path d="M12 3l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8z"/>',
    send:    '<path d="M3 11l18-8-8 18-2-8z"/>',
    gift:    '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 13h18M12 8c-3 0-5-1-5-3s3-2 5 3c2-5 5-5 5-3s-2 3-5 3z"/>'
  };
  function ic(n, o) {
    o = o || {};
    return '<svg class="kk-ic" viewBox="0 0 24 24" fill="' + (o.fill || "none") + '" stroke="currentColor" stroke-width="' + (o.sw || 1.9) +
      '" stroke-linecap="round" stroke-linejoin="round">' + P[n] + "</svg>";
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function person(id) { return id === "me" ? D.me : (D.friends[id] || { name: id, color: "#888" }); }
  /* 프로필 사진: 사진이 있으면 사진, 없으면 카카오톡 기본 프로필(회색 사람 모양) */
  var SILHOUETTE = '<svg viewBox="0 0 24 24" width="72%" height="72%" fill="#fff"><circle cx="12" cy="9" r="4"/><path d="M4.5 21c0-4.2 3.3-6.6 7.5-6.6s7.5 2.4 7.5 6.6z"/></svg>';
  function av(id, s, sq) {
    var u = person(id);
    var rad = sq ? "border-radius:" + Math.round(s * 0.38) + "px;" : "border-radius:50%;";
    var st = "width:" + s + "px;height:" + s + "px;" + rad;
    if (u.img) return '<span class="kk-av" style="' + st + "background-image:url('" + esc(u.img) + "')\"></span>";
    return '<span class="kk-av def" style="' + st + '">' + SILHOUETTE + "</span>";
  }
  /* 말풍선 하나만 다른 프로필 사진을 쓰고 싶을 때: av: { color: "#7b6cf0", emoji: "🦁" } (또는 img: "images/파일.jpg") */
  function altAv(a, s) {
    var st = "width:" + s + "px;height:" + s + "px;border-radius:" + Math.round(s * 0.38) + "px;";
    if (a.img) return '<span class="kk-av" style="' + st + "background-image:url('" + esc(a.img) + "')\"></span>";
    return '<span class="kk-av alt" style="' + st + "background:" + (a.color || "#888") + '">' + esc(a.emoji || "") + "</span>";
  }
  /* 답장 말풍선 위에 붙는 인용: rp: { to: "효기", text: "안 바빠요?" } → "효기에게 답장" */
  function rpHTML(m) {
    if (!m.rp) return "";
    return '<span class="kk-rp"><b>' + esc(m.rp.to) + "에게 답장</b><span>" + esc(m.rp.text) + "</span></span>";
  }
  /* 상대가 보낸 메시지인지 (사진은 from: "me" 가 아니면 상대가 보낸 것) */
  function isThem(m) { return !!m && (m.k === "them" || (m.k === "photo" && m.from !== "me")); }
  function isMine(m) { return !!m && (m.k === "me" || (m.k === "photo" && m.from === "me")); }
  function nowTime() {
    var n = new Date(), h = n.getHours(), mi = n.getMinutes();
    return (h < 12 ? "오전 " : "오후 ") + (h % 12 === 0 ? 12 : h % 12) + ":" + (mi < 10 ? "0" + mi : mi);
  }
  function chatOf(f) { for (var i = 0; i < D.chats.length; i++) if (D.chats[i].f === f) return D.chats[i]; return null; }
  function lastMsg(c) {
    for (var i = c.msgs.length - 1; i >= 0; i--) if (c.msgs[i].k !== "day") return c.msgs[i];
    return null;
  }
  function total() { return D.chats.reduce(function (a, c) { return a + (c.unread || 0); }, 0); }

  /* 홈 화면 아이콘 / 탭의 빨간 숫자 */
  function badges() {
    var n = total();
    var txt = n > 999 ? "999+" : n;
    if (els.tabBadge) { els.tabBadge.textContent = txt; els.tabBadge.style.display = n ? "flex" : "none"; }
    var icon = document.querySelector('.app-ico[data-app="kakao"]');
    if (icon) {
      var b = icon.querySelector(".app-badge");
      if (!b) { b = document.createElement("i"); b.className = "app-badge"; icon.appendChild(b); }
      b.textContent = txt; b.style.display = n ? "flex" : "none";
    }
  }

  /* ---------- 뼈대 ---------- */
  function build(root) {
    R = root;
    R.classList.add("kk-app");
    R.innerHTML =
      '<div class="kk-panels">' +
        '<div class="kk-panel on" data-p="friends"></div>' +
        '<div class="kk-panel" data-p="chats"></div>' +
      "</div>" +
      '<div class="kk-nav">' +
        '<button data-t="friends" class="on">' + ic("friends", { fill: "currentColor", sw: 0 }) + "<span>친구</span></button>" +
        '<button data-t="chats">' + ic("chat", { fill: "currentColor", sw: 0 }) + '<span>채팅</span><i class="kk-badge" id="kk-tab-badge"></i></button>' +
      "</div>" +
      '<div class="kk-ovs"></div>';
    els.panels = { friends: R.querySelector('[data-p="friends"]'), chats: R.querySelector('[data-p="chats"]') };
    els.ovs = R.querySelector(".kk-ovs");
    els.tabBadge = R.querySelector("#kk-tab-badge");

    R.querySelector(".kk-nav").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-t]");
      if (!b) return;
      closeAll();
      showTab(b.getAttribute("data-t"));
    });
    R.addEventListener("click", onClick);
    renderFriends();
    renderChats();
    badges();
  }

  function showTab(t) {
    tab = t;
    els.panels.friends.classList.toggle("on", t === "friends");
    els.panels.chats.classList.toggle("on", t === "chats");
    var bs = R.querySelectorAll(".kk-nav button");
    for (var i = 0; i < bs.length; i++) bs[i].classList.toggle("on", bs[i].getAttribute("data-t") === t);
    if (t === "chats") renderChats();
    badges();
  }

  /* ---------- 위에 쌓이는 화면 ---------- */
  function push(html, cls) {
    var o = document.createElement("div");
    o.className = "kk-ov " + (cls || "");
    o.innerHTML = html;
    els.ovs.appendChild(o);
    void o.offsetWidth;
    o.classList.add("in");
    stack.push(o);
    var sc = o.querySelectorAll(".kk-scroll");
    for (var i = 0; i < sc.length; i++) Apps.dragScroll(sc[i]);
    return o;
  }
  function pop() {
    var o = stack.pop();
    if (!o) return;
    o.classList.remove("in");
    setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); }, 300);
    if (!stack.length) { renderChats(); badges(); }
    updateTheme();
  }
  function closeAll() { while (stack.length) pop(); }

  /* 프로필 화면은 어두운 배경이라 상태바를 흰색으로 */
  function updateTheme() {
    if (Apps.current() !== "kakao") return;
    var top = stack[stack.length - 1];
    var dark = !!(top && top.classList.contains("kk-profile"));
    document.getElementById("phone").setAttribute("data-theme", dark ? "dark" : "light");
  }

  /* =======================================================
     친구 탭
  ======================================================= */
  function friendRow(id) {
    var f = person(id);
    return '<button class="kk-fr" data-a="profile" data-id="' + id + '">' + av(id, 44, true) +
      '<span class="kk-fr-t"><b>' + esc(f.name) + "</b></span>" +
      (f.status ? '<span class="kk-fr-s">' + esc(f.status) + "</span>" : "") + "</button>";
  }
  function renderFriends() {
    var favs = Object.keys(D.friends).filter(function (k) { return D.friends[k].fav; });
    var rest = D.order.filter(function (k) { return !D.friends[k].fav; });
    els.panels.friends.innerHTML =
      '<div class="kk-top"><div class="kk-top-in"><b>친구</b><div class="kk-top-r">' +
        '<button data-a="toast" data-m="친구 검색은 준비 중이에요">' + ic("search") + "</button>" +
        '<button data-a="toast" data-m="친구 추가는 준비 중이에요">' + ic("plus") + "</button>" +
        '<button data-a="toast" data-m="설정은 준비 중이에요">' + ic("menu") + "</button></div></div></div>" +
      '<div class="kk-scroll">' +
        '<button class="kk-me" data-a="profile" data-id="me">' + av("me", 56, true) +
          '<span class="kk-fr-t"><b>' + esc(D.me.name) + "</b><small>" + esc(D.me.status) + "</small></span></button>" +
        '<div class="kk-sec">즐겨찾기 <em>' + favs.length + "</em></div>" + favs.map(friendRow).join("") +
        '<div class="kk-sec">친구 <em>' + rest.length + "</em></div>" + rest.map(friendRow).join("") +
        '<div class="kk-endpad"></div></div>';
    Apps.dragScroll(els.panels.friends.querySelector(".kk-scroll"));
  }

  /* 친구 프로필 */
  function openProfile(id) {
    var f = person(id);
    var me = id === "me";
    var o = push(
      '<div class="kk-pf-bg"></div>' +
      '<button class="kk-pf-x" data-a="back">' + ic("plus", { sw: 2.2 }).replace('class="kk-ic"', 'class="kk-ic" style="transform:rotate(45deg)"') + "</button>" +
      '<div class="kk-pf-c">' + av(id, 104, true) + "<b>" + esc(f.name) + "</b><p>" + esc(f.status || "") + "</p></div>" +
      '<div class="kk-pf-b"><button data-a="chat" data-id="' + id + '">' + ic("chat", { fill: "#fff", sw: 0 }) + "<span>" + (me ? "나와의 채팅" : "1:1 채팅") + "</span></button>" +
      (me ? '<button data-a="toast" data-m="프로필 편집은 준비 중이에요">' + ic("menu") + "<span>프로필 편집</span></button>"
          : '<button data-a="toast" data-m="통화 기능은 준비 중이에요">' + ic("gift") + "<span>선물하기</span></button>") + "</div>",
      "kk-profile");
    updateTheme();
    return o;
  }

  /* =======================================================
     채팅 탭
  ======================================================= */
  function renderChats() {
    var list = D.chats.map(function (c) {
      var f = person(c.f), m = lastMsg(c);
      var prev = !m ? "" : m.k === "photo" ? "사진" : (m.k === "me" && m.sending ? "" : m.text);
      return '<button class="kk-ch" data-a="chat" data-id="' + c.f + '">' + av(c.f, 52, true) +
        '<span class="kk-ch-b"><b>' + esc(f.name) + '</b><span class="kk-ch-p">' + esc(prev) + "</span></span>" +
        '<span class="kk-ch-r"><small>' + esc(m ? m.time : "") + "</small>" +
        (c.unread ? '<i class="kk-cnt">' + (c.unread > 999 ? "999+" : c.unread) + "</i>" : "") + "</span></button>";
    }).join("");
    els.panels.chats.innerHTML =
      '<div class="kk-top"><div class="kk-top-in"><b>채팅</b><div class="kk-top-r">' +
        '<button data-a="toast" data-m="채팅 검색은 준비 중이에요">' + ic("search") + "</button>" +
        '<button data-a="toast" data-m="새 채팅은 준비 중이에요">' + ic("chat") + "</button>" +
        '<button data-a="toast" data-m="설정은 준비 중이에요">' + ic("menu") + "</button></div></div></div>" +
      '<div class="kk-scroll">' + (list || '<div class="kk-empty">채팅이 없어요</div>') + '<div class="kk-endpad"></div></div>';
    Apps.dragScroll(els.panels.chats.querySelector(".kk-scroll"));
  }

  /* =======================================================
     채팅방
  ======================================================= */
  function bubbleHTML(m, f, prev) {
    if (m.k === "day") return '<div class="kk-day"><span>' + esc(m.text) + "</span></div>";
    var body = m.k === "photo"
      ? (m.img
          ? '<div class="kk-ph" style="background-image:url(\'' + esc(m.img) + '\');background-size:cover;background-position:center"></div>'
          : '<div class="kk-ph" style="background:linear-gradient(150deg,' + (m.c1 || "#8aa") + "," + (m.c2 || "#345") + ')">' + esc(m.text || "사진") + "</div>")
      : '<div class="kk-bb">' + rpHTML(m) + esc(m.text) + "</div>";
    if (isMine(m)) {
      return '<div class="kk-row me">' + '<span class="kk-meta">' + (m.read === false ? "<i>1</i>" : "") + esc(m.time || "") + "</span>" + body + "</div>";
    }
    // 같은 사람이 연속으로 보낸 메시지는 프로필/이름을 한 번만
    var first = !isThem(prev);
    return '<div class="kk-row them' + (first ? " first" : "") + '">' +
      (first ? '<span class="kk-row-av">' + (m.av ? altAv(m.av, 40) : av(f, 40, true)) + "</span>" : '<span class="kk-row-av sp"></span>') +
      '<div class="kk-row-b">' + (first ? '<span class="kk-nm">' + esc(person(f).name) + "</span>" : "") +
      '<div class="kk-bw">' + body + '<span class="kk-meta">' + esc(m.time || "") + "</span></div></div></div>";
  }

  function openChat(f) {
    var c = chatOf(f);
    if (!c) {                                    // 대화가 없는 친구는 빈 채팅방을 새로 만들어요
      c = { id: "c_" + f, f: f, unread: 0, msgs: [], _empty: true };
      D.chats.unshift(c);
    }
    var unread = c.unread || 0;
    var html = "", prev = null, divAt = -1;
    // 안 읽은 메시지 시작 위치 계산
    var themIdx = [];
    c.msgs.forEach(function (m, i) { if (m.k === "them") themIdx.push(i); });
    if (unread > 0 && themIdx.length >= unread) divAt = themIdx[themIdx.length - unread];
    c.msgs.forEach(function (m, i) {
      if (i === divAt) html += '<div class="kk-unread"><span>여기까지 읽으셨습니다</span></div>';
      html += bubbleHTML(m, f, prev);
      if (m.k !== "day") prev = m; else prev = null;
    });
    var name = f === "me" ? D.me.name : person(f).name;
    var o = push(
      '<div class="kk-ch-h"><button class="kk-back" data-a="back">' + ic("back", { sw: 2.2 }) + "</button>" +
        '<b>' + esc(name) + (f === "me" ? "" : "") + "</b>" +
        '<div class="kk-top-r"><button data-a="toast" data-m="검색은 준비 중이에요">' + ic("search") + '</button><button data-a="toast" data-m="메뉴는 준비 중이에요">' + ic("menu") + "</button></div></div>" +
      '<div class="kk-scroll kk-chatbody" data-room="' + c.id + '">' + (html || '<div class="kk-empty light">대화를 시작해 보세요</div>') + "</div>" +
      '<div class="kk-in"><button data-a="toast" data-m="첨부는 준비 중이에요">' + ic("plus", { sw: 2.2 }) + "</button>" +
      '<input type="text" placeholder="메시지 입력" data-in="' + c.id + '">' +
      '<button class="kk-send" data-a="send" data-id="' + c.id + '">' + ic("send", { fill: "currentColor", sw: 0 }) + "</button></div>",
      "kk-room");
    var body = o.querySelector(".kk-chatbody");
    setTimeout(function () { body.scrollTop = body.scrollHeight; }, 320);
    var inp = o.querySelector("input");
    inp.addEventListener("input", function () { o.querySelector(".kk-send").classList.toggle("on", !!inp.value.trim()); });
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.isComposing) { e.preventDefault(); send(o.querySelector(".kk-send")); }
    });
    setupFlow(o, c);
    // 읽음 처리 (목록의 숫자는 방에서 나올 때 사라져요)
    c.unread = 0;
    badges();
    return o;
  }


  /* =======================================================
     선택지 대화 (지효 채팅방)
     내용은 data/kakao-data.js 의 choiceFlow 에서 바꿔요.
  ======================================================= */
  var flow = {};   // 친구id → { node: 지금 보여줄 선택지, busy: 답장 오는 중 }
  function flowOf(f) {
    if (!D.choiceFlow || !D.choiceFlow[f]) return null;
    if (!flow[f]) flow[f] = { node: D.choiceFlow[f], busy: false };
    return flow[f];
  }
  function roomBody(c) { return R.querySelector('[data-room="' + c.id + '"]'); }

  function setupFlow(o, c) {
    var st = flowOf(c.f);
    if (!st || !st.node) return;                  // 선택지가 없거나 모두 끝났으면 평소처럼 타이핑
    var inp = o.querySelector("input");
    inp.readOnly = true;                           // 키보드 대신 선택지가 뜨게
    inp.setAttribute("inputmode", "none");
    var ov = document.createElement("div");
    ov.className = "kk-choice";
    ov.setAttribute("data-a", "closechoice");
    o.appendChild(ov);
    inp.addEventListener("click", function () { openChoices(o, c); });
    if (st.node.auto) setTimeout(function () { openChoices(o, c); }, 600);   // 저절로 뜨는 선택지
  }

  function openChoices(o, c) {
    var st = flowOf(c.f);
    if (!st || !st.node || st.busy) return;
    var ov = o.querySelector(".kk-choice");
    if (!ov) return;
    ov.innerHTML = st.node.choices.map(function (ch, i) {
      return '<button class="kk-pill' + (ch.final ? " end" : "") + '" data-a="pick" data-i="' + i + '" data-id="' + c.id + '">' + esc(ch.label) + "</button>";
    }).join("");
    ov.classList.add("on");
  }
  function closeChoices(o) {
    var ov = o && o.querySelector(".kk-choice");
    if (ov) ov.classList.remove("on");
  }

  function addMsg(c, m) {
    var prev = lastMsg(c);
    c.msgs.push(m);
    D.chats.splice(D.chats.indexOf(c), 1);
    D.chats.unshift(c);
    var body = roomBody(c);
    if (!body) return;                             // 방을 나갔으면 데이터에만 저장돼요
    var empty = body.querySelector(".kk-empty"); if (empty) empty.remove();
    var ty = body.querySelector(".kk-typing"); if (ty) ty.remove();
    body.insertAdjacentHTML("beforeend", bubbleHTML(m, c.f, prev));
    body.scrollTop = body.scrollHeight;
  }
  function showTyping(c) {
    var body = roomBody(c);
    if (!body || body.querySelector(".kk-typing")) return;
    var prev = lastMsg(c);
    var first = !isThem(prev);
    body.insertAdjacentHTML("beforeend",
      '<div class="kk-row them kk-typing' + (first ? " first" : "") + '">' +
      (first ? '<span class="kk-row-av">' + av(c.f, 40, true) + "</span>" : '<span class="kk-row-av sp"></span>') +
      '<div class="kk-row-b"><div class="kk-bb kk-dots"><i></i><i></i><i></i></div></div></div>');
    body.scrollTop = body.scrollHeight;
  }
  function hideTyping(c) {
    var body = roomBody(c);
    var ty = body && body.querySelector(".kk-typing");
    if (ty) ty.remove();
  }

  function pick(o, c, i) {
    var st = flowOf(c.f);
    if (!st || !st.node || st.busy) return;
    var ch = st.node.choices[i];
    if (!ch) return;
    if (ch.final) {                                // 마지막 안내 문구: 누르면 닫히고 끝나요
      st.node = null;
      closeChoices(o);
      var fi = o.querySelector("input");
      fi.readOnly = false; fi.removeAttribute("inputmode");
      return;
    }
    st.busy = true;
    closeChoices(o);

    // 보낼 말풍선 순서 만들기: script 가 있으면 그대로, 없으면 me → replies
    var seq = [];
    if (ch.script) {
      seq = ch.script.slice();
    } else {
      if (ch.me) seq.push({ me: ch.me });
      (ch.replies || []).forEach(function (r) { seq.push({ them: r }); });
    }
    var next = ch.next || null;

    function finish() {                            // 모두 끝났어요
      st.node = next;
      st.busy = false;
      var body = roomBody(c);
      var room = body && body.closest(".kk-room");
      if (st.node) {                               // 다음 선택지가 이어서 떠요
        var gap = st.node.auto ? 1800 : 700;       // auto 는 입력창을 안 눌러도 저절로 떠요
        if (room && stack[stack.length - 1] === room) setTimeout(function () { openChoices(room, c); }, gap);
      } else if (room) {                           // 선택지가 끝나면 평소처럼 타이핑
        var inp = room.querySelector("input");
        inp.readOnly = false; inp.removeAttribute("inputmode");
      }
    }
    function step() {
      if (!seq.length) { finish(); return; }
      var item = seq.shift();
      if (item.me != null) {                       // 내가 보내는 말풍선
        addMsg(c, { k: "me", text: item.me, time: nowTime() });
        setTimeout(step, 1600);
      } else {                                     // 상대가 보내는 말풍선 (입력 중... 후에)
        showTyping(c);
        // 말풍선마다 몇 초씩 늦게 와요 (글이 길수록 조금 더 오래 입력 중...)
        var wait = Math.min(4200, 1800 + String(item.them).length * 55);
        setTimeout(function () {
          hideTyping(c);
          addMsg(c, { k: "them", text: item.them, time: nowTime() });
          setTimeout(step, 900);
        }, wait);
      }
    }
    setTimeout(step, 900);
  }

  function send(btn) {
    var id = btn.getAttribute("data-id");
    var c = D.chats.filter(function (x) { return x.id === id; })[0];
    var inp = btn.parentNode.querySelector("input");
    var text = inp.value.trim();
    if (!text) return;
    var t = nowTime();
    var m = { k: "me", text: text, time: t, read: c.f === "me" ? true : undefined };
    c.msgs.push(m);
    inp.value = "";
    btn.classList.remove("on");
    var body = R.querySelector('[data-room="' + id + '"]');
    var empty = body.querySelector(".kk-empty"); if (empty) empty.remove();
    body.insertAdjacentHTML("beforeend", bubbleHTML(m, c.f, null));
    body.scrollTop = body.scrollHeight;
    // 가장 위로 올리기
    D.chats.splice(D.chats.indexOf(c), 1);
    D.chats.unshift(c);
  }

  /* ---------- 클릭 처리 ---------- */
  function onClick(e) {
    var t = e.target.closest("[data-a]");
    if (!t) return;
    var a = t.getAttribute("data-a"), id = t.getAttribute("data-id");
    if (a === "back") pop();
    else if (a === "toast") Phone.toast(t.getAttribute("data-m") || "준비 중이에요");
    else if (a === "profile") openProfile(id);
    else if (a === "chat") {
      // 프로필에서 들어온 경우, 프로필을 닫고 채팅방을 열어요
      var top = stack[stack.length - 1];
      if (top && top.classList.contains("kk-profile")) { stack.pop(); top.remove(); }
      openChat(id);
      updateTheme();
    }
    else if (a === "pick") {
      var room = t.closest(".kk-room");
      var cc = D.chats.filter(function (x) { return x.id === id; })[0];
      if (room && cc) pick(room, cc, parseInt(t.getAttribute("data-i"), 10));
    }
    else if (a === "closechoice") { if (e.target === t) closeChoices(t.closest(".kk-room")); }
    else if (a === "send") {
      var rm = t.closest(".kk-room");
      var c2 = D.chats.filter(function (x) { return x.id === id; })[0];
      var st2 = c2 && flowOf(c2.f);
      if (st2 && st2.node) openChoices(rm, c2);    // 선택지가 남아 있으면 선택지를 띄워요
      else send(t);
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && R && Apps.current() === "kakao") pop();
  });

  Apps.register("kakao", {
    theme: "light",
    build: build,
    onShow: function () { updateTheme(); badges(); }
  });

  // 앱을 열기 전에도 홈 화면 아이콘에 안 읽은 숫자가 보이도록
  (function () {
    var n = total();
    var icon = document.querySelector('.app-ico[data-app="kakao"]');
    if (!icon) return;
    var b = document.createElement("i");
    b.className = "app-badge";
    b.textContent = n > 999 ? "999+" : n;
    b.style.display = n ? "flex" : "none";
    icon.appendChild(b);
  })();

})();
