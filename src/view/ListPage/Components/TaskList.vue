<template>
    <div>
        <el-row v-for="(task, index) in taskList" :key="index">
            <div class="task">
                <input style="margin: 0.2rem" type="checkbox" v-model="task.complete"/>
                <div class="task-detail">
                    <template v-if="!task.editing">
                        <div class="edit-task" @click="startEditing(task)">{{ task.content }}</div>
                        <el-row class="tag-row">
                            <el-tag class="tag-group"
                                    v-for="tag in task.tags"
                                    :key="tag"
                            >{{ tag }}
                            </el-tag>
                        </el-row>
                        <!--                        TODO 日期时间可以删除-->
                        <el-row v-if="task.dateAndTime.startTime">
                            <span>开始：{{ formatDate(task.dateAndTime.startTime) }}</span>
                            <span v-if="task.dateAndTime.completedTime"> ~ </span>
                            <span v-if="task.dateAndTime.completedTime">完成：{{ formatDate(task.dateAndTime.completedTime) }}</span>
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
                                               @click="openDateAndTimeDialog(task)"></el-button>
                                </el-tooltip>
                                <el-tooltip content="时间" placement="bottom-start">
                                    <el-button class="setting-icon" icon="el-icon-time"></el-button>
                                </el-tooltip>
                                <el-tooltip content="重复" placement="bottom-start">
                                    <!--                                    TODO 点击button打开嵌套dialog-->
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

        <tag-dialog :tag-dialog-visible="tagDialogVisible" :task="currentTask" @tagConfirm="tagDialogVisible=false"
                    @tagCancel="tagDialogVisible=false;currentTask.tags=tagsBk"
                    :tags-bk="tagsBk"></tag-dialog>

        <date-and-time-dialog :date-and-time-dialog-visible="dateAndTimeDialogVisible"
                              :task="currentTask"
                              @confirm="dateAndTimeDialogVisible=false"
                              @cancel="dateAndTimeDialogVisible=false"></date-and-time-dialog>


    </div>
</template>

<script>
import TagDialog from "@/view/ListPage/Components/TagDialog.vue";
import DateAndTimeDialog from "@/view/ListPage/Components/DateAndTimeDialog.vue";

export default {
    name: 'TaskList',
    components: {DateAndTimeDialog, TagDialog},

    data() {
        return {
            taskList: [{
                complete: false,
                content: '123',
                editing: false,
                tags: [],
                dateAndTime: {startTime: null, completedTime: null}
            }],
            tagDialogVisible: false,
            currentTask: {tags: []},
            tagsBk: [],
            showSettings: false,
            dateAndTimeDialogVisible: false,
        }
    },

    methods: {
        addTask() {
            const newTask = {
                complete: false,
                content: '',
                editing: true,
                tags: [],
                dateAndTime: {startTime: null, completedTime: null}
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
        openDateAndTimeDialog(task) {
            this.dateAndTimeDialogVisible = true
            this.currentTask = task
        },
        formatDate(datetime) {
            if(datetime === null) {
                return ''
            }
            const temp = new Date(datetime)

            const year = temp.getFullYear();
            const month = temp.getMonth() + 1;
            const day = temp.getDate();

            let formattedDate = ''

            const current = new Date()
            if(year == current.getFullYear() && month == current.getMonth()+1 && day == current.getDate()) {
                formattedDate = '今天'
            }else {
                formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
            }

            let formattedTime = ''

            // TODO 这个判断有问题，如果用户选了00:00
            if((temp.getHours() == 0 && temp.getMinutes() == 0) || (temp.getHours() == 23 && temp.getMinutes() == 59)) {
                formattedTime = ''
            }else {
                const hours = temp.getHours();
                const minutes = temp.getMinutes();

                formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
            }

            return `${formattedDate} ${formattedTime}`
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
    font-size: 1.4rem;
    flex-grow: 1;
}

.edit-task {
    cursor: pointer;
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
    font-size: 1.4rem;
    color: #000;
}

.add-list-button:hover,
.add-list-button:active,
.add-list-button:focus {
    background-color: #fff;
}
</style>