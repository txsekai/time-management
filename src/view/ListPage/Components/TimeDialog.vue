<template>
    <el-dialog
            :title="timeDialogTitle"
            width="30%"
            center
            :visible.sync="timeDialogVisible"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            append-to-body
    >
        <el-row>
            <!--            TODO 加一个现在时间的button？-->
            <el-col :span="12">
                <span class="content-font-size">开始时间</span>
            </el-col>

            <el-col :span="12">
                <span class="content-font-size">完成时间 </span>
                <el-switch
                        style="width: 3.6rem"
                        v-model="switchValue"
                        active-color="#cf711f"
                        @change="handleSwitch"
                ></el-switch>
            </el-col>
        </el-row>

        <el-row class="mt3">
            <el-col :span="6">
                <time-item v-model="startTime"></time-item>
            </el-col>

            <el-col :span="6" style="min-height: 1rem"></el-col>

            <el-col :span="6" v-show="completedVisible">
                <time-item v-model="completedTime"></time-item>
            </el-col>
        </el-row>

        <el-row class="mt16">
            <el-col :span="24" style="min-height: 1rem">
                <span class="content-font-size" v-show="completedVisible">所用时长：{{ timeDiff }}</span>
            </el-col>
        </el-row>

        <div class="spend-time-grid mt16">

            <el-button v-for="t in timeSpentOptions" :key="t" class="spend-time-padding" :disabled="completedStatus"
                       @click="handleSpendTime(t)"
                       :class="{defaultSelectTimeStyle: (timeDiff == t)}"
            >{{ t }}分钟

            </el-button>

        </div>

        <div slot="footer" class="dialog-footer">
            <el-button class="button-padding" @click="handleTimeConfirm">确认</el-button>
            <el-button class="button-padding" @click="handleTimeCancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import TimeItem from "@/view/ListPage/Components/TimeItem.vue";

export default {
    name: 'TimeDialog',
    components: {TimeItem},

    props: {
        timeDialogVisible: {
            type: Boolean,
            default: false
        },
        dateValue: {
            type: Date,
            default: '请选择具体时间'
        }
    },

    data() {
        return {
            startTime: new Date(),
            completedTime: new Date(),

            time: null,
            spendTime: '',
            switchValue: false,
            completedStatus: true,
            completedVisible: false,
            timeSpentOptions: [10, 15, 20, 30, 40, 60, 90, 120],
        }
    },


    computed: {
        timeDialogTitle() {
            if (this.dateValue) {
                return this.formatDate(this.dateValue)
            } else {
                return '请选择具体时间'
            }
        },
        timeDiff() {
            if(this.completedTime){
                return (this.completedTime - this.startTime) / 60000
            }else {
                return ''
            }
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

        handleSwitch() {
            if (this.switchValue) {
                this.completedVisible = true
                this.completedStatus = false
            } else {
                this.completedVisible = false
                this.completedStatus = true
            }

            this.$set(this, 'completedTime', new Date(this.startTime.getTime() + 30 * 60000));
        },
        handleSpendTime(numericValue) {
            this.$set(this, 'completedTime', new Date(this.startTime.getTime() + numericValue * 60000));
        },
        handleTimeConfirm() {
            let spendTime = ''
            if (!this.switchValue) {
                spendTime = this.startHour + " : " + this.startMinute
            } else {
                spendTime = this.startHour + " : " + this.startMinute + " ~ " + this.completedHour + " : " + this.completedMinute
            }
            this.$emit("timeConfirm", spendTime)
        },
        handleTimeCancel() {
            this.$emit("timeCancel")
        },

    },
}
</script>

<style scoped>
.content-font-size,
/deep/ .el-input,
/deep/ .el-select .el-input .el-select__caret {
    font-size: 1.4rem;
}

.spend-time-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 0.8rem;
}

.spend-time-padding {
    padding: 0.6rem 1rem;
}

.spend-time-padding + .spend-time-padding {
    margin-left: 0;
}

.defaultSelectTimeStyle {
    border-color: #e67e22;
    background-color: #fdf2e9;
    color: #cf711f;
}

.dialog-footer {
    text-align: right;
}
</style>