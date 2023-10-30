import config from '@/config'


async function registerServiceWorker(scriptUrl: string, options?: RegistrationOptions): Promise<ServiceWorkerRegistration> {
    if (!navigator.serviceWorker) {
        throw new Error('No Service Worker support!')
    }

    return await navigator.serviceWorker.register(scriptUrl, options)
}

export async function registerPushServiceWorker(): Promise<PushSubscription> {
    const register = await registerServiceWorker('/push/push-sw.js')

    // Alternative way to register SW
    // const register = await registerServiceWorker('/push-sw.js', {
    //     scope: '/push'
    // })

    // It will not work, because we have already registered SW in this scope
    // const register = await registerServiceWorker('/push-sw.js', {
    //     scope: '/'
    // })

    await navigator.serviceWorker.ready

    return await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: config.publicVapidKey,
    })
}

export async function registerGeneralServiceWorker() {
    await registerServiceWorker('/general-sw.js')
}