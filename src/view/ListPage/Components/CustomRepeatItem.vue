<template>
    <el-row>
        <el-row>
            <span v-if="customResult.frequencyValue=='day'">日程将每{{ customResult.num }}{{
                getFrequencyLabel
                }}重复一次</span>
            <span v-else-if="customResult.frequencyValue=='week'">日程将每{{ customResult.num }}{{
                getFrequencyLabel
                }}{{ formattedSelectedWeek }}重复</span>
            <span v-else-if="customResult.frequencyValue=='month'">日程将每{{ customResult.num }}个{{
                getFrequencyLabel
                }}{{ formattedSelectedMonth }}重复</span>
            <span v-else-if="customResult.frequencyValue=='year'">日程将每{{ customResult.num }}{{
                getFrequencyLabel
                }}{{ formattedSelectedYear }}重复</span>
        </el-row>

        <el-row class="mt12">
            <el-col :span="12">
                <span>每</span>
                <el-input v-model="customResult.num" @input="handleInput" @blur="handleBlur"></el-input>

                <el-select v-model="customResult.frequencyValue">
                    <el-option
                            v-for="item in frequencyOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    ></el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row class="mt12" v-show="customResult.frequencyValue=='week'">
            <!--            TODO 把tagDialog里面的tag抽成公共组件？-->
            <el-tag v-for="(week, index) in formattedShowWeek(weekOptions)"
                    :key="index"
                    class="optionButton"
                    @click="handleSelectOrCancelWeek(index + 1)"
                    :class="{selected: isSelected(customResult.selectedItem, index + 1)}"
            >{{ week }}
            </el-tag>
        </el-row>

        <div class="mt12 month-grid" v-show="customResult.frequencyValue=='month'">
            <el-tag v-for="month in monthOptions"
                    :key="month"
                    class="optionButton"
                    @click="handleSelectOrCancelMonth(month)"
                    :class="{selected: isSelected(customResult.selectedItem, month)}"
            >{{ month }}
            </el-tag>
        </div>

        <div class="mt12 year-grid" v-show="customResult.frequencyValue=='year'">
            <el-tag v-for="year in yearOptions"
                    :key="year"
                    class="optionButton"
                    @click="handleSelectOrCancelYear(year)"
                    :class="{selected: isSelected(customResult.selectedItem, year)}"
            >{{ year }}
            </el-tag>
        </div>
    </el-row>
</template>

<script>
export default {
    name: 'customRepeatItem',
    props: {
        customResult: {
            type: Object,
            default: function () {
                return {num: 1, frequencyValue: 'day', selectedItem: []}
            }
        },
    },

    data() {
        return {
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

            weekOptions: [],

            monthOptions: [],

            yearOptions: [],
        }
    },

    created() {
        this.initWeekOptions()
        this.initMonthOptions()
        this.initYearOptions()
    },

    watch: {
        customResult: {
            handler(newValue) {
                if (newValue.frequencyValue) {
                    newValue.selectedItem = []
                }
            },
            deep: true
        }
    },

    computed: {
        isSelected(selectionArray, item) {
            return selectionArray.includes(item);
        },
        getFrequencyLabel() {
            const selectedOption = this.frequencyOptions.find(
                option => option.value === this.customResult.frequencyValue
            )

            return selectedOption ? selectedOption.label : ''
        },
        formattedSelectedWeek() {
            const sortedWeek = [...this.customResult.selectedItem].sort((a, b) => a - b)
            let formattedWeek = this.formattedShowWeek(sortedWeek)
            formattedWeek = formattedWeek.map(week => `星期${week}`)
            return formattedWeek.join('、 ')
        },
        formattedSelectedMonth() {
            const sortedMonth = [...this.customResult.selectedItem].sort((a, b) => a - b)

            const formattedMonth = sortedMonth.map(day => `${day}日`)

            return formattedMonth.join('、 ')
        },
        formattedSelectedYear() {
            const sortedYear = [...this.customResult.selectedItem].sort((a, b) => a - b)

            const formattedYear = sortedYear.map(month => `${month}月`)

            return formattedYear.join('、 ')
        },
    },

    methods: {
        /*
        TODO 如果选择的自定义可以在预设里面找到，联动到预设
         */

        initWeekOptions() {
            for (let i = 1; i <= 7; i++) {
                this.weekOptions.push(i)
            }
        },
        formattedShowWeek(weekOptions) {
            const weekDays = ['一', '二', '三', '四', '五', '六', '日']
            return weekOptions.map(option => weekDays[option - 1])
        },
        initMonthOptions() {
            for (let i = 1; i <= 31; i++) {
                this.monthOptions.push(i)
            }
        },
        initYearOptions() {
            for (let i = 1; i <= 12; i++) {
                this.yearOptions.push(i)
            }
        },
        handleSelectOrCancel(selectionArray, item) {
            if (this.isSelected(selectionArray, item)) {
                this.deselect(selectionArray, item)
            } else {
                this.select(selectionArray, item)
            }
        },
        select(selectionArray, item) {
            if (!selectionArray.includes(item)) {
                selectionArray.push(item)
            }
        },
        deselect(selectionArray, item) {
            const index = selectionArray.indexOf(item)
            if (index !== -1) {
                selectionArray.splice(index, 1)
            }
        },
        handleSelectOrCancelWeek(index) {
            this.handleSelectOrCancel(this.customResult.selectedItem, index)
        },
        handleSelectOrCancelMonth(month) {
            this.handleSelectOrCancel(this.customResult.selectedItem, month)
        },
        handleSelectOrCancelYear(year) {
            this.handleSelectOrCancel(this.customResult.selectedItem, year)
        },
        handleInput() {
            this.customResult.num = this.customResult.num.replace(/[^1-9]/g, '')
        },
        handleBlur() {
            if (this.customResult.num == '') {
                this.customResult.num = 1
            }
        }
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

.optionButton {
    border-radius: 2rem;
}

.el-tag {
    margin-left: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    background-color: #fff;
    border-color: #fff;
    width: 3rem;
    text-align: center;
    height: 3rem;
    padding: 0;
}

.selected {
    border-color: #e67e22;
    background-color: #fdf2e9;
    color: #cf711f;
}

.month-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.year-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 30rem;
}
</style>