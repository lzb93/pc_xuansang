<style lang="scss" rel="stylesheet/scss" src="./footer.scss"></style>
<template>
  <div class="footer" v-if='loading'>
    <div class="first">
      <div>
        <div>
          <a>
            <i class="iconfont" style="font-size: 36px;">&#xe927;</i>
            <span>海量素材</span>
          </a>
        </div>
        <div>
          <a>
            <i class="iconfont" style="font-size: 36px;">&#xe666;</i>
            <span>免费下载</span>
          </a>
        </div>
        <div>
          <a>
            <i class="iconfont" style="font-size: 36px;">&#xe629;</i>
            <span>商用版权</span>
          </a>
        </div>
        <div>
          <a>
            <i class="iconfont" style="font-size: 36px;">&#xe67c;</i>
            <span>优质服务</span>
          </a>
        </div>
      </div>
    </div>
    <div class="second">
      <div class="clearfix">
        <div class="menu_logo left">
          <div>
            <router-link to="/"><img :src="logo" alt=""></router-link>
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
          <div class="left" v-for="(item,index) in qrcode" v-bind:key='index'>
            <img class="qr_code" :src="item.image" alt="">
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="third">
      <ul>
        <li v-for='(item,index) in link' v-bind:key='index'><a :href="item.link" target="_blank">{{item.name}}</a></li>
      </ul>
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
