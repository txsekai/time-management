<template>
    <el-dialog
        title="请设重复周期"
        :visible.sync="repeatDialogVisible"
        width="30%"
        center
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
    >
        <div slot="footer" class="dialog-footer">
            <el-button class="button-padding" @click="handleRepeatConfirm">确认</el-button>
            <el-button class="button-padding" @click="handleRepeatCancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'RepeatDialog',

    props: {
        repeatDialogVisible: {
            type: Boolean,
            default: false
        }
    },

    methods: {
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

</style>