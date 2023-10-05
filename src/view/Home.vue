<template>
    <el-container>
        <common-header />
    </el-container>
</template>

<script>
import CommonHeader from '../components/CommonHeader.vue'

export default {
    name: 'Home',

    components: {
        CommonHeader,
    },
}
</script>

<style scoped>
.el-container {
    flex-direction: column;
}

</style>