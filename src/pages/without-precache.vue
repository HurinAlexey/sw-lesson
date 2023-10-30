<template>
    <div class="without-precache-page">
        <h1>Without precache</h1>


        <div class="images-grid">
            <img
                v-for="i in 50"
                :src="`/img/without-precache/image-${i}.jpg`"
                alt="image"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.without-precache-page {
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