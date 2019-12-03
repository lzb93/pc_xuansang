<style lang="scss" rel="stylesheet/scss" src="./header.scss"></style>

<template>
  <div class="mg_header_wrap">
    <div class="mg_header flex_between">
      <div class="logo">
        <router-link :to="{path: '/'}">
          <!-- <img style="display: block; height: 33px" src="../../assets/images/logo.png" alt=""> -->
        </router-link>
      </div>
      <div class="header_nav flex_row">
        <div class="item_nav">
          <a href="javascript:;" class="nav_title">
            <span>设计创意</span>
            <img class="nav_bg" v-if='result.sheji.length > 0' src="../../assets/images/icon_header_select.png" alt="">
            <img class="nav_bg" v-if='result.sheji.length == 0' src="../../assets/images/icon_header_select1.png" alt="">
          </a>
        </div>
        <div class="item_nav">
          <a href="javascript:;" class="nav_title">
            <span>鉴赏提升</span>
            <img class="nav_bg" v-if='result.sheji.length > 0' src="../../assets/images/icon_header_select.png" alt="">
            <img class="nav_bg" v-if='result.sheji.length == 0' src="../../assets/images/icon_header_select1.png" alt="">
          </a>
        </div>
         <div class="item_nav">
          <a href="http://tutu.meigongpuzi.cn/#/index" class="nav_title" target="_blank">
            <span>在线设计</span>
            <img class="nav_bg" v-if='result.sheji.length > 0' src="../../assets/images/icon_header_select.png" alt="">
            <img class="nav_bg" v-if='result.sheji.length == 0' src="../../assets/images/icon_header_select1.png" alt="">
          </a>
        </div>
        <div class="item_nav">
          <a href="javascript:;" class="nav_title">
            <span>充值中心</span>
            <img class="nav_bg" v-if='result.sheji.length > 0' src="../../assets/images/icon_header_select.png" alt="">
            <img class="nav_bg" v-if='result.sheji.length == 0' src="../../assets/images/icon_header_select1.png" alt="">
          </a>
    
        </div>
        <!-- more -->
        <div class="item_nav">
          <a href="javascript:;" class="nav_title">
            <span><i class="iconfont">&#xe612;</i></span>
            <img class="nav_bg" v-if='more.length > 0' src="../../assets/images/icon_header_select.png" alt="">
            <img class="nav_bg" v-if='more.length == 0' src="../../assets/images/icon_header_select1.png" alt="">
          </a>
          <div class="first_type">
            <router-link :to='{name: item.pathName}' v-for='(item, index) in more' :key="index">
              <img class="icon_first" :src="item.icon" alt="">
              <div>{{item.name}}</div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="tool clearfix">
        <div class="right">
          <div class="left" v-if="!userInfo.token">
            <div class="item_tool left">
                <router-link :to="{name: 'login'}" class="tool_btn btn_login">请登录</router-link>
            </div>
            <div class="item_tool left">
                <router-link :to="{name: 'login', params: {pageType: 'register'}}" class="tool_btn">免费注册</router-link>
            </div>
          </div>
          <div class="left" v-if="userInfo.token">
            <div class="item_tool has_user left">
              <router-link to="/upload" title="上传">
                <el-badge class="item">
                  <i class="iconfont hover_none" style='font-size: 20px'>&#xe60b;</i>
                  <span class="none">上传</span>
                </el-badge>
              </router-link>
            </div>
            <div class="item_tool has_user left">
              <router-link :to="{name: 'message'}" title="消息">
                <el-badge :value='messages' class="item" v-if="messages != 0">
                  <i class="iconfont hover_none" style='font-size: 20px'>&#xe614;</i>
                  <span class="none">消息</span>
                </el-badge>
                <el-badge class="item" v-if="messages == 0">
                  <i class="iconfont hover_none" style='font-size: 20px'>&#xe614;</i>
                  <span class="none">消息</span>
                </el-badge>
              </router-link>
            </div>
            <div class="item_tool tool_user_wrap left">
              <router-link :to="{name: 'user', query: {active: 'info'}}" style="display: block">
                <img class="avatar" :src="userInfo.head_pic" alt="">
              </router-link>
              <div class="user_hover">
                <ul>
                  <li class="user_name" style="border-bottom: 1px solid #E5E5E5;">
                    <router-link :to="{name: 'user', query: {active: 'info'}}" class="tx_ov">LI</router-link>
                  </li>
                  <li><router-link :to="{name: 'user', query: {active: 'info'}}">我的资料</router-link></li>
                  <li><router-link :to="{name: 'user', query: {active: 'works'}}">我的作品</router-link></li>
                  <li><router-link :to="{name: 'user', query: {active: 'vipCenter'}}">我的会员</router-link></li>
                  <li><router-link :to="{name: 'message'}">消息中心</router-link></li>
                  <li class="btn_logout" style="border-top: 1px solid #E5E5E5;"><a href="javascript:;" @click='tuiChu'>退出登录</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getHeader, getUserMsg } from '@/services';
  import { mapActions, mapState } from 'vuex';
  export default {
    data() {
      return {
        result: {
          sheji: [],
          video: [],
          vip: {},
          logo: ''
        },
        more: [
          {
            pathName: 'news',
            name: '每日最新',
            icon: require('../../assets/images/icon_more.png')
          },
          {
            pathName: 'prototype',
            name: '样机素材',
            icon: require('../../assets/images/icon_sucai.png'),
          },
          {
            pathName: 'design',
            name: '设计工具',
            icon: require('../../assets/images/icon_sheji.png'),
          }
        ]
      }
    },
    computed: {
      ...mapState([ 'userInfo', 'messages' ]),
    },
    async created() {
      this.userInfo.token='12333332323'
      if(this.userInfo && this.userInfo.token) {
        // this.getUserMsg();
      }
      const {status, result, info} = await getHeader()
      if(status != 1) {
        return this.$Message(info, 'error');
      }
      this.result = result
    },
    methods: {
      ...mapActions([ 'logout', 'refreshMessage' ]),
      tuiChu() {
        this.logout();
      },
      async getUserMsg() {
        const {status, result, info} = await getUserMsg()
        if(status != 1) {
          return this.$Message(info, 'error')
        }
        this.refreshMessage(result);
      }
    }
  }
</script>
