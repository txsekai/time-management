<template>
  <el-container>
      <el-main class="section-main">
<!--          TODO 加过滤，如用标签过滤-->
        <div class="container grid">
            <el-card class="card">
                <div class="list-title">TO DO</div>
                <div class="list-details">
                    <list-item />
                </div>
            </el-card>

            <el-card class="card">
                <tag-item></tag-item>
            </el-card>

            <el-card class="card">

            </el-card>
        </div>
      </el-main>
  </el-container>
</template>

<script>

import ListItem from "@/view/ListPage/Components/ListItem.vue";
import TagItem from "@/view/ListPage/Components/TaglItem.vue";

export default {
    name: 'List',
    components: {TagItem, ListItem},

}
</script>

<style scoped>
.grid {
    display: grid;
    column-gap: 5.6rem;
    row-gap: 1.6rem;

    grid-template-columns: repeat(3, 1fr);
}

.list-title {
    font-weight: bold;
    color: #cf711f;
    font-size: 1.4rem;
}

.list-details {
    margin: 0.8rem 0;
}
</style>