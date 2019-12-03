<style lang="scss" rel="stylesheet/scss" src="./home.scss"></style>
<template>
  <div class="home_wrap index_wrap">
    <loadings v-if="loading" v-on:getLoadingHeight="getLoadingHeight" :noneTop="true"></loadings>
    <div v-show="!loading" :style="{'min-height': loadingHeight + 'px'}">

      <!-- 表单模块 -->
      <div class="info_wrap">
          <el-form  ref="form" :model="sizeForm" label-width='100px' class="el-form--label-left">
            <div class="info_item clearfix">
              <el-col :span='12'>
                <div class="item_header">
                  <span class="header_dot"></span>
                  <span>基本信息</span>
                </div>

                <el-form-item label="活动名称">
                  <el-input v-model="sizeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                  <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="sizeForm.date1" style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="sizeForm.date2" style="width: 100%;"></el-time-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="活动性质">
                  <el-checkbox-group v-model="sizeForm.type">
                    <el-checkbox-button label="美食/餐厅线上活动" name="type"></el-checkbox-button>
                    <el-checkbox-button label="地推活动" name="type"></el-checkbox-button>
                    <el-checkbox-button label="线下主题活动" name="type"></el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                  <el-radio-group v-model="sizeForm.resource" size="medium">
                    <el-radio border label="线上品牌商赞助"></el-radio>
                    <el-radio border label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
             
                
              </el-col>
            </div>
            <div class="info_item clearfix">
              <el-col :span='12'>
                <div class="item_header">
                  <span class="header_dot"></span>
                  <span>个人信息</span>
                </div>
               



                <el-form-item size="large">
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-col>
            </div>
          </el-form>
      </div>
    

 
      <!-- 模块 -->
      <div style="position: relative; width: 1200px; margin: 0 auto">

        <div class="side_position" ref="sidePosition">
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
              <a href="javascript:;">
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
              <a href="javascript:;" >
                <svg class="icon icon_font" aria-hidden="true">
                  <use xlink:href="#icon-fankui"></use>
                </svg>
                <div>反馈</div>
              </a>
            </div>
            <div class="side_item">
              <a href="javascript:;">
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
      title="上传步骤"
      :visible.sync="showSignIn"
      width="800px"
    >
      <div>
        <img style="display: block; width: 100%" src="../../assets/images/step.png" alt="">
      </div>
    </el-dialog>
  </div>

</template>
<script>
  import Swiper from 'swiper';
  import loadings from '../main/loading.vue';
  export default {
      data() {
        return {
          host: process.env.HOST,
          loading: false,
          banner: [],
          userInfo:{},
          homeInfo: {},
          subject: [],
          keyWord: '',
          topHeight: 120,
          showSignIn: false,
          signInInte: '',
          params: [],
          loadingHeight: 420,
     
          sizeForm: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          }
        }
      },
      components: {
        loadings
      },
 

      mounted() {

      },
      watch: {
     
      },
      methods: {
         onSubmit() {
          console.log('submit!');
        }
      }
  };
</script>
