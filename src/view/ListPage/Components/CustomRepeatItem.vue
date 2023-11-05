<template>
    <el-row>
        <el-row>
            <span>日程将每{{
                customResult.num
                }}{{ customResult.frequencyValue == 'month' ? '个' : '' }}{{ getFrequencyLabel }}{{
                formattedSelectedLabel
                }}重复</span>
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
                    @click="handleSelectOrCancelWeek(index)"
                    :class="{selected: isSelected(customResult.selectedItem, index)}"
            >{{ week }}
            </el-tag>
        </el-row>

        <div class="mt12 month-grid" v-show="customResult.frequencyValue=='month'">
            <el-tag v-for="month in monthOptions"
                    :key="month"
                    class="optionButton"
                    @click="handleSelectOrCancelMonth(month)"
                    :class="{selected: isSelected(customResult.selectedItem, month)}"
            >{{ month + 1 }}
            </el-tag>
        </div>

        <div class="mt12 year-grid" v-show="customResult.frequencyValue=='year'">
            <el-tag v-for="year in yearOptions"
                    :key="year"
                    class="optionButton"
                    @click="handleSelectOrCancelYear(year)"
                    :class="{selected: isSelected(customResult.selectedItem, year)}"
            >{{ year + 1 }}
            </el-tag>
        </div>
    </el-row>
</template>

<script>
import RepeatMixin from "@/mixins/FormatRepeat";

export default {
    name: 'customRepeatItem',
    mixins: [RepeatMixin],

    props: {
        customResult: {
            type: Object,
            default: function () {
                return {setCustomRepeat: false, num: 1, frequencyValue: 'day', selectedItem: []}
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
        'customResult.frequencyValue'() {
            while (this.customResult.selectedItem.length > 0) {
                this.customResult.selectedItem.pop();
            }
        }
    },

    computed: {
        getFrequencyLabel() {
            const selectedOption = this.frequencyOptions.find(
                option => option.value === this.customResult.frequencyValue
            )

            return selectedOption ? selectedOption.label : ''
        },
        formattedSelectedLabel() {
            return this.formattedSelectedLabel(this.customResult.selectedItem, this.customResult.frequencyValue)
        },

        // formattedSelectedLabel() {
        //     const sortedIndex = [...this.customResult.selectedItem].sort((a, b) => a - b)
        //     switch (this.customResult.frequencyValue) {
        //         case 'week':
        //             return this.formattedShowWeek(sortedIndex).map(week => `星期${week}`).join('、 ');
        //         case 'month':
        //             return sortedIndex.map(day => `${day + 1}日`).join('、 ')
        //         case 'year':
        //             return sortedIndex.map(month => `${month + 1}月`).join('、 ')
        //         default:
        //             return null;
        //     }
        // },
    },

    methods: {
        /*
        TODO 如果选择的自定义可以在预设里面找到，联动到预设
         */
        isSelected(selectionArray, item) {
            return selectionArray.includes(item);
        },
        initWeekOptions() {
            for (let i = 0; i <= 6; i++) {
                this.weekOptions.push(i)
            }
        },
        formattedShowWeek() {
            return this.formattedShowWeek(this.weekOptions)
        },
        // formattedShowWeek(weekOptions) {
        //     const weekDays = ['一', '二', '三', '四', '五', '六', '日']
        //     return weekOptions.map(option => weekDays[option])
        // },

        initMonthOptions() {
            for (let i = 0; i <= 30; i++) {
                this.monthOptions.push(i)
            }
        },
        initYearOptions() {
            for (let i = 0; i <= 11; i++) {
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