<style lang="scss" rel="stylesheet/scss" src="./login.scss"></style>
<template>
  <div style="padding-top: 56px">
    <div class="login_wrap">
      <div class="login_inner">
        <div class="login_header flex_between" v-if="pageType != 'findPwd'">
          <a href="javascript:;" :class="{active: pageType == 'login'}" @click="loginTab('login')">登录</a>
          <a href="javascript:;" :class="{active: pageType == 'register'}" @click="loginTab('register')">注册</a>
        </div>
        <div class="login_header" style="text-align: center" v-if="pageType == 'findPwd'">
          <a href="javascript:;" class="active">重置密码</a>
        </div>
        <div class="login_body">
          <div class="flex_between" style="padding: 0 70px;" v-if="pageType != 'findPwd'">
            <a href="javascript:;" @click="thirdLogin(pageType)">
              <img src="../../assets/images/qq.png" alt="">
            </a>
            <a href="javascript:;" @click="thirdLogin(pageType)">
              <img src="../../assets/images/weixin.png" alt="">
            </a>
          </div>
          <div style="margin-bottom: 10px; text-align: center" v-if="pageType != 'findPwd'"><span>或</span></div>
          <el-form :model="loginInfo" label-width="60px" class="el-form--label-left" v-if='pageType == "login"'>
            <template v-if="loginType == 'password'">
              <el-form-item label='手机号'>
                <el-input v-model="loginInfo.mobile" size='small'></el-input>
              </el-form-item>
              <el-form-item label='密  码'>
                <el-input type="password" v-model="loginInfo.password" size='small' @keyup.enter.native="signIn"></el-input>
              </el-form-item>
            </template>
            <template v-if="loginType == 'mobile'">
              <el-form-item label='手机号'>
                <el-input v-model="loginInfo.mobile" size='small'></el-input>
              </el-form-item>
              <el-form-item label='验证码' class="input_code">
                <el-input v-model="loginInfo.code" size='small'  @keyup.enter.native="signIn"></el-input>
                <div class="btn_code">
                  <el-button type="text" @click='getMobileCode(pageType)' :disabled='countDown.second < 60'>{{countDown.msg}}<span v-if='countDown.second < 60'>({{countDown.second}})</span></el-button>
                </div>
              </el-form-item>
            </template>
            <el-form-item label-width="0">
              <el-button type="primary" size="small" style="width: 100%; font-size: 16px;" @click="signIn">登录</el-button>
            </el-form-item>
          </el-form>
          <el-form :model="loginInfo" label-width="70px" class="el-form--label-left" v-if='pageType == "register" || pageType == "findPwd"'>
            <el-form-item label='手机号'>
              <el-input v-model="registerInfo.mobile" size='small'></el-input>
            </el-form-item>
            <el-form-item label='密  码'>
              <el-input type="password" v-model="registerInfo.password" size='small'></el-input>
            </el-form-item>
            <el-form-item label='确认密码'>
              <el-input type="password" v-model="registerInfo.second_password" size='small'></el-input>
            </el-form-item>
            <el-form-item label='验证码' class="input_code">
              <el-input v-model="registerInfo.code" size='small' @keyup.enter.native="registerIn"></el-input>
              <div class="btn_code">
                <el-button type="text" @click='getMobileCode(pageType)' :disabled='countDown.second < 60'>{{countDown.msg}}
                  <span v-if='countDown.second < 60'>({{countDown.second}})</span>
                </el-button>
              </div>
            </el-form-item>
            <el-form-item label-width="0">
              <el-button type="primary" size="small" style="width: 100%; font-size: 16px;" @click="registerIn">{{pageType == 'register' ? '注册' : '重置'}}</el-button>
            </el-form-item>
          </el-form>
          <div class="login_footer" style="text-align: center">
            <div v-if="pageType == 'login'">
              <div class="flex_between" v-if="loginType == 'password'">
                <a href="javascript:;" @click="loginType = 'mobile'">手机验证码登录</a>
                <a href="javascript:;" @click="findPwd">忘记密码</a>
              </div>
              <a href="javascript:;" v-if="loginType == 'mobile'" @click="loginType = 'password'">手机密码登录</a>
            </div>
            <div v-if="pageType == 'register'">
              <a href="javascript:;" class="icon_check" :class="{active: agree}" @click="agree = !agree" style="margin-right: 5px">
                <i class="iconfont" v-if="!agree">&#xe610;</i>
                <i class="iconfont" v-if="agree">&#xe611;</i>
              </a>
              <span>同意 <a href="javascript:;">《注册声明》</a><a href="javascript:;">《版权声明》</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="login_footer" style="text-align: center; font-size: 14px; border-top: 1px solid #A6A6A6; padding: 50px 0 100px; margin-top: 50px;">
      <span style="color: #919191">Copyright ©2018 美工铺子素材网 闽ICP备17018890号  厦门工商 安全实名验证 信用网站</span>
    </div>
  </div>
