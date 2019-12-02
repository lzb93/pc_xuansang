<template>
<div class="info_wrap">
    <el-form :model='userInfo' label-width='100px' class="el-form--label-left">
      <div class="info_item clearfix">
        <el-col :span='12'>
          <div class="item_header">
            <span class="header_dot"></span>
            <span>基本信息</span>
          </div>
          <el-form-item label='头像' class="avatar_label">
            <a href="javascript:;">
              <div class="avatar">
                <img :src="userInfo.head_pic" alt="">
                <span @click="showUploadAvatar = true">
                  修改
                </span>
              </div>
            </a>
            <!-- <croppa></croppa> -->
          </el-form-item>
          <el-form-item label='昵称'>
            <div v-show='editType != "nickname"'>
              <span style="margin-right: 20px">{{userInfo.nickname}}</span>
              <el-button type="text" @click='edit("nickname")'>修改</el-button>
            </div>
            <div v-show='editType == "nickname"'>
              <div style="margin-bottom: 20px">
                <el-input placeholder="请输入" v-model="userInfo.nickname"></el-input>
              </div>
              <div>
                <el-button @click='cancelEdit'>取消</el-button>
                <el-button type="primary" plain @click='sureEdit("nickname")'>确认</el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item label='性别'>
            <el-radio-group v-model="userInfo.sex">
              <el-radio :label="0">保密</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label='个性签名'>
            <el-input placeholder="请输入" v-model="userInfo.autograph" @blur='sureEdit("autograph")'>
              <template slot="append">不超过30字</template>
            </el-input>
          </el-form-item>
          <el-form-item label='现居'>
            <el-col :span='12'>
              <div style="margin-right: 10px">
                <el-select v-model="userInfo.province" placeholder="请选择">
                  <el-option
                    v-for="item in cityData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span='12'>
              <div style="margin-left: 10px">
                <el-select v-model="userInfo.city" placeholder="请选择">
                  <el-option
                    v-for="item in cities"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-input type='textarea' placeholder="请输入详细地址" v-model="userInfo.area" @blur='sureEdit("area")'></el-input>
          </el-form-item>
        </el-col>
      </div>
      <div class="info_item clearfix">
        <el-col :span='12'>
          <div class="item_header">
            <span class="header_dot"></span>
            <span>个人信息</span>
          </div>
          <el-form-item label='手机号'>
            <div v-if='editType != "mobile"'>
              <span style="margin-right: 20px">{{userInfo.mobile}}</span>
              <el-button type="text" @click='edit("mobile")'>修改</el-button>
            </div>
            <div v-if='editType == "mobile"'>
              <div style="margin-bottom: 20px" class="clearfix">
                <el-col :span='18'>
                  <el-input placeholder="请输入新手机号" v-model="mobile"></el-input>
                </el-col>
                <el-col :span='6' style="text-align: center">
                  <el-button type='text' @click='getCode' v-if='mobileCode.second == 60'>{{mobileCode.msg}}</el-button>
                  <el-button type='text' disabled v-if='mobileCode.second < 60'>{{mobileCode.msg}} ({{mobileCode.second}})</el-button>
                </el-col>
              </div>
              <div style="margin-bottom: 20px">
                <el-input placeholder="请输入验证码" v-model="code"></el-input>
              </div>
              <div>
                <el-button @click='cancelEdit'>取消</el-button>
                <el-button type="primary" plain @click='sureEdit("mobile")'>确认</el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item label='邮箱'>
            <div v-show='editType != "email"'>
              <span style="margin-right: 20px" v-if='userInfo.email'>{{userInfo.email}}</span>
              <el-button type="text" @click="edit('email')" v-if='!userInfo.email'>绑定</el-button>
              <el-button type="text" @click="edit('email')" v-if='userInfo.email'>修改</el-button>
            </div>
            <div v-show='editType == "email"'>
              <div style="margin-bottom: 20px">
                <el-input placeholder="请输入邮箱" v-model="userInfo.email"></el-input>
              </div>
              <div>
                <el-button @click='cancelEdit'>取消</el-button>
                <el-button type="primary" plain @click='sureEdit("email")'>确认</el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item label='QQ'>
            <el-input type='text' placeholder="请输入QQ号" :maxLength="10" v-model="userInfo.qq" @blur='sureEdit("qq")'></el-input>
          </el-form-item>
          <el-form-item label='职业'>
            <el-select v-model="userInfo.occupation" placeholder="请选择">
              <el-option
                v-for="item in occupations"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='用途'>
            <el-radio-group v-model="userInfo.purpose">
              <el-radio :label="1">个人</el-radio>
              <el-radio :label="2">企业</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </div>
    </el-form>
</div>
</template>
<script>
export default {
    
}
</script>
