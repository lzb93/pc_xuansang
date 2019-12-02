<style lang="scss" rel='stylesheet/scss' src='./about.scss'></style>
<template>
    <div class="about_wrap">
        <!-- <div v-for="(item,index) in list" :key="index" 
            v-show="
            item.type == 1 && aboutActive == 'aboutUs' || 
            item.type == 2 && aboutActive == 'statement' ||
            item.type == 3 && aboutActive == 'problem'||
            item.type == 4 && aboutActive == 'opinion'
            ">
            <img :src="item.image" alt="">
        </div> -->
        <img src="../../assets/images/banner.png" alt="">
        
        <div class="list_wrap">
            <ul class="about_list flex_between" style="flex-wrap: inherit">
                <li><router-link to="/about/aboutUs" :class="{active: aboutActive == 'aboutUs'}">关于我们</router-link></li>
                <li><router-link to="/about/statement" :class="{active: aboutActive == 'statement'}">版权声明</router-link></li>
                <li><router-link to="/about/problem" :class="{active: aboutActive == 'problem'}">常见问题</router-link></li>
                <li><router-link :to="{name: 'rechargeVip'}" >VIP特权</router-link></li>
                <li><router-link to="/about/opinion" :class="{active: aboutActive == 'opinion'}">意见反馈</router-link></li>
            </ul>
        </div>
        <div class="about_content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    // import { mapActions, mapState } from 'vuex'
    // import child from '../about/aboutUs'
    import { banner } from '@/services'
    export default {
        data() {
            return {
                aboutActive: 'aboutUs',
                list:{}
            }
        },
        created() {
            const path = this.$route.path;
            let arr = path.split('/');
            this.aboutActive = arr[arr.length - 1];
            // this.banner()
            // this.loadingUpload(false);
        },
        // computed: {
        //     ...mapState(['loading'])
        // },
        methods: {
            async banner() {
                const { status, result, info } = await banner()
                if( status != 1) {
                    return this.$Message.error(info)
                }
                this.list = result;
                console.log(this.list, 'banner')
            },
            // ...mapActions([ 'loadingUpload' ])
        }
    }
</script>
