<style lang="scss" rel='stylesheet/scss' src='./aboutUs.scss'></style>
<template>
    <div class="aboutUs_wrap " >
        <div>
            <!-- <div class="first_line flex_between" > -->
                <!-- <div class="introduce_img">
                    <img src="../../images/four.png" alt="">
                </div> -->
                <!-- <div class="introduce_wrap">
                    <p style="font-size:24px;">我们<span style="color:red;">是谁？</span></p>
                    <p class="our_what">我们是干什么的 ?</p>
                    <div class="line"></div>
                    <p class="introduce">
                        厦门美工铺子网络科技有限公司由怀着共同信念的设计团队、软件开发团队、摄影团队组成。
                        公司是追求高品质服务性质的开发设计公司，遵循以人为本的原则，倡导积极的团队精神，
                        在市场考验中赢得了客户的一致好评。公司秉承以市场为先导的理念，倡导“策略化设计”，
                        为企业量身定制品牌体系规划战略，在设计业务、摄影业务方面都有强大的专业实力。
                    </p>
                </div> -->
            <!-- </div> -->
            <img class="about_img" :src="aboutimg" alt="">
            <!-- <div class="team_wrap">
                <p>团队主要成员</p>
                <div style="position: relative; width:1300px; margin: 25px auto;">
                    <div class="swiper-container team_pep">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">Slide 1</div>
                            <div class="swiper-slide">Slide 2</div>
                            <div class="swiper-slide">Slide 3</div>
                            <div class="swiper-slide">Slide 4</div>
                        </div>
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div> -->
            
            <div class="team_wrap">
                <p>合作品牌</p>
                <img class="team_img" :src="cooperation" alt="">
            </div>
            <div class="team_wrap last_line ">
                <p>联系我们</p>
                <div class="last_line_wrap flex_between">
                    <div class="last_line_img" id="container">
                        <a href="" > <img src="" alt=""></a>
                    </div>
                    <div class="last_line_content">
                        <p style="white-space: pre-wrap;">{{aboutList.contact}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { TMap } from '../../TMap'
    import Swiper from 'swiper'
    import { aboutUs } from '@/services'
    export default {
        data() {
            return {
                aboutList: {},
                aboutimg : '',
                cooperation: ''
            }
        },
        mounted() {
            new Swiper('.swiper-container', {
                slidesPerView: 2,
                spaceBetween: 280,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
            setTimeout(()=>{
                TMap('FPKBZ-O7I3X-IIL4I-ZQAYX-L3L4E-F5FWK').then(qq => {
                    var center = new qq.maps.LatLng(24.5308200000, 118.1562300000);
                    var map = new qq.maps.Map(document.getElementById("container"), {
                        // 地图的中心地理坐标。
                        center: center,
                        zoom:12,
                        mapStyleId: 'style1'
                    });
                    var marker = new qq.maps.Marker({
                        position: center,
                        map: map
                    });
                });
            },200) 
        },
        created() {
            this.aboutUs()
        },
       
        methods: {
            async aboutUs(params) {
                const { status, result, info } = await aboutUs(params)
                if( status != 1) {
                    return this.$Message.error(info)
                }
                this.aboutList = result;
                this.aboutimg = result.about.split('!')[0]
                this.cooperation = result.cooperation.split('!')[0]
            },
        },
    }
</script>
