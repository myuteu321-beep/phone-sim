/* =========================================================
   news.js  —  뉴스 앱 동작 (구글 뉴스 느낌의 가상 뉴스)
   내용(기사, 언론사)은 data/news-data.js 에서 바꿔요. 이 파일은 고칠 일이 거의 없어요.
   - 헤드라인 목록 + 분류 탭, 저장됨, 검색
   - 기사를 누르면 상세 화면 (대표 사진, 본문, 관련 기사, 댓글)
   - 읽은 기사는 흐리게, 안 읽은 기사 개수 표시
   - 앱을 나갔다 들어와도 보던 화면이 그대로 유지돼요
   ========================================================= */

(function () {
  "use strict";

  var D = window.NEWS_DATA || { articles: [], outlets: {}, cats: [] };
  var Apps = window.Apps, Phone = window.Phone;
  var R, els = {};

  var S = { tab: "home", cat: "all", read: {}, saved: {}, liked: {}, stack: [], query: "" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var P = {
    home:   '<path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    saved:  '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    back:   '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    share:  '<path d="M12 16V3M7 8l5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
    up:     '<path d="M7 11l5-6 5 6M5 21V13h4v8zM13 13h6a2 2 0 0 1 2 2l-1 4a2 2 0 0 1-2 2h-5z"/>'
  };
  function ic(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + P[n] + "</svg>"; }

  function byId(id) { for (var i = 0; i < D.articles.length; i++) if (D.articles[i].id === id) return D.articles[i]; return null; }
  function outletOf(a) { return D.outlets[a.outlet] || { name: a.outlet, color: "#555" }; }
  function heroStyle(a) {
    var h = a.hero || {};
    return h.img ? "background-image:url('" + esc(h.img) + "')"
                 : "background:linear-gradient(135deg," + esc(h.c1 || "#ccd") + "," + esc(h.c2 || "#99a") + ")";
  }
  function unreadCount() { return D.articles.filter(function (a) { return !S.read[a.id]; }).length; }
  function src(a) {
    var o = outletOf(a);
    return '<div class="nw-src"><span class="nw-dot" style="background:' + esc(o.color) + '">' + esc(o.name.charAt(0)) + "</span><b>" + esc(o.name) + "</b><span>· " + esc(a.time) + "</span></div>";
  }
  function bigCard(a) {
    var h = a.hero || {};
    return '<button class="nw-big' + (S.read[a.id] ? " read" : "") + '" data-a="' + a.id + '" type="button">' +
      '<div class="nw-hero" style="' + heroStyle(a) + '">' + (h.img || !h.label ? "" : "<span>" + esc(h.label) + "</span>") + "</div>" +
      src(a) + "<h3>" + esc(a.title) + "</h3></button>";
  }
  function itemRow(a) {
    var h = a.hero || {};
    return '<button class="nw-item' + (S.read[a.id] ? " read" : "") + '" data-a="' + a.id + '" type="button"><div class="tx">' +
      src(a) + "<h4>" + esc(a.title) + '</h4></div><div class="th" style="' + heroStyle(a) + '"></div></button>';
  }

  /* ---------- 목록 그리기 ---------- */
  function renderHome() {
    var list = D.articles.filter(function (a) { return S.cat === "all" || a.cat === S.cat; });
    var html = "";
    if (!list.length) html = '<div class="nw-empty">이 분류의 기사가 아직 없어요.</div>';
    else {
      html = bigCard(list[0]);
      for (var i = 1; i < list.length; i++) html += itemRow(list[i]);
      html += '<div class="nw-end">기사 ' + list.length + "개 · 모두 확인했어요</div>";
    }
    els.homeBody.innerHTML = html;
    els.chips.innerHTML = D.cats.map(function (c) {
      return '<button class="nw-chip' + (c.id === S.cat ? " on" : "") + '" data-c="' + c.id + '" type="button">' + esc(c.name) + "</button>";
    }).join("");
    var n = unreadCount();
    els.badge.textContent = n;
    els.badge.style.display = n ? "inline-flex" : "none";
  }
  function renderSaved() {
    var list = D.articles.filter(function (a) { return S.saved[a.id]; });
    els.savedBody.innerHTML = list.length ? list.map(itemRow).join("") + '<div class="nw-end">저장한 기사 ' + list.length + "개</div>"
      : '<div class="nw-empty">저장한 기사가 없어요.<br>기사 화면의 북마크 버튼을 눌러 저장해 보세요.</div>';
  }
  function renderSearch() {
    var q = S.query.trim().toLowerCase();
    if (!q) { els.searchBody.innerHTML = '<div class="nw-empty">기사 제목, 언론사 이름으로<br>검색해 보세요.<br>예) 입장, 팬, 가상일보</div>'; return; }
    var list = D.articles.filter(function (a) {
      return (a.title + " " + outletOf(a).name + " " + (a.body || []).join(" ")).toLowerCase().indexOf(q) >= 0;
    });
    els.searchBody.innerHTML = list.length ? list.map(itemRow).join("") + '<div class="nw-end">검색 결과 ' + list.length + "개</div>" : '<div class="nw-empty">검색 결과가 없어요.</div>';
  }
  function refreshLists() { renderHome(); renderSaved(); renderSearch(); }

  /* ---------- 기사 상세 ---------- */
  function related(a) {
    var same = D.articles.filter(function (x) { return x.id !== a.id && x.cat === a.cat; });
    var other = D.articles.filter(function (x) { return x.id !== a.id && x.cat !== a.cat; });
    return same.concat(other).slice(0, 4);
  }
  function renderDetail() {
    var id = S.stack[S.stack.length - 1], a = byId(id);
    if (!a) return;
    var o = outletOf(a), h = a.hero || {};
    S.read[id] = true;
    var html =
      '<div class="nw-art"><h1>' + esc(a.title) + "</h1>" + (a.sub ? '<div class="sub" style="color:#5f6368;font-size:14px;line-height:1.5;margin:-2px 0 10px">' + esc(a.sub) + "</div>" : "") +
      '<div class="by"><b>' + esc(o.name) + "</b> · " + esc(a.time) + (a.reporter ? "<br>" + esc(a.reporter) : "") + "</div>" +
      '<div class="nw-hero hero" style="' + heroStyle(a) + '"></div>' +
      '<div class="cap">' + esc(h.label || "") + " · 사진 제공: " + esc(o.name) + "</div>" +
      (a.body || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
      '<div class="nw-note">' + esc(D.notice || "") + "</div>";
    var rel = related(a);
    if (rel.length) html += '<div class="nw-h">관련 기사</div>' + rel.map(itemRow).join("");
    var cms = a.comments || [];
    html += '<div class="nw-h">댓글<small>' + cms.length + "</small></div>";
    cms.forEach(function (c, i) {
      var key = id + ":" + i, on = !!S.liked[key];
      html += '<div class="nw-cm"><div class="t"><b>' + esc(c.name) + '</b></div><p>' + esc(c.text) + "</p>" +
        '<button class="' + (on ? "on" : "") + '" data-k="' + key + '" data-n="' + (c.likes || 0) + '" type="button">' + ic("up").replace('<svg ', '<svg width="15" height="15" ') + " " + ((c.likes || 0) + (on ? 1 : 0)) + "</button></div>";
    });
    els.dbody.innerHTML = html;
    els.dbody.scrollTop = 0;
    els.dname.textContent = o.name;
    els.dsave.classList.toggle("on", !!S.saved[id]);
    renderHome();
  }
  function openArticle(id) {
    S.stack.push(id);
    renderDetail();
    els.detail.classList.add("on");
    void els.detail.offsetWidth;
    els.detail.classList.add("show");
  }
  function closeDetail() {
    if (S.stack.length > 1) { S.stack.pop(); renderDetail(); return; }   // 관련 기사에서 들어왔으면 이전 기사로
    S.stack = [];
    els.detail.classList.remove("show");
    setTimeout(function () { if (!S.stack.length) els.detail.classList.remove("on"); }, 320);
    refreshLists();
  }

  /* ---------- 화면 만들기 ---------- */
  function build(root) {
    R = root;
    root.classList.add("nw-app");
    root.innerHTML =
      '<div class="nw-panels">' +
        '<div class="nw-panel on" data-p="home"><div class="nw-top">' +
          '<div class="nw-hd"><div class="nw-logo"><i>뉴</i><i>스</i></div><span class="nw-badge" id="nw-badge"></span></div>' +
          '<div class="nw-date">' + esc(D.today || "") + ' · 서도윤 열애설 관련 기사</div>' +
          '<div class="nw-chips" id="nw-chips"></div></div><div class="nw-scroll" id="nw-homebody"></div></div>' +
        '<div class="nw-panel" data-p="saved"><div class="nw-top"><div class="nw-hd"><div class="nw-logo">저장됨</div></div></div><div class="nw-scroll" id="nw-savedbody"></div></div>' +
        '<div class="nw-panel" data-p="search"><div class="nw-top"><div class="nw-hd"><div class="nw-logo">검색</div></div>' +
          '<label class="nw-search">' + ic("search") + '<input id="nw-q" type="search" placeholder="기사, 언론사 검색" autocomplete="off"></label></div>' +
          '<div class="nw-scroll" id="nw-searchbody"></div></div>' +
      "</div>" +
      '<div class="nw-bar" id="nw-bar">' +
        '<button data-t="home" class="on" type="button">' + ic("home") + "<span>헤드라인</span></button>" +
        '<button data-t="saved" type="button">' + ic("saved") + "<span>저장됨</span></button>" +
        '<button data-t="search" type="button">' + ic("search") + "<span>검색</span></button></div>" +
      '<div class="nw-detail" id="nw-detail"><div class="nw-dtop"><div class="l"><button class="nw-ib" id="nw-dback" type="button">' + ic("back") + '</button><span class="nm" id="nw-dname"></span></div>' +
        '<div><button class="nw-ib" id="nw-dsave" type="button">' + ic("saved") + '</button><button class="nw-ib" id="nw-dshare" type="button">' + ic("share") + "</button></div></div>" +
        '<div class="nw-dscroll" id="nw-dbody"></div></div>';

    var q = function (id) { return root.querySelector("#" + id); };
    els = { badge: q("nw-badge"), chips: q("nw-chips"), homeBody: q("nw-homebody"), savedBody: q("nw-savedbody"), searchBody: q("nw-searchbody"),
            detail: q("nw-detail"), dbody: q("nw-dbody"), dname: q("nw-dname"), dsave: q("nw-dsave") };

    root.querySelectorAll(".nw-scroll, .nw-dscroll").forEach(function (s) { Apps.dragScroll(s); });

    q("nw-bar").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-t]"); if (!b) return;
      S.tab = b.dataset.t;
      root.querySelectorAll(".nw-panel").forEach(function (p) { p.classList.toggle("on", p.dataset.p === S.tab); });
      root.querySelectorAll("#nw-bar button").forEach(function (x) { x.classList.toggle("on", x === b); });
      if (S.tab === "saved") renderSaved();
    });
    els.chips.addEventListener("click", function (e) {
      var b = e.target.closest("[data-c]"); if (!b) return;
      S.cat = b.dataset.c; renderHome(); els.homeBody.scrollTop = 0;
    });
    root.querySelector(".nw-panels").addEventListener("click", function (e) {
      var b = e.target.closest("[data-a]"); if (b) openArticle(b.dataset.a);
    });
    els.dbody.addEventListener("click", function (e) {
      var r = e.target.closest("[data-a]");                           // 관련 기사
      if (r) { S.stack.push(r.dataset.a); renderDetail(); return; }
      var c = e.target.closest("button[data-k]");                      // 댓글 공감
      if (c) {
        var k = c.dataset.k, on = !S.liked[k];
        if (on) S.liked[k] = true; else delete S.liked[k];
        c.classList.toggle("on", on);
        c.lastChild.textContent = " " + (Number(c.dataset.n) + (on ? 1 : 0));
      }
    });
    q("nw-dback").addEventListener("click", closeDetail);
    els.dsave.addEventListener("click", function () {
      var id = S.stack[S.stack.length - 1];
      if (S.saved[id]) { delete S.saved[id]; Phone.toast("저장을 취소했어요"); } else { S.saved[id] = true; Phone.toast("기사를 저장했어요"); }
      els.dsave.classList.toggle("on", !!S.saved[id]);
      renderSaved();
    });
    q("nw-dshare").addEventListener("click", function () { Phone.toast("가상 시뮬레이션에서는 공유할 수 없어요"); });
    q("nw-q").addEventListener("input", function (e) { S.query = e.target.value; renderSearch(); });

    refreshLists();
  }

  Apps.register("news", { theme: "light", build: build });
})();
