<style lang="scss" rel="stylesheet/scss" src="./integralDetail.scss"></style>

<template>
  <div>
    <div class="detail_wrap">
      <div class="detail_header clearfix">
        <img class="image left" :src="detail.image" alt="">
        <div class="info right">
          <h2 class="tx_ov">{{detail.name}}</h2>
          <p>{{detail.integral}}积分</p>
          <div class="store">{{detail.stock}} 件库存</div>
          <a href="javascript:;" class="btn_exchange" @click="atOneExchange">立即兑换</a>
          <a href="javascript:;" @click="pre">返回上一页</a>
        </div>
      </div>

      <div class="detail_content">
        <div class="title">商品详情</div>
        <div class="content" v-html="detail.detail">

        </div>
      </div>

      <el-dialog
        title="填写收货地址"
        :visible.sync="showPop"
        width="25%"
        >
        <div>
          <el-form :model='receiveForm' label-width='100px' class="el-form--label-left">
            <el-form-item label='收货人姓名'>
              <el-input v-model='receiveForm.real_name' size='small'></el-input>
            </el-form-item>
            <el-form-item label='收货人电话'>
              <el-input v-model='receiveForm.mobile' size='small'></el-input>
            </el-form-item>
            <el-form-item label='所在区域'>
              <el-col :span='8' style="padding-right: 10px">
                <el-select v-model="receiveForm.province" placeholder="请选择省" size='small'>
                  <el-option
                    v-for='item in cityData'
                    :key='item.value'
                    :label="item.label"
                    :value="item.value">
                </el-option>
                </el-select>
              </el-col>
              <el-col :span='8' style="padding: 0 5px">
                <el-select v-model="receiveForm.city" placeholder="请选择市" size='small'>
                  <el-option
                    v-for='item in cities'
                    :key='item.value'
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span='8' style="padding-left: 10px">
                <el-select v-model="receiveForm.area" placeholder="请选择区" size='small'>
                  <el-option
                    v-for='item in areas'
                    :key='item.value'
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label='详细地址'>
              <el-input type='textarea' v-model='receiveForm.detail' size='small'></el-input>
            </el-form-item>
            <div style="text-align: right; padding: 10px 0 20px">
              <el-button type="primary" style="min-width: 100px;" @click='save'>保存</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
      <el-dialog

        width='20%'
        :visible.sync="sureDialog"
        :show-close='false'
        center
      >
        <div style="font-size: 20px; text-align: center">确认兑换？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closePop">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  import { integralDetail, integralExchange, saveAddress, userAddress, refreshUserInfo } from '@/services';
  import AsyncValidator from 'async-validator'
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        host: process.env.HOST,
        showPop: false,
        sureDialog: false,
        detail: {},
        cities: [],
        areas: [],
        receiveForm: {},
        originalForm: {},
        receiveRules: {
          real_name: [
            { required: true, message: '收货人姓名不能为空', trigger: 'blur' },
          ],
          mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
            { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号格式不正确', trigger: 'blur' }
          ],
          detail: [
            { required: true, message: '详细地址不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    beforeCreated() {
      this.receiveForm = {};
    },
    computed: {
      ...mapState([ 'cityData']),
    },
    watch: {
      'receiveForm.province': {
        handler(val, oldVal) {
          const cities = (this.cityData || []).find(item => {
            return item.value == val;
          })
          if(cities) this.cities = cities.child;
        }
      },
      'receiveForm.city': {
        handler() {
          const areas = (this.cities || []).find(item => {
            return item.value == this.receiveForm.city;
          })
          if(areas) this.areas = areas.child;
        }
      }
    },
    created() {
      const query = this.$route.query;
      this.query = query;
      console.log(this.query,'22')
      this.created();
    },
    methods: {
      pre() {
        const path = this.$route.path;
        this.$router.push({
          path:'/integral',
          // page:this.query.page
        })
      },
      async sure() {
        const params = this.receiveForm;
        Object.assign(params, {goods_id: this.detail.goods_id, sum: 1})
        const { status, result, info } = await integralExchange(params)
        this.showPop = false;
        if(status != 1) {
          this.closePop();
          return this.$Message(info, 'error');
        }
        this.$Message('兑换成功', 'success');
        this.receiveForm = {};
        this.refreshUser();
      },
      async atOneExchange() {
        this.showPop = true;
        this.getAddress();
      },
      save() {
        const params = this.receiveForm;
        const validator = new AsyncValidator(this.receiveRules)
        validator.validate(params, async (errors, fields) => {
          if(errors) {
            alert(errors[0].message);
            return;
          }
          const {status, result, info} = await saveAddress(params)
          if(status != 1) {
            return this.$Message(info, 'error')
          }
          this.sureDialog = true;
        })
      },
      closePop() {
        this.showPop = false;
        this.sureDialog = false;
        this.receiveForm = {}
      },
      async created() {
        const { status, result, info } = await integralDetail({goods_id: this.query.goodsId})
        if(status != 1) {
          return this.$Message(info, 'error');
        }
        this.detail = result;
        let arr = result.image.split('!');
        let str = result.detail.replace(/!watermark/g, '')
        Object.assign( this.detail, {image: arr[0] , detail: str})
      },
      async getAddress() {
        const {status, result, info} = await userAddress()
        if(status != 1) {
          return this.$Message(info, "error")
        }
        delete result.token;
        delete result.user_id;
        delete result.address_id;
        this.receiveForm = result;
        this.originalForm = result;
      },
      async refreshUser() {
        const {status, result, info} = await refreshUserInfo()
        if(status != 1) {
          return this.$Message(info, 'error')
        }
        this.userInfo = result.user;
        localStorage.setItem('USER_INFO', JSON.stringify(this.userInfo));
        this.$router.push({name: 'integral'})
      }
    }
  }
</script>
