import apiService from '@/services/api'
import { registerPushServiceWorker } from '@/helpers/serviceWorker'


export async function requestNotificationPermission() {
    if (!window.PushManager) {
        throw new Error('No Push API Support!')
    }

    const permission = await window.Notification.requestPermission()
    
    if(permission !== 'granted'){
        throw new Error('Permission not granted for Notification')
    }
}

export async function subscribeOnPushNotifications() {
    const subscription = await registerPushServiceWorker()

    await apiService.post('/subscribe', subscription)
        .catch(console.warn)
}