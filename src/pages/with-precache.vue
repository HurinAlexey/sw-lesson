<template>
    <div class="with-precache-page">
        <h1>With precache</h1>


        <div class="images-grid">
            <img
                v-for="i in 50"
                :src="`/img/with-precache/image-${i}.jpg`"
                alt="image"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.with-precache-page {
    padding: 20px;
}

.images-grid {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 24px;
    gap: 20px;

    img {
        display: block;
        width: calc(25% - 15px);
    }
}
</style>