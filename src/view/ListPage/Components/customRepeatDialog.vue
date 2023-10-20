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

        }
    },

    methods: {
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

</style>