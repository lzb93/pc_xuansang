<style lang="scss" rel="stylesheet/scss" src="./footer.scss"></style>
<template>
  <div class="footer" v-if='loading'>
    <div class="second">
      <div class="clearfix">
        <div class="menu_logo left">
          <div>
            <router-link to="/"><img src="../../assets/images/logo.png" alt=""></router-link>
          </div>
          <!-- <ul class="clearfix">
            <li class="left" v-for='(item, index) in list' v-bind:key='index'><a href="javascript:;" @click="jumpTo(item.h_id)">{{item.name}}</a></li>
          </ul> -->
          <ul class="about_us flex_row">
            <li><router-link :to="{name: 'aboutUs'}" >关于我们</router-link></li>
            <li><router-link :to="{name: 'statement'}" >版权声明</router-link></li>
            <li><router-link :to="{name: 'problem'}" >常见问题</router-link></li>
            <li><router-link :to="{name: 'rechargeVip'}" >VIP特权</router-link></li>
            <li><router-link :to="{name: 'opinion'}" >意见反馈</router-link></li>
          </ul>
        </div>
        <div class="qr_code_wrap right">
          <div class="left" >
            <img class="qr_code" src="../../assets/images/icon_collect.png" alt="">
            <p>二维码</p>
          </div>
          <div class="left" >
            <img class="qr_code" src="../../assets/images/icon_collect.png" alt="">
            <p>二维码</p>
          </div>
        </div>
      </div>
    </div>
    <div class="fourth">
        <p>Copyright ©2018-2023 XXXXXX 闽ICP备180253XXX号</p>
    </div>
  </div>
</template>

<script>
  import { getFooter } from '@/services';
  export default {
    data() {
      return {
        host: process.env.HOST,
        loading: false,
        link: [],
        list: [],
        qrcode: [],
        logo: ''
      }
    },
    async created() {
      this.loading = true;
    },
    methods: {
    }
  }
</script>
