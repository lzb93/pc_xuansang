<style lang="scss" rel="stylesheet/scss" src="./home.scss"></style>
<template>
  <div class="home_wrap index_wrap">
    <loadings v-if="loading" v-on:getLoadingHeight="getLoadingHeight" :noneTop="true"></loadings>
    <div v-show="!loading" :style="{'min-height': loadingHeight + 'px'}">
      <div class="search_container">
        <div class="search_wrap clearfix">
          <div class="left" style="margin-top: 25px;">
            <!-- <div class="search_nav clearfix">
              <div class="active">元素</div>
              <div>模板</div>
              <div>背景</div>
            </div> -->
            <div class="search_inner clearfix">
              <input type="text" v-model="keyWord" class="input left" placeholder="搜索素材" @keyup.enter="search">
              <a href="javascript:;" class="left" @click="search">
                <div class="btn_search">
                  <i class="iconfont">&#xe660;</i>
                </div>
              </a>
            </div>
            <!-- <div class="search_menu">
              <ul class="clearfix">
                <li>世界杯</li>
                <li>科技</li>
                <li>招聘</li>
                <li>党建</li>
                <li>中国风</li>
                <li>背景墙</li>
              </ul>
            </div> -->
          </div>
          <div class="search_gif left">
            <!-- <img src="../../assets/images/ranking.gif" alt=""> -->
            <router-link :to="{name: 'integral', query: {}}">
              <img src="../../assets/images/inte.gif" alt="">
            </router-link>
          </div>
        </div>
      </div>
      <!-- banner轮播 -->
      <div class="swiper-container banner_wrap" style="width: 100%;">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for='(item,index) in banner' v-bind:key='index'><img v-bind:src="item.image" alt=""></div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <!-- 模块 -->
      <div style="position: relative; width: 1200px; margin: 0 auto">
        <div class="swiper-container normal_wrap moudle_wrap" v-if="subject.length > 0">
          <div class="swiper-wrapper">
              <div class="swiper-slide" style="margin-bottom: 0" v-for="(item, index) in subject" :key="index" @click="toSubject(item)">
                <img :src="item.cover" alt="">
                <div class="item_content">
                  <div class="item_inner">
                    <h1 class="tx_ov">{{item.title}}</h1>
                  </div>
                </div>
              </div>
          </div>

          <div class="btn_weiper">
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
        <div class="layout" v-for="(item, firstIndex) in homeInfo" v-bind:key='firstIndex'>
          <div class="lay_header">
            <h2 class="lay_title">{{item.name}}</h2>
            <div class="small_title">
              <div class="line"></div>
              <span>{{item.en_name}}</span>
            </div>
          </div>
          <div class="lay_menu">
            <ul class="clearfix">
              <li v-for="(secondNav, index) in item.second" :class="{active: params[firstIndex] && params[firstIndex].st_id == secondNav.t_id}" v-bind:key='index' @click='jumpTo(firstIndex, item.ft_id, secondNav.t_id)'><div>{{secondNav.name}}</div></li>
            </ul>
          </div>
          <div class="lay_main">
            <div class="normal_wrap" style="height: 200px; line-height: 100px" v-if="item.template.length == 0">
              <span>暂无数据</span>
            </div>
            <div class="swiper-container normal_wrap lay_wrap" v-if="item.template.length > 0">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for='(template, index) in item.template' v-bind:key='index'>
                  <router-link :to="{path:'/detail/' + template.m_id}" target='_blank'>
                    <div class="item" style="position: relative;" >
                      <img class="img" :src="template.cover" alt="">
                      <div class="control_wrap">
                        <p class="left tx_ov">{{template.title}}</p>
                        <div class="btn_download">免费下载</div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
              <!-- 如果需要导航按钮 -->
              <div class="btn_weiper">
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div>
            <div class="more"><router-link :to="{name: 'type', query: {ftId: item.ft_id}}" v-if="item.template.length > 0">查看更多 ></router-link></div>
          </div>
        </div>
        <div class="side_position" ref="sidePosition" :style="{top: topHeight + 'px'}">
          <!-- <img class="side_plane" src="../../assets/images/airplane.png" alt=""> -->
          <div class="side_wrap">
            <div class="side_item">
              <router-link :to="{ name: 'rechargeVip'}">
                <svg class="icon icon_font" aria-hidden="true">
                  <use xlink:href="#icon-VIP"></use>
                </svg>
                <div>VIP</div>
              </router-link>
            </div>
            <div class="side_item">
              <a href="javascript:;" @click='signIn'>
                <svg class="icon icon_font" aria-hidden="true">
                  <use xlink:href="#icon-qiandao"></use>
                </svg>
                <div>签到</div>
              </a>
            </div>
            <div class="side_item">
              <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=927944997&site=qq&menu=yes">
                <svg class="icon icon_font" aria-hidden="true">
                  <use xlink:href="#icon-erji"></use>
                </svg>
                <div>客服</div>
              </a>
            </div>
            <div class="side_item">
              <a href="javascript:;" @click='publicClick'>
                <svg class="icon icon_font" aria-hidden="true">
                  <use xlink:href="#icon-fankui"></use>
                </svg>
                <div>反馈</div>
              </a>
            </div>
            <div class="side_item">
              <a href="javascript:;" @click="returnTop">
                <svg class="icon icon_font" aria-hidden="true">
                  <use xlink:href="#icon-huojian"></use>
                </svg>
                <div>顶部</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      class="el_dialog"
      title=""
      :visible.sync="showSignIn"
      width="305px"
      :show-close="false"
      center
    >
      <p style="text-align: center; margin-top: 120px">获取 +{{signInInte}} 积分</p>
    </el-dialog>
  </div>

