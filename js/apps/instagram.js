/* =========================================================
   instagram.js  —  인스타그램 앱 동작
   내용(게시물, 댓글, 알림, DM)은 data/instagram-data.js 에서 바꿔요.
   이 파일은 고칠 일이 거의 없어요.
   ========================================================= */

(function () {
  "use strict";

  var D = window.IG_DATA, Apps = window.Apps, Phone = window.Phone;
  var R;                       // 앱 전체 화면
  var els = {};                // 자주 쓰는 요소
  var curTab = "home";
  var profTab = "grid";
  var stack = [];              // 위에 쌓이는 화면들
  var sheetEl = null;          // 릴스 댓글창

  /* ---------- 아이콘 ---------- */
  var P = {
    home:    '<path d="M3 10.5L12 3l9 7.5V21h-6v-6.5H9V21H3z"/>',
    reels:   '<rect x="3" y="3" width="18" height="18" rx="4.5"/><path d="M3 9h18M9 3l3 6M15 3l3 6"/><path d="M10.5 12.5v5l4.5-2.5z" fill="currentColor"/>',
    dm:      '<path d="M22 3L9.5 13.5M22 3l-7 18-5.5-7.5L2 9.5z"/>',
    search:  '<circle cx="11" cy="11" r="7.5"/><path d="M21 21l-4.8-4.8"/>',
    heart:   '<path d="M12 20.5C5 15 2.5 11.8 2.5 8.4A4.9 4.9 0 0 1 7.4 3.5c1.9 0 3.5 1 4.6 2.6 1.1-1.6 2.7-2.6 4.6-2.6a4.9 4.9 0 0 1 4.9 4.9c0 3.4-2.5 6.6-9.5 12.1z"/>',
    comment: '<path d="M20.7 17.5A9.5 9.5 0 1 0 12 21.5c1.5 0 2.9-.3 4.2-.9l4.3 1z"/>',
    bm:      '<path d="M5 3h14v18l-7-5-7 5z"/>',
    back:    '<path d="M15 4l-8 8 8 8"/>',
    more:    '<circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/>',
    plus:    '<path d="M12 5v14M5 12h14"/>',
    menu:    '<path d="M4 7h16M4 12h16M4 17h16"/>',
    grid:    '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    tagged:  '<path d="M4 4h16v16H4z"/><circle cx="12" cy="10" r="3"/><path d="M6 19c1-3 3-4 6-4s5 1 6 4"/>',
    music:   '<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    close:   '<path d="M5 5l14 14M19 5L5 19"/>',
    phone:   '<path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1z"/>',
    video:   '<rect x="2" y="6" width="14" height="12" rx="3"/><path d="M16 10l6-3v10l-6-3z"/>',
    cam:     '<path d="M3 8a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/>'
  };
  function ic(n, o) {
    o = o || {};
    return '<svg class="ig-ic' + (o.cls ? " " + o.cls : "") + '" viewBox="0 0 24 24" fill="' + (o.fill || "none") +
      '" stroke="currentColor" stroke-width="' + (o.sw || 1.9) + '" stroke-linecap="round" stroke-linejoin="round">' + P[n] + "</svg>";
  }
  var CHECK = '<svg class="ig-chk" viewBox="0 0 24 24"><path fill="#0095f6" d="M12 1.5l2.6 1.8 3.1-.2 1.3 2.8 2.7 1.6-.5 3.1L22 12l-1.8 2.4.5 3.1-2.7 1.6-1.3 2.8-3.1-.2L12 22.5l-2.6-1.8-3.1.2L5 18.1l-2.7-1.6.5-3.1L1 12l1.8-2.4-.5-3.1L5 4.9l1.3-2.8 3.1.2z"/><path d="M8 12.2l2.8 2.8 5.2-5.6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---------- 도우미 ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fmt(n) {
    n = Number(n) || 0;
    if (n >= 10000) { var v = (n / 10000).toFixed(1); return v.replace(/\.0$/, "") + "만"; }
    return n.toLocaleString("en-US");
  }
  function user(id) {
    if (id === "me") return D.me;
    return D.users[id] || { handle: id, name: id, color: "#888" };
  }
  function byId(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }
  function bg(o) {
    if (o.img) return "background-image:url('" + esc(o.img) + "');background-size:cover;background-position:center";
    return "background:linear-gradient(155deg," + o.c1 + "," + o.c2 + ")";
  }
  function av(id, size, ring) {
    var u = user(id), s = size || 32;
    var st = "width:" + s + "px;height:" + s + "px;font-size:" + Math.round(s * 0.42) + "px;";
    var inner = u.img
      ? '<span class="ig-av" style="' + st + "background-image:url('" + esc(u.img) + "')\"></span>"
      : '<span class="ig-av" style="' + st + "background:" + u.color + '">' + esc((u.name || u.handle).charAt(0)) + "</span>";
    if (!ring) return inner;
    return '<span class="ig-ring ' + (ring === "seen" ? "seen" : "") + '" style="width:' + (s + 8) + "px;height:" + (s + 8) + 'px"><span class="ig-ring-in">' + inner + "</span></span>";
  }
  function nameHTML(id) {
    var u = user(id);
    return esc(u.handle) + (u.verified ? CHECK : "");
  }
  function linkify(t) {
    return esc(t).replace(/(@[A-Za-z0-9_.]+|#[^\s#@<]+)/g, '<span class="ig-lnk">$1</span>');
  }
  function mediaHTML(m, extra) {
    return '<div class="ig-m" style="' + bg(m) + '"><span class="ig-m-t">' + esc(m.label || "") + "</span></div>";
  }

  /* 마우스로 좌우 끌기 (PC용) */
  function hDrag(el) {
    var down = false, moved = false, sx = 0, sl = 0;
    el.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; moved = false; sx = e.clientX; sl = el.scrollLeft;
    });
    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      var sc = parseFloat(document.getElementById("phone").style.getPropertyValue("--scale")) || 1;
      var dx = (e.clientX - sx) / sc;
      if (Math.abs(dx) > 5) { moved = true; el.style.scrollSnapType = "none"; el.style.scrollBehavior = "auto"; }
      if (moved) el.scrollLeft = sl - dx;
    });
    window.addEventListener("pointerup", function () {
      if (!down) return;
      down = false;
      if (moved) {
        var w = el.clientWidth || 1;
        var i = Math.round(el.scrollLeft / w);
        el.style.scrollSnapType = "";
        el.style.scrollBehavior = "smooth";
        el.scrollLeft = i * w;
        setTimeout(function () { moved = false; el.style.scrollBehavior = ""; }, 60);
      }
    });
    el.addEventListener("click", function (e) {
      if (moved) { e.stopPropagation(); e.preventDefault(); }
    }, true);
  }

  /* ---------- 상태 ---------- */
  var st = { liked: {}, saved: {}, likedC: {}, following: {}, extraComments: {}, captionOpen: {} };

  function postLikes(p) { return p.likes + (st.liked[p.id] ? 1 : 0); }
  function allComments(item) { return (item.comments || []).concat(st.extraComments[item.id] || []); }
  function cCount(item) { return item.commentCount + (st.extraComments[item.id] || []).length; }

  function unreadDMs() { return D.dms.filter(function (d) { return d.unread > 0; }).length; }
  function unreadNotifs() { return D.notifs.filter(function (n) { return n.unread; }).length; }
  function updateBadges() {
    var a = unreadNotifs(), b = unreadDMs();
    setBadge(els.heartBadge, a);
    setBadge(els.navDmBadge, b);
    setBadge(els.homeDmBadge, b);
  }
  function setBadge(el, n) {
    if (!el) return;
    el.textContent = n > 99 ? "99+" : n;
    el.style.display = n > 0 ? "flex" : "none";
  }

  /* ---------- 뼈대 ---------- */
  function build(root) {
    R = root;
    R.classList.add("ig-app");
    R.innerHTML =
      '<div class="ig-panels">' +
        '<div class="ig-panel on" data-p="home"></div>' +
        '<div class="ig-panel" data-p="reels"></div>' +
        '<div class="ig-panel" data-p="dm"></div>' +
        '<div class="ig-panel" data-p="search"></div>' +
        '<div class="ig-panel" data-p="profile"></div>' +
      "</div>" +
      '<div class="ig-nav">' +
        '<button data-t="home" class="on">' + ic("home", { sw: 2 }) + "</button>" +
        '<button data-t="reels">' + ic("reels") + "</button>" +
        '<button data-t="dm">' + ic("dm") + '<i class="ig-badge" id="ig-nav-dm"></i></button>' +
        '<button data-t="search">' + ic("search") + "</button>" +
        '<button data-t="profile"><span class="ig-nav-av">' + av("me", 24) + "</span></button>" +
      "</div>" +
      '<div class="ig-ovs"></div>' +
      '<div class="ig-sheet-wrap"></div>';

    els.panels = {};
    var ps = R.querySelectorAll(".ig-panel");
    for (var i = 0; i < ps.length; i++) els.panels[ps[i].getAttribute("data-p")] = ps[i];
    els.ovs = R.querySelector(".ig-ovs");
    els.sheetWrap = R.querySelector(".ig-sheet-wrap");
    els.navDmBadge = R.querySelector("#ig-nav-dm");

    R.querySelector(".ig-nav").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-t]");
      if (!b) return;
      var t = b.getAttribute("data-t");
      if (t === curTab) {                       // 같은 탭을 또 누르면 맨 위로
        var sc = els.panels[t].querySelector(".ig-scroll, .ig-reels");
        if (sc) sc.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      closeAll();
      showTab(t);
    });

    renderHome();
    renderReels();
    renderDMList();
    renderSearch();
    renderProfile();
    updateBadges();

    /* 화면 안 어디를 눌러도 처리 (이벤트 위임) */
    R.addEventListener("click", onClick);
  }

  function showTab(t) {
    curTab = t;
    Object.keys(els.panels).forEach(function (k) { els.panels[k].classList.toggle("on", k === t); });
    var bs = R.querySelectorAll(".ig-nav button");
    for (var i = 0; i < bs.length; i++) bs[i].classList.toggle("on", bs[i].getAttribute("data-t") === t);
    R.classList.toggle("ig-dark-tab", t === "reels");
    if (t === "reels") playVisible();
    if (t === "dm") renderDMList();
    updateBadges();
    updateTheme();
  }

  /* ---------- 위에 쌓이는 화면 ---------- */
  function push(html, cls) {
    var o = document.createElement("div");
    o.className = "ig-ov " + (cls || "");
    o.innerHTML = html;
    els.ovs.appendChild(o);
    void o.offsetWidth;
    o.classList.add("in");
    stack.push(o);
    updateTheme();
    var sc = o.querySelectorAll(".ig-scroll");
    for (var i = 0; i < sc.length; i++) Apps.dragScroll(sc[i]);
    var hs = o.querySelectorAll(".ig-car");
    for (var j = 0; j < hs.length; j++) hDrag(hs[j]);
    return o;
  }
  function pop() {
    var o = stack.pop();
    if (!o) return;
    if (o._timer) clearInterval(o._timer);
    o.classList.remove("in");
    setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); }, 300);
    if (o._onClose) o._onClose();
    updateTheme();
    if (!stack.length) { updateBadges(); refreshLists(); }
  }
  function closeAll() { closeSheet(); while (stack.length) pop(); }
  function refreshLists() {
    if (curTab === "dm") renderDMList();
    renderNavDot();
  }
  function renderNavDot() { updateBadges(); }

  /* 어두운 화면(릴스/스토리/사진 크게 보기)일 땐 상태바를 흰색으로 */
  function updateTheme() {
    if (Apps.current() !== "instagram") return;
    var top = stack[stack.length - 1];
    var dark = top ? (top.classList.contains("ig-story") || top.classList.contains("ig-viewer")) : curTab === "reels";
    document.getElementById("phone").setAttribute("data-theme", dark ? "dark" : "light");
  }

  function hdr(title, right) {
    return '<div class="ig-ov-h"><button class="ig-back" data-a="back">' + ic("back", { sw: 2.2 }) + "</button>" +
      '<div class="ig-ov-t">' + title + '</div><div class="ig-ov-r">' + (right || "") + "</div></div>";
  }

  /* =======================================================
     홈
  ======================================================= */
  function renderHome() {
    var stories = D.stories.map(function (s, i) {
      var u = user(s.u);
      var gone = !!(D.users[s.u] && D.users[s.u].storyGone);
      var ring = s.seen || gone ? "seen" : "new";
      var plus = s.u === "me" ? '<i class="ig-plus">' + ic("plus", { sw: 3 }) + "</i>" : "";
      return '<button class="ig-st" data-a="story" data-i="' + i + '"><span class="ig-st-av">' + av(s.u, 54, ring) + plus + "</span>" +
        "<span>" + esc(s.label || u.handle) + "</span></button>";
    }).join("");

    var feed = D.posts.filter(function (p) { return p.feed; }).map(postHTML).join("");

    els.panels.home.innerHTML =
      '<div class="ig-top"><div class="ig-top-in">' +
        '<button class="ig-top-l" data-a="toast" data-m="새 게시물 만들기는 준비 중이에요">' + ic("plus", { sw: 2.2 }) + "</button>" +
        '<div class="ig-logo">Instagram</div>' +
        '<div class="ig-top-r">' +
          '<button data-a="notifs" class="ig-hbtn">' + ic("heart", { sw: 2 }) + '<i class="ig-badge" id="ig-heart-badge"></i></button>' +
          '<button data-a="dmtab" class="ig-hbtn">' + ic("dm", { sw: 2 }) + '<i class="ig-badge" id="ig-home-dm"></i></button>' +
        "</div></div></div>" +
      '<div class="ig-scroll"><div class="ig-stories">' + stories + "</div>" + feed +
      '<div class="ig-end">모두 확인했습니다 ✓</div></div>';
    els.heartBadge = els.panels.home.querySelector("#ig-heart-badge");
    els.homeDmBadge = els.panels.home.querySelector("#ig-home-dm");
    Apps.dragScroll(els.panels.home.querySelector(".ig-scroll"));
    hDrag(els.panels.home.querySelector(".ig-stories"));
    bindCarousels(els.panels.home);
  }

  function carouselHTML(p, large) {
    var m = p.media;
    var items = m.map(function (x) { return '<div class="ig-slide">' + mediaHTML(x) + "</div>"; }).join("");
    return '<div class="ig-media" data-id="' + p.id + '">' +
      '<div class="ig-car">' + items + "</div>" +
      (m.length > 1 ? '<span class="ig-cnt">1/' + m.length + "</span>" : "") +
      '<span class="ig-pop">' + ic("heart", { fill: "#fff", sw: 0 }) + "</span></div>" +
      (m.length > 1 ? '<div class="ig-dots">' + m.map(function (_, i) { return "<i" + (i === 0 ? ' class="on"' : "") + "></i>"; }).join("") + "</div>" : "");
  }

  function actionsHTML(p, kind) {
    return '<div class="ig-acts">' +
      '<button data-a="like" data-id="' + p.id + '" class="ig-like' + (st.liked[p.id] ? " on" : "") + '">' + ic("heart", { fill: st.liked[p.id] ? "#ff3040" : "none" }) + "</button>" +
      '<button data-a="comments" data-k="' + (kind || "post") + '" data-id="' + p.id + '">' + ic("comment") + "</button>" +
      '<button data-a="toast" data-m="공유 기능은 준비 중이에요">' + ic("dm") + "</button>" +
      '<span class="sp"></span>' +
      '<button data-a="save" data-id="' + p.id + '" class="ig-save' + (st.saved[p.id] ? " on" : "") + '">' + ic("bm", { fill: st.saved[p.id] ? "currentColor" : "none" }) + "</button></div>";
  }

  /* 멤버(noEnter) 계정: 이름은 눌러도 아무 일 없고, 프사를 누르면 스토리로 들어가요 */
  function isLocked(id) { return !!(D.users[id] && D.users[id].noEnter); }
  function headL(p, nameBlock) {
    var ring = p.u === "me" ? "new" : (D.users[p.u] && D.users[p.u].verified ? "new" : 0);
    if (isLocked(p.u)) {
      return '<span class="ig-ph-l"><button class="ig-ph-av" data-a="avstory" data-u="' + p.u + '">' + av(p.u, 28, ring ? "new" : "new") + "</button>" + nameBlock + "</span>";
    }
    return '<button class="ig-ph-l" data-a="user" data-u="' + p.u + '">' + av(p.u, 28, ring) + nameBlock + "</button>";
  }
  function openAvatarStory(uid) {
    for (var i = 0; i < D.stories.length; i++) {
      if (D.stories[i].u === uid && D.stories[i].frames && D.stories[i].frames.length) { openStory(i); return; }
    }
    var u = user(uid);
    runStory(u.handle, uid, [{ img: u.img, c1: u.color, c2: "#111", label: "", text: "", time: "" }]);
  }

  function postHTML(p) {
    var u = user(p.u);
    var cap = p.caption || "";
    var long = cap.length > 60 || cap.indexOf("\n") > -1;
    var open = st.captionOpen[p.id];
    var capHTML = long && !open
      ? linkify(cap.split("\n")[0].slice(0, 60)) + '… <button class="ig-more-txt" data-a="capmore" data-id="' + p.id + '">더 보기</button>'
      : linkify(cap);
    return '<article class="ig-post" data-pid="' + p.id + '">' +
      '<div class="ig-ph">' + headL(p, '<span class="ig-ph-n"><b>' + nameHTML(p.u) + "</b>" + (p.loc ? "<small>" + esc(p.loc) + "</small>" : "") + "</span>") +
      '<button data-a="toast" data-m="더보기 메뉴는 준비 중이에요">' + ic("more") + "</button></div>" +
      carouselHTML(p) +
      actionsHTML(p) +
      '<div class="ig-likes" data-lk="' + p.id + '">좋아요 ' + postLikes(p).toLocaleString("en-US") + "개</div>" +
      '<div class="ig-cap"><b>' + esc(u.handle) + "</b> " + capHTML + "</div>" +
      '<button class="ig-allc" data-a="comments" data-k="post" data-id="' + p.id + '">댓글 ' + cCount(p).toLocaleString("en-US") + "개 모두 보기</button>" +
      '<div class="ig-time">' + esc(p.time) + " 전</div></article>";
  }

  function bindCarousels(scope) {
    var cars = scope.querySelectorAll(".ig-car");
    for (var i = 0; i < cars.length; i++) (function (car) {
      if (car._b) return; car._b = true;
      var wrap = car.parentNode;
      car.addEventListener("scroll", function () {
        var i = Math.round(car.scrollLeft / (car.clientWidth || 1));
        var dots = wrap.parentNode.querySelectorAll(".ig-dots i");
        for (var k = 0; k < dots.length; k++) dots[k].classList.toggle("on", k === i);
        var c = wrap.querySelector(".ig-cnt");
        if (c) c.textContent = (i + 1) + "/" + car.children.length;
      });
    })(cars[i]);
  }

  /* 사진을 한 번 누르면 크게 보기, 두 번 누르면 좋아요 */
  var tapT = null, tapId = null;
  function onMediaTap(wrap) {
    var id = wrap.getAttribute("data-id");
    if (tapT && tapId === id) {
      clearTimeout(tapT); tapT = null;
      doLike(id, true);
      var pop = wrap.querySelector(".ig-pop");
      pop.classList.remove("go"); void pop.offsetWidth; pop.classList.add("go");
      return;
    }
    tapId = id;
    var car = wrap.querySelector(".ig-car");
    var idx = Math.round(car.scrollLeft / (car.clientWidth || 1));
    tapT = setTimeout(function () { tapT = null; openViewer(id, idx); }, 270);
  }

  function doLike(id, force) {
    var on = force ? true : !st.liked[id];
    st.liked[id] = on;
    var all = R.querySelectorAll('.ig-like[data-id="' + id + '"]');
    for (var i = 0; i < all.length; i++) {
      all[i].classList.toggle("on", on);
      all[i].innerHTML = ic("heart", { fill: on ? "#ff3040" : "none" });
    }
    var p = byId(D.posts, id);
    if (p) {
      var ls = R.querySelectorAll('[data-lk="' + id + '"]');
      for (var j = 0; j < ls.length; j++) ls[j].textContent = "좋아요 " + postLikes(p).toLocaleString("en-US") + "개";
    }
    var r = byId(D.reels, id);
    if (r) {
      var rs = R.querySelectorAll('[data-rl="' + id + '"]');
      for (var k = 0; k < rs.length; k++) rs[k].textContent = fmt(r.likes + (on ? 1 : 0));
    }
  }

  /* =======================================================
     클릭 처리 (모든 버튼)
  ======================================================= */
  function onClick(e) {
    var wrap = e.target.closest(".ig-media");
    if (wrap && !e.target.closest("[data-a]")) { onMediaTap(wrap); return; }
    var t = e.target.closest("[data-a]");
    if (!t) return;
    var a = t.getAttribute("data-a"), id = t.getAttribute("data-id");
    switch (a) {
      case "back": pop(); break;
      case "toast": Phone.toast(t.getAttribute("data-m") || "준비 중이에요"); break;
      case "like": doLike(id); break;
      case "save":
        st.saved[id] = !st.saved[id];
        t.classList.toggle("on", st.saved[id]);
        t.innerHTML = ic("bm", { fill: st.saved[id] ? "currentColor" : "none" });
        Phone.toast(st.saved[id] ? "저장됨" : "저장 취소됨");
        break;
      case "capmore":
        st.captionOpen[id] = true;
        var art = t.closest(".ig-post");
        var p = byId(D.posts, id);
        art.querySelector(".ig-cap").innerHTML = "<b>" + esc(user(p.u).handle) + "</b> " + linkify(p.caption);
        break;
      case "comments": openComments(t.getAttribute("data-k") === "reel" ? byId(D.reels, id) : byId(D.posts, id), t.getAttribute("data-k") === "reel"); break;
      case "user": openUser(t.getAttribute("data-u")); break;
      case "avstory": openAvatarStory(t.getAttribute("data-u")); break;
      case "story": openStory(+t.getAttribute("data-i")); break;
      case "hl": openHighlight(+t.getAttribute("data-i")); break;
      case "notifs": openNotifs(); break;
      case "dmtab": closeAll(); showTab("dm"); break;
      case "thread": openThread(id); break;
      case "postdetail": openPostList(t.getAttribute("data-list"), id); break;
      case "reeltap": openReelFrom(id); break;
      case "ptab": profTab = t.getAttribute("data-pt"); renderProfile(); break;
      case "follow": toggleFollow(t.getAttribute("data-u"), t); break;
      case "notif": goNotif(id); break;
      case "cpost": sendComment(t); break;
      case "clike": toggleCLike(t); break;
      case "storygone": openGoneStory(); break;
      case "sheetclose": closeSheet(); break;
      case "reelfollow": t.textContent = t.classList.toggle("on") ? "팔로잉" : "팔로우"; break;
      case "edit": Phone.toast("프로필 편집은 준비 중이에요"); break;
      case "dsend": sendDM(t); break;
    }
  }

  /* =======================================================
     사진 크게 보기
  ======================================================= */
  function openViewer(id, idx) {
    var p = byId(D.posts, id);
    if (!p) return;
    var slides = p.media.map(function (m) { return '<div class="ig-slide">' + mediaHTML(m) + "</div>"; }).join("");
    var o = push(
      '<div class="ig-vw-h"><button class="ig-back" data-a="back">' + ic("close", { sw: 2.2 }) + "</button>" +
      '<div class="ig-vw-t">' + nameHTML(p.u) + '</div><span class="ig-vw-n">' + (idx + 1) + "/" + p.media.length + "</span></div>" +
      '<div class="ig-car ig-vw-car">' + slides + "</div>" +
      '<div class="ig-vw-f"><button data-a="like" data-id="' + id + '" class="ig-like' + (st.liked[id] ? " on" : "") + '">' + ic("heart", { fill: st.liked[id] ? "#ff3040" : "none" }) + "</button>" +
      '<button data-a="comments" data-k="post" data-id="' + id + '">' + ic("comment") + "</button>" +
      '<span class="ig-vw-cap">' + esc(p.caption.split("\n")[0]) + "</span></div>",
      "ig-viewer");
    var car = o.querySelector(".ig-car");
    car.scrollLeft = idx * car.clientWidth;
    car.addEventListener("scroll", function () {
      o.querySelector(".ig-vw-n").textContent = (Math.round(car.scrollLeft / (car.clientWidth || 1)) + 1) + "/" + p.media.length;
    });
  }

  /* =======================================================
     댓글 (게시물 = 전체 화면, 릴스 = 아래에서 올라오는 창)
  ======================================================= */
  function commentRow(c, itemId, idx) {
    var key = itemId + "_" + idx;
    var liked = st.likedC[key];
    return '<div class="ig-c">' + av(c.u, 30) +
      '<div class="ig-c-b"><div class="ig-c-t"><b>' + esc(user(c.u).handle) + "</b> <span class='ig-c-time'>" + esc(c.time) + "</span></div>" +
      '<div class="ig-c-x">' + linkify(c.text) + "</div>" +
      '<div class="ig-c-s"><span>답글 달기</span></div></div>' +
      '<button class="ig-c-l' + (liked ? " on" : "") + '" data-a="clike" data-key="' + key + '" data-n="' + c.likes + '">' +
      ic("heart", { fill: liked ? "#ff3040" : "none", cls: "sm" }) + "<small>" + (c.likes + (liked ? 1 : 0)) + "</small></button></div>";
  }

  function commentsBody(item) {
    var cs = allComments(item);
    var capU = item.u;
    var capRow = '<div class="ig-c ig-c-cap">' + av(capU, 30) + '<div class="ig-c-b"><div class="ig-c-x"><b>' + esc(user(capU).handle) + "</b> " +
      linkify(item.caption) + '</div><div class="ig-c-s"><span>' + esc(item.time) + "</span></div></div></div>";
    return capRow + cs.map(function (c, i) { return commentRow(c, item.id, i); }).join("") +
      '<div class="ig-c-more">댓글 ' + cCount(item).toLocaleString("en-US") + "개 중 " + cs.length + "개를 보고 있어요</div>";
  }

  function inputBar(itemId, kind) {
    return '<div class="ig-cin">' + av("me", 30) +
      '<input type="text" placeholder="' + esc(user("me").handle) + '(으)로 댓글 달기..." data-cin="' + itemId + '" data-k="' + kind + '">' +
      '<button data-a="cpost" data-id="' + itemId + '" data-k="' + kind + '">게시</button></div>';
  }

  function openComments(item, isReel) {
    if (!item) return;
    if (isReel) { openSheet(item); return; }
    var o = push(hdr("댓글", ic("dm")) + '<div class="ig-scroll ig-cbody" data-cb="' + item.id + '">' + commentsBody(item) + "</div>" + inputBar(item.id, "post"), "ig-comments");
    bindInput(o);
  }

  function openSheet(item) {
    closeSheet();
    var s = document.createElement("div");
    s.className = "ig-sheet";
    s.innerHTML = '<div class="ig-sheet-bg" data-a="sheetclose"></div><div class="ig-sheet-p">' +
      '<div class="ig-sheet-grab"></div><div class="ig-sheet-t">댓글</div>' +
      '<div class="ig-scroll ig-cbody" data-cb="' + item.id + '">' + commentsBody(item) + "</div>" + inputBar(item.id, "reel") + "</div>";
    els.sheetWrap.appendChild(s);
    sheetEl = s;
    Apps.dragScroll(s.querySelector(".ig-scroll"));
    bindInput(s);
    void s.offsetWidth;
    s.classList.add("in");
  }
  function closeSheet() {
    if (!sheetEl) return;
    var s = sheetEl; sheetEl = null;
    s.classList.remove("in");
    setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 280);
  }

  function bindInput(scope) {
    var inp = scope.querySelector("input[data-cin]");
    if (!inp) return;
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); sendComment(scope.querySelector('[data-a="cpost"]')); }
    });
  }

  function sendComment(btn) {
    var wrap = btn.closest(".ig-cin");
    var inp = wrap.querySelector("input");
    var text = inp.value.trim();
    if (!text) return;
    var id = btn.getAttribute("data-id"), kind = btn.getAttribute("data-k");
    var item = kind === "reel" ? byId(D.reels, id) : byId(D.posts, id);
    (st.extraComments[id] = st.extraComments[id] || []).push({ u: "me", text: text, time: "방금", likes: 0 });
    inp.value = "";
    var bodies = R.querySelectorAll('[data-cb="' + id + '"]');
    for (var i = 0; i < bodies.length; i++) {
      bodies[i].innerHTML = commentsBody(item);
      bodies[i].scrollTop = bodies[i].scrollHeight;
    }
    var all = R.querySelectorAll('.ig-allc[data-id="' + id + '"]');
    for (var j = 0; j < all.length; j++) all[j].textContent = "댓글 " + cCount(item).toLocaleString("en-US") + "개 모두 보기";
    var rc = R.querySelectorAll('[data-rc="' + id + '"]');
    for (var k = 0; k < rc.length; k++) rc[k].textContent = fmt(cCount(item));
  }

  function toggleCLike(btn) {
    var key = btn.getAttribute("data-key"), n = +btn.getAttribute("data-n");
    st.likedC[key] = !st.likedC[key];
    var on = st.likedC[key];
    btn.classList.toggle("on", on);
    btn.innerHTML = ic("heart", { fill: on ? "#ff3040" : "none", cls: "sm" }) + "<small>" + (n + (on ? 1 : 0)) + "</small>";
  }

  /* =======================================================
     게시물 목록 / 상세 (프로필 격자, 알림에서 이동)
  ======================================================= */
  function openPostList(listName, startId) {
    var list = postListByName(listName);
    var o = push(hdr("게시물") + '<div class="ig-scroll">' + list.map(postHTML).join("") + "</div>", "ig-postlist");
    bindCarousels(o);
    var target = o.querySelector('[data-pid="' + startId + '"]');
    if (target) setTimeout(function () { o.querySelector(".ig-scroll").scrollTop = target.offsetTop - 4; }, 340);
    return o;
  }
  function postListByName(n) {
    if (n === "mine") return D.posts.filter(function (p) { return p.u === "me"; });
    if (n === "tagged") return D.posts.filter(function (p) { return p.tagMe; });
    if (n.indexOf("u:") === 0) return D.posts.filter(function (p) { return p.u === n.slice(2); });
    return D.posts.slice();
  }
  function openPostSingle(id, withComments) {
    var p = byId(D.posts, id);
    if (!p) return;
    var o = push(hdr("게시물") + '<div class="ig-scroll">' + postHTML(p) + "</div>", "ig-postlist");
    bindCarousels(o);
    if (withComments) setTimeout(function () { openComments(p, false); }, 340);
  }

  /* =======================================================
     다른 사람 프로필
  ======================================================= */
  function openUser(id) {
    if (id === "me") { closeAll(); showTab("profile"); return; }
    var u = user(id);
    var posts = D.posts.filter(function (p) { return p.u === id; });
    var f = st.following[id];
    var grid = posts.length
      ? '<div class="ig-grid">' + posts.map(function (p) {
          return '<button class="ig-gi" data-a="postdetail" data-list="u:' + id + '" data-id="' + p.id + '" style="' + bg(p.media[0]) + '"><span>' + esc(p.media[0].label) + "</span>" +
            (p.media.length > 1 ? '<i class="ig-multi"></i>' : "") + "</button>";
        }).join("") + "</div>"
      : '<div class="ig-empty">게시물이 없습니다</div>';
    var o = push(
      hdr(nameHTML(id), ic("more")) +
      '<div class="ig-scroll"><div class="ig-pf-top">' + av(id, 72, D.users[id] && D.users[id].storyGone ? 0 : 0) +
      '<div class="ig-stats"><div><b>' + posts.length + "</b>게시물</div><div><b>" + esc(u.followers || "0") + "</b>팔로워</div><div><b>" + esc(u.following || "0") + "</b>팔로잉</div></div></div>" +
      '<div class="ig-pf-bio"><b>' + esc(u.name) + "</b><p>" + esc(u.bio || "").replace(/\n/g, "<br>") + "</p></div>" +
      '<div class="ig-pf-btns"><button class="ig-btn ' + (f ? "gray" : "blue") + '" data-a="follow" data-u="' + id + '">' + (f ? "팔로잉" : "팔로우") + "</button>" +
      '<button class="ig-btn gray" data-a="dmuser" data-u="' + id + '">메시지</button></div>' + grid + "</div>",
      "ig-userpf");
    var dmBtn = o.querySelector('[data-a="dmuser"]');
    dmBtn.addEventListener("click", function () {
      var th = D.dms.filter(function (d) { return d.u === id; })[0];
      if (th) openThread(th.id); else Phone.toast("아직 대화방이 없어요");
    });
  }
  function toggleFollow(id, btn) {
    st.following[id] = !st.following[id];
    btn.textContent = st.following[id] ? "팔로잉" : "팔로우";
    btn.className = "ig-btn " + (st.following[id] ? "gray" : "blue");
  }

  /* =======================================================
     스토리 / 하이라이트
  ======================================================= */
  function openStory(i) {
    var s = D.stories[i];
    var u = D.users[s.u];
    if (u && u.storyGone) { openGoneStory(); return; }
    runStory(user(s.u).handle, s.u, s.frames, function () { s.seen = true; renderHome(); });
  }
  function openHighlight(i) {
    var h = D.highlights[i];
    runStory(h.title, "me", h.frames.map(function (f) { f.time = f.time || ""; return f; }));
  }
  function runStory(title, uid, frames, done) {
    var idx = 0, DUR = 4500, t0 = Date.now();
    var bars = frames.map(function () { return '<i><b></b></i>'; }).join("");
    var o = push('<div class="ig-sv-bg"></div>' +
      '<div class="ig-sv-bars">' + bars + "</div>" +
      '<div class="ig-sv-h">' + av(uid, 28) + "<b>" + esc(title) + '</b><span class="ig-sv-time"></span>' +
      '<button class="ig-back" data-a="back">' + ic("close", { sw: 2.2 }) + "</button></div>" +
      '<div class="ig-sv-m"><span class="ig-sv-txt"></span></div>' +
      '<div class="ig-sv-tap"><i data-d="-1"></i><i data-d="1"></i></div>' +
      '<div class="ig-sv-f"><div class="ig-sv-in">메시지 보내기...</div>' + ic("heart") + ic("dm") + "</div>", "ig-story");
    function show(n) {
      idx = n;
      if (idx >= frames.length) { pop(); return; }
      if (idx < 0) idx = 0;
      var f = frames[idx];
      o.querySelector(".ig-sv-bg").setAttribute("style", bg(f));
      o.querySelector(".ig-sv-txt").textContent = (f.text || "") + (f.label ? "\n" + f.label : "");
      o.querySelector(".ig-sv-time").textContent = f.time || "";
      var bs = o.querySelectorAll(".ig-sv-bars i b");
      for (var k = 0; k < bs.length; k++) bs[k].style.width = k < idx ? "100%" : "0%";
      t0 = Date.now();
    }
    o._timer = setInterval(function () {
      if (stack[stack.length - 1] !== o) return;
      var r = (Date.now() - t0) / DUR;
      var b = o.querySelectorAll(".ig-sv-bars i b")[idx];
      if (b) b.style.width = Math.min(100, r * 100) + "%";
      if (r >= 1) show(idx + 1);
    }, 60);
    o._onClose = done;
    o.querySelector(".ig-sv-tap").addEventListener("click", function (e) {
      var d = e.target.getAttribute("data-d");
      if (d) show(idx + (+d));
    });
    show(0);
  }
  function openGoneStory() {
    push('<div class="ig-sv-bg" style="background:#111"></div>' +
      '<div class="ig-sv-h"><b></b><button class="ig-back" data-a="back">' + ic("close", { sw: 2.2 }) + "</button></div>" +
      '<div class="ig-gone"><div>' + ic("close", { sw: 1.6 }) + '</div><b>스토리를 볼 수 없습니다.</b><p>삭제되었거나 더 이상 공개되지 않는 스토리입니다.</p></div>', "ig-story");
  }

  /* =======================================================
     하트 알림
  ======================================================= */
  function openNotifs() {
    var sec = { new: "새로운 알림", week: "이번 주", month: "이번 달", earlier: "이전 활동" };
    var html = "";
    ["new", "week", "month", "earlier"].forEach(function (k) {
      var list = D.notifs.filter(function (n) { return n.section === k; });
      if (!list.length) return;
      html += '<div class="ig-sec">' + sec[k] + "</div>" + list.map(function (n) {
        var thumb = "";
        if (n.target && n.target.kind === "post") { var p = byId(D.posts, n.target.id); if (p) thumb = '<span class="ig-nt" style="' + bg(p.media[0]) + '"></span>'; }
        else if (n.target && n.target.kind === "reel") { var r = byId(D.reels, n.target.id); if (r) thumb = '<span class="ig-nt" style="' + bg(r) + '"></span>'; }
        else if (n.type === "follow") thumb = '<span class="ig-nf">' + (st.following[n.u] ? "팔로잉" : "팔로우") + "</span>";
        return '<button class="ig-n' + (n.unread ? " unread" : "") + '" data-a="notif" data-id="' + n.id + '">' + av(n.u, 38) +
          '<span class="ig-n-t"><b>' + esc(user(n.u).handle) + "</b>" + linkify(n.text) + ' <em>' + esc(n.time) + "</em></span>" + thumb + "</button>";
      }).join("");
    });
    var o = push(hdr("활동") + '<div class="ig-scroll">' + html + "</div>", "ig-notifs");
    // 열어본 알림은 읽음 처리 (숫자 배지는 바로 사라지고, 파란 점은 다음에 열 때 사라져요)
    var ids = D.notifs.filter(function (n) { return n.unread; });
    ids.forEach(function (n) { n._wasUnread = true; });
    D.notifs.forEach(function (n) { n.unread = false; });
    updateBadges();
  }

  function goNotif(id) {
    var n = byId(D.notifs, id);
    if (!n || !n.target) return;
    var tg = n.target;
    if (tg.kind === "post") {
      openPostSingle(tg.id, tg.comments);
    } else if (tg.kind === "reel") {
      closeAll();
      showTab("reels");
      scrollToReel(tg.id);
      if (tg.comments) setTimeout(function () { openSheet(byId(D.reels, tg.id)); }, 450);
    } else if (tg.kind === "user") {
      openUser(tg.id);
    }
  }

  /* =======================================================
     릴스
  ======================================================= */
  function renderReels() {
    els.panels.reels.innerHTML =
      '<div class="ig-reel-top"><b>릴스</b>' + ic("cam") + "</div>" +
      '<div class="ig-reels">' + D.reels.map(reelHTML).join("") + "</div>";
    var box = els.panels.reels.querySelector(".ig-reels");
    box.addEventListener("scroll", function () { clearTimeout(box._t); box._t = setTimeout(playVisible, 80); });
    Apps.dragScroll(box);
  }

  function reelHTML(r) {
    var u = user(r.u);
    var liked = st.liked[r.id];
    return '<section class="ig-reel" data-rid="' + r.id + '" style="' + bg(r) + '">' +
      '<div class="ig-r-center"><span>' + esc(r.label) + '</span><i class="ig-r-play"></i></div>' +
      '<div class="ig-r-tapzone" data-rt="' + r.id + '"></div>' +
      '<div class="ig-r-pop">' + ic("heart", { fill: "#fff", sw: 0 }) + "</div>" +
      '<div class="ig-r-side">' +
        '<button data-a="like" data-id="' + r.id + '" class="ig-like' + (liked ? " on" : "") + '">' + ic("heart", { fill: liked ? "#ff3040" : "none" }) + "<small data-rl=\"" + r.id + "\">" + fmt(r.likes + (liked ? 1 : 0)) + "</small></button>" +
        '<button data-a="comments" data-k="reel" data-id="' + r.id + '">' + ic("comment") + '<small data-rc="' + r.id + '">' + fmt(cCount(r)) + "</small></button>" +
        '<button data-a="toast" data-m="공유 기능은 준비 중이에요">' + ic("dm") + "<small>공유</small></button>" +
        '<button data-a="toast" data-m="더보기 메뉴는 준비 중이에요">' + ic("more") + "</button>" +
        '<span class="ig-r-disc" style="background:' + u.color + '"></span></div>' +
      '<div class="ig-r-bot">' +
        (r.tagMe ? '<div class="ig-r-tag">' + ic("tagged", { cls: "sm" }) + " 회원님을 태그함</div>" : "") +
        '<div class="ig-r-u">' + (isLocked(r.u)
          ? '<button data-a="avstory" data-u="' + r.u + '">' + av(r.u, 30, "new") + '</button><b class="ig-r-nm">' + nameHTML(r.u) + "</b>"
          : '<button data-a="user" data-u="' + r.u + '">' + av(r.u, 30) + "<b>" + nameHTML(r.u) + "</b></button>") +
        (r.u === "me" ? "" : '<button class="ig-r-fol" data-a="reelfollow">팔로우</button>') + "</div>" +
        '<div class="ig-r-cap">' + linkify(r.caption) + "</div>" +
        '<div class="ig-r-mu">' + ic("music", { cls: "sm" }) + " " + esc(r.music) + "</div></div></section>";
  }

  /* 릴스를 두 번 누르면 좋아요 */
  var rTap = null, rTapId = null;
  function reelTap(zone) {
    var id = zone.getAttribute("data-rt");
    var sec = zone.parentNode;
    if (rTap && rTapId === id) {
      clearTimeout(rTap); rTap = null;
      doLike(id, true);
      var pp = sec.querySelector(".ig-r-pop");
      pp.classList.remove("go"); void pp.offsetWidth; pp.classList.add("go");
      return;
    }
    rTapId = id;
    rTap = setTimeout(function () { rTap = null; sec.classList.toggle("paused"); }, 270);
  }
  document.addEventListener("click", function (e) {
    var z = e.target.closest && e.target.closest(".ig-r-tapzone");
    if (z && R && R.contains(z)) reelTap(z);
  });

  function playVisible() {
    var box = els.panels.reels.querySelector(".ig-reels");
    if (!box) return;
    var secs = box.children, h = box.clientHeight || 1;
    var i = Math.round(box.scrollTop / h);
    for (var k = 0; k < secs.length; k++) secs[k].classList.toggle("active", k === i);
  }
  function scrollToReel(id) {
    var box = els.panels.reels.querySelector(".ig-reels");
    var sec = box.querySelector('[data-rid="' + id + '"]');
    if (sec) { box.scrollTop = sec.offsetTop; }
    setTimeout(playVisible, 50);
  }
  function openReelFrom(id) { closeAll(); showTab("reels"); scrollToReel(id); }

  /* =======================================================
     DM
  ======================================================= */
  function renderDMList() {
    var list = D.dms.map(function (d) {
      var u = user(d.u);
      var un = d.unread > 0;
      return '<button class="ig-d' + (un ? " un" : "") + '" data-a="thread" data-id="' + d.id + '">' + av(d.u, 46, D.users[d.u] && D.users[d.u].storyGone ? 0 : 0) +
        '<span class="ig-d-b"><b>' + esc(u.name) + '</b><span class="ig-d-l">' + esc(d.last) + " · " + esc(d.time) + "</span></span>" +
        (un ? '<span class="ig-d-n">' + d.unread + "</span>" : ic("cam", { cls: "sm gray" })) + "</button>";
    }).join("");
    els.panels.dm.innerHTML =
      '<div class="ig-top"><div class="ig-top-in dmh"><button data-a="back0" class="ig-top-l" style="visibility:hidden">' + ic("back") + "</button>" +
      '<div class="ig-dm-title">' + esc(D.me.handle) + '<svg class="ig-chev" viewBox="0 0 24 24" width="14" height="14"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg></div>' +
      '<div class="ig-top-r"><button data-a="toast" data-m="새 메시지는 준비 중이에요">' + ic("plus", { sw: 2.2 }) + "</button></div></div></div>" +
      '<div class="ig-scroll"><div class="ig-dsearch">' + ic("search", { cls: "sm" }) + " 검색</div>" +
      '<div class="ig-dtabs"><b>메시지</b><span>요청</span></div>' + list + "</div>";
    Apps.dragScroll(els.panels.dm.querySelector(".ig-scroll"));
  }

  function bubble(m) {
    if (m.k === "day") return '<div class="ig-day">' + esc(m.text) + "</div>";
    if (m.k === "tag") return '<div class="ig-tagline">' + esc(m.text) + "</div>";
    if (m.k === "gone") return '<button class="ig-gonecard' + (m.side === "me" ? " me" : "") + '" data-a="storygone"><span class="ig-gonecard-ic">' + ic("close", { sw: 2 }) + "</span><b>" + esc(m.text) + "</b><small>탭하여 확인</small></button>";
    return '<div class="ig-b ' + (m.k === "me" ? "me" : "them") + '">' + esc(m.text) + "</div>";
  }

  function openThread(id) {
    var d = byId(D.dms, id);
    if (!d) return;
    var u = user(d.u);
    d.unread = 0;
    var o = push(
      '<div class="ig-ov-h dmth"><button class="ig-back" data-a="back">' + ic("back", { sw: 2.2 }) + "</button>" +
      '<button class="ig-th-u" data-a="user" data-u="' + d.u + '">' + av(d.u, 30) + '<span><b>' + esc(u.name) + "</b><small>" + esc(u.handle) + "</small></span></button>" +
      '<div class="ig-ov-r">' + ic("phone") + ic("video") + "</div></div>" +
      '<div class="ig-scroll ig-chat" data-chat="' + id + '">' +
        '<div class="ig-chat-top">' + av(d.u, 64) + "<b>" + esc(u.name) + "</b><small>" + esc(u.handle) + " · Instagram</small>" +
        '<button class="ig-btn gray" data-a="user" data-u="' + d.u + '">프로필 보기</button></div>' +
        d.msgs.map(bubble).join("") + "</div>" +
      '<div class="ig-cin ig-dmin"><span class="ig-cam">' + ic("cam", { cls: "sm" }) + '</span><input type="text" placeholder="메시지 보내기..." data-din="' + id + '">' +
      '<button data-a="dsend" data-id="' + id + '">보내기</button></div>', "ig-thread");
    var ch = o.querySelector(".ig-chat");
    setTimeout(function () { ch.scrollTop = ch.scrollHeight; }, 330);
    o.querySelector("input").addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); sendDM(o.querySelector('[data-a="dsend"]')); }
    });
    updateBadges();
  }

  function sendDM(btn) {
    var id = btn.getAttribute("data-id");
    var d = byId(D.dms, id);
    var inp = btn.parentNode.querySelector("input");
    var text = inp.value.trim();
    if (!text) return;
    var m = { k: "me", text: text, time: "방금" };
    d.msgs.push(m);
    d.last = "나: " + text; d.time = "방금";
    inp.value = "";
    var ch = R.querySelector('[data-chat="' + id + '"]');
    ch.insertAdjacentHTML("beforeend", bubble(m));
    ch.scrollTop = ch.scrollHeight;
  }

  /* =======================================================
     검색(탐색)
  ======================================================= */
  function renderSearch() {
    els.panels.search.innerHTML =
      '<div class="ig-top"><div class="ig-searchbar">' + ic("search", { cls: "sm" }) + '<input type="text" placeholder="검색" id="ig-q"></div></div>' +
      '<div class="ig-scroll"><div id="ig-sbody"></div></div>';
    Apps.dragScroll(els.panels.search.querySelector(".ig-scroll"));
    var inp = els.panels.search.querySelector("#ig-q");
    inp.addEventListener("input", function () { drawSearch(inp.value.trim()); });
    drawSearch("");
  }
  function drawSearch(q) {
    var body = els.panels.search.querySelector("#ig-sbody");
    var posts = D.posts;
    if (!q) {
      body.innerHTML = '<div class="ig-grid ex">' + posts.map(function (p, i) {
        return '<button class="ig-gi' + (i % 7 === 0 ? " big" : "") + '" data-a="postdetail" data-list="all" data-id="' + p.id + '" style="' + bg(p.media[0]) + '"><span>' + esc(p.media[0].label) + "</span>" +
          (p.media.length > 1 ? '<i class="ig-multi"></i>' : "") + "</button>";
      }).join("") + "</div>";
      return;
    }
    var ql = q.replace(/^[@#]/, "").toLowerCase();
    var us = Object.keys(D.users).filter(function (k) {
      var u = D.users[k];
      return (u.handle + u.name).toLowerCase().indexOf(ql) > -1;
    });
    if ((D.me.handle + D.me.name).toLowerCase().indexOf(ql) > -1) us.unshift("me");
    var ps = posts.filter(function (p) { return (p.caption + user(p.u).handle).toLowerCase().indexOf(ql) > -1; });
    var h = us.map(function (k) {
      var u = user(k);
      return '<button class="ig-d" data-a="user" data-u="' + k + '">' + av(k, 38) + '<span class="ig-d-b"><b>' + nameHTML(k) + '</b><span class="ig-d-l">' + esc(u.name) + "</span></span></button>";
    }).join("");
    if (ps.length) h += '<div class="ig-sec">게시물</div><div class="ig-grid">' + ps.map(function (p) {
      return '<button class="ig-gi" data-a="postdetail" data-list="all" data-id="' + p.id + '" style="' + bg(p.media[0]) + '"><span>' + esc(p.media[0].label) + "</span></button>";
    }).join("") + "</div>";
    body.innerHTML = h || '<div class="ig-empty">"' + esc(q) + '" 검색 결과가 없어요</div>';
  }

  /* =======================================================
     내 프로필
  ======================================================= */
  function renderProfile() {
    var me = D.me;
    var mine = D.posts.filter(function (p) { return p.u === "me"; });
    var tagged = D.posts.filter(function (p) { return p.tagMe; });
    var grid;
    function cell(p, list) {
      return '<button class="ig-gi" data-a="postdetail" data-list="' + list + '" data-id="' + p.id + '" style="' + bg(p.media[0]) + '"><span>' + esc(p.media[0].label) + "</span>" +
        (p.media.length > 1 ? '<i class="ig-multi"></i>' : "") + "</button>";
    }
    if (profTab === "grid") grid = '<div class="ig-grid">' + mine.map(function (p) { return cell(p, "mine"); }).join("") + "</div>";
    else if (profTab === "reels") grid = '<div class="ig-grid reels">' + D.reels.filter(function (r) { return r.u === "me"; }).concat(D.reels.filter(function (r) { return r.u !== "me" && r.tagMe; })).map(function (r) {
      return '<button class="ig-gi r" data-a="reeltap" data-id="' + r.id + '" style="' + bg(r) + '"><span>' + esc(r.label) + '</span><em>▶ ' + fmt(r.likes) + "</em></button>";
    }).join("") + "</div>";
    else grid = '<div class="ig-grid">' + tagged.map(function (p) { return cell(p, "tagged"); }).join("") + "</div>";

    var hl = D.highlights.map(function (h, i) {
      return '<button class="ig-hl" data-a="hl" data-i="' + i + '"><span class="ig-hl-c"><span style="' + bg(h) + '"></span></span><small>' + esc(h.title) + "</small></button>";
    }).join("") + '<button class="ig-hl" data-a="toast" data-m="새 하이라이트는 준비 중이에요"><span class="ig-hl-c add">' + ic("plus", { sw: 2 }) + "</span><small>신규</small></button>";

    els.panels.profile.innerHTML =
      '<div class="ig-top"><div class="ig-top-in">' +
        '<button class="ig-top-l" style="visibility:hidden">' + ic("plus") + "</button>" +
        '<div class="ig-pf-id">' + esc(me.handle) + CHECK + "</div>" +
        '<div class="ig-top-r"><button data-a="toast" data-m="새 게시물 만들기는 준비 중이에요">' + ic("plus", { sw: 2.2 }) + '</button><button data-a="toast" data-m="메뉴는 준비 중이에요">' + ic("menu", { sw: 2.2 }) + "</button></div></div></div>" +
      '<div class="ig-scroll"><div class="ig-pf-top">' + av("me", 76, "new") +
        '<div class="ig-stats"><div><b>' + esc(me.posts) + "</b>게시물</div><div><b>" + esc(me.followers) + "</b>팔로워</div><div><b>" + esc(me.following) + "</b>팔로잉</div></div></div>" +
        '<div class="ig-pf-bio"><b>' + esc(me.name) + "</b><p>" + esc(me.bio).replace(/\n/g, "<br>") + '</p><span class="ig-lnk">' + esc(me.link) + "</span></div>" +
        '<div class="ig-pf-btns"><button class="ig-btn gray" data-a="edit">프로필 편집</button><button class="ig-btn gray" data-a="toast" data-m="프로필 공유는 준비 중이에요">프로필 공유</button></div>' +
        '<div class="ig-hls">' + hl + "</div>" +
        '<div class="ig-ptabs">' +
          '<button data-a="ptab" data-pt="grid" class="' + (profTab === "grid" ? "on" : "") + '">' + ic("grid") + "</button>" +
          '<button data-a="ptab" data-pt="reels" class="' + (profTab === "reels" ? "on" : "") + '">' + ic("reels") + "</button>" +
          '<button data-a="ptab" data-pt="tagged" class="' + (profTab === "tagged" ? "on" : "") + '">' + ic("tagged") + "</button></div>" +
        grid + "</div>";
    Apps.dragScroll(els.panels.profile.querySelector(".ig-scroll"));
    hDrag(els.panels.profile.querySelector(".ig-hls"));
  }

  /* ---------- 키보드 ESC = 뒤로 ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && R && Apps.current() === "instagram") {
      if (sheetEl) closeSheet(); else pop();
    }
  });

  Apps.register("instagram", {
    theme: "light",
    build: build,
    onShow: function () { updateTheme(); updateBadges(); }
  });

})();
