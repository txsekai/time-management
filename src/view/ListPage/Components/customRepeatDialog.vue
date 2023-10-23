<template>
    <el-dialog
            title="自定义重复"
            :visible.sync="customRepeatDialogVisible"
            width="30%"
            center
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            append-to-body
    >
        <el-row>
            <!--            TODO 把自定义的结果放进来-->
            <span>{{ dayValue }}</span>
        </el-row>

        <el-row class="mt12">
            <el-col :span="12">
                <span>每 </span>

                <!--                TODO 限制必须输入大于等于1的数字-->
                <el-input v-model="dayValue"></el-input>

                <el-select v-model="frequencyValue">
                    <el-option
                            v-for="item in frequencyOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    ></el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row class="mt12" v-if="frequencyValue=='week'">
            <!--            TODO 把tagDialog里面的tag抽成公共组件？-->
            <el-tag v-for="week in weekOptions"
                    :key="week"
                    class="weekOptionButton"
                    @click="handleSelectOrCancelWeek(week)"
                    :class="{selected: isSelectedWeek(week)}"
            >{{ week }}</el-tag>
        </el-row>

        <el-row class="mt12" v-if="frequencyValue=='month'">
            <el-tag v-for="month in monthOptions"
                    :key="month"
                    class="monthOptionButton"
                    @click="handleSelectOrCancelMonth(month)"
                    :class="{selected: isSelected(month)}"
            >{{ week }}</el-tag>
        </el-row>

        <div slot="footer" class="dialog-footer">
            <el-button class="button-padding" @click="handleConfirm">确认</el-button>
            <el-button class="button-padding" @click="handleCancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'customRepeatDialog',

    props: {
        customRepeatDialogVisible: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            frequencyValue: 'day',
            frequencyOptions: [
                {
                    value: 'day',
                    label: '天'
                }, {
                    value: 'week',
                    label: '周'
                }, {
                    value: 'month',
                    label: '月'
                }, {
                    value: 'year',
                    label: '年'
                },
            ],

            dayValue: 1,

            weekOptions: ['日', '一', '二', '三', '四', '五', '六'],
            selectedWeek: [],

            monthOptions: [],
        }
    },

    created() {
        this.initMonthOptions()
    },

    computed: {
        isSelectedWeek() {
            return week => this.selectedWeek.includes(week)
        }
    },

    methods: {
        /*
        TODO 如果选择的自定义可以在预设里面找到，联动到预设
         */

        handleSelectOrCancelWeek(week) {
            if(this.isSelectedWeek(week)) {
                this.deselectWeek(week)
            }else {
                this.selectWeek(week)
            }
        },
        selectWeek(week) {
            if(!this.selectedWeek.includes(week)) {
                this.selectedWeek.push(week)
            }
        },
        deselectWeek(week) {
            const index = this.selectedWeek.indexOf(week)
            if(index !== -1) {
                this.selectedWeek.splice(index, 1)
            }
        },
        initMonthOptions() {
            for(let i = 1; i <= 31; i++) {
                this.monthOptions.push(i)
            }
        },
        handleConfirm() {
            this.$emit("customRepeatConfirm")
        },
        handleCancel() {
            this.$emit("customRepeatCancel")
        },
    },
}
</script>

<style scoped>
.el-select,
.el-input {
    margin-left: 1rem;
    width: 7rem;
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

.weekOptionButton {
    border-radius: 2rem;
}

.el-tag {
    margin-left: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    background-color: #fff;
    border-color: #fff;
}

.selected {
    font-weight: bold;
    border-color: #e67e22;
    background-color: #fdf2e9;
    color: #cf711f;
}
</style>