</template>
<script>
  import Swiper from 'swiper';
  import { limitTimeRange } from 'element-ui';
  import { home, homeMaterial, signIn } from '@/services';
  import loadings from '../main/loading.vue';
  export default {
      data() {
        return {
          host: process.env.HOST,
          loading: true,
          banner: [],
          homeInfo: {},
          subject: [],
          keyWord: '',
          topHeight: 120,
          showSignIn: false,
          signInInte: '',
          params: [],
          loadingHeight: 420
        }
      },
      components: {
        loadings
      },
      async created() {
        this.loading = false;
        const { status, result, info } = await home()
        
        if(status != 1) {
            return this.$Message(info, 'error')
        }
        (result.home || []).forEach(item => {
          this.params.push({
            ft_id: 0,
            st_id: 0
          })
          item.second.unshift({
            t_id: 0,
            name: "全部"
          })
          if(!item.en_name) {
            item.en_name = 'meigongpuzi';
          }
        });
        this.banner = (result.banner || []).map( item => {
          return {
            image: item.image.replace("!watermark","")
          }
        })
        this.homeInfo = result.home;
        this.subject = (result.subject || []).map( item => {
            return {
              cover: item.cover.replace("!watermark",""),
              title: item.title,
              s_id: item.s_id
            }
        });
      },

      mounted() {
        window.addEventListener('scroll', this.handleScroll)
      },
      watch: {
        banner() {
          this.$nextTick(function(){
            new Swiper('.banner_wrap', {
              autoplay: {
                delay: 3000
              },
              effect : 'fade',
              loop: true,
              roundLengths: true,
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              },
            })
          })
        },
        subject() {
          this.$nextTick(function(){
            new Swiper('.moudle_wrap', {
              slidesPerView: 4,
              spaceBetween: 20,
              slidesPerGroup: 4,
              loopFillGroupWithBlank: true,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            })
          })
        },
        'homeInfo': {
          handler() {
            this.$nextTick(function(){
              new Swiper('.lay_wrap', {
                slidesPerView: 4,
                spaceBetween: 20,
                slidesPerGroup: 4,
                loopFillGroupWithBlank: true,
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
              })
            })
          },
          deep: true
        }
      },
      methods: {
        toSubject(item) {
          console.log(item, 'home item')
          this.$router.push({name: 'special', params: {sId: item.s_id, title: item.title}})
        },
        getLoadingHeight(val) {
          this.loadingHeight = val;
        },
        handleScroll() {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          if (scrollTop > 440) {
            this.topHeight = scrollTop - 318;
          } else {
            this.topHeight = 120;
          }
        },
        returnTop() {
          let timer = setInterval(() => {
            document.documentElement.scrollTop -= 20;
            if(document.documentElement.scrollTop <= 0) {
              document.documentElement.scrollTop = 0;
              clearInterval(timer)
            }
          }, 10)
        },
        jumpTo(index, ftId, stId) {
          let query = {};
          if(stId) {
            query = { ftId, stId };
          } else {
            query = { ftId }
          }
          this.params[index] = {ft_id: ftId, st_id: stId || ''};
          this.getHomeMaterial(this.params[index]);
        },
        search() {
          this.$router.push({name: 'type', query: {keyword: this.keyWord}})
        },
        // goDetail(mId) {
        //   // let routeData = this.$router.resolve({
        //   //   path: `/detail/${mId}`
        //   // })
        //   // window.open(routeData.href, '_blank');
        //   this.$router.push({path: `/detail/${mId}`})
        //   window.open(href, '_blank')
        // },
        async signIn() {
          const { status, result, info} = await signIn()
          if(status != 1) {
            return this.$Message(info, 'error')
          }
          this.signInInte = result;
          this.showSignIn = true;
        },
        publicClick() {
          this.$router.push({name:'opinion'})
        },
        async getHomeMaterial(params) {
          const {status, result, info} = await homeMaterial(params)
          let homeInfo = this.homeInfo;
          (homeInfo || []).forEach(item => {
            if(item.ft_id == params.ft_id) {
              item.template = result;
            }
          })
        }
      },
      destroyed () {
          window.removeEventListener('scroll', this.handleScroll)
      }
  };
</script>
