<template>
    <div class="index-page">
        <div class="page-content">
            <div class="image-card">
                <img v-if="isRegularImageVisible" src="/img/field-4k.jpg" alt="field" />
                <button v-else @click="() => isRegularImageVisible = true">Show Regular Image</button>
            </div>
            
            <div class="image-card">
                <img v-if="isPrecachedImageVisible" src="/img/leaf-4k.jpg" alt="leaf" />
                <button v-else @click="() => isPrecachedImageVisible = true">Show Precached Image</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'


const isRegularImageVisible = ref<boolean>(false)
const isPrecachedImageVisible = ref<boolean>(false)
</script>

<style scoped lang="scss">
.index-page {
    padding: 20px;
}

.page-content {
    display: flex;
    width: 1000px;
    margin: 0 auto;
    gap: 20px;
}

.image-card {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    border-radius: 16px;
    box-shadow: 0 1px 5px 0 rgba(21, 21, 21, .2);
    overflow: hidden;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    button {
        padding: 8px 12px;
        border: 1px solid #000;
        background: #422972;
        color: #fff;
        box-shadow: none;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
    }
}
</style>