<template>
    <el-row>
        <el-row>
            <span v-if="customResult.frequencyValue=='day'">日程将每{{ customResult.num }}{{ getFrequencyLabel }}重复一次</span>
            <span v-else-if="customResult.frequencyValue=='week'">日程将每{{ customResult.num }}{{ getFrequencyLabel }}{{ formattedSelectedWeek(customResult.week) }}重复</span>
            <span v-else-if="customResult.frequencyValue=='month'">日程将每{{ customResult.num }}个{{ getFrequencyLabel }}{{ formattedSelectedMonth }}重复</span>
            <span v-else-if="customResult.frequencyValue=='year'">日程将每{{ customResult.num }}{{ getFrequencyLabel }}{{ formattedSelectedYear }}重复</span>
        </el-row>

        <el-row class="mt12">
            <el-col :span="12">
                <span>每</span>

                <!--                TODO 限制必须输入大于等于1的数字-->
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
            <el-tag v-for="week in weekOptions"
                    :key="week"
                    class="optionButton"
                    @click="handleSelectOrCancelWeek(week)"
                    :class="{selected: isSelected(customResult.week, week)}"
            >{{ week }}</el-tag>
        </el-row>

        <div class="mt12 month-grid" v-show="customResult.frequencyValue=='month'">
            <el-tag v-for="month in monthOptions"
                    :key="month"
                    class="optionButton"
                    @click="handleSelectOrCancelMonth(month)"
                    :class="{selected: isSelected(customResult.month, month)}"
            >{{ month }}</el-tag>
        </div>

        <div class="mt12 year-grid" v-show="customResult.frequencyValue=='year'">
            <el-tag v-for="year in yearOptions"
                    :key="year"
                    class="optionButton"
                    @click="handleSelectOrCancelYear(year)"
                    :class="{selected: isSelected(customResult.year, year)}"
            >{{ year }}</el-tag>
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
              return {num: 1, frequencyValue: 'day', week: [], month: [], year: []}
          }
        },
    },

    data() {
        return {
            // frequencyValue: 'day',
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

            // numValue: this.customResult.num,

            weekOptions: ['日', '一', '二', '三', '四', '五', '六'],
            // selectedWeek: this.customResult.week,

            monthOptions: [],
            // selectedMonth: this.customResult.months,

            yearOptions: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            // selectedYear: this.customResult.year,
        }
    },

    created() {
        this.initMonthOptions()
    },

    computed: {
        isSelected() {
            return (selectionArray, item) => selectionArray.includes(item)
        },
        getFrequencyLabel() {
            const selectedOption = this.frequencyOptions.find(
                option => option.value === this.customResult.frequencyValue
            )

            return selectedOption ? selectedOption.label : ''
        },
        formattedSelectedMonth() {
            const sortedMonth = [...this.customResult.month].sort((a, b) => a - b)

            const formattedMonth = sortedMonth.map(day => `${day}日`)

            return formattedMonth.join('、 ')
        },
        formattedSelectedYear() {
            const sortedYear = [...this.customResult.year].sort((a, b) => {
                const monthToNumber = month => {
                    const monthMap = {
                        '1月': 1,
                        '2月': 2,
                        '3月': 3,
                        '4月': 4,
                        '5月': 5,
                        '6月': 6,
                        '7月': 7,
                        '8月': 8,
                        '9月': 9,
                        '10月': 10,
                        '11月': 11,
                        '12月': 12
                    }
                    return monthMap[month]
                }
                const numberA = monthToNumber(a)
                const numberB = monthToNumber(b)

                return numberA - numberB
            })

            return sortedYear.join('、 ')
        },
    },

    methods: {
        /*
        TODO 如果选择的自定义可以在预设里面找到，联动到预设
         */

        initMonthOptions() {
            for(let i = 1; i <= 31; i++) {
                this.monthOptions.push(i)
            }
        },
        handleSelectOrCancel(selectionArray, item) {
            if(this.isSelected(selectionArray, item)) {
                this.deselect(selectionArray, item)
            }else {
                this.select(selectionArray, item)
            }
        },
        select(selectionArray, item) {
          if(!selectionArray.includes(item)) {
              selectionArray.push(item)
          }
        },
        deselect(selectionArray, item) {
          const index = selectionArray.indexOf(item)
          if(index !== -1) {
              selectionArray.splice(index, 1)
          }
        },
        handleSelectOrCancelWeek(week) {
          this.handleSelectOrCancel(this.customResult.week, week)
        },
        handleSelectOrCancelMonth(month) {
            this.handleSelectOrCancel(this.customResult.month, month)
        },
        handleSelectOrCancelYear(year) {
          this.handleSelectOrCancel(this.customResult.year, year)
        },
        formattedSelectedWeek(selectedWeek) {
            const map = {
                '日': '星期日',
                '一': '星期一',
                '二': '星期二',
                '三': '星期三',
                '四': '星期四',
                '五': '星期五',
                '六': '星期六'
            }

            const formattedWeek = selectedWeek.map(week => map[week])
            formattedWeek .sort((a, b) => {
                const order = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                return order.indexOf(a) - order.indexOf(b)
            })
            return formattedWeek.join('、 ')
        },
        handleInput() {
            this.customResult.num  = this.customResult.num.replace(/[^1-9]/g, '')
        },
        handleBlur() {
            if(this.customResult.num == '') {
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
}
</style>