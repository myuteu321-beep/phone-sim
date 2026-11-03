/* =========================================================
   photos.js  —  사진 앱 동작
   내용(사진, 앨범)은 data/photos-data.js 에서 바꿔요. 이 파일은 고칠 일이 거의 없어요.
   - 보관함(연도/월/일/모든 사진) · 컬렉션(앨범) · 검색
   - 사진을 누르면 전체 화면, 좌우로 넘기기, 즐겨찾기, 삭제/복구
   - 앱을 나갔다 들어와도 보던 화면이 그대로 유지돼요
   ========================================================= */

(function () {
  "use strict";

  var D = window.PHOTOS_DATA || { photos: [], albums: [], deleted: [] };
  var Apps = window.Apps, Phone = window.Phone;
  var phoneEl = document.getElementById("phone");
  var R, els = {};

  /* ---------- 상태 ---------- */
  var S = {
    tab: "lib", seg: "all",
    selecting: false, sel: {},          // 선택 모드 / 선택된 사진 id
    sub: null,                          // null | {type:"album", id} | {type:"deleted"}
    query: "",
    photos: D.photos.map(function (p) { return clone(p); }),
    deleted: (D.deleted || []).map(function (p) { return clone(p); })
  };
  var view = { list: [], idx: 0, from: "lib", bars: true };

  function clone(o) { var c = {}; for (var k in o) c[k] = o[k]; return c; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- 아이콘 ---------- */
  var P = {
    back:  '<path d="M15 5l-7 7 7 7"/>',
    lib:   '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M3 17l5-4 4 3 3-2 6 4"/>',
    col:   '<rect x="5" y="7" width="14" height="13" rx="3"/><path d="M8 4h8"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    share: '<path d="M12 15V3M7 8l5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
    restore:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    left:  '<path d="M15 5l-7 7 7 7"/>',
    right: '<path d="M9 5l7 7-7 7"/>'
  };
  function ic(n, fill) {
    return '<svg viewBox="0 0 24 24" fill="' + (fill ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + P[n] + "</svg>";
  }

  /* ---------- 날짜 도우미 ("2026-10-24 07:12") ---------- */
  var WD = ["일", "월", "화", "수", "목", "금", "토"];
  function parts(p) {
    var m = String(p.date || "").match(/(\d{4})-(\d{1,2})-(\d{1,2})(?:\s+(\d{1,2}):(\d{2}))?/);
    if (!m) return { y: 0, mo: 0, d: 0, h: 0, mi: 0, t: 0, wd: 0 };
    var y = +m[1], mo = +m[2], d = +m[3], h = +(m[4] || 0), mi = +(m[5] || 0);
    return { y: y, mo: mo, d: d, h: h, mi: mi, t: new Date(y, mo - 1, d, h, mi).getTime(), wd: new Date(y, mo - 1, d).getDay() };
  }
  function dayText(p) { var q = parts(p); return q.mo + "월 " + q.d + "일 " + WD[q.wd] + "요일"; }
  function fullText(p) {
    var q = parts(p), ap = q.h < 12 ? "오전" : "오후", h = q.h % 12 || 12;
    return q.y + "년 " + dayText(p) + " " + ap + " " + h + ":" + (q.mi < 10 ? "0" + q.mi : q.mi);
  }
  function byDate(a, b) { return parts(a).t - parts(b).t; }

  /* ---------- 사진 한 칸 ---------- */
  function picStyle(p) {
    return p.img ? "background-image:url('" + esc(p.img) + "')"
                 : "background:linear-gradient(135deg," + esc(p.c1 || "#ccd") + "," + esc(p.c2 || "#99a") + ")";
  }
  function cell(p, opt) {
    opt = opt || {};
    var badge = opt.days != null ? '<span class="ph-days">' + p.days + "일</span>"
              : (!p.img && p.label ? '<span class="ph-lb">' + esc(p.label) + "</span>" : "");
    return '<div class="ph-cell' + (S.sel[p.id] ? " sel" : "") + '" data-id="' + p.id + '">' +
      '<div class="ph-img" style="' + picStyle(p) + '"></div>' + badge +
      (p.fav && opt.days == null ? '<svg class="ph-heart" viewBox="0 0 24 24">' + P.heart + "</svg>" : "") +
      '<i class="ph-chk"></i></div>';
  }
  function gridHtml(list, opt, cls) {
    return '<div class="ph-grid' + (cls ? " " + cls : "") + '">' + list.map(function (p) { return cell(p, opt); }).join("") + "</div>";
  }

  /* ---------- 보관함 ---------- */
  function groups(list, kind) {
    var out = [], map = {};
    list.slice().sort(byDate).forEach(function (p) {
      var q = parts(p);
      var key = kind === "year" ? q.y : kind === "month" ? q.y + "-" + q.mo : q.y + "-" + q.mo + "-" + q.d;
      var title = kind === "year" ? q.y + "년" : kind === "month" ? q.y + "년 " + q.mo + "월" : dayText(p);
      if (!map[key]) { map[key] = { title: title, items: [] }; out.push(map[key]); }
      map[key].items.push(p);
    });
    return out;
  }

  var groupLists = [];       // 구역별 사진 목록 (누른 사진이 속한 구역으로 전체화면을 열기 위해)
  function renderLib() {
    var sorted = S.photos.slice().sort(byDate), html = "";
    groupLists = [];
    if (!sorted.length) {
      html = '<div class="ph-empty">사진이 없습니다.</div>';
    } else if (S.seg === "all") {
      groupLists.push(sorted);
      html = gridHtml(sorted) + '<div class="ph-count">사진 ' + sorted.length + "장</div>";
    } else {
      groups(sorted, S.seg === "year" ? "year" : S.seg === "month" ? "month" : "day").forEach(function (g, i) {
        groupLists.push(g.items);
        var shown = S.seg === "year" ? g.items.slice(-4) : g.items;
        html += '<div class="ph-sec" data-g="' + i + '">' + esc(g.title) + "<small>" + g.items.length + "장</small></div>" +
                '<div data-g="' + i + '">' + gridHtml(shown, null, S.seg === "year" ? "big" : "") + "</div>";
      });
      html += '<div class="ph-count">사진 ' + sorted.length + "장</div>";
    }
    els.libBody.innerHTML = html;
    els.libSeg.querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", b.dataset.s === S.seg); });
    els.libBtn.textContent = S.selecting ? "취소" : "선택";
    els.libBtn.classList.toggle("blue", S.selecting);
    els.libTitle.textContent = S.selecting ? (selCount() ? selCount() + "장 선택됨" : "항목 선택") : "보관함";
    els.libBody.classList.toggle("ph-selecting", S.selecting);
    els.libFoot.style.display = S.selecting ? "flex" : "none";
    els.bar.style.display = S.selecting ? "none" : "flex";
    els.libFoot.querySelectorAll("button").forEach(function (b) { b.disabled = !selCount(); });
  }
  function selCount() { return Object.keys(S.sel).length; }

  /* ---------- 컬렉션 ---------- */
  function albumPhotos(a) {
    var ids = a.ids || [];
    return S.photos.filter(function (p) { return ids.indexOf(p.id) >= 0; }).sort(byDate);
  }
  function favPhotos() { return S.photos.filter(function (p) { return p.fav; }).sort(byDate); }
  function albumCard(key, name, list) {
    var c = list[list.length - 1];
    return '<button class="ph-album" data-al="' + key + '"><div class="ph-cover">' +
      (c ? '<div class="ph-img" style="' + picStyle(c) + '"></div>' : "") + "</div><b>" + esc(name) + "</b><span>" + list.length + "</span></button>";
  }
  function renderCol() {
    var h = '<div class="ph-albums">' + albumCard("fav", "즐겨찾는 항목", favPhotos());
    (D.albums || []).forEach(function (a) { h += albumCard(a.id, a.name, albumPhotos(a)); });
    h += "</div>";
    h += '<div class="ph-sec">유틸리티</div><div class="ph-list">' +
      '<button data-al="deleted">최근 삭제된 항목<span>' + S.deleted.length + " ›</span></button></div>";
    els.colBody.innerHTML = h;
  }

  /* ---------- 검색 ---------- */
  function renderSearch() {
    var q = S.query.trim().toLowerCase(), list = [];
    if (q) {
      var albumIds = [];
      (D.albums || []).forEach(function (a) { if (a.name.toLowerCase().indexOf(q) >= 0) albumIds = albumIds.concat(a.ids || []); });
      list = S.photos.filter(function (p) {
        var text = ((p.label || "") + " " + dayText(p) + " " + parts(p).y + "년 " + parts(p).mo + "월").toLowerCase();
        return text.indexOf(q) >= 0 || albumIds.indexOf(p.id) >= 0 || (q === "즐겨찾기" && p.fav);
      }).sort(byDate);
    }
    searchList = list;
    els.searchBody.innerHTML = !q ? '<div class="ph-empty">사진, 날짜, 앨범 이름으로<br>검색해 보세요.<br>예) 카페, 10월, 여행</div>'
      : list.length ? gridHtml(list) + '<div class="ph-count">사진 ' + list.length + "장</div>"
      : '<div class="ph-empty">결과 없음</div>';
  }

  /* ---------- 서브 화면 (앨범 안 / 최근 삭제) ---------- */
  var subList = [], searchList = [];
  function renderSub() {
    var s = S.sub;
    if (!s) { els.sub.classList.remove("on"); return; }
    els.sub.classList.add("on");
    var title, list, html = "", isDel = s.type === "deleted";
    if (isDel) { title = "최근 삭제된 항목"; list = S.deleted.slice(); }
    else if (s.id === "fav") { title = "즐겨찾는 항목"; list = favPhotos(); }
    else {
      var a = (D.albums || []).filter(function (x) { return x.id === s.id; })[0] || { name: "앨범", ids: [] };
      title = a.name; list = albumPhotos(a);
    }
    subList = list;
    if (isDel) html += '<div class="ph-note">사진과 비디오는 30일 동안 여기에 보관된 후 영구적으로 삭제됩니다.</div>';
    html += list.length ? gridHtml(list, isDel ? { days: true } : null) : '<div class="ph-empty">' + (isDel ? "최근 삭제된 항목이 없습니다." : "사진이 없습니다.") + "</div>";
    if (!isDel && list.length) html += '<div class="ph-count">사진 ' + list.length + "장</div>";
    els.subBody.innerHTML = html;
    els.subBody.classList.toggle("ph-selecting", S.selecting);
    els.subTitle.textContent = title;
    els.subBtn.style.visibility = list.length ? "visible" : "hidden";
    els.subBtn.textContent = S.selecting ? "취소" : "선택";
    els.subBtn.classList.toggle("blue", S.selecting);
    els.subFoot.style.display = isDel ? "flex" : "none";
    if (isDel) {
      var n = selCount();
      els.subDel.textContent = n ? "삭제" : "모두 삭제";
      els.subRes.textContent = n ? "복구" : "모두 복구";
      els.subDel.disabled = els.subRes.disabled = !list.length;
    }
    els.subBody.style.paddingBottom = isDel ? "140px" : "40px";
  }

  /* ---------- 사진 동작 ---------- */
  function removeFrom(arr, id) { for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr.splice(i, 1)[0]; return null; }
  function trashPhotos(ids) {
    ids.forEach(function (id) {
      var p = removeFrom(S.photos, id);
      if (p) { p.days = 30; delete p.fav; S.deleted.unshift(p); }
    });
  }
  function restorePhotos(ids) {
    ids.forEach(function (id) { var p = removeFrom(S.deleted, id); if (p) { delete p.days; S.photos.push(p); } });
  }
  function eraseForever(ids) { ids.forEach(function (id) { removeFrom(S.deleted, id); }); }
  function refresh() { renderLib(); renderCol(); renderSearch(); renderSub(); }

  function confirmSheet(msg, okText, fn) {
    els.sheetMsg.textContent = msg;
    els.sheetOk.textContent = okText;
    els.sheet.classList.add("on");
    els.sheet._fn = fn;
  }

  /* ---------- 전체 화면 보기 ---------- */
  function openViewer(list, idx, from) {
    if (!list.length) return;
    view.list = list.slice(); view.idx = Math.max(0, Math.min(list.length - 1, idx)); view.from = from; view.bars = true;
    var dark = false;
    els.viewer.classList.add("on");
    els.viewer.classList.remove("hidebars");
    els.viewer.classList.toggle("dark", dark);
    buildSlides();
    showIndex(false);
  }
  function buildSlides() {
    els.vtrack.innerHTML = view.list.map(function (p, i) {
      return '<div class="ph-vslide" data-i="' + i + '"></div>';
    }).join("");
  }
  function fillSlide(i) {
    var s = els.vtrack.children[i], p = view.list[i];
    if (!s || !p || s.firstChild) return;
    s.innerHTML = '<div class="ph-vpic' + (p.img ? "" : " ph-ph") + '" style="' + picStyle(p) + '">' +
      (p.img ? "" : "<span>" + esc(p.label || "") + "</span>") + "</div>";
  }
  function showIndex(anim) {
    var n = view.list.length;
    els.vtrack.classList.toggle("anim", !!anim);
    els.vtrack.style.transform = "translateX(" + (-view.idx * 100) + "%)";
    for (var k = view.idx - 1; k <= view.idx + 1; k++) if (k >= 0 && k < n) fillSlide(k);
    var p = view.list[view.idx];
    els.vtitle.textContent = dayText(p);
    els.vsub.textContent = (function () { var q = parts(p), ap = q.h < 12 ? "오전" : "오후", h = q.h % 12 || 12; return ap + " " + h + ":" + (q.mi < 10 ? "0" + q.mi : q.mi); })();
    els.vcount.textContent = (view.idx + 1) + " / " + n;
    var del = view.from === "deleted";
    els.vHeart.style.display = els.vShare.style.display = del ? "none" : "flex";
    els.vTrash.style.display = del ? "none" : "flex";
    els.vRestore.style.display = els.vErase.style.display = del ? "flex" : "none";
    els.vHeart.classList.toggle("on", !!p.fav);
    els.varL.style.display = view.idx > 0 ? "flex" : "none";
    els.varR.style.display = view.idx < n - 1 ? "flex" : "none";
  }
  function go(d) {
    var ni = view.idx + d;
    if (ni < 0 || ni >= view.list.length) { showIndex(true); return; }
    view.idx = ni; showIndex(true);
  }
  function closeViewer() { els.viewer.classList.remove("on"); }
  function removeCurrent() {
    // 현재 사진이 목록에서 사라졌을 때 다음(또는 이전) 사진을 보여줘요
    view.list.splice(view.idx, 1);
    if (!view.list.length) { closeViewer(); return; }
    if (view.idx >= view.list.length) view.idx = view.list.length - 1;
    buildSlides(); showIndex(false);
  }

  // 좌우로 넘기기 (손가락/마우스 둘 다)
  function bindSwipe() {
    var v = els.viewer, sx = null, sy = 0, dx = 0, dy = 0, moved = false, w = 390;
    v.addEventListener("pointerdown", function (e) {
      if (e.target.closest("button")) { sx = null; return; }
      sx = e.clientX; sy = e.clientY; dx = dy = 0; moved = false;
      w = v.offsetWidth || 390;
      els.vtrack.classList.remove("anim");
    });
    window.addEventListener("pointermove", function (e) {
      if (sx === null) return;
      var sc = parseFloat(phoneEl.style.getPropertyValue("--scale")) || 1;
      dx = (e.clientX - sx) / sc; dy = (e.clientY - sy) / sc;
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) moved = true;
      if (moved) {
        var edge = (view.idx === 0 && dx > 0) || (view.idx === view.list.length - 1 && dx < 0);
        els.vtrack.style.transform = "translateX(" + (-view.idx * w + (edge ? dx * 0.3 : dx)) + "px)";
      }
    });
    function end() {
      if (sx === null) return;
      var m = moved, mx = dx, my = dy;
      sx = null;
      if (m) {
        if (mx < -50) go(1); else if (mx > 50) go(-1); else showIndex(true);
      } else if (Math.abs(mx) < 6 && Math.abs(my) < 6) {
        view.bars = !view.bars;
        v.classList.toggle("hidebars", !view.bars);
        v.classList.toggle("dark", !view.bars);
      } else if (my > 90 && Math.abs(mx) < 60) {
        closeViewer();
      }
    }
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    document.addEventListener("keydown", function (e) {
      if (!v.classList.contains("on") || Apps.current() !== "photos") return;
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Escape") closeViewer();
    });
  }

  /* ---------- 화면 만들기 ---------- */
  function build(root) {
    R = root;
    root.classList.add("ph-app");
    root.innerHTML =
      '<div class="ph-panels">' +
        // 보관함
        '<div class="ph-panel on" data-p="lib"><div class="ph-top">' +
          '<div class="ph-hd"><h1 id="ph-libtitle">보관함</h1><button class="ph-pill" id="ph-libbtn" type="button">선택</button></div>' +
          '<div class="ph-seg" id="ph-libseg"><button data-s="year">연도</button><button data-s="month">월</button><button data-s="day">일</button><button data-s="all" class="on">모든 사진</button></div>' +
        '</div><div class="ph-scroll" id="ph-libbody"></div>' +
        '<div class="ph-foot" id="ph-libfoot" style="display:none"><button class="res" data-a="share" type="button">공유</button><button class="del" data-a="trash" type="button">삭제</button></div></div>' +
        // 컬렉션
        '<div class="ph-panel" data-p="col"><div class="ph-top"><div class="ph-hd"><h1>컬렉션</h1></div></div><div class="ph-scroll" id="ph-colbody"></div></div>' +
        // 검색
        '<div class="ph-panel" data-p="search"><div class="ph-top"><div class="ph-hd"><h1>검색</h1></div>' +
          '<label class="ph-search">' + ic("search") + '<input id="ph-q" type="search" placeholder="사진, 사람, 장소 등" autocomplete="off"></label>' +
        '</div><div class="ph-scroll" id="ph-searchbody"></div></div>' +
      "</div>" +
      '<div class="ph-bar" id="ph-bar">' +
        '<button data-t="lib" class="on" type="button">' + ic("lib") + "<span>보관함</span></button>" +
        '<button data-t="col" type="button">' + ic("col") + "<span>컬렉션</span></button>" +
        '<button data-t="search" type="button">' + ic("search") + "<span>검색</span></button>" +
      "</div>" +
      // 앨범 안 / 최근 삭제
      '<div class="ph-sub" id="ph-sub"><div class="ph-top"><div class="ph-hd">' +
        '<button class="ph-back" id="ph-subback" type="button">' + ic("back") + "컬렉션</button>" +
        '<span class="ph-center" id="ph-subtitle"></span>' +
        '<button class="ph-pill" id="ph-subbtn" type="button">선택</button></div></div>' +
        '<div class="ph-scroll" id="ph-subbody"></div>' +
        '<div class="ph-foot" id="ph-subfoot" style="display:none"><button class="del" id="ph-subdel" type="button">모두 삭제</button><button class="res" id="ph-subres" type="button">모두 복구</button></div></div>' +
      // 전체 화면
      '<div class="ph-viewer" id="ph-viewer">' +
        '<div class="ph-vtrack" id="ph-vtrack"></div>' +
        '<div class="ph-vtop"><button class="ph-back" id="ph-vback" type="button">' + ic("back") + '</button>' +
          '<div class="tt"><b id="ph-vtitle"></b><small id="ph-vsub"></small></div><span class="ph-spacer" style="width:40px"></span></div>' +
        '<button class="ph-varrow l" id="ph-varl" type="button">' + ic("left") + "</button>" +
        '<button class="ph-varrow r" id="ph-varr" type="button">' + ic("right") + "</button>" +
        '<div class="ph-vcount" id="ph-vcount"></div>' +
        '<div class="ph-vbot">' +
          '<button id="ph-vshare" type="button">' + ic("share") + "</button>" +
          '<button id="ph-vheart" class="heart" type="button">' + ic("heart") + "</button>" +
          '<button id="ph-vtrash" type="button">' + ic("trash") + "</button>" +
          '<button id="ph-vrestore" type="button" style="display:none">' + ic("restore") + "</button>" +
          '<button id="ph-verase" type="button" style="display:none">' + ic("trash") + "</button>" +
        "</div></div>" +
      // 확인창
      '<div class="ph-sheet" id="ph-sheet"><div class="box"><p id="ph-sheetmsg"></p>' +
        '<button class="ok" id="ph-sheetok" type="button">삭제</button><button id="ph-sheetno" type="button">취소</button></div></div>';

    var q = function (id) { return root.querySelector("#" + id); };
    els = {
      libTitle: q("ph-libtitle"), libBtn: q("ph-libbtn"), libSeg: q("ph-libseg"), libBody: q("ph-libbody"), libFoot: q("ph-libfoot"),
      colBody: q("ph-colbody"), searchBody: q("ph-searchbody"), bar: q("ph-bar"),
      sub: q("ph-sub"), subBody: q("ph-subbody"), subTitle: q("ph-subtitle"), subBtn: q("ph-subbtn"), subFoot: q("ph-subfoot"), subDel: q("ph-subdel"), subRes: q("ph-subres"),
      viewer: q("ph-viewer"), vtrack: q("ph-vtrack"), vtitle: q("ph-vtitle"), vsub: q("ph-vsub"), vcount: q("ph-vcount"),
      vHeart: q("ph-vheart"), vShare: q("ph-vshare"), vTrash: q("ph-vtrash"), vRestore: q("ph-vrestore"), vErase: q("ph-verase"),
      varL: q("ph-varl"), varR: q("ph-varr"),
      sheet: q("ph-sheet"), sheetMsg: q("ph-sheetmsg"), sheetOk: q("ph-sheetok")
    };

    root.querySelectorAll(".ph-scroll").forEach(function (s) { Apps.dragScroll(s); });

    /* 하단 탭 */
    els.bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-t]"); if (!b) return;
      S.tab = b.dataset.t;
      root.querySelectorAll(".ph-panel").forEach(function (p) { p.classList.toggle("on", p.dataset.p === S.tab); });
      els.bar.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); });
    });

    /* 보관함: 연도/월/일/모든 사진 */
    els.libSeg.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-s]"); if (!b) return;
      S.seg = b.dataset.s; S.selecting = false; S.sel = {};
      renderLib(); scrollEnd(els.libBody);
    });
    els.libBtn.addEventListener("click", function () { S.selecting = !S.selecting; S.sel = {}; renderLib(); });
    els.libBody.addEventListener("click", function (e) {
      var c = e.target.closest(".ph-cell"); if (!c) return;
      if (S.selecting) { toggleSel(c.dataset.id); renderLib(); return; }
      var host = c.closest("[data-g]"), gi = host ? +host.dataset.g : 0;
      var list = groupLists[gi] || S.photos.slice().sort(byDate);
      openViewer(list, indexOf(list, c.dataset.id), "lib");
    });
    els.libFoot.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-a]"); if (!b || !selCount()) return;
      if (b.dataset.a === "share") { Phone.toast("가상 시뮬레이션에서는 공유할 수 없어요"); return; }
      var ids = Object.keys(S.sel), n = ids.length;
      confirmSheet("사진 " + n + "장을 삭제할까요?", "사진 " + n + "장 삭제", function () {
        trashPhotos(ids); S.selecting = false; S.sel = {}; refresh();
      });
    });

    /* 컬렉션 */
    els.colBody.addEventListener("click", function (e) {
      var b = e.target.closest("[data-al]"); if (!b) return;
      S.sub = b.dataset.al === "deleted" ? { type: "deleted" } : { type: "album", id: b.dataset.al };
      S.selecting = false; S.sel = {};
      renderSub(); els.subBody.scrollTop = 0;
    });
    els.sub.querySelector("#ph-subback").addEventListener("click", function () { S.sub = null; S.selecting = false; S.sel = {}; renderLib(); renderSub(); renderCol(); });
    els.subBtn.addEventListener("click", function () { S.selecting = !S.selecting; S.sel = {}; renderSub(); });
    els.subBody.addEventListener("click", function (e) {
      var c = e.target.closest(".ph-cell"); if (!c) return;
      if (S.selecting) { toggleSel(c.dataset.id); renderSub(); return; }
      openViewer(subList, indexOf(subList, c.dataset.id), S.sub.type === "deleted" ? "deleted" : "lib");
    });
    els.subDel.addEventListener("click", function () {
      var ids = selCount() ? Object.keys(S.sel) : S.deleted.map(function (p) { return p.id; });
      if (!ids.length) return;
      confirmSheet("이 사진 " + ids.length + "장은 영구적으로 삭제됩니다. 이 동작은 취소할 수 없습니다.", "사진 " + ids.length + "장 삭제", function () {
        eraseForever(ids); S.selecting = false; S.sel = {}; refresh();
      });
    });
    els.subRes.addEventListener("click", function () {
      var ids = selCount() ? Object.keys(S.sel) : S.deleted.map(function (p) { return p.id; });
      if (!ids.length) return;
      restorePhotos(ids); S.selecting = false; S.sel = {}; refresh();
      Phone.toast("사진 " + ids.length + "장을 복구했어요");
    });

    /* 검색 */
    q("ph-q").addEventListener("input", function (e) { S.query = e.target.value; renderSearch(); });
    els.searchBody.addEventListener("click", function (e) {
      var c = e.target.closest(".ph-cell"); if (!c) return;
      var list = searchList;
      openViewer(list, indexOf(list, c.dataset.id), "lib");
    });

    /* 전체 화면 */
    bindSwipe();
    q("ph-vback").addEventListener("click", closeViewer);
    els.varL.addEventListener("click", function () { go(-1); });
    els.varR.addEventListener("click", function () { go(1); });
    els.vShare.addEventListener("click", function () { Phone.toast("가상 시뮬레이션에서는 공유할 수 없어요"); });
    els.vHeart.addEventListener("click", function () {
      var p = view.list[view.idx], real = S.photos.filter(function (x) { return x.id === p.id; })[0];
      if (!real) return;
      real.fav = !real.fav; p.fav = real.fav;
      els.vHeart.classList.toggle("on", !!real.fav);
      refresh();
    });
    els.vTrash.addEventListener("click", function () {
      var p = view.list[view.idx];
      confirmSheet("이 사진을 삭제할까요?", "사진 삭제", function () { trashPhotos([p.id]); refresh(); removeCurrent(); });
    });
    els.vRestore.addEventListener("click", function () {
      var p = view.list[view.idx]; restorePhotos([p.id]); refresh(); removeCurrent(); Phone.toast("사진을 복구했어요");
    });
    els.vErase.addEventListener("click", function () {
      var p = view.list[view.idx];
      confirmSheet("이 사진은 영구적으로 삭제됩니다.", "사진 삭제", function () { eraseForever([p.id]); refresh(); removeCurrent(); });
    });

    /* 확인창 */
    q("ph-sheetno").addEventListener("click", function () { els.sheet.classList.remove("on"); });
    els.sheetOk.addEventListener("click", function () { els.sheet.classList.remove("on"); if (els.sheet._fn) els.sheet._fn(); });
    els.sheet.addEventListener("click", function (e) { if (e.target === els.sheet) els.sheet.classList.remove("on"); });

    refresh();
    setTimeout(function () { scrollEnd(els.libBody); }, 0);
  }

  function indexOf(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return i; return 0; }
  function toggleSel(id) { if (S.sel[id]) delete S.sel[id]; else S.sel[id] = true; }
  function scrollEnd(el) { el.scrollTop = el.scrollHeight; }

  Apps.register("photos", { theme: "light", build: build });
})();
