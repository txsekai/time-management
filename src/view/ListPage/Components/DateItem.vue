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
                v-model="dateValue"
        ></el-calendar>
        <el-button class="open-time-dialog-button button-padding" @click="timeDialogVisible=true">选择具体时间
        </el-button>
        <!--     TODO title从calendar所选的取    -->
        <el-dialog
                title="请选择具体时间"
                width="30%"
                center
                :visible.sync="timeDialogVisible"
                :show-close="false"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                append-to-body
        >
            <el-row>
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
                    <div class="time-select">
                        <el-select v-model="startHour">
                            <el-option
                                    v-for="hour in hours"
                                    :key="hour"
                                    :label="hour"
                                    :value="hour"
                            ></el-option>
                        </el-select>
                        <span> : </span>
                        <el-select v-model="startMinute">
                            <el-option
                                    v-for="minute in minutes"
                                    :key="minute"
                                    :label="minute"
                                    :value="minute"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>

                <el-col :span="6" style="min-height: 1rem"></el-col>

                <el-col :span="6" v-show="completedVisible">
                    <div class="time-select">
                        <el-select v-model="completedHour">
                            <el-option
                                    v-for="hour in hours"
                                    :key="hour"
                                    :label="hour"
                                    :value="hour"
                            ></el-option>
                        </el-select>
                        <span> : </span>
                        <el-select v-model="completedMinute">
                            <el-option
                                    v-for="minute in minutes"
                                    :key="minute"
                                    :label="minute"
                                    :value="minute"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>

            <el-row class="mt16">
                <el-col :span="12" style="min-height: 1rem">
                    <span class="content-font-size" v-show="completedVisible">所用时长：{{ spendTime }}</span>
                </el-col>
            </el-row>

            <div class="spend-time-grid mt16">
                <el-button class="spend-time-padding" :disabled="completedStatus" @click="handleSpendTime">10分钟
                </el-button>
                <el-button class="spend-time-padding" :disabled="completedStatus" @click="handleSpendTime">15分钟
                </el-button>
                <el-button class="spend-time-padding" :disabled="completedStatus" @click="handleSpendTime">20分钟
                </el-button>
                <el-button class="spend-time-padding" :disabled="completedStatus" @click="handleSpendTime"
                           ref="defaultSelectTime">30分钟
                </el-button>
                <el-button class="spend-time-padding" :disabled="completedStatus" @click="handleSpendTime">40分钟
                </el-button>
                <el-button class="spend-time-padding" :disabled="completedStatus" @click="handleSpendTime">60分钟
                </el-button>
                <el-button class="spend-time-padding" :disabled="completedStatus" @click="handleSpendTime">90分钟
                </el-button>
                <el-button class="spend-time-padding" :disabled="completedStatus" @click="handleSpendTime">120分钟
                </el-button>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button class="button-padding" @click="timeDialogVisible=false">确认</el-button>
                <el-button class="button-padding" @click="timeDialogVisible=false">取消</el-button>
            </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
            <el-button class="button-padding" @click="handleConfirm">确认</el-button>
            <el-button class="button-padding" @click="handleClose">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "DateItem",

    props: {
        dateDialogVisible: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            dateValue: new Date(),
            timeDialogVisible: false,
            startHour: '',
            startMinute: '',
            hours: [],
            minutes: [],
            completedHour: '',
            completedMinute: '',
            spendTime: '',
            switchValue: false,
            completedStatus: true,
            completedVisible: false,
        }
    },

    created() {
        const startCurrentDateTime = new Date()
        this.startHour = startCurrentDateTime.getHours().toString().padStart(2, '0')

        for (let i = 0; i <= 23; i++) {
            const hour = i.toString().padStart(2, '0')
            this.hours.push(hour)
        }

        this.startMinute = startCurrentDateTime.getMinutes().toString().padStart(2, '0')

        for (let i = 0; i <= 59; i++) {
            const minute = i.toString().padStart(2, '0')
            this.minutes.push(minute)
        }
    },

    methods: {
        handleConfirm() {
            this.$emit("confirm")
        },
        handleClose() {
            this.$emit("cancel")
        },
        handleSwitch() {
            if (this.switchValue) {
                this.completedVisible = true
                this.completedStatus = false
            } else {
                this.completedVisible = false
                this.completedStatus = true
            }

            this.$nextTick(() => {
                this.$refs.defaultSelectTime.$el.click()
                this.$refs.defaultSelectTime.$el.classList.add("defaultSelectTimeStyle")
            })
        },
        handleSpendTime(event) {
            this.$refs.defaultSelectTime.$el.classList.remove("defaultSelectTimeStyle")

            const buttonText = event.target.innerText
            const numericValue = buttonText.slice(0, -2)
            this.spendTime = buttonText

            const startHour = this.startHour
            const startMinute = this.startMinute
            const startTime = new Date()
            startTime.setHours(startHour)
            startTime.setMinutes(startMinute)
            const completedTime = new Date(startTime.getTime() + numericValue * 60000)  // 将分钟转换为毫秒
            this.completedHour = completedTime.getHours().toString().padStart(2, '0')
            this.completedMinute = completedTime.getMinutes().toString().padStart(2, '0')
        }
    },
}
</script>

<style scoped>

/deep/ .el-calendar,
/deep/ .el-button,
/deep/ .el-dropdown-menu__item, .el-menu-item,
.content-font-size,
/deep/ .el-input,
/deep/ .el-select .el-input .el-select__caret {
    font-size: 62.5%;
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

.time-select {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

/deep/ .el-input--suffix .el-input__inner {
    padding-right: 1rem;
}

/deep/ .el-input__inner {
    height: 2rem;
    line-height: 2rem;
    padding: 0 0.75rem;
}

/deep/ .el-input__icon {
    line-height: 2rem;
}

.el-select-dropdown__item {
    font-size: 62.5%;
    padding: 0 1rem;
    height: 2rem;
    line-height: 2rem;
}

.el-input__icon {
    width: 2rem;
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