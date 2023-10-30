const cacheVersion = 'v2'

async function addResourcesToCache(resources) {
    const cache = await caches.open(cacheVersion)
    await cache.addAll(resources)
}

async function clearOldCaches() {
    const cachesKeys = await caches.keys()

    for (const cacheName of cachesKeys) {
        if (cacheName !== cacheVersion) {
            caches.delete(cacheName)
        }
    }
}

async function putInCache(request, response) {
    const cache = await caches.open(cacheVersion)
    await cache.put(request, response)
}
  
async function cacheFirst(request) {
    const responseFromCache = await caches.match(request)

    if (responseFromCache) {
        return responseFromCache
    }

    const responseFromNetwork = await fetch(request)
    
    putInCache(request, responseFromNetwork.clone())
    
    return responseFromNetwork
}

async function networkFirst(request) {
    return await fetch(request)
        .then(responseFromNetwork => {
            putInCache(request, responseFromNetwork.clone())

            return responseFromNetwork
        })
        .catch(async (err) => {
            const responseFromCache = await caches.match(request)

            return responseFromCache || err
        })
}

self.addEventListener('install', (event) => {
    console.log('Service worker installed')

    const precachedResouces = ['/img/leaf-4k.jpg']

    for (let i = 1; i <= 50; i++) {
        precachedResouces.push(`/img/with-precache/image-${i}.jpg`)
    }

    event.waitUntil(
        addResourcesToCache(precachedResouces)
    )
})

self.addEventListener('activate', async (event) => {
    console.log('Service worker activated')

    event.waitUntil(clearOldCaches())

    // Activate SW immediately w/o refreshing page
    // https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim
    event.waitUntil(self.clients.claim())
})
 

self.addEventListener('fetch', (event) => {
    const cachedRequestDestinations = ['image', 'video']
    const isApiRequest = new URL(event.request.url).pathname.startsWith('/api')
    const isGetMethod = event.request.method.toUpperCase() === 'GET'

    if (cachedRequestDestinations.includes(event.request.destination)) {
        return event.respondWith(cacheFirst(event.request))
    }

    if (isApiRequest && isGetMethod) {
        return event.respondWith(networkFirst(event.request))
    }
})
