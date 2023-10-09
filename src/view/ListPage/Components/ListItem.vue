<template>
    <div>
        <!--        <el-row v-for="(task, index) in taskList" :key="index">-->

        <!--            <div v-if="task.isEditing" style="display: flex">-->
        <!--                <input type="checkbox" v-model="task.complete"/>-->
        <!--                <el-input v-model="task.content" @blur="task.isEditing = false"></el-input>-->
        <!--            </div>-->

        <!--            <div v-else @click="task.isEditing = true" style="display: flex">-->
        <!--                <input type="checkbox" v-model="task.complete"/>-->
        <!--                <span>{{ task.content }}</span>-->
        <!--            </div>-->
        <!--        </el-row>-->


        <!--     点击button在上面加一行空白行 ,
                    移开输入框光标时候：
                        没有输入点其他地方就取消这行；
                        有输入点其他地方就展示这行
                 再点击这行，进入编辑模式-->

        <!--        <el-row-->
        <!--                v-for="(task, index) in taskList"-->
        <!--                :key="index"-->
        <!--        >-->
        <!--            <div v-if="!isShow" style="display: flex">-->
        <!--                <input type="checkbox" v-model="task.complete"/>-->
        <!--                <el-input v-model="task.content" ref="taskInputs" @blur="inputBlur(task, index)"></el-input>-->
        <!--            </div>-->
        <!--           <div v-else style="display: flex">-->
        <!--               <input type="checkbox" v-model="task.complete"/>-->
        <!--               <div>{{ task.content }}</div>-->
        <!--           </div>-->

        <!--        </el-row>-->

        <el-row v-for="(task, index) in taskList" :key="index">
            <div style="display: flex">
                <input type="checkbox" v-model="task.complete"/>
                <template v-if="!task.editing">
                    <div @click="startEditing(task)">{{ task.content }}</div>
                </template>
                <template v-else>
                    <el-input v-model="task.content" ref="taskInputs" @blur="inputBlur(task, index)"></el-input>
                </template>
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
                lastInputElement.$refs.input.focus();
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
            debugger
            task.editing = true
            this.$nextTick(() => {
                const inputElement = this.$refs.taskInputs;
                // const inputElement = inputElements[index];
                inputElement.$refs.input.focus();
            });
        }
    },

    mounted() {
    }
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