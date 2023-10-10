<template>
    <el-row>
        <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            @close="handleClose(tag)"
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
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
    </el-row>
</template>

<script>
export default {
    name: 'LabelItem',

    data() {
        return {
            dynamicTags: ['写作业', '工作', '整理笔记', '阅读', '运动', '弹吉他'],
            inputVisible: false,
            inputValue: '',
        }
    },

    methods: {
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },
        handleInputConfirm() {
            const inputValue = this.inputValue
            if(inputValue) {
                this.dynamicTags.push(inputValue)
            }
            this.inputVisible = false
            this.inputValue = ''
        },
        showInput() {
            this.inputVisible = true
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        }
    },
}
</script>

<style scoped>
.el-tag + .el-tag {
    margin-left: 1rem;
    margin-bottom: 1rem;
}

.button-new-tag {
    margin-left: 1rem;
    height: 3.2rem;
    line-height: 3rem;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 9rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
    vertical-align: bottom;
}
</style>