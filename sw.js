const CACHE = "pomodoro-cache-v1";
const FILES = [
  "./",
  "main.html",
  "pomo.html",
  "pomo.css",
  "style.css",
  "pomo.js",
  "script.js",
  "manifestpomo.json",
  "icon-192.png",
  "icon-512.png",
  "u_7t06dkcgzk-japanese-school-bell-sound-4889524.mp3"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
