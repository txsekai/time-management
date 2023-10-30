<template>
    <el-dialog
            :title="title"
            :visible.sync="repeatDialogVisible"
            width="30%"
            center
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            append-to-body
    >
        <el-row>
            <el-col :span="12">
                <span>重复</span>
<!--                TODO 让两列的select对齐。 只能改为el-form是相对简单的？-->
                <el-select v-model="repeatValue">
                    <el-option
                            v-for="item in repeatOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    ></el-option>

                    <el-option
                            :key="'custom'"
                            label="自定义"
                            value="custom"
                    ></el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row class="mt16" v-if="endRepeatVisible">
            <el-col :span="12">
                <span>结束重复</span>
                <el-select v-model="endRepeat">
                    <el-option
                            v-for="item in endRepeatOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    ></el-option>

                    <el-option
                            :key="'endRepeatSelectedDate'"
                            label="于日期"
                            value="endRepeatSelectedDate"
                    ></el-option>
                </el-select>
            </el-col>

            <el-col :span="12" v-if="endDateVisible">
                <span>结束日期</span>
                <date-item style="margin-left: 1rem"
                           v-model="endRepeatDate"
                           :align="'right'"
                           :picker-options="pickerOptions"
                ></date-item>
            </el-col>
        </el-row>

        <div slot="footer" class="dialog-footer">
            <el-button class="button-padding" @click="handleRepeatConfirm">确认</el-button>
            <el-button class="button-padding" @click="handleRepeatCancel">取消</el-button>
        </div>

        <custom-repeat-dialog :custom-repeat-dialog-visible="customRepeatDialogVisible"
                              @customRepeatConfirm="handleCustomDialogConfirm"
                              @customRepeatCancel="customRepeatDialogVisible=false"
        ></custom-repeat-dialog>
    </el-dialog>
</template>

<script>
import CustomRepeatDialog from "@/view/ListPage/Components/CustomRepeatDialog.vue";
import DateItem from "@/view/ListPage/Components/DateItem.vue";

export default {
    name: 'RepeatDialog',
    components: {DateItem, CustomRepeatDialog},

    props: {
        repeatDialogVisible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '请设置重复'
        },
    },

    data() {
        return {
            repeatValue: 'never',
            repeatOptions: [{
                value: 'never',
                label: '永不'
            }, {
                value: 'everyday',
                label: '每天'
            }, {
                value: 'everyWeek',
                label: '每周'
            }, {
                value: 'everyWorkDay',
                label: '每周工作日'
            }, {
                value: 'everyMonth',
                label: '每月'
            }, {
                value: 'everyYear',
                label: '每年'
            }],

            endRepeat: 'never',
            endRepeatOptions: [{
                value: 'never',
                label: '永不'
            }],

            endRepeatVisible: false,

            endDateVisible: false,
            endRepeatDate: null,
            pickerOptions: {
                // TODO 取dateAndTimeDialog的开始日期?
                disabledDate: time => {
                    const startOfDay = new Date(time.getFullYear(), time.getMonth(), time.getDate())
                    return startOfDay.getTime() < new Date().setHours(0, 0, 0, 0)
                }
            },

            customRepeatDialogVisible: false,
            customResult: {},
        }
    },

    created() {
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate() + 7)
        this.endRepeatDate = currentDate
    },

    computed: {

    },

    watch: {
        // TODO 从自定义切换为自定义也可以打开dialog
        repeatValue(newValue) {
            if (newValue === 'custom') {
                this.customRepeatDialogVisible = true;
                this.endRepeatVisible = true;
            } else {
                this.customRepeatDialogVisible = false;
                this.endRepeatVisible = newValue !== 'never';
            }
        },

        endRepeat(newValue) {
            if (newValue == 'endRepeatSelectedDate') {
                this.endDateVisible = true
            } else {
                this.endDateVisible = false
            }
        }
    },

    methods: {
        /*TODO
        重复设置按照：把有打开的开始日期、时间+完成日期、时间当做一个整体来循环
        在重复的时间内，该事项一直展示在TO DO card里
            如果今天完成了，就移动到其他card里面；明天又出现在TO DO card里
        更改一个重复的事项，会提示只更改该事项还是将来的都改
         */

        handleCustomDialogConfirm(customResult) {
            this.customResult = customResult
            console.log(this.customResult)
            this.customRepeatDialogVisible = false
        },
        handleRepeatConfirm() {
            this.$emit("repeatConfirm")
        },
        handleRepeatCancel() {
            this.$emit("repeatCancel")
        },
    },
}
</script>

<style scoped>
.el-select {
    margin-left: 1rem;
    width: 12rem;
}

/deep/ .el-input--suffix .el-input__inner {
    padding-right: 1rem;
}

/deep/ .el-input__inner {
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 0.75rem;
}

/deep/ .el-input__icon {
    line-height: 2.5rem;
    width: 2.5rem;
}

.el-select-dropdown__item {
    font-size: 1.4rem;
    padding: 0 1rem;
    height: 2.5rem;
    line-height: 2.5rem;
}
</style>