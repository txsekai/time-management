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
                <el-select v-model="repeatValue" @change="handleOptionChange">
                    <el-option
                            v-for="item in options"
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
        <div slot="footer" class="dialog-footer">
            <el-button class="button-padding" @click="handleRepeatConfirm">确认</el-button>
            <el-button class="button-padding" @click="handleRepeatCancel">取消</el-button>
        </div>

        <custom-repeat-dialog :custom-repeat-dialog-visible="customRepeatDialogVisible"
                              @customRepeatConfirm="customRepeatDialogVisible=false"
                              @customRepeatCancel="customRepeatDialogVisible=false"
        ></custom-repeat-dialog>
    </el-dialog>
</template>

<script>
import CustomRepeatDialog from "@/view/ListPage/Components/customRepeatDialog.vue";

export default {
    name: 'RepeatDialog',
    components: {CustomRepeatDialog},

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
            options: [{
                value: 'never',
                label: '永不'
            }, {
                value: 'everyday',
                label: '每天'
            }, {
                value: 'everyWeek',
                label: '每周'
            }, {
                value: 'everyMonth',
                label: '每月'
            }, {
                value: 'everyYear',
                label: '每月'
            }],

            customRepeatDialogVisible: false
        }
    },

    methods: {
        handleOptionChange(value) {
            // TODO 从自定义再选自定义，也要打开dialog
            if (value === 'custom') {
                this.customRepeatDialogVisible = true
            }
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
    margin-left: 2rem;
    width: 12rem;
}
</style>