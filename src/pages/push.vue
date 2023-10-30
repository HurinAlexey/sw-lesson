<template>
    <div class="push-page">
        Push
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { requestNotificationPermission, subscribeOnPushNotifications } from '@/helpers/push'


onMounted(async () => {
    try {
        await requestNotificationPermission()
        await subscribeOnPushNotifications()
    } catch(err) {
        console.error(err)
    }
})
</script>