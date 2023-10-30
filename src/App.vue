<template>
    <div class="app-content">
        <AppHeader />
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { registerGeneralServiceWorker } from '@/helpers/serviceWorker'

import AppHeader from '@/components/AppHeader.vue'


onMounted(async () => {
    try {
        await registerGeneralServiceWorker()
    } catch(err) {
        console.error(err)
    }
})
</script>
