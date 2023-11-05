const RepeatMixin = {
    computed: {
        formattedSelectedLabel() {
            const sortedIndex = [...this.customResult.selectedItem].sort((a, b) => a - b)
            switch (this.customResult.frequencyValue) {
                case 'week':
                    return this.formattedShowWeek(sortedIndex).map(week => `星期${week}`).join('、 ');
                case 'month':
                    return sortedIndex.map(day => `${day + 1}日`).join('、 ')
                case 'year':
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
    },
}

export default RepeatMixin