// 앱처럼 설치되도록 하는 최소한의 파일이에요. 캐시는 하지 않아서 고친 내용이 바로 반영돼요.
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function () {});
