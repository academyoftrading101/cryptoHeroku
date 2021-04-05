const cacheName = "cache-v1"
const resourcesToPrecache = [
    '/',
    '/index',
    '/contact',
    '/quiz',
    '/admin',
    '/Bitcoins',
    '/style/style.css',
    '/data/bitcoin.jpg',
    'data/Cardano.jpg',
    'data/click.svg',
    'data/doge.jpg',
    'data/Ethereum.jpg',
    'data/litecoin.jpg',
    'data/xrp.jpg',
    'data/newBG/© Copyright Green Stone 2021.svg',
    'data/newBG/Bitcoin.svg',
    'data/newBG/button.svg',
    'data/newBG/Cardano.svg',
    'data/newBG/Component 8.svg',
    'data/newBG/contact us Inbox.svg',
    'data/newBG/CRYPTOCURRENCY.svg',
    'data/newBG/currency.svg',
    'data/newBG/Desktop - 13.svg',
    'data/newBG/Dogecoin.svg',
    'data/newBG/email envelope.svg',
    'data/newBG/Ethereum.svg',
    'data/newBG/features button.svg',
    'data/newBG/front page.svg',
    'data/newBG/Litecoin.svg',
    'data/newBG/our opinion button.svg',
    'data/newBG/Rectangle last page footer.svg',
    'data/newBG/toggle rectangle green.svg',
    'data/newBG/XRP.svg',
    'scripts/admin.js',
    'scripts/login.js',
    'scripts/modalScript.js',
    'scripts/prediction.js',
    'scripts/script.js'
]

self.addEventListener('install', event => {
    console.log('Service worker install event !');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});