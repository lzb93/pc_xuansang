<style lang="scss" rel='stylesheet/scss' src='./statement.scss'></style>
<template>
    <div style="background-color: #F7F6F6 ;">
        <div class="statement_wrap">
            <div class="flex_between">
                <ul class="statement_list" >
                    <li v-for="(item, index) in contents" :key="index" :class="{active: activeIndex == index + 1 }" @click="switchTab(index + 1)">{{item.title}}</li>
                </ul>
                <div class="statement_content" >
                    <div v-for="(item, index) in contents" :key="index" v-if="activeIndex == index + 1">
                       <div v-html="item.content"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { statement } from '@/services'
    export default {
        data() {
            return {
                activeIndex: 1,
                contents:[]
            }
        },
        created() {
            this.statement()
        },
        methods: {
            switchTab(type) {
                this.activeIndex = type;
            },
            async statement() {
                const { status, result, info } = await statement() 
                if( status != 1) {
                    return this.$Message.error(info)
                }
                this.contents = result;
            }   

        },
    }
</script>
