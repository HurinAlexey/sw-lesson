<template>
    <div class="blog-page">
        <h1>Blog</h1>

        <div v-for="post of posts" :key="post.date" class="post">
            <h3 class="post-title">{{ post.title }}</h3>
            <span class="post-date">{{ post.date }}</span>
            <p class="post-content">{{ post.text }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiService from '@/services/api'


type Post = {
    title: string
    text: string
    date: string
}

const posts = ref<Array<Post>>([])

async function loadPosts() {
    posts.value = await apiService.get<any, Array<Post>>('/posts')
        .catch(() => [])
}

onMounted(() => {
    loadPosts()
})
</script>

<style scoped lang="scss">
.blog-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.post {
    width: 600px;
    max-width: 100%;
    padding: 16px 12px;
    border-radius: 16px;
    box-shadow: 0 1px 5px 0 rgba(21, 21, 21, .2);

    .post-title {
        margin-bottom: 12px;
    }

    .post-date {
        display: block;
        color: #777;
        margin-bottom: 20px;
    }
}
</style>