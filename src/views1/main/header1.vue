<style lang="scss" rel="stylesheet/scss" src="./header.scss"></style>

<template>
  <div class="mg_header_wrap">
    <div class="mg_header flex_between">
      <div class="logo">
        <router-link :to="{path: '/'}">
          <img src="../../assets/images/logo.png" alt="">
        </router-link>
      </div>
      <div class="tool clearfix">
        <div class="right">
          <div class="left">
            <div class="item_tool left">
              <router-link :to="{name: 'login'}" class="tool_btn btn_login">请登录</router-link>
            </div>
            <div class="item_tool left">
                <router-link :to="{name: 'login', params: {pageType: 'register'}}" class="tool_btn">免费注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getHeader } from '@/services';
  import { mapActions, mapState } from 'vuex';
  export default {
    data() {
      return {

      }
    },
    created() {

    }
  }
</script>
