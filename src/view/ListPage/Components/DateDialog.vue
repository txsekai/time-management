<template>
    <el-dialog
            title="请选择日期"
            :visible.sync="dateDialogVisible"
            width="30%"
            center
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
    >
        <el-calendar
                v-model="task.startDateTime"
        ></el-calendar>
        <el-button class="open-time-dialog-button button-padding" @click="timeDialogVisible=true">计划时间 {{ spendTime }}</el-button>
        <time-dialog :time-dialog-visible="timeDialogVisible" :date-value="dateValue"
                   @timeConfirm="handleTimeConfirm" @timeCancel="timeDialogVisible=false"></time-dialog>
        <div slot="footer" class="dialog-footer">
            <el-button class="button-padding" @click="handleDateConfirm">确认</el-button>
            <el-button class="button-padding" @click="handleDateCancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import TimeDialog from "@/view/ListPage/Components/TimeDialog.vue";

export default {
    name: "DateDialog",
    components: {TimeDialog},

    props: {
        dateDialogVisible: {
            type: Boolean,
            default: false
        },
        task: {
            type: Object,
            required: true
        },
    },
    watch:{
        task(){
            if(this.task.startDateTime == null){
                this.task.startDateTime = new Date();
            }
        }
    },

    data() {
        return {
            dateValue: new Date(),
            timeDialogVisible: false,
            spendTime: ''
        }
    },

    methods: {
        formatDate(date) {
            const current = new Date()
            const currentYear = current.getFullYear()
            const currentMonth = current.getMonth() + 1
            const currentDay = current.getDate()

            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const weekDay = this.getWeekDay(date.getDay())

            if (currentYear === year && currentMonth === month && currentDay === day) {
                return '今天'
            } else {
                return `${year}/${month}/${day} ${weekDay}`
            }
        },
        getWeekDay(day) {
            const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
            return weekDays[day]
        },
        handleDateConfirm() {
            this.task.dateAndTime = this.formatDate(this.dateValue) + " " + this.spendTime
            this.$emit("dateConfirm")
        },
        handleDateCancel() {
            this.$emit("dateCancel")
        },
        handleTimeConfirm(spendTime) {
            this.timeDialogVisible=false
            this.spendTime = spendTime
        }
    },
}
</script>

<style scoped>
/deep/ .el-calendar,
/deep/ .el-button,
/deep/ .el-dropdown-menu__item, .el-menu-item,
.content-font-size {
    font-size: 1.4rem;
}

/deep/ .el-calendar__header {
    border-bottom: 0;
    padding: 0 2rem 0.2rem;
}

/deep/ .el-calendar__body {
    padding: 0.6rem 2rem 3.5rem;
}

/deep/ .el-calendar-table thead th {
    padding: 0.5rem 0;
}

/deep/ .el-calendar-table .el-calendar-day {
    height: 3.6rem;
    padding: 0.6rem;
}

.open-time-dialog-button {
    margin-left: 2rem;
}

.dialog-footer {
    text-align: right;
}
</style>