</template>
<script>
  import AsyncValidator from 'async-validator';
  import { mapActions } from 'vuex';
  import { register, getCode, forgetPassword } from '@/services';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value !== this.registerInfo.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };
      return {
        loginInfo: {},
        registerInfo: {},
        loginType: 'password',
        pageType: 'login',
        agree: true,
        timer: '',
        countDown: {
          msg: '获取验证码',
          second: 60
        },
        loginRules: {
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号格式不正确', trigger: 'blur' }
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 6, message: '密码长度小于6', trigger: 'blur'}
          ]
        },
        codeRules: {
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号格式不正确', trigger: 'blur' }
          ],
          code: [
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ]
        },
        registerRules: {
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号格式不正确', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, message: '密码长度小于6', trigger: 'blur' }
          ],
          second_password: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          code: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      const params = this.$route.params;
      if(params && params.pageType) {
        this.pageType = params.pageType;
      }
    },
    watch: {
      'pageType': {
        handler() {
          this.countDown = {
            msg: '获取验证码',
            second: 60
          }
        }
      },
      loginType(val, oldVal) {
        if(val != oldVal) {
          this.loginInfo = {};
          console.log(this.loginInfo, "this.loginInfo")
        }
      }
    },
    methods: {
      ...mapActions([ 'login', 'destorySession' ]),
      async getMobileCode(type) {
        const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        let params = {
          mobile: type == 'login' ? this.loginInfo.mobile : this.registerInfo.mobile
        };

        if(!params.mobile) {
          this.$Message('手机号不能为空', 'error');
          return;
        } else if (!reg.test(params.mobile)) {
          this.$Message('手机号格式不正确', 'error');
          return;
        }
        if(type == 'register') {
          params.type = 1;
        } else if(type == 'login') {
          params.type = 4;
        } else if(type == 'findPwd') {
          params.type = 2;
        }
        const {status, result, info} = await getCode(params)
        if(status != 1) {
          return this.$Message(info, 'error');
        }
        this.countDown.second = 59;
        this.countDown.msg = '重新发送'
        this.timer = setInterval(() => {
          this.countDown.second -= 1;
          if(this.countDown.second <= 0) {
            clearInterval(this.timer);
            this.countDown.second = 60;
          }
        }, 1000)
      },
      loginTab(type) {
        this.pageType = type;
        this.reset();
      },
      thirdLogin(type) {
        let msg = '';
        if(type == 'login') {
          msg = '登录入口'
        }
        if(type == 'register') {
          msg = '注册入口'
        }
        return this.$Message('暂未开放该' + msg, 'warning');
      },
      registerIn() {
        if(!this.agree && this.pageType == 'register') {
          return this.$Message('声明未同意，无法注册', 'error')
        }
        let params = this.registerInfo;
        const validator = new AsyncValidator(this.registerRules)
        validator.validate(params, async (errors, fields) => {
          if(errors) {
            errors.reverse().forEach(item => {
              this.$Message(item.message, 'error');
            })
            return;
          }
          if(this.pageType == 'register') {
            const { status, result, info } = await register(params)
            if (status != 1) {
              return this.$Message(info, 'error');
            }
            // this.$Message(info, 'success');
            this.loginInfo = {
              mobile: this.registerInfo.mobile,
              password: this.registerInfo.password
            }
            await this.login(this.loginInfo);
          } else {
            const {status, result, info} = await forgetPassword(params)
            if(status != 1) {
              return this.$Message(info, 'error');
            }
            this.$Message('密码已重置，请重新登录', 'success');
            this.destorySession();
            this.reset();
            this.pageType = 'login';
          }
        })
      },
      pageType() {
        this.loginInfo = {};
        this.registerInfo = {};
        this.agree = true;
        this.loginType = 'password';
        this.countDown = {
          msg: '获取验证码',
          second: 60
        }
      },
      findPwd() {
        this.pageType = 'findPwd';
        this.reset();
      },
      signIn() {
        const params = this.loginInfo;
        console.log(this.loginInfo, "this.loginType");
        const validator = new AsyncValidator(this.loginType == 'password' ? this.loginRules : this.codeRules)
        validator.validate(params, async (errors, fields) => {
          if(errors) {
            errors.reverse().forEach(item => {
              this.$Message(item.message, 'error');
            })
            return;
          }
          await this.login(params);
        })
      }
    }
  }
</script>
