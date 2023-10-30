import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/pages/index.vue')
        },
        {
            path: '/push',
            name: 'push',
            component: () => import('@/pages/push.vue')
        },
        {
            path: '/blog',
            name: 'blog',
            component: () => import('@/pages/blog.vue')
        },
        {
            path: '/with-precache',
            name: 'with-precache',
            component: () => import('@/pages/with-precache.vue')
        },
        {
            path: '/without-precache',
            name: 'without-precache',
            component: () => import('@/pages/without-precache.vue')
        }
    ]
})

export default router
