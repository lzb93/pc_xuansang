<style lang="scss" rel="stylesheet/scss" src="./detail.scss"></style>
<template>
  <div class="detail_container">
    <loadings v-if='loading' v-on:getLoadingHeight="getLoadingHeight" :noneTop="true"></loadings>
    <div v-show="!loading" :style="{'min-height': loadingHeight + 'px'}" style="background-color: #f8f8f8">
      <div class="inner_container">
        <div style="box-shadow: 0 3px 10px 0 #e5e5e5; border-radius: 4px; margin-bottom: 20px;" v-for="(item, index) in ad" :key="index">
          <a href="javascript:;" @click="jumpAd(item.url_link)">
            <img style="display: block; width: 100%" :src="item._image" alt="">
          </a>
        </div>
        <div class="clearfix" v-if="Object.keys(detail).length > 0">
          <div class="main_header">
            <div>
              <i class="iconfont">&#xe60e;</i>
              <span v-if='detail.ft_id'>
                <router-link :to='{name: "type", query: {ftId: detail.ft_id}}'>
                  <span>{{detail.f_name}}</span>
                  <i class="iconfont">&#xe607;</i>
                </router-link>
              </span>
              <span v-if='detail.st_id'>
                <router-link :to='{name: "type", query: {ftId: detail.ft_id, stId: detail.st_id}}'>
                  <span>{{detail.s_name}}</span>
                  <i class="iconfont">&#xe607;</i>
                </router-link>
              </span>
              <span v-if='detail.tt_id'>
                <router-link :to='{name: "type", query: {ftId: detail.ft_id, stId: detail.st_id, ttId: detail.tt_id}}'>
                  <span>{{detail.t_name}}</span>
                  <i class="iconfont">&#xe607;</i>
                </router-link>
              </span>
              <span class="current">{{detail.title}}</span>
            </div>
            <div class="main_header_icon">
              <span><i class="iconfont">&#xe669;</i>{{detail.click}}</span>
              <span><i class="iconfont">&#xe794;</i>{{detail.downloads}}</span>
              <span><i class="iconfont">&#xe642;</i>{{detail.collection}}</span>
            </div>
          </div>

          <div class="detail_left left">
            <div class="main_body clearfix">
              <div class="number right">图片编号：{{detail.image_sn}}</div>
              <div>
                <img :src="detail.image" alt="">
              </div>
            </div>

            <p>{{detail.introduce}}</p>

          </div>
          <div class="detail_right right">
            <div class="right_info">
              <div class="clearfix">
                <a href="javascript:;" @click='download'><div class="btn_download left">免费下载</div></a>
                <a href="javascript:;" @click='collectTheme'>
                  <div class="collect right">
                    <img v-if="!detail.is_col" src="../../assets/images/icon_collect_f.png" alt="">
                    <img v-if="detail.is_col" src="../../assets/images/icon_collect.png" alt="">
                  </div>
                </a>

              </div>
              <!-- <div class="look_for">找人设计</div> -->

              <div class="info_list">
                <div class="clearfix">
                  <span class="left">编号</span>
                  <span class="right">{{detail.image_sn}}</span>
                </div>
                <div class="clearfix">
                  <span class="left">素材类型</span>
                  <span class="right">{{themeTypes[detail.theme_type]}}</span>
                </div>
                <div class="clearfix" v-if="detail.dpi">
                  <span class="left">分辨率</span>
                  <span class="right">{{detail.dpi}}</span>
                </div>
                <div class="clearfix" v-if="detail.file_format">
                  <span class="left">格式</span>
                  <span class="right">{{sizeTyprs[detail.file_format]}}</span>
                </div>
                <div class="clearfix" v-if="detail.pxw && detail.pxw">
                  <span class="left">尺寸</span>
                  <span class="right">{{detail.pxw}} * {{detail.pxh}}</span>
                </div>
                <div class="clearfix" v-if="detail.agreement && agreements.length > 0">
                  <span class="left">授权方式</span>
                  <span class="right">{{agreementName}}</span>
                </div>
                <div class="clearfix">
                  <span class="left">肖像权/物权</span>
                  <span class="right">为展示使用，不可商用</span>
                </div>
                <div class="clearfix">
                  <span class="left">版权所有</span>
                  <span class="right">@美工铺子</span>
                </div>
              </div>

              <div class="account" v-if='Object.keys(account).length > 0'>
                <div class="avatar_wrap clearfix">
                  <img class="left" src="" alt="">
                  <div class="left" style="padding: 0 10px;">
                    <h3>nicheng <i class="iconfont" style="font-weight: normal;">&#xe7cc;</i></h3>
                    <p style="margin-top: 3px;">职业，没有就暂无信息</p>
                  </div>
                </div>
                <div>
                  <div class="clearfix" style="padding: 10px 0 20px;">
                    <span class="left">Ta的相关作品</span>
                    <a href='javascript:;' class="right">查看更多</a>
                  </div>
                  <div class="work_wrap clearfix">
                    <div class="work_item left">
                      <img src="" alt="">
                    </div>
                    <div class="work_item left">
                      <img src="" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="padding: 0 15px 20px;" v-if='searchList.length > 0'>
              <div class="about_search">相关搜索</div>
              <div class="search_list clearfix">
                <a href='javascript:;'><div class="item left">banner</div></a>
                <a href='javascript:;'><div class="item left">爱心banner</div></a>
                <a href='javascript:;'><div class="item left">粉色banner</div></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { detail, downloadTheme, collect, getAgreement, getAd } from '@/services';
  import loadings from '../main/loading.vue';
  export default {
    data() {
      return {
        host: process.env.HOST,
        loading: true,
        ad: [],
        detail: {},
        account: {},
        next: {},
        previous: {},
        searchList: [],
        agreements: [],
        sizeTyprs: {
          1: 'PSD',
          2: 'AI',
          3: 'CDR'
        },
        themeTypes: {
          1: '原创',
          2: '共享'
        },
        loadingHeight: 420
      }
    },
    components: {
      loadings
    },
    created() {
      const routeParams = this.$route.params;
      this.getDetail({m_id: routeParams.mId});
      this.getAgreement();
      this.getAd({area_id: 12});
    },
    watch: {
      agreements: {
        handler() {
          const agreement = this.agreements.find(item => {
            return item.id == (this.detail && this.detail.agreement);
          })
          this.agreementName = agreement && agreement.title;
        },
        deep: true
      },
      detail: {
        handler() {
          const agreement = this.agreements.find(item => {
            return item.id == (this.detail && this.detail.agreement);
          })
          this.agreementName = agreement && agreement.title;
        },
        deep: true
      }
    },
    methods: {
      getLoadingHeight(val) {
        this.loadingHeight = val;
      },
      async collectTheme() {
        const detail = this.detail;
        let isCol = detail.is_col ? 0 : 1;
        const {status, result, info} = await collect({m_id: detail.m_id})
        if(status != 1) {
          return this.$Message(info, 'error');
        }
        Object.assign(detail, {is_col: isCol});
        if(isCol) {
          this.$Message('收藏成功', 'success');
        }
      },
      async download() {
        const detail = this.detail;
        const { status, result, info } = await downloadTheme({m_id: detail.m_id})
        if(status == 0) {
          return this.$Message(info, 'error');
        }else if(status == 2) {
          this.$Message('下载次数不足，请前去开通会员', 'error');
          setTimeout(() => {
            this.$router.push({name: 'recharge', query: {id: result}})
          }, 1000)
        } else if(status == -1){
          // return this.$Message(info, 'error')
          }else {
            window.open(result, '_blank');
          }
        
      },
      async getDetail(params) {
        const {status, result, info} = await detail(params)
        this.loading = false;
        if(status != 1) {
          this.$Message(info, 'error');
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
          return;
        }
        this.detail = result.detail;
        this.next = result.next;
        this.previous = result.previous;
      },
      async getAgreement() {
        const {status, result, info} = await getAgreement()
        if(status != 1) {
          return this.$Message(info, 'error')
        }
        this.agreements = result;
      },
      async getAd(params) {
        const {status, result, info} = await getAd(params)
        if(status != 1) {
          return this.$Message(info, 'error');
        }
        (result || []).forEach(item => {
          let arr = item.image.split('!');
          item._image = arr[0];
        })
        this.ad = result;
      }
    }
  }
</script>
