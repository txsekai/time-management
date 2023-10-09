<template>
    <div>
        <el-row v-for="(task, index) in taskList" :key="index">
            <div class="task">
                <input type="checkbox" v-model="task.complete"/>
                <div class="taskDetail">
                    <template v-if="!task.editing">
                        <div @click="startEditing(task)">{{ task.content }}</div>
                    </template>
                    <template v-else>
                        <div class="inputAndSettings">
                            <el-input v-model="task.content" ref="taskInputs" @blur="inputBlur(task, index)"></el-input>
                            <el-row style="display: flex">
                                <el-tooltip content="标签" placement="bottom-start">
                                    <el-button class="settingIcon" icon="el-icon-discount"></el-button>
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
    </div>
</template>

<script>
export default {
    name: 'ListItem',

    data() {
        return {
            taskList: [],
        }
    },

    methods: {
        addTask() {
            const newTask = {
                complete: false,
                content: '',
                editing: true
            }

            this.taskList.push(newTask);

            this.$nextTick(() => {
                const inputElements = this.$refs.taskInputs
                const lastIndex = inputElements.length - 1
                const lastInputElement = inputElements[lastIndex]
                lastInputElement.focus();
            })
        },
        inputBlur(task, index) {
            //     通过content是否为空，为空的话用index把这行取消；不为空的话，展示这行
            if (task.content === '' || task.content === undefined) {
                this.taskList.splice(index, 1)
            } else {
                task.editing = false
            }
        },
        startEditing(task) {
            task.editing = true
            // TODO 光标编辑时候focus
            this.$nextTick(() => {
                const inputElement = this.$refs.taskInputs;
                // const inputElement = inputElements[index];
                inputElement.focus();
            });
        }
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