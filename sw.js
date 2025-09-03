// Service Worker for PPT Maker Pro PWA
const CACHE_NAME = 'ppt-maker-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/css/themes.css',
    '/css/responsive.css',
    '/js/app.js',
    '/js/content-generator.js',
    '/js/slide-builder.js',
    '/js/template-manager.js',
    '/js/export-handler.js',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('Cache installation failed:', error);
            })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip external API calls for fresh data
    if (event.request.url.includes('api.unsplash.com') || 
        event.request.url.includes('wikipedia.org') ||
        event.request.url.includes('openai.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version if available
                if (response) {
                    return response;
                }

                // Otherwise, fetch from network
                return fetch(event.request).then((response) => {
                    // Don't cache if not a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    // Add to cache for future use
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
            .catch(() => {
                // Return offline page for navigation requests
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
            })
    );
});

// Background sync for when connection is restored
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('Background sync triggered');
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Sync any pending data when connection is restored
    try {
        // Check if there are any pending presentations to save
        const cache = await caches.open(CACHE_NAME);
        // Add any background sync logic here
        console.log('Background sync completed');
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/assets/icons/icon-192x192.png',
            badge: '/assets/icons/icon-72x72.png',
            vibrate: [100, 50, 100],
            data: data.data || {},
            actions: [
                {
                    action: 'open',
                    title: 'Open App',
                    icon: '/assets/icons/icon-72x72.png'
                },
                {
                    action: 'close',
                    title: 'Close',
                    icon: '/assets/icons/icon-72x72.png'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling for communication with main app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }

    if (event.data && event.data.type === 'CACHE_PRESENTATION') {
        // Cache a presentation for offline use
        cachePresentation(event.data.presentation);
    }
});

async function cachePresentation(presentation) {
    try {
        const cache = await caches.open('presentations');
        const presentationData = new Response(JSON.stringify(presentation));
        await cache.put(`/presentation/${presentation.id}`, presentationData);
        console.log('Presentation cached for offline use');
    } catch (error) {
        console.error('Failed to cache presentation:', error);
    }
}

// Cleanup function for old data
function cleanupOldData() {
    // Remove old cached presentations (keep only last 10)
    caches.open('presentations').then((cache) => {
        cache.keys().then((requests) => {
            if (requests.length > 10) {
                // Remove oldest entries
                const toDelete = requests.slice(0, requests.length - 10);
                toDelete.forEach((request) => {
                    cache.delete(request);
                });
            }
        });
    });
}

// Run cleanup periodically
setInterval(cleanupOldData, 24 * 60 * 60 * 1000); // Once per day
