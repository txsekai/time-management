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
        task: {
            type: Object,
            default: function() {
                return {tags:[]}
            }
        }
    },
    data() {
        return {
            dynamicTags: ['写作业', '工作', '整理笔记', '阅读', '运动', '弹吉他'],
            inputVisible: false,
            inputValue: '',
            
        }
    },

    computed: {
        isSelected() {
            return tag => this.task.tags.includes(tag)
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
            this.task.tags.push(tag);
        },
        deselectTag(tag) {
            const index = this.task.tags.indexOf(tag)
            if (index !== -1) {
                this.task.tags.splice(index, 1)
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
            this.$emit("confirm")
        },
        handleClose() {
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