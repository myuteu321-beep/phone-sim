/* =========================================================
   x.js  —  X(트위터) 앱 동작
   내용(글, 알림, 쪽지)은 data/x-data.js 에서 바꿔요. 이 파일은 고칠 일이 거의 없어요.
   ========================================================= */

(function () {
  "use strict";

  var D = window.X_DATA, Apps = window.Apps, Phone = window.Phone;
  var R;                                   // 앱 전체 화면
  var els = {};                            // 자주 쓰는 요소
  var feedTab = "rec", profTab = "posts", notifTab = "all", curTab = "home";

  /* ---------- 아이콘 ---------- */
  var XPATH = "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";
  var PATH = {
    reply:  '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.3 8.7 8.7 0 0 1-3.3-.7L3 21l1.9-5.3A8.4 8.4 0 1 1 21 11.5z"/>',
    rt:     '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
    like:   '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    view:   '<path d="M5 20V10M12 20V4M19 20v-8"/>',
    bm:     '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    share:  '<path d="M12 16V3M7 8l5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
    home:   '<path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    bell:   '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    mail:   '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    back:   '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    close:  '<path d="M18 6L6 18M6 6l12 12"/>',
    plus:   '<path d="M12 5v14M5 12h14"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    send:   '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
    gear:   '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>'
  };
  function ic(n) {
    return '<svg class="x-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + PATH[n] + '</svg>';
  }
  var CHECK = '<svg class="x-chk" viewBox="0 0 24 24"><path fill="#1d9bf0" d="M22.25 12l-2.5-2.8.3-3.7-3.6-.8-1.9-3.2L12 2.9 8.6 1.5 6.7 4.7l-3.6.8.3 3.7L.9 12l2.5 2.8-.3 3.7 3.6.8 1.9 3.2 3.4-1.4 3.4 1.4 1.9-3.2 3.6-.8-.3-3.7z"/><path fill="none" stroke="#fff" stroke-width="2" d="M8 12.3l2.7 2.7 5-5.3"/></svg>';

  /* ---------- 도우미 ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function link(s) {
    return s.replace(/(^|[\s>])(@\w+|#[\w가-힣]+)/g, '$1<span class="x-link">$2</span>');
  }
  function fmt(n) {
    if (typeof n === "string") return n;
    if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + "만";
    if (n >= 1000) return n.toLocaleString("en-US");
    return String(n);
  }
  function user(id) {
    if (id === "me") return D.me;
    return D.users[id] || { name: id, handle: "@" + id, color: "#8899a6" };
  }
  function av(u, size) {
    var st = "width:" + size + "px;height:" + size + "px;font-size:" + Math.round(size * 0.42) + "px;";
    if (u.img) return '<span class="x-av" style="' + st + "background-image:url('" + esc(u.img) + "')\"></span>";
    var ch = (u.name || "?").replace(/[^A-Za-z0-9가-힣]/g, "").charAt(0).toUpperCase();
    return '<span class="x-av" style="' + st + "background:" + (u.color || "#8899a6") + '">' + esc(ch) + "</span>";
  }
  function byId(id) {
    for (var i = 0; i < D.tweets.length; i++) if (D.tweets[i].id === id) return D.tweets[i];
    return null;
  }
  function mediaHTML(m) {
    if (!m) return "";
    var bg = m.img ? "background-image:url('" + esc(m.img) + "')" : "background:linear-gradient(135deg," + (m.c1 || "#6b7fd7") + "," + (m.c2 || "#a45bc4") + ")";
    return '<div class="x-media" style="' + bg + '">' + (m.label ? "<span>" + esc(m.label) + "</span>" : "") + "</div>";
  }
  /* 커뮤니티 질문 카드 (링크 미리보기 모양) */
  function cardHTML(c) {
    if (!c) return "";
    return '<div class="x-card"><div class="x-card-box"><span class="x-card-logo">' + esc(c.site || "Spin spin") + '</span><div class="x-card-t">' + esc(c.title) + "</div></div>" +
      '<div class="x-card-pill">' + esc(c.title) + " | " + esc((c.site || "Spin spin").replace(/\s+/g, "")) + ' 리…</div></div>' +
      '<div class="x-card-src">출처: ' + esc(c.src || "") + "</div>";
  }
  function actBtn(a, t, label) {
    var on = (a === "like" && t.liked) || (a === "rt" && t.rted);
    return '<button class="x-act' + (on ? " on" : "") + '" data-a="' + a + '" data-id="' + t.id + '">' + ic(a) + (label === "" ? "" : "<span>" + label + "</span>") + "</button>";
  }
  function actsHTML(t) {
    return '<div class="x-acts">' + actBtn("reply", t, fmt(t.rep || 0)) + actBtn("rt", t, fmt(t.rts || 0)) +
      actBtn("like", t, fmt(t.likes || 0)) + actBtn("view", t, fmt(t.views || 0)) +
      '<button class="x-act" data-a="bm" data-id="' + t.id + '">' + ic("bm") + "</button>" +
      '<button class="x-act" data-a="share" data-id="' + t.id + '">' + ic("share") + "</button></div>";
  }

  // 게시물 카드 (id 가 없으면 눌러도 상세로 안 열려요: 답글/인용 목록용)
  function tweetHTML(t, opts) {
    opts = opts || {};
    var u = user(t.u);
    var q = t.quote ? '<div class="x-quote"><b>' + esc(t.quote.name) + ' <span class="x-mut" style="font-weight:400">' + esc(t.quote.handle) + "</span></b><div>" + esc(t.quote.text) + "</div></div>" : "";
    var head = "";
    if (opts.pin && t.pinned) head = '<div class="x-pin">📌 고정된 게시물</div>';
    if (opts.replyTo) head = '<div class="x-pin">' + esc(opts.replyTo) + " 님에게 보내는 답글</div>";
    return head + '<article class="x-tw"' + (t.id ? ' data-id="' + t.id + '"' : "") + ">" +
      av(u, 40) + '<div class="x-tw-r"><div class="x-tw-h"><b>' + esc(u.name) + "</b>" + (u.verified ? CHECK : "") +
      '<span class="x-mut">' + esc(u.handle) + " · " + esc(t.time) + '</span><span class="x-more">···</span></div>' +
      '<div class="x-tw-t">' + link(esc(t.text)) + "</div>" + mediaHTML(t.media) + cardHTML(t.card) + q +
      (t.id ? actsHTML(t) : "") + "</div></article>";
  }

  /* ---------- 숫자 배지 ---------- */
  function unreadNotifs() {
    var s = 0;
    D.notifications.forEach(function (n) { if (n.unread) s += n.n || 1; });
    return s;
  }
  function unreadDMs() {
    var s = 0;
    D.dms.forEach(function (d) { if (d.unread) s++; });
    return s;
  }
  function updateBadges() {
    var a = unreadNotifs(), b = unreadDMs();
    els.bNotif.textContent = a; els.bNotif.classList.toggle("hide", !a);
    els.bDM.textContent = b;    els.bDM.classList.toggle("hide", !b);
  }

  /* ---------- 화면 그리기 ---------- */
  function renderFeed() {
    var list = D.tweets.filter(function (t) { return t.feed.indexOf(feedTab) > -1; });
    els.feed.innerHTML = list.map(function (t) { return tweetHTML(t); }).join("") +
      '<div class="x-end">더 이상 게시물이 없어요</div>';
  }

  function renderProfile() {
    var me = D.me, h = "";
    var mine = D.tweets.filter(function (t) { return t.u === "me"; });
    mine.sort(function (a, b) { return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0); });
    if (profTab === "posts") {
      h = mine.map(function (t) { return tweetHTML(t, { pin: true }); }).join("");
    } else if (profTab === "replies") {
      h = D.myReplies.map(function (r) {
        return tweetHTML({ u: "me", time: r.time, text: r.text, likes: 0, rts: 0, rep: 0, views: 0 }, { replyTo: r.to });
      }).join("");
    } else {
      var med = mine.filter(function (t) { return t.media; });
      h = med.length ? '<div class="x-grid">' + med.map(function (t) {
        var m = t.media;
        var bg = m.img ? "background-image:url('" + esc(m.img) + "')" : "background:linear-gradient(135deg," + (m.c1 || "#6b7fd7") + "," + (m.c2 || "#a45bc4") + ")";
        return '<div style="' + bg + '" data-id="' + t.id + '" class="x-gi"><span>' + esc(m.label || "") + "</span></div>";
      }).join("") + "</div>" : '<div class="x-empty">아직 미디어가 없어요</div>';
    }
    var bn = me.headerImg ? "background-image:url('" + esc(me.headerImg) + "')" : "";
    els.profile.innerHTML =
      '<div class="x-banner" style="' + bn + '"></div>' +
      '<div class="x-pf-row">' + av(me, 84) + '<button class="x-pf-btn" data-a="edit">프로필 수정</button></div>' +
      '<div class="x-pf-info"><h2>' + esc(me.name) + (me.verified ? CHECK : "") + '</h2><div class="x-mut">' + esc(me.handle) + "</div>" +
      "<p>" + esc(me.bio) + '</p><div class="x-pf-meta">📅 ' + esc(me.joined) + ' 가입</div>' +
      '<div class="x-pf-cnt"><span><b>' + esc(me.following) + "</b> 팔로잉</span><span><b>" + esc(me.followers) + "</b> 팔로워</span></div></div>" +
      '<div class="x-disc">' + esc(D.disclaimer) + "</div>" +
      '<div class="x-seg x-sub" data-seg="prof">' +
      ["posts:게시물", "replies:답글", "media:미디어"].map(function (s) {
        var p = s.split(":");
        return '<button data-v="' + p[0] + '" class="' + (profTab === p[0] ? "on" : "") + '">' + p[1] + "</button>";
      }).join("") + "</div>" + h + '<div style="height:30px"></div>';
  }

  var NT_ICON = { like: "like", repost: "rt", follow: "person", reply: "reply", mention: "reply", quote: "rt" };
  function renderNotifs() {
    var list = D.notifications.filter(function (n) {
      return notifTab === "all" || n.type === "mention" || n.type === "reply" || n.type === "quote";
    });
    els.notifList.innerHTML = list.map(function (n) {
      var i = D.notifications.indexOf(n), u = user(n.who);
      var isText = n.type === "mention" || n.type === "reply" || n.type === "quote";
      var title = isText
        ? "<b>" + esc(u.name) + "</b>님이 " + (n.type === "mention" ? "회원님을 멘션했습니다" : n.type === "reply" ? "회원님께 답글을 남겼습니다" : "회원님의 게시물을 인용했습니다")
        : "<b>" + esc(u.name) + "</b>" + (n.more ? " " + esc(n.more) : "") + "님이 " + esc(n.text).replace(/^회원님(의|을)?\s?/, "회원님$1 ");
      if (!isText) title = "<b>" + esc(u.name) + "</b>" + (n.more ? " " + esc(n.more) : "") + " — " + esc(n.text);
      return '<div class="x-nt' + (n.unread ? " unread" : "") + '" data-i="' + i + '">' +
        '<div class="x-nt-i ' + n.type + '">' + ic(NT_ICON[n.type] || "bell") + "</div>" +
        '<div class="x-nt-b">' + av(u, 32) + '<div class="x-nt-t">' + title + '<span class="x-nt-tm">· ' + esc(n.time) + "</span></div>" +
        (isText ? '<div class="x-nt-s">' + link(esc(n.text)) + "</div>" : "") + "</div></div>";
    }).join("") + '<div class="x-end">알림을 모두 확인했어요</div>';
  }

  function lastMsg(d) { return d.msgs[d.msgs.length - 1]; }
  function renderDMs() {
    els.dmList.innerHTML = D.dms.map(function (d, i) {
      var u = user(d.u), m = lastMsg(d);
      return '<div class="x-dm' + (d.unread ? " unread" : "") + '" data-i="' + i + '">' + av(u, 48) +
        '<div class="x-dm-b"><div class="x-dm-t"><b>' + esc(u.name) + '</b><span class="x-mut">' + esc(u.handle) + " · " + esc(d.time) + "</span></div>" +
        '<div class="x-dm-p">' + (m.from === "me" ? "나: " : "") + esc(m.text) + "</div></div>" +
        (d.unread ? '<span class="x-ud"></span>' : "") + "</div>";
    }).join("") + '<div class="x-end">쪽지를 모두 확인했어요</div>';
  }

  function renderTrends(q) {
    q = (q || "").trim();
    if (!q) {
      els.searchBody.innerHTML = '<div class="x-h2">나를 위한 트렌드</div>' + D.trends.map(function (t) {
        return '<div class="x-trend" data-q="' + esc(t.tag) + '"><small>' + esc(t.cat) + "</small><b>" + esc(t.tag) + "</b><small>" + esc(t.count) + "</small></div>";
      }).join("");
      return;
    }
    var res = D.tweets.filter(function (t) {
      return (t.text + user(t.u).name + user(t.u).handle).toLowerCase().indexOf(q.replace(/^#/, "").toLowerCase()) > -1;
    });
    els.searchBody.innerHTML = res.length ? res.map(function (t) { return tweetHTML(t); }).join("") : '<div class="x-empty">"' + esc(q) + '" 검색 결과가 없어요</div>';
  }

  /* ---------- 탭 전환 ---------- */
  function showTab(t) {
    curTab = t;
    Object.keys(els.panels).forEach(function (k) { els.panels[k].classList.toggle("on", k === t); });
    var btns = R.querySelectorAll(".x-nav button");
    for (var i = 0; i < btns.length; i++) btns[i].classList.toggle("on", btns[i].getAttribute("data-t") === t);
    els.fab.classList.toggle("on", t === "home");
    if (t === "profile") renderProfile();
    if (t === "notif") renderNotifs();
    if (t === "dm") renderDMs();
  }

  /* ---------- 위에 쌓이는 화면 ---------- */
  var stack = [];
  function push(html, cls) {
    var o = document.createElement("div");
    o.className = "x-ov " + (cls || "");
    o.innerHTML = html;
    els.ovs.appendChild(o);
    void o.offsetWidth;
    o.classList.add("in");
    stack.push(o);
    var sc = o.querySelector(".x-scroll, .x-chat");
    if (sc) Apps.dragScroll(sc);
    return o;
  }
  function pop() {
    var o = stack.pop();
    if (!o) return;
    o.classList.remove("in");
    setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); }, 320);
  }

  /* 게시물 상세 */
  function openDetail(id) {
    var t = byId(id);
    if (!t) return;
    var u = user(t.u);
    var seg = "replies";
    var o = push(
      '<div class="x-ov-h"><div class="x-ov-hr"><button class="x-back" data-a="back">' + ic("back") + "</button>게시물</div></div>" +
      '<div class="x-scroll"><div class="x-big">' +
      '<div class="x-big-h">' + av(u, 44) + '<div><b>' + esc(u.name) + (u.verified ? CHECK : "") + '</b><div class="x-mut">' + esc(u.handle) + "</div></div></div>" +
      '<div class="x-big-t">' + link(esc(t.text)) + "</div>" + mediaHTML(t.media) + cardHTML(t.card) +
      (t.quote ? '<div class="x-quote"><b>' + esc(t.quote.name) + "</b><div>" + esc(t.quote.text) + "</div></div>" : "") +
      '<div class="x-big-m">' + esc(t.time) + " 전 · 조회 <b style=\"color:#0f1419\">" + fmt(t.views || 0) + "</b>회</div>" +
      '<div class="x-stat"><span><b data-s="rts">' + fmt(t.rts || 0) + "</b> 리포스트</span><span><b>" + fmt((t.quotes || D.defaultQuotes).length) + "</b> 인용</span><span><b data-s=\"likes\">" + fmt(t.likes || 0) + "</b> 마음에 들어요</span></div>" +
      actsHTML(t).replace(/<span>[^<]*<\/span>/g, "") +
      '</div><div class="x-seg"><button data-v="replies" class="on">답글</button><button data-v="quotes">인용</button></div>' +
      '<div class="x-dlist"></div><div class="x-end">더 이상 없어요</div></div>'
    );
    var listEl = o.querySelector(".x-dlist");
    function fill() {
      if (seg === "replies" && t.repliesOff) {
        listEl.innerHTML = '<div class="x-end" style="padding:36px 20px;color:#536471">이 게시물의 답글이 제한되었습니다</div>';
        return;
      }
      var items = seg === "replies" ? (t.replies || D.defaultReplies) : (t.quotes || D.defaultQuotes);
      listEl.innerHTML = items.map(function (r) {
        var x = { u: r.u, time: r.time || "방금", text: r.text, likes: r.likes || 0, rts: 0, rep: 0, views: 0 };
        if (seg === "quotes") x.quote = { name: user(t.u).name, handle: user(t.u).handle, text: t.text.length > 70 ? t.text.slice(0, 70) + "…" : t.text };
        return tweetHTML(x);
      }).join("");
    }
    fill();
    o.querySelector(".x-seg").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      seg = b.getAttribute("data-v");
      var bs = this.children; for (var i = 0; i < bs.length; i++) bs[i].classList.toggle("on", bs[i] === b);
      fill();
    });
  }

  /* 쪽지 대화방 */
  function chatHTML(d) {
    var h = '<div class="x-chat-info">' + av(user(d.u), 64) + "<b>" + esc(user(d.u).name) + '</b><div class="x-mut">' + esc(user(d.u).handle) + "</div></div>";
    d.msgs.forEach(function (m) {
      if (m.day) h += '<div class="x-day">' + esc(m.day) + "</div>";
      h += '<div class="x-bub ' + m.from + '">' + esc(m.text) + '</div><div class="x-bt ' + m.from + '">' + esc(m.time || "") + "</div>";
    });
    return h;
  }
  function openChat(i) {
    var d = D.dms[i], u = user(d.u);
    if (d.unread) { d.unread = false; updateBadges(); renderDMs(); }
    var o = push(
      '<div class="x-ov-h"><div class="x-ov-hr"><button class="x-back" data-a="back">' + ic("back") + "</button>" + av(u, 30) +
      '<div style="font-size:16px">' + esc(u.name) + "</div></div></div>" +
      '<div class="x-chat">' + chatHTML(d) + "</div>" +
      '<div class="x-inp"><input type="text" placeholder="새 쪽지 작성" maxlength="500"><button class="x-send" data-a="send">' + ic("send") + "</button></div>"
    );
    var chat = o.querySelector(".x-chat"), inp = o.querySelector("input");
    chat.scrollTop = 0;
    function send() {
      var v = inp.value.trim();
      if (!v) return;
      var now = new Date(), h = now.getHours(), m = now.getMinutes();
      d.msgs.push({ from: "me", time: (h < 12 ? "오전 " : "오후 ") + (h % 12 || 12) + ":" + (m < 10 ? "0" + m : m), text: v });
      d.time = "방금";
      inp.value = "";
      chat.innerHTML = chatHTML(d);
      chat.scrollTop = chat.scrollHeight;
      renderDMs();
    }
    o.querySelector(".x-send").addEventListener("click", send);
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });
  }

  /* 새 게시물 쓰기 */
  function openCompose() {
    var o = push(
      '<div class="x-ov-h"><div class="x-ov-hr"><button class="x-back" data-a="back">' + ic("close") + '</button><span class="sp"></span>' +
      '<button class="x-post-btn" data-a="doPost" disabled>게시하기</button></div></div>' +
      '<div class="x-compose">' + av(D.me, 40) + '<textarea placeholder="무슨 일이 일어나고 있나요?" maxlength="280"></textarea></div>', "up"
    );
    var ta = o.querySelector("textarea"), btn = o.querySelector(".x-post-btn");
    ta.addEventListener("input", function () { btn.disabled = !ta.value.trim(); });
    btn.addEventListener("click", function () {
      var v = ta.value.trim();
      if (!v) return;
      D.tweets.unshift({ id: "n" + Date.now(), u: "me", time: "방금", feed: ["rec", "fol"], text: v, likes: 0, rts: 0, rep: 0, views: 1 });
      renderFeed(); if (curTab === "profile") renderProfile();
      pop(); Phone.toast("게시물을 올렸어요");
    });
    setTimeout(function () { ta.focus(); }, 320);
  }

  /* ---------- 좋아요 / 리포스트 ---------- */
  function toggle(a, id) {
    var t = byId(id); if (!t) return;
    if (a === "like") { t.liked = !t.liked; t.likes = (t.likes || 0) + (t.liked ? 1 : -1); }
    if (a === "rt")   { t.rted = !t.rted;  t.rts   = (t.rts || 0)   + (t.rted ? 1 : -1); }
    var bs = R.querySelectorAll('.x-act[data-id="' + id + '"][data-a="' + a + '"]');
    for (var i = 0; i < bs.length; i++) {
      var on = a === "like" ? t.liked : t.rted;
      bs[i].classList.toggle("on", !!on);
      var sp = bs[i].querySelector("span");
      if (sp) sp.textContent = fmt(a === "like" ? t.likes : t.rts);
    }
    var s = R.querySelector('.x-ov [data-s="' + (a === "like" ? "likes" : "rts") + '"]');
    if (s) s.textContent = fmt(a === "like" ? t.likes : t.rts);
  }

  /* ---------- 앱 만들기 ---------- */
  function build(root) {
    R = root;
    root.innerHTML =
      '<div class="x-app">' +
      '<div class="x-panels">' +
        '<section class="x-panel on" data-p="home"><div class="x-top"><div class="x-hd"><span class="x-hd-av" data-a="toProfile">' + av(D.me, 32) + '</span>' +
          '<span class="x-logo"><svg viewBox="0 0 24 24"><path fill="#0f1419" d="' + XPATH + '"/></svg></span></div>' +
          '<div class="x-tabs" data-seg="feed"><button data-v="rec" class="on">추천</button><button data-v="fol">팔로잉</button></div></div>' +
          '<div class="x-scroll" id="x-feed"></div></section>' +
        '<section class="x-panel" data-p="search"><div class="x-top"><div class="x-title">검색</div><div class="x-sbox">' + ic("search") + '<input id="x-q" type="text" placeholder="검색"></div></div><div class="x-scroll" id="x-search"></div></section>' +
        '<section class="x-panel" data-p="profile"><div class="x-top" style="border:0"><div class="x-title"><span>' + esc(D.me.name) + '</span><span class="sp"></span><span class="x-mut" style="font-size:13px;font-weight:400">게시물 ' + esc(D.me.postCount) + '</span></div></div><div class="x-scroll" id="x-profile"></div></section>' +
        '<section class="x-panel" data-p="notif"><div class="x-top"><div class="x-title">알림</div><div class="x-tabs" data-seg="notif"><button data-v="all" class="on">전체</button><button data-v="mention">멘션</button></div></div><div class="x-scroll" id="x-notif"></div></section>' +
        '<section class="x-panel" data-p="dm"><div class="x-top"><div class="x-title">쪽지<span class="sp"></span>' + ic("gear") + '</div></div><div class="x-scroll" id="x-dm"></div></section>' +
      '</div>' +
      '<button class="x-fab on" data-a="compose" aria-label="새 게시물">' + ic("plus") + "</button>" +
      '<nav class="x-nav">' +
        '<button data-t="home" class="on">' + ic("home") + '<span class="x-dot"></span></button>' +
        '<button data-t="search">' + ic("search") + "</button>" +
        '<button data-t="profile">' + av(D.me, 28) + "</button>" +
        '<button data-t="notif">' + ic("bell") + '<span class="x-badge" id="x-bn"></span></button>' +
        '<button data-t="dm">' + ic("mail") + '<span class="x-badge" id="x-bd"></span></button>' +
      "</nav>" +
      '<div class="x-ovs"></div></div>';

    els.panels = {};
    var ps = root.querySelectorAll(".x-panel");
    for (var i = 0; i < ps.length; i++) els.panels[ps[i].getAttribute("data-p")] = ps[i];
    els.feed = root.querySelector("#x-feed");
    els.searchBody = root.querySelector("#x-search");
    els.profile = root.querySelector("#x-profile");
    els.notifList = root.querySelector("#x-notif");
    els.dmList = root.querySelector("#x-dm");
    els.fab = root.querySelector(".x-fab");
    els.ovs = root.querySelector(".x-ovs");
    els.bNotif = root.querySelector("#x-bn");
    els.bDM = root.querySelector("#x-bd");

    [els.feed, els.searchBody, els.profile, els.notifList, els.dmList].forEach(function (s) { Apps.dragScroll(s); });

    renderFeed(); renderTrends(""); renderProfile(); renderNotifs(); renderDMs(); updateBadges();

    root.querySelector("#x-q").addEventListener("input", function () { renderTrends(this.value); });

    /* 모든 터치/클릭은 여기서 한 번에 처리 */
    root.addEventListener("click", function (e) {
      var t = e.target;

      var nav = t.closest(".x-nav button");
      if (nav) {
        var tab = nav.getAttribute("data-t");
        if (tab === curTab) { var sc = els.panels[tab].querySelector(".x-scroll"); if (sc) sc.scrollTop = 0; }
        showTab(tab); return;
      }

      var seg = t.closest("[data-seg] button");
      if (seg) {
        var kind = seg.parentNode.getAttribute("data-seg");
        if (kind === "detail") return;
        var v = seg.getAttribute("data-v");
        if (kind === "feed") { feedTab = v; renderFeed(); els.feed.scrollTop = 0; }
        if (kind === "prof") { profTab = v; renderProfile(); }
        if (kind === "notif") { notifTab = v; renderNotifs(); }
        if (kind !== "prof") { var bs = seg.parentNode.children; for (var i = 0; i < bs.length; i++) bs[i].classList.toggle("on", bs[i] === seg); }
        return;
      }

      var a = t.closest("[data-a]");
      if (a) {
        var act = a.getAttribute("data-a"), id = a.getAttribute("data-id");
        if (act === "back") return pop();
        if (act === "toProfile") return showTab("profile");
        if (act === "compose") return openCompose();
        if (act === "reply") return openDetail(id);
        if (act === "like" || act === "rt") return toggle(act, id);
        if (act === "bm") return Phone.toast("북마크에 추가했어요");
        if (act === "share") return Phone.toast("링크를 복사했어요");
        if (act === "edit") return Phone.toast("프로필 수정은 아직 준비 중이에요");
        if (act === "view") return;
        return;
      }

      var tr = t.closest(".x-trend");
      if (tr) { var q = tr.getAttribute("data-q"); root.querySelector("#x-q").value = q; renderTrends(q); return; }

      var nt = t.closest(".x-nt");
      if (nt) {
        var n = D.notifications[+nt.getAttribute("data-i")];
        if (n.unread) { n.unread = false; updateBadges(); renderNotifs(); }
        if (n.ref) openDetail(n.ref);
        return;
      }

      var dm = t.closest(".x-dm");
      if (dm) return openChat(+dm.getAttribute("data-i"));

      var gi = t.closest(".x-gi");
      if (gi) return openDetail(gi.getAttribute("data-id"));

      var tw = t.closest(".x-tw[data-id]");
      if (tw) return openDetail(tw.getAttribute("data-id"));
    });
  }

  Apps.register("x", { theme: "light", build: build });

})();
