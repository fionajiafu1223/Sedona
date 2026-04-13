// 圣多纳释放法 · Service Worker
// 版本号每次更新内容时改一下，强制刷新缓存
const CACHE_NAME = 'sedona-v1';

// 需要预缓存的文件（本地资源）
const PRECACHE_URLS = [
  '/',
  '/index.html',
];

// ── 安装：预缓存本地文件 ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// ── 激活：清除旧版本缓存 ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── 拦截请求 ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Supabase、Cloudflare Worker、Google Fonts → 永远走网络，不缓存
  const networkOnly = [
    'supabase.co',
    'freedreleasing.com',       // 你的 Cloudflare Worker 域名
    'fonts.googleapis.com',
    'fonts.gstatic.com',
  ];

  if (networkOnly.some(domain => url.hostname.includes(domain))) {
    // 直接走网络，失败就失败（不做离线假装）
    event.respondWith(fetch(event.request));
    return;
  }

  // 本地资源：缓存优先，缓存没有再去网络
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // 只缓存成功的 GET 请求
        if (!response || response.status !== 200 || event.request.method !== 'GET') {
          return response;
        }
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    })
  );
});
