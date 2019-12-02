<style lang='scss' rel='stylesheet/scss' src='./teachingVideo.scss'></style>
<template>
    <div>
      <div v-show="loading" style="min-height: 400px; text-align: center;padding-top: 100px;">
        <i class="el-icon-loading" style="font-size: 22px; vertical-align: text-top;"></i>
        <span style="color: #999;">正在加载中...</span>
      </div>
      <div v-show="!loading" class="video_wrap">
        <div class="new_teaching">
            <h2>{{pageInfo.title}}</h2>
            <!-- <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for='(item, index) in list' v-bind:key='index' @click ='toCourse(item.m_id)'>
                        <img class="new_item_img" :src="item.cover" alt="">
                        <div class="hide">
                            <img  src="../../assets/images/shipin.png" alt="">
                        </div>
                        <p class="tx_ov">{{item.title}}</p>
                    </div>
                </div>

                <div class="swiper-pagination" style="bottom: 0;"></div>
            </div> -->
            <div class="list_wrap flex_row">
                <div class="list_item" v-for='(item, index) in list' v-bind:key='index' @click ='toCourse(item.m_id)'>
                    <img class="new_item_img" :src="item.cover" alt="">
                    <div class="hide">
                        <img  src="../../assets/images/shipin.png" alt="">
                    </div>
                    <p class="tx_ov">{{item.title}}</p>
                </div>
            </div>
            <div class="page" v-show="count > pageSize">
                <el-pagination
                    @current-change="currentChange"
                    :current-page="currentPage"
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :total="count">
                </el-pagination>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
    import { videoList } from '@/services';
    import Swiper from 'swiper';
    export default {
        data(){
            return {
                host: process.env.HOST,
                loading: true,
                pageInfo: {},
                pageSize:8,
                count: 1,
                currentPage: 1,
                list:[],
                listImg: ''
            }
        },
        async created() {
            const query = this.$route.query;
            this.pageInfo = query;
            this.pageInfo.title = query.title;
            this.pageInfo.id = query.id;
            let params = {
                ft_id: this.pageInfo.id,
                page: this.currentPage - 1,
                size: this.pageSize
            }
            this.videoList(params)
        },
        mounted() {
            new Swiper('.swiper-container', {
                slidesPerView: 4,
                slidesPerColumn: 3,
                slidesPerColumnFill: 'row',
                spaceBetween: 50,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            })
        },
        methods:{
            toCourse(mId) {
                this.$router.push({path:`/course/${mId}`})
            },
            currentChange(val) {
                let params = {
                    ft_id: this.pageInfo.id,
                    page: val - 1,
                    size: this.pageSize
                }
                this.videoList(params)
            },
            async videoList(params) {
                const {status,result,info} = await videoList(params)
                this.loading = false;
                if(status != 1){
                    return this.$Message(info, 'error')//返回状态
                }
                this.banner = result.banner;
                this.list = result.list;
                result.list.forEach(item => {
                    return item.cover = item.cover.split('!')[0]
                });
                if(this.count == 1) {
                    this.count = result.count
                }
            }
        }
    }

</script>
