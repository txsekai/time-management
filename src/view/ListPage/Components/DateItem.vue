<template>
    <el-date-picker
            v-model="date"
            :align="align"
            type="date"
            :picker-options="pickerOptions"
            :clearable="false"
            @change="handleChange"
    ></el-date-picker>
</template>

<script>
export default {
    name: 'DateItem',

    props: {
        value: {
            type: Date,
            required: true
        },
        align: {
            type: String,
            default: 'left'
        },
        pickerOptions: {
            type: Object,
            default: null
        }
    },

    watch: {
        value(val) {
            debugger
            this.stateValue = new Date(val.getFullYear(), val.getMonth(), val.getDate())

            // this.date = new Date(val.getFullYear(), val.getMonth(), val.getDate());
            this.date = this.stateValue
        }
    },

    data() {
        return {
            date: null,
            stateValue: null,
        }
    },

    created() {
        debugger
        this.stateValue = new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate())
        // this.date = new Date(this.stateValue.getFullYear(), this.stateValue.getMonth(), this.stateValue.getDate());
        this.date = this.stateValue
    },

    methods: {
        handleChange() {
            debugger
            this.stateValue.setFullYear(this.date.getFullYear())
            this.stateValue.setMonth(this.date.getMonth() + 1)
            this.stateValue.setDate(this.date.getDate())
            this.$emit('input', this.stateValue)
        }
    }
}
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 13.5rem;
}

.el-date-editor /deep/ .el-input__inner {
    height: 2.5rem;
    line-height: 2.5rem;
}

.el-date-editor /deep/ .el-input__icon {
    line-height: 2.5rem;
}
</style>