<template>
    <div>

        <el-row v-for="(task, index) in taskList" :key="index">
            <input type="checkbox" v-model="task.completed"/>
            <div>
                {{task.content}}
            </div>
        </el-row>

        <el-row v-if="showAdd">
            <input type="checkbox" v-model="curItem.completed"/>
            <div>
                <el-input v-model="curItem.content" @blur="finishEdit"></el-input>
            </div>
        </el-row>

        <el-button class="add-list-button" @click="addTask">+ 添加事项</el-button>
    </div>
</template>

<script>
export default {
    name: 'ListItem',

    data() {
        return {
            newTask: "",
            taskList: [],
            curItem: null,
            showAdd: false
        }
    },

    methods: {
        addTask() {
            this.showAdd = true;
            this.curItem = {};
        },

        finishEdit(){
            this.showAdd = false;
            this.taskList.push(this.curItem);
        }

    },
}
</script>

<style scoped>
.add-list-button {
    border: none;
}

.add-list-button:hover,
.add-list-button:active,
.add-list-button:focus {
    background-color: #fff;
}
</style>