async function checkClientIsVisible() {
    const windowClients = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
    })

    return windowClients.some(client => client.visibilityState === 'visible')
}

self.addEventListener('install', (event) => {
    console.log('Push Service worker installed')
})

self.addEventListener('activate', (event) => {
    console.log('Push Service worker activated')

    // Activate SW immediately w/o refreshing page
    // https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim
    event.waitUntil(self.clients.claim())
})

self.addEventListener('push', async (e) => {
    const isVisible =  await checkClientIsVisible()

    if (isVisible) {
        return
    }

    const data = e.data.json()

    self.registration.showNotification(
        data.title,
        {
            body: data.body,
        }
    )
})
