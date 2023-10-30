<template>
    <header class="app-header">
        <ul class="menu">
            <li
                v-for="menuItem of menuItems"
                :key="`menu-item-${menuItem.routeName}`"
                class="menu-item"
            >
                <RouterLink :to="{ name: menuItem.routeName }">{{ menuItem.text }}</RouterLink>
            </li>
        </ul>
    </header>
</template>

<script setup lang="ts">
type MenuItem = {
    text: string,
    routeName: string
}

const menuItems: MenuItem[] = [
    { text: 'Home', routeName: 'index' },
    { text: 'Push', routeName: 'push' },
    { text: 'Blog', routeName: 'blog' },
    { text: 'Images with precache', routeName: 'with-precache' },
    { text: 'Images without precache', routeName: 'without-precache' },
]
</script>

<style scoped lang="scss">
.app-header {
    display: flex;
    justify-content: center;

    .menu {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;

        .menu-item {
            a {
                display: block;
                padding: 12px 16px;
                text-decoration: none;
                color: #581fc4;

                &.router-link-exact-active {
                    color: #b45a36;
                }
            }
        }
    }
}
</style>