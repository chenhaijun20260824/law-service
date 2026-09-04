// sw.js - 法律服务 PWA Service Worker v2
const CACHE_NAME = 'law-service-v2';
const BASE = '/law-service/';
self.addEventListener('fetch', function(e) {
  // raw.githubusercontent 永远不过缓存
  if (e.request.url.indexOf('raw.githubusercontent.com') >= 0) return;
  // HTML 请求永远走网络
  if (e.request.url.indexOf('.html') >= 0) {
    e.respondWith(fetch(e.request).catch(function() {
      return caches.match(e.request);
    }));
    return;
  }
  // 其他走缓存优先
  e.respondWith(
    caches.match(e.request).then(function(r) { return r || fetch(e.request); })
  );
});
self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(clients.claim()); });