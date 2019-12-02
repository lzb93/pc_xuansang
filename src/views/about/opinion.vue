<style lang="scss" rel='stylesheet/scss' src='./opinion.scss'></style>
<template>
    <div style="background-color: #F7F6F6 ;">
        <div class="opinion_wrap">
            <p class="opinion_head">您有什么问题或意见要对我们说？</p>
            <el-input
                class="opinion_input"
                type="textarea"
                placeholder="请输入您的意见"
                v-model="opinionContent">
            </el-input>
            <el-button class="sub" type="primary" @click="sub">意见提交</el-button>
        </div>
    </div>
</template>
<script>
    import { feedback } from '@/services'
    export default {
        data() {
            return {
                opinionContent:''
            }
        },
        created() {

        },
        methods: {
            sub() {
                let params = {
                    content: this.opinionContent
                }
                this.feedback(params)
            },
            async feedback(params) {
                const { status, result , info } = await feedback(params)
                if( status != 1) {
                    return this.$Message(info, 'error')
                }
                return this.$Message(info, 'success')
            }
        }
    }
</script>
