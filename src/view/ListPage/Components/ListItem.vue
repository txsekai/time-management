<template>
    <div>
        <el-row v-for="(task, index) in taskList" :key="index">
            <div class="task">
                <input style="margin: 0.2rem" type="checkbox" v-model="task.complete"/>
                <!--添加事项 -> input(editing = true) -> 没有输入内容 (TODO hover到icon上tooltip展示不可点), 然后blur -> editing = false，并删除这行
                                                        输入内容 hover到icon上展示tooltip，然后点击icon时候(blur) -> 这行变为<div> && 展示tag-item dialog
                                                        输入内容 不点击icon，blur -> 这行变为<div>

                                                                                        点击icon弹dialog，并且input blur变为<div> -> 选/不选tag
                -->
                <div class="taskDetail">
                    <template v-if="!task.editing">
                        <div @click="startEditing(task)">{{ task.content }}</div>
                        <el-row>{{ task.tags }}</el-row>
                    </template>
                    <template v-else>
                        <div class="inputAndSettings">
                            <el-input v-model="task.content" ref="taskInputs" @blur="inputBlur(task, index)"></el-input>
                            <el-row style="display: flex">
                                <el-tooltip content="标签" placement="bottom-start">
                                    <el-button class="settingIcon" icon="el-icon-discount"
                                               @click="openTagDialog(task)"></el-button>
                                </el-tooltip>
                                <el-tooltip content="日期" placement="bottom-start">
                                    <el-button class="settingIcon" icon="el-icon-date"></el-button>
                                </el-tooltip>
                                <el-tooltip content="时间" placement="bottom-start">
                                    <el-button class="settingIcon" icon="el-icon-time"></el-button>
                                </el-tooltip>
                                <el-tooltip content="重复" placement="bottom-start">
                                    <el-button class="settingIcon" icon="el-icon-refresh"></el-button>
                                </el-tooltip>
                                <el-tooltip content="优先级" placement="bottom-start">
                                    <el-button class="settingIcon" icon="el-icon-star-on"></el-button>
                                </el-tooltip>
                            </el-row>
                        </div>
                    </template>
                </div>
            </div>
        </el-row>


        <el-button class="add-list-button" @click="addTask">+ 添加事项</el-button>

        <tag-item :dialogVisible="dialogVisible" :task="currentTask" @confirm="dialogVisible=false"></tag-item>
    </div>
</template>

<script>

import TagItem from "@/view/ListPage/Components/TagItem.vue";

export default {
    name: 'ListItem',
    components: {TagItem},

    data() {
        return {
            taskList: [],
            dialogVisible: false,
            currentTask:  {tags:[]}
        }
    },

    methods: {
        addTask() {
            const newTask = {
                complete: false,
                content: '',
                editing: true,
                tags: [],
            }

            this.taskList.push(newTask);

            this.$nextTick(() => {
                const inputElements = this.$refs.taskInputs
                const lastIndex = inputElements.length - 1
                const lastInputElement = inputElements[lastIndex]
                lastInputElement.$refs.input.focus();
            })
        },
        startEditing(task) {
            task.editing = true
            // TODO 光标编辑时候focus
            this.$nextTick(() => {
                const inputElement = this.$refs.taskInputs;
                // const inputElement = inputElements[index];
                inputElement.$refs.input.focus();
            });
        },
        inputBlur(task, index) {
            //     通过content是否为空，为空的话用index把这行取消；不为空的话，展示这行
            if (task.content === '' || task.content === undefined) {
                this.taskList.splice(index, 1)
            } else {
                setTimeout(() => {
                    task.editing = false
                }, 300)
            }
        },
        openTagDialog(task) {
            // TODO 定义共同openDialog的方法
            this.currentTask = task;
            this.dialogVisible = true
        },
    },
}
</script>

<style scoped>
.el-row {
    margin: 0.6rem;
}

.task {
    display: flex;
    gap: 0.4rem;
    align-items: start;
}

.taskDetail {
    flex-grow: 1;
}

.inputAndSettings {
    display: flex;
    flex-direction: column;
}

.settingIcon {
    border: none;
    padding: 0 0;
    background: none;
}

.add-list-button {
    border: none;
    padding: 1rem 1.5rem;
    font-size: 62.5%;
    color: #000;
}

.add-list-button:hover,
.add-list-button:active,
.add-list-button:focus {
    background-color: #fff;
}
</style>