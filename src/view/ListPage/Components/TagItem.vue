<template>
    <el-dialog
            title="请选择标签"
            :visible.sync="dialogVisible"
            width="30%"
            center
    >
        <el-row>
            <el-tag
                    class="button-tag"
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    @close="handleCloseTag(tag)"
                    @click="handleSelectOrCancelTag(tag)"
                    :class="{selected: isSelected(tag)}"
            >{{ tag }}
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" @click="showInput" size="small">+ 新标签</el-button>
        </el-row>

        <div class="dialog-footer">
            <!--            TODO 为什么input和button转化时，这两个按钮高度变更-->
            <el-button @click="handleConfirm">确认</el-button>
            <el-button @click="handleClose">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'TagItem',

    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
    },

    data() {
        return {
            dynamicTags: ['写作业', '工作', '整理笔记', '阅读', '运动', '弹吉他'],
            inputVisible: false,
            inputValue: '',
            selectedTags: [],
        }
    },

    watch: {
        // TODO 控制台报错：Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.
        //  Instead, use a data or computed property based on the prop's value. Prop being mutated: "dialogVisible"
        // dialogVisible(val) {
        //     debugger
        //     this.modelState = val;
        // }
    },

    computed: {
        isSelected() {
            return tag => this.selectedTags.includes(tag)
        },
    },

    methods: {
        handleCloseTag(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },
        handleSelectOrCancelTag(tag) {
            if (this.isSelected(tag)) {
                this.deselectTag(tag)
            } else {
                this.selectTag(tag)
            }
        },
        selectTag(tag) {
            this.selectedTags.push(tag);
        },
        deselectTag(tag) {
            const index = this.selectedTags.indexOf(tag)
            if (index !== -1) {
                this.selectedTags.splice(index, 1)
            }
        },
        handleInputConfirm() {
            const inputValue = this.inputValue
            if (inputValue) {
                if(this.dynamicTags.includes(inputValue)){
                    this.$message({
                        message: '标签已经存在',
                        type: 'warning'
                    })
                }else {
                    this.dynamicTags.push(inputValue)
                }
            }
            this.inputVisible = false
            this.inputValue = ''
        },
        showInput() {
            this.inputVisible = true
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        handleConfirm() {
            // TODO 把tags传递给各自的task
            const sendSelectedTags = this.selectedTags
            this.$emit('sendSelectedTags', sendSelectedTags)
            // TODO button要点两次才关闭
            this.dialogVisible = false
        },
        handleClose() {
            // TODO
            // 选择点击确认，返回给父组件，再打开时，选择了的内容要选中
            // 选择点击取消，不返回给父组件，再打开，没有选中
            this.dialogVisible = false
        },
    },
}
</script>

<style scoped>
.el-tag {
    margin-left: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
}

.selected {
    font-weight: bold;
}

.button-new-tag {
    margin-left: 1rem;
    height: 3.2rem;
    line-height: 3rem;
    padding-top: 0;
    padding-bottom: 0;
    margin-left: 1rem;
    margin-bottom: 1rem;
}

.input-new-tag {
    width: 9rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
    vertical-align: bottom;
}

.dialog-footer {
    text-align: right;
}
</style>