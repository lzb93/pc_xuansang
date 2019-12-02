<style lang='scss' rel='stylesheet/scss' src='./recharge.scss'></style>

<template>
  <div>
    <div v-show="loading" style="min-height: 400px; text-align: center;padding-top: 100px;">
      <i class="el-icon-loading" style="font-size: 22px; vertical-align: text-top;"></i>
      <span style="color: #999;">正在加载中...</span>
    </div>
    <div v-show="!loading" style="padding-top: 110px; background-color: #fff;">
        <!-- 内容 -->
      <div class="vip_main clearfix">
        <div class="vip_type left">
          <ul>
            <li v-for='(item, index, key) in menu' v-bind:key='index,key'
            :class='{change: active == index}'
            :style='active == index ? style : ""'
            @click='selectVip(index)'
            v-on:mouseenter='enter($event, index, item.color)'
            v-on:mouseleave='leave($event, index)'>
              <img :src="item.icon" alt="">{{item.name}}
            </li>
          </ul>
        </div>
        <div class="recharge_contant right">
          <div class="price_list" v-if='!list[active]' style="line-height: 180px; text-align: center;">
            <span>暂无充值选项</span>
          </div>
          <div class="price_list" v-if='list[active] && list[active].length > 0'>
              <div class="flex_row">
                  <div class="price_item"
                  v-for='(item, index) in list[active]'
                  :key='index'
                  :style='{color: mainColor, borderColor: selectActive == index ? mainColor : ""}'
                  v-on:mouseenter='itemEnter($event, index)'
                  v-on:mouseleave='itemLeave($event, index)'
                  @click='selectVipItem(index)'>
                      <div class="text_wrap">
                          <div>
                            <span style="font-size: 48px; font-weight: bold">{{parseInt(item.money)}}</span>
                            <span style="color: #707070">元/</span>
                            <span>{{item.effective_time ? item.effective_time + '天' : '终身'}}</span>
                          </div>
                          <div class="second">
                            <span style="color: #707070">{{item.download ? item.download + '次' : '海量'}}/天</span>
                          </div>
                      </div>
                      <!-- <span class='xianshi' :style='{background: mainColor}'>限时特价</span> -->
                      <span class="dagou" v-if='selectActive == index' :style='{background: mainColor}'><i class="iconfont">&#xe613;</i></span>
                  </div>
              </div>
          </div>
          <div class="amount_payable">
                选择充值方式
                <a href="javascript:;" @click='color = !color'><i class="iconfont" :style="{color: color ? mainColor:''}" style="vertical-align: -1px; margin-left: 20px;">&#xe611;</i></a>
                <a href="javascript:;">《VIP服务协议》</a>
          </div>
          <div class="pay_way flex_between">
              <div class="wechar">
                <a href="javascript:;" @click='buildOrder(1)'>
                  <img class="wechar_img" src="../../assets/images/weixinpay.png" alt="">
                  <div class="pay_btnn">
                      <img class="logo" src="../../assets/images/wechat_logo.png" alt="">
                      <span>微信支付</span>
                  </div>
                </a>
              </div>
              <div class="alipay">
                <a href="javascript:;" @click='buildOrder(2)'>
                  <img class="alipay_img" src="../../assets/images/zhifupay.png" alt="">
                  <div class="pay_btno">
                      <img class="logo_pay" src="../../assets/images/alipay_logo.png" alt="">
                      <span>支付宝支付</span>
                  </div>
                </a>
              </div>
          </div>
        </div>
      </div>
      <div class="zf_dialog" v-if='qrcode' @click='closeDialog'>
        <div class="zf_inner" @click.stop>
          <img :src="'http://www.meigongpuzi.cn/data-api/Api/Pay/qrcode?text=' + qrcode" alt="">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { getMemberList, createOrder, checkOrder } from '@/services';
  export default {
    data() {
      return {
        host: process.env.HOST,
        loading: true,
        color: true,
        active: 1,
        selectActive: 0,
        menu: [],
        list: [],
        style: {
          'border-color': '',
          'color': ''
        },
        mainColor: '',
        qrcode: '',
        activeStyle: {},
        timer: ''
      }
    },
    async created() {
      const query = this.$route.query;
      this.active = query.id;
      const { status, result, info } = await getMemberList()
      this.loading = false;
      if(status != 1) {
        return this.$Message(info, 'error');
      }
      this.menu = result.vip_sign;
      for(let i in this.menu) {
        this.menu[i].list = [];
      }
      this.list = result.list;
      if(this.$route.params && this.$route.params.vId) {
        const vId = (this.list[query.id] || []).findIndex(item => {
          return item.v_id == this.$route.params.vId;
        })
        this.selectActive = vId;
      }
      this.formatColor(this.active);
    },
    methods: {
      closeDialog() {
        this.qrcode = '';
        if(this.timer) {
          clearInterval(this.timer);
        }
      },
      async buildOrder(type) {
        if(!this.color) {
          return this.$Message('vip服务协议未同意', 'error');
        }
        const vipType = this.active;
        const selectActive = this.selectActive;
        let filter = {};
        for(let i in this.list) {
          if(i == vipType) {
            filter = (this.list[i] || []).find((item, index) => {
              return index == selectActive;
            })
          }
        }
        let params = {
          v_id: filter.v_id,
          pay_type: type
        }
        if(!params.v_id) {
          return;
        }
        const {status, result, info} = await createOrder(params)
        if(status != 1) {
          return this.$Message(info, 'error');
        }
        this.showDialog = true;
        this.qrcode = result.url;
        this.timer = setInterval(() => {
          this.checkOrder({order_sn: result.order_sn});
        }, 1000)
      },
      formatColor(index) {
        let menu = this.menu;
        this.style = {
          'border-color': menu[index].color,
          'color': menu[index].color
        };
        this.activeStyle = {
          'border-color': menu[index].color
        }
        this.mainColor = menu[index].color;
      },
      enter(e, index) {
        if(index == this.active) {
          return;
        }
        e.target.style.color = this.menu[index].color;
      },
      leave(e, index) {
        if(index == this.active) {
          return;
        }
        e.target.style.color = '';
      },
      itemEnter(e, index) {
        if(index == this.selectActive) {
          return;
        }
        e.target.style.borderColor = this.mainColor;
      },
      itemLeave(e, index) {
        if(index == this.selectActive) {
          return;
        }
        e.target.style.borderColor = '#D8D8D8';
      },
      selectVip(index) {
        this.$router.push({name: 'recharge', query: {id: index}})
        // this.$route.query.id = index;
        this.active = index;
        this.selectActive = 0;
        this.formatColor(index);
      },
      selectVipItem(index) {
        this.selectActive = index;
      },
      async checkOrder(params) {
        const {status, result, info} = await checkOrder(params)
        if(status == 1 && result == 2) {
          this.qrcode = '';
          this.$Message('充值成功','success')
          clearInterval(this.timer);
          setTimeout(() => {
            this.$router.push({name: 'user', query: {active: 'vipCenter'}})
          }, 500);
        }
      }
    }
  }
</script>
