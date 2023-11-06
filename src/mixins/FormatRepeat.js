import {convertLabel, REPEAT_SELECT} from "@/constants/DateSelectorConstants";
import formatDate from "@/mixins/FormatDate";

const RepeatMixin = {
    mixins: [formatDate],
    computed: {
        formattedSelectedLabel() {
            // TODO 这种写法正确吗？
            const sortedIndex = [...(this.customResult?.selectedItem || this.repeatResult.customResult.selectedItem)].sort((a, b) => a - b)
            switch (this.customResult?.frequencyValue || this.repeatResult.customResult.frequencyValue) {
                case REPEAT_SELECT.WEEK:
                    return this.formattedShowWeek(sortedIndex).map(week => `星期${week}`).join('、 ');
                case REPEAT_SELECT.MONTH:
                    return sortedIndex.map(day => `${day + 1}日`).join('、 ')
                case REPEAT_SELECT.YEAR:
                    return sortedIndex.map(month => `${month + 1}月`).join('、 ')
                default:
                    return null;
            }
        },

    },

    methods: {
        formattedShowWeek(weekOptions) {
            const weekDays = ['一', '二', '三', '四', '五', '六', '日']
            return weekOptions.map(option => weekDays[option])
        },
        getRepeatValueLabel(key) {
            return convertLabel(key)
        },
        formattedRepeatResult(repeatResult) {
            let formattedRepeat = ''

            if (repeatResult.repeatValue !== null) {
                formattedRepeat = `重复：${this.getRepeatValueLabel(repeatResult.repeatValue)}`

                if (repeatResult.endRepeat !== null) {
                    formattedRepeat = formattedRepeat + ` 结束重复： ${this.getRepeatValueLabel(repeatResult.endRepeat)}`

                    if (repeatResult.endRepeat == REPEAT_SELECT.ENDREPEATSELECTEDDATE) {
                        formattedRepeat = `重复：${this.getRepeatValueLabel(repeatResult.repeatValue)} 结束重复： ${this.formatDate(repeatResult.endRepeatDate)}`
                    }
                }

                if (repeatResult.customResult.num !== null) {
                    formattedRepeat = formattedRepeat + `<br>每${repeatResult.customResult.num}${repeatResult.customResult.frequencyValue == REPEAT_SELECT.MONTH ? '个' : ''}${this.getRepeatValueLabel(repeatResult.customResult.frequencyValue)}${this.formattedSelectedLabel}重复`
                }
            }

            return repeatResult.repeatValue == null ? '' : formattedRepeat
        },
    },
}

export default RepeatMixin