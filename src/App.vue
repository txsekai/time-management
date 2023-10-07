<template>
    <div id="app">
        <common-header />
        <router-view></router-view>
    </div>
</template>

<script>

import CommonHeader from "@/commonComponents/CommonHeader.vue";

export default {
    name: 'App',
    components: {CommonHeader},
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
    overflow-x: hidden;
}

body {

}
</style>
