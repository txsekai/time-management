<template>
    <el-dialog
            title="请设置日期、时间"
            :visible.sync="dateAndTimeDialogVisible"
            width="30%"
            center
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
    >
        <el-row>
            <el-col :span="12">
                <span class="content-font-size">开始日期</span>
            </el-col>

            <el-col :span="12">
                <span class="content-font-size">完成日期 </span>
                <el-switch
                        style="width: 3.6rem"
                        v-model="switchCompletedDateValue"
                        active-color="#cf711f"
                        @change="handleCompletedDateSwitch"
                ></el-switch>
            </el-col>
        </el-row>

        <el-row class="mt6">
            <el-col :span="12">
                <date-item v-model="startTime" :align="'left'"
                           :picker-options="pickerOptionsStartDate"></date-item>
            </el-col>

            <el-col :span="12" v-show="completedDateVisible">
                <date-item v-model="completedTime" :align="'right'"
                           :picker-options="pickerOptionsCompletedDate"></date-item>
            </el-col>
        </el-row>

        <el-row class="mt24">
            <el-col :span="12">
                <span class="content-font-size">开始时间 </span>
                <el-switch
                        style="width: 3.6rem"
                        v-model="switchStartTimeValue"
                        active-color="#cf711f"
                        @change="handleStartTimeSwitch"
                ></el-switch>
            </el-col>

            <el-col :span="12">
                <span class="content-font-size">完成时间 </span>
                <el-switch
                        style="width: 3.6rem"
                        v-model="switchCompletedTimeValue"
                        active-color="#cf711f"
                        @change="handleCompletedTimeSwitch"
                ></el-switch>
            </el-col>
        </el-row>

        <el-row class="mt3">
            <el-col :span="6" v-show="startTimeVisible">
                <time-item v-model="startTime"></time-item>
            </el-col>

            <el-col :span="6" style="min-height: 1rem"></el-col>

            <el-col :span="6" v-show="completedTimeVisible">
                <time-item v-model="completedTime"></time-item>
            </el-col>
        </el-row>

        <el-row class="mt12">
            <el-col :span="24" style="min-height: 1rem">
                <span class="content-font-size" v-show="completedTimeVisible">所用时长：{{ timeDiff }} 分钟</span>
            </el-col>
        </el-row>

        <div class="spend-time-grid mt12">
            <el-button v-for="t in timeSpentOptions" :key="t" class="spend-time-padding" :disabled="planTimeDisabled"
                       @click="handlePlanTime(t)"
                       :class="{defaultSelectTimeStyle: (timeDiff == t)}"
            >{{ t }}分钟
            </el-button>

        </div>

        <el-row class="mt16">
            <el-button @click="repeatDialogVisible=true">重复</el-button>
        </el-row>

        <div slot="footer" class="dialog-footer">
            <el-button class="button-padding" @click="handleDateConfirm">确认</el-button>
            <el-button class="button-padding" @click="handleDateCancel">取消</el-button>
        </div>

        <repeat-dialog :repeat-dialog-visible="repeatDialogVisible" @repeatConfirm="repeatDialogVisible=false"
                       @repeatCancel="repeatDialogVisible=false"
                       :title="repeatDialogTitle"
        ></repeat-dialog>
    </el-dialog>
</template>

<script>
import TimeItem from "@/view/ListPage/Components/TimeItem.vue";
import DateItem from "@/view/ListPage/Components/DateItem.vue";
import RepeatDialog from "@/view/ListPage/Components/RepeatDialog.vue";

export default {
    name: 'DateAndTimeDialog',
    components: {RepeatDialog, DateItem, TimeItem},

    props: {
        dateAndTimeDialogVisible: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            switchCompletedDateValue: false,
            // startDate: new Date(),
            // completedDate: new Date(),
            completedDateVisible: false,

            switchStartTimeValue: false,
            startTimeVisible: false,

            switchCompletedTimeValue: false,
            startTime: new Date(),
            completedTime: new Date(),
            completedTimeVisible: false,

            timeSpentOptions: [10, 15, 20, 30, 40, 60, 90, 120],
            planTimeDisabled: true,

            pickerOptionsStartDate: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }]
            },
            pickerOptionsCompletedDate: {
                disabledDate: time => {
                    const startOfDay = new Date(time.getFullYear(), time.getMonth(), time.getDate()); // 获取传入时间的凌晨时间
                    const copyOfStartTime = new Date(this.startTime.getTime());
                    copyOfStartTime.setHours(0,0,0,0);
                    return startOfDay.getTime() < copyOfStartTime;
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }]
            },

            repeatDialogVisible: false,
            repeatDialogTitle: 'TODO 选好的日期时间'
        }
    },

    computed: {
        timeDiff() {
            if(this.switchCompletedTimeValue) {
                return (this.completedTime - this.startTime) / 60000
            }else {
                return ''
            }
        }
    },
    created() {
        window['app'] = this;
    },

    methods: {
        // TODO 开始日期大于完成日期，把完成日期设为开始日期
        handleDateChange() {
            if (this.startTime > this.completedTime) {
                this.completedTime = this.startTime
            }
        },
        handleCompletedDateSwitch() {
            if (this.switchCompletedDateValue) {
                this.completedDateVisible = true
            } else {
                this.completedDateVisible = false
            }
        },
        handleStartTimeSwitch() {
            if (this.switchStartTimeValue) {
                this.startTimeVisible = true
            } else {
                this.startTimeVisible = false
                this.switchCompletedTimeValue = false
                this.completedTimeVisible = false
                this.planTimeDisabled = true
            }
        },
        handleCompletedTimeSwitch() {
            if (this.switchStartTimeValue) {
                if (this.switchCompletedTimeValue) {
                    this.completedTimeVisible = true
                    this.planTimeDisabled = false
                } else {
                    this.completedTimeVisible = false
                    this.planTimeDisabled = true
                }

                this.$set(this, 'completedTime', new Date(this.startTime.getTime() + 30 * 60000))
            } else {
                this.$message({
                    message: '请先选择开始时间',
                    type: 'warning'
                })
                this.switchCompletedTimeValue = false
            }
        },
        handlePlanTime(plan) {
            this.$set(this, 'completedTime', new Date(this.startTime.getTime() + plan * 60000));
        },
        handleDateConfirm() {
            this.$emit("confirm")
        },
        handleDateCancel() {
            this.$emit("cancel")
        },
    },
}
</script>

<style scoped>
/deep/ .el-button,
/deep/ .el-dropdown-menu__item, .el-menu-item,
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