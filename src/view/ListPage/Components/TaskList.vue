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
                <div class="task-detail">
                    <template v-if="!task.editing">
                        <div @click="startEditing(task)">{{ task.content }}</div>
                        <el-row class="tag-row">
                            <el-tag class="tag-group"
                                    v-for="tag in task.tags"
                                    :key="tag"
                            >{{ tag }}
                            </el-tag>
                        </el-row>
                    </template>
                    <template v-else>
                        <div class="input-and-settings">
                            <el-input id="contentId" v-model="task.content" ref="taskInputs"
                                      @blur="inputBlur(task, index)"
                                      @keyup.native="handleShowSettings(task)"></el-input>
                            <el-row v-if="showSettings" style="display: flex">
                                <el-tooltip content="标签" placement="bottom-start">
                                    <el-button class="setting-icon" icon="el-icon-discount"
                                               @click="openTagDialog(task)"></el-button>
                                </el-tooltip>
                                <el-tooltip content="日期" placement="bottom-start">
                                    <el-button class="setting-icon" icon="el-icon-date"
                                               @click="openDateDialog"></el-button>
                                </el-tooltip>
                                <el-tooltip content="时间" placement="bottom-start">
                                    <el-button class="setting-icon" icon="el-icon-time"></el-button>
                                </el-tooltip>
                                <el-tooltip content="重复" placement="bottom-start">
                                    <el-button class="setting-icon" icon="el-icon-refresh"></el-button>
                                </el-tooltip>
                                <el-tooltip content="优先级" placement="bottom-start">
                                    <el-button class="setting-icon" icon="el-icon-star-on"></el-button>
                                </el-tooltip>
                            </el-row>
                        </div>
                    </template>
                </div>
            </div>
        </el-row>

        <el-button class="add-list-button" @click="addTask">+ 添加事项</el-button>

        <tag-item :tag-dialog-visible="tagDialogVisible" :task="currentTask" @confirm="tagDialogVisible=false"
                  @cancel="tagDialogVisible=false;currentTask.tags=tagsBk"
                  :tags-bk="tagsBk"></tag-item>

        <date-item :date-dialog-visible="dateDialogVisible" @confirm="dateDialogVisible=false"
                   @cancel="dateDialogVisible=false"></date-item>
    </div>
</template>

<script>

import TagItem from "@/view/ListPage/Components/TagItem.vue";
import DateItem from "@/view/ListPage/Components/DateItem.vue";

export default {
    name: 'TaskList',
    components: {DateItem, TagItem},

    data() {
        return {
            taskList: [],
            tagDialogVisible: false,
            currentTask: {tags: []},
            tagsBk: [],
            showSettings: false,
            dateDialogVisible: false,
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
            this.$nextTick(() => {
                document.getElementById('contentId').focus()
            });
        },
        inputBlur(task, index) {
            if (task.content === '' || task.content === undefined) {
                this.taskList.splice(index, 1)
            } else {
                setTimeout(() => {
                    task.editing = false
                }, 300)
            }
        },
        handleShowSettings(task) {
            if (task.content.length !== 0) {
                this.showSettings = true
            } else {
                this.showSettings = false
            }
        },
        openTagDialog(task) {
            // TODO 定义共同openDialog的方法
            this.currentTask = task;
            this.tagsBk = Object.assign([], task.tags);
            this.tagDialogVisible = true
        },
        openDateDialog() {
            this.dateDialogVisible = true
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

.task-detail {
    flex-grow: 1;
}

.input-and-settings {
    display: flex;
    flex-direction: column;
}

.setting-icon {
    border: none;
    padding: 0 0;
    background: none;
}

.tag-row {
    margin: 0.6rem 0;
}

.tag-group {
    margin-left: 0.3rem;
    margin-bottom: 0.5rem;
    height: 2rem;
    line-height: 2rem;
}

.add-list-button {
    border: none;
    padding: 0.5rem 1rem;
    font-size: 62.5%;
    color: #000;
}

.add-list-button:hover,
.add-list-button:active,
.add-list-button:focus {
    background-color: #fff;
}
</style>