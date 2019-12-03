<style lang="scss" rel="stylesheet/scss" src="./user.scss"></style>
<template>
  <div>
    <div class="user_wrap">
      <div class="user_header">
        <div class="flex_between">
          <div class="clearfix">
            <img class="left" :src="userInfo.head_pic" alt="">
            <div class="name left">{{userInfo.nickname}}</div>
          </div>
          <div class="clearfix">
            <div class="go_use">
              <span><router-link :to='{name: "integral", query: {}}'><i class="iconfont">&#xe608;</i>美拉币: <span class="bi" style='margin-right: 5px'>{{userInfo.integral}}</span> 去使用 | 美拉币明细</router-link></span>
            </div>
            <div class="btn_upload right">
              <router-link to="/upload"><el-button type="primary" round>上传作品</el-button></router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="user_nav">
        <ul class="clearfix">
          <li class="left" v-for='(item, index) in navs' :key='index'>
            <a href="javascript:;" :class="{active: active == item.type}" @click='switchNav(item.type)'>{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div v-show="loading" style="min-height: 380px; text-align: center;padding-top: 50px;">
        <i class="el-icon-loading" style="font-size: 22px; vertical-align: text-top;"></i>
        <span style="color: #999;">正在加载中...</span>
      </div>
      <div v-show="!loading">
        <div class="cart_wrap" v-if='active == "collect" || active == "upload" || active == "works" || active == "download"'>
          <div class="cart_head" style="padding: 0 0 30px;" v-if='active == "upload"'>
            <div class="clearfix">
              <span class="left">状态</span>
              <ul class="left">
                <li class="left" :class="{active: myUploadActive == -1}"><a href="javascript:;" @click="uploadTab(-1)">全部</a></li>
                <li class="left" :class="{active: myUploadActive == 0}"><a href="javascript:;" @click="uploadTab(0)">草稿箱</a></li>
                <li class="left" :class="{active: myUploadActive == 1}"><a href="javascript:;" @click="uploadTab(1)">待审核</a></li>
                <li class="left" :class="{active: myUploadActive == 2}"><a href="javascript:;" @click="uploadTab(2)">已通过</a></li>
                <li class="left" :class="{active: myUploadActive == 3}"><a href="javascript:;" @click="uploadTab(3)">未通过</a></li>
              </ul>
            </div>
            <span class="sum_count">共 {{count}} 组作品</span>
          </div>
          <div class="clearfix" style="min-height: 380px;" v-if='list.length > 0'>
            <div v-show='myUploadActive != 3'>
              <Waterfall
                :gutterWidth='26'
                :gutterHeight='26'
                :minCol='4'
              >
                <WaterfallItem v-for='(item, index) in list' :width='280' :order='index' :key='index'>
                  <div class="item">
                    <a href="javascript:;" @click='toDetail(item)'>
                      <div class="item_img">
                        <img :src="item.cover" alt="" style="display: block; width: 100%;">
                        <div class="delete_wrap" v-if="active == 'upload'">
                          <el-button class="icon_user_delete" type="danger" round @click.stop="deleteItem(item.m_id)">删除</el-button>
                        </div>
                      </div>

                      <div class="item_content">
                        <p v-if="item.title">{{item.title}}</p>
                        <div class="content clearfix">
                          <span v-if='item.pxw && item.pxh'>{{item.pxw}}*{{item.pxh}}</span>
                          <div class="right">
                            <span><i class="iconfont">&#xe794;</i>{{item.downloads}}</span>
                            <span><i class="iconfont">&#xe642;</i>{{item.collection}}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </WaterfallItem>
              </Waterfall>
            </div>
            <div v-show='myUploadActive == 3'>
              <div class="no_throuth_wrap clearfix" v-for='(item, index) in list' :key="index">
                <div class="left" style="width: 200px;">
                  <img class="no_throuth" :src="item.cover" alt="">
                </div>
                <div class="left" style="width: 800px; padding: 0 20px; margin-top: 20px">
                  <h4 style="margin-bottom: 10px">{{item.title}}</h4>
                  <div class="reason" style="padding: 10px 20px; font-size: 14px">
                    <span>未通过理由：</span>
                    <span>{{item.reason}}</span>
                  </div>
                </div>
                <div class="right" style="text-align: center">
                  <div>
                    <router-link :to="{name: 'upload', query: {id: item.m_id}}">
                      <el-button>编辑</el-button>
                    </router-link>
                  </div>
                  <el-button type='text' @click='deleteItem(item.m_id)'>删除</el-button>
                </div>
              </div>
            </div>
          </div>

          <div style="min-height: 380px; text-align: center; padding-top: 30px" v-if='list.length == 0'>
            <svg class="icon" aria-hidden="true" style="font-size: 200px">
              <use xlink:href="#icon-kongyemian"></use>
            </svg>
            <div>
              <p style="font-size: 14px; color: #888; margin-bottom: 20px">还没有相关素材</p>
              <router-link to="/" v-if="active == 'collect'">
                <el-button type="primary">快去找喜欢的素材吧~</el-button>
              </router-link>
              <router-link to="/upload" v-if="active == 'works' || active == 'upload'">
                <el-button type="primary">快去上传一些素材吧~</el-button>
              </router-link>
              <router-link to="/" v-if="active == 'download'">
                <el-button type="primary">快去下载一些素材吧~</el-button>
              </router-link>
            </div>
          </div>

          <div v-if="list.length > 0 " class="page">
            <el-pagination
              background
              :page-size="8"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              layout="prev, pager, next"
              :total="count">
            </el-pagination>
          </div>
        </div>

        <div class="info_wrap" v-if='active == "info"'>
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

        <div class="vip_center" v-if='active == "vipCenter"' style="min-height: 380px;">
          <div v-if="!goManager">
            <div class="header">
              <div class="title">
                <span>会员</span>
              </div>
              <div v-if="list.length == 0" style="text-align: center; font-size: 14px; color: #999;">
                <p style="margin-bottom: 20px">尚未开通会员</p>
                <router-link :to='{ name: "rechargeVip"}'><el-button type="primary">开通会员</el-button></router-link>
              </div>
              <div class="vip_info" v-if="list.length > 0">
                <div v-for="(item, index) in list" :key="index" class="clearfix">
                  <div class="left" style="line-height: 34px">
                    <img class="icon_vip" :src="item.icon" alt="">
                    <span class="vip_name">{{item.name}}</span>
                    <span style="color: #999">到期日期：{{item._endTime}}</span>
                  </div>
                  <div class="right">
                    <router-link :to="{name: 'recharge', query: {id: item.privilege_type}, params: {vId: item.v_id}}" v-if='item.privilege_type != 5 || item.is_admin == 1'>
                      <el-button plain size='small' style="width: 100px">续费</el-button>
                    </router-link>
                    <el-button type='primary' plain v-if='item.privilege_type == 5 && item.is_admin == 1' size='small' style="width: 100px" @click='roManger(item.sign)'>管理</el-button>
                    <el-button plain v-if='item.privilege_type == 5 && item.is_admin == 2' size='small' style="width: 100px" @click='bowOutVip(item)'>退出</el-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="recommend" v-if='recommend.length > 0'>
              <div class="title">推荐</div>
              <div class="recommend_inner">
                <div class="item" v-for="(item, index) in recommend" :key="index">
                  <div>
                    <img :src="item.icon" alt="">
                    <span>{{item.name}}</span>
                    <p>{{item.introduce}}</p>
                    <p>有效期：{{item.effective_time}}天</p>
                  </div>
                  <div>
                    <div>
                      {{parseInt(item.money)}} <span>元</span>
                    </div>
                    <router-link :to="{name: 'recharge', query: {id: item.privilege_type}}">
                        <el-button type="primary">立即抢购</el-button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="goManager">
            <div class="header">
              <div class="title">
                <!-- <img class="vip_img" src="../../assets/images/qzvip.png" alt=""> -->
                <a href="javascript:;" title='返回' class="icon_return" @click='goManager = false'><i class="iconfont" style="font-size: 30px">&#xe766;</i></a>
                <span>企业会员管理</span>
              </div>
              <div class="vip_info clearfix" style="padding: 30px 70px;">
                <span class="yaoqing left">邀请你的同事/设计师</span>
                <div class="left" style="position: relative; padding: 0; border-bottom: 0">
                  <div class="input">
                    <input type="text" v-model="searchMobile" placeholder="请输入手机号搜索" @keyup.enter="searchUser">
                  </div>
                  <div class="user_search" v-if="Object.keys(searchResult).length > 0">
                    <a href="javascript:;" class="clearfix" @click="addVipUser">
                      <img :src="searchResult.head_pic" alt="">
                      <span style="margin-left: 10px;">{{searchResult.nickname}}</span>
                      <span class="right" title="添加"><i class="iconfont" style="font-size: 24px">&#xe656;</i></span>
                    </a>
                  </div>
                </div>

                <div class="left" style="padding: 0;">
                  <el-button type='primary' @click="searchUser">搜索</el-button>
                </div>
              </div>
            </div>
            <div class="list">
              <div class="title"><i class="iconfont">&#xe627;</i>成员列表</div>
              <div class="list_wrap">
                <div class="item clearfix" v-for="(item, index) in members" :key="index">
                  <img class="left" style="width: 60px; border-radius: 50%;" :src="item.head_pic" alt="">
                  <div class="left" style="font-size: 16px; padding: 0 20px; line-height: 60px;">
                    <span class="left">{{item.nickname}}</span>
                    <span class="manager left" v-if="item.is_admin == 1"><i class="iconfont" style="font-size: 16px; padding: 0 20px;">&#xe697;</i>管理员</span>
                  </div>
                  <div class="right" style="padding-top: 12px;" v-if="item.is_admin != 1">
                    <el-button type="danger" size="small" @click="removeVip(item.user_id)">移除</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <router-view></router-view> -->
      </div>

    </div>
    <el-dialog
      title="头像修改"
      :visible.sync="showUploadAvatar"
      width="250px"
      :show-close='false'
      center
    >
      <div style="position: relative">
        <croppa
          
          v-model="croppa"
          :height='200'
          :width='200'
          :quality='2'
          initial-size="cover"
          initial-position="center"
          placeholder='请选择图片'
          :show-loading="true"
          :prevent-white-space="true"
          :show-remove-button="false"
          :placeholder-font-size='16'
        >
        </croppa>
        <a href="javascript:;" @click='removeAvatar' style="
          position: absolute;
          top: -10px;
          right: -10px;
          border: 1px solid rgb(210, 210, 210);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          background-color: #fff;
        " ><i class="iconfont">&#xe625;</i></a>
        <div style="margin-top: 20px">
          <el-button type="primary" style="width: 100%" size='small' @click='uploadImage'>修改</el-button>
        </div>
      </div>
    </el-dialog>
  </div>

</template>
<script>
    import { userCenter, userWorks, userCollect, myUpload, editUserInfo, uploadAvatar,
      getCode, userDownload, userMember, companyMember, findUser, addCompanyUser, deleteUpload,
      changeMobile, exitMember } from '@/services';
    import { mapState, mapMutations } from 'vuex';
    import { format } from '../../utils/tools';
    import {Waterfall, WaterfallItem} from 'vue2-waterfall';
    import axios from 'axios';
    export default {
      data() {
        return {
          host: process.env.HOST,
          showUploadAvatar: false,
          croppa: {},
          loading: true,
          editType: '',
          active: 'info',
          list: [],
          myUploadActive: '-1',
          examine: '-1',
          recommend: [],
          cities: [],
          members: [],
          count: 0,
          code: '',
          currentPage: 1,
          goManager: false,
          mobile: '',
          searchMobile: '',
          searchResult: {},
          headPicInfo: {},
          mobileCode: {
            second: 60,
            msg: '发送验证码'
          },
          navs: [
            {
              type: 'works',
              name: '个人作品'
            },
            {
              type: 'collect',
              name: '我的收藏'
            },
            {
              type: 'download',
              name: '我的下载'
            },
            {
              type: 'info',
              name: '我的资料'
            },
            {
              type: 'upload',
              name: '我的上传'
            },
            {
              type: 'vipCenter',
              name: '会员中心'
            }
          ],
          occupations: [
            {
              name: '',
              value: 0
            },
            {
              name: '在校学生',
              value: 1
            },
            {
              name: '政府/机关干部/公务员',
              value: 2
            },
            {
              name: '企业管理者',
              value: 3
            },
            {
              name: '媒体从业人员',
              value: 4
            },
            {
              name: '环境设计人员（公共艺术、建筑艺术、景观、室内、展示）',
              value: 5
            },
            {
              name: '工业设计人员（产品设计、计算机自动设计、家具设计、交通工具设计、软件设计）',
              value: 6
            },
            {
              name: '视觉传达设计人员（包装设计、插画、动画、广告设计）',
              value: 7
            },
            {
              name: '流行时尚设计人员（服装设计、剧装设计、珠宝设计）',
              value: 8
            },
            {
              name: '专业人员（如医生/律师/文体/老师等）',
              value: 9
            },
            {
              name: '普通工人（如工厂工人/体力劳动者等）',
              value: 10
            },
            {
              name: '商业服务业职工（如销售人员/商店职员/服务员等）',
              value: 11
            },
            {
              name: '个体经营者/承包商',
              value: 12
            },
            {
              name: '自由职业者',
              value: 13
            },
            {
              name: '农林牧渔劳动者',
              value: 14
            },
            {
              name: '退休人员',
              value: 15
            },
            {
              name: '暂无职业',
              value: 16
            },
            {
              name: '其他',
              value: 17
            }
          ],
          timer: '',
        }
      },
      computed: {
        ...mapState([ 'userInfo', 'cityData'])
      },
      components: {
        Waterfall,
        WaterfallItem
      },
      created() {
        const query = this.$route.query;
        console.log(query, "query");
        if(query && query.active) {
          this.active = query.active;
        }
        this.headPicInfo = {
          token: this.userInfo.token,
          user_id: this.userInfo.user_id,
          filetype: 'image'
        }
        this.fn(this.active);
        if(this.active == 'info') {
          this.loading = false;
        }
        const userInfo = this.userInfo;
        if(userInfo.province) {
          const selectProvice = (this.cityData || []).find(item => {
            return item.value == userInfo.province && item.child;
          })
          this.cities = selectProvice.child;
        }
      },
      watch: {
        searchMobile(val, oldVal) {
          if(val != oldVal) {
            this.searchResult = {};
          }
        },
        'userInfo.sex': {
          handler() {
            this.editUserInfo({sex: this.userInfo.sex});
          }
        },
        'userInfo.province': {
          handler() {
            const selectProvice = (this.cityData || []).find(item => {
              return item.value == this.userInfo.province;
            })
            this.cities = selectProvice.child;
            this.userInfo.city = '';
            this.userInfo.area = '';
            this.editUserInfo({
              province: this.userInfo.province,
              city: this.userInfo.city,
              area: this.userInfo.area
            });
          }
        },
        'userInfo.city': {
          handler() {
            this.userInfo.area = '';
            this.editUserInfo({
              city: this.userInfo.city,
              area: this.userInfo.area
            });
          }
        },
        'userInfo.purpose': {
          handler() {
            this.editUserInfo({purpose: this.userInfo.purpose});
          }
        },
        'userInfo.occupation': {
          handler() {
            this.editUserInfo({occupation: this.userInfo.occupation});
          }
        },
        'userInfo.birthday': {
          handler(val) {
            this.editUserInfo({birthday: this.userInfo.birthday || ''});
          }
        }
      },
      methods: {
        ...mapMutations([ 'updateUserInfo', 'destorySession' ]),
        async bowOutVip(item) {
          let params = {
            sign: item.sign,
            del_uid: item.user_id
          };
          const {status, result, info} = await exitMember(params)
          if(status != 1) {
            return this.$Message(info, 'error');
          }
          this.$Message('退出成功', 'success');
          this.userMember();
        },
        removeAvatar() {
          this.croppa.remove();
        },
        uploadImage() {
          let that = this;
          this.croppa.generateBlob((blob) => {
            let fd = new FormData()
            fd.append('file', blob, 'filename.jpg')
            fd.append('token', this.userInfo.token)
            fd.append('user_id', this.userInfo.user_id)
            fd.append('filetype', 'image')
            axios({
              url: this.host + '/data-api/Api/Asset/webuploader',
              data: fd,
              method: 'POST',
              header: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(({status, data, statusText}) => {
              if(status == 200) {
                if(data.status != 1) {
                  return this.$Message(data.info, 'error');
                }
                this.editUserInfo({head_pic: data.result.url});
                this.showUploadAvatar = false;
                this.croppa.remove();
              }
            })
          })
        },
        async deleteItem(mId) {
          const {status, result, info} = await deleteUpload({m_id: mId})
          if(status != 1) {
            return this.$Message(info, 'error')
          }
          let params = {
            page: this.currentPage - 1
          }
          this.$Message('删除成功', 'success');
          this.list = [];
          this.myUpload(Object.assign(params, {examine: this.myUploadActive}));
        },
        toDetail(item) {
          if(this.active == 'upload' && item.examine == 0 || item.examine == 3) {
            this.$router.push({name: 'upload', query: {id: item.m_id}});
            return;
          }
          this.$router.push({
            path: `/detail/${item.m_id}`
          })
        },
        fn(type) {
          let params = {
            page: this.currentPage - 1
          }
          let worksParams= {
            page: this.currentPage - 1,
            user_id: this.userInfo.user_id
          }
          // switch (type) {
          //   case 'collect': this.userCollect(params)
          //   break;
          //   case 'upload': this.myUpload(Object.assign(params, {examine: this.myUploadActive}))
          //   break;
          //   case 'works': this.userWorks(worksParams)
          //   break;
          //   case 'download': this.userDownload(params)
          //   break;
          //   case 'vipCenter': this.userMember()
          //   break;
          // }
          this.loading = false;

        },
        edit(type) {
          this.editType = type;
          if(type == 'mobile') {
            this.mobile = '';
            this.mobileCode = {
              second: 60,
              msg: '发送验证码'
            }
          }
        },
        cancelEdit(type) {
          this.editType = '';
          this.code = '';
          this.userInfo = JSON.parse(localStorage.getItem('USER_INFO') || '{}');
        },
        sureEdit(type) {
          let params = {};
          params[type] = type == 'mobile' ? this.mobile : this.userInfo[type];
          if(type == 'mobile') {
            params.code = this.code;
            const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(!this.mobile) {
              this.$Message('新手机号不能为空', 'error');
              return;
            } else if (!reg.test(this.mobile)) {
              this.$Message('新手机号格式不正确', 'error');
              return;
            } else if(!this.code) {
              this.$Message('验证码未填', 'error');
              return;
            }
            this.changeMobile(params);
          } else {
            this.editUserInfo(params);
          }
        },
        async getCode() {
          const { status, result, info } = await getCode({mobile: this.mobile, type: 3})
          if(status != 1) {
            return this.$Message(info, 'error')
          }
          this.mobileCode.second = 59;
          this.mobileCode.msg = '重新发送';
          this.timer = setInterval(() => {
            this.mobileCode.second -= 1;
            if(this.mobileCode.second <= 0) {
              this.mobileCode.second = 60;
              clearInterval(this.timer);
            }
          }, 1000)
        },
        switchNav(type) {
          this.myUploadActive = '-1';
          this.active = type;
          this.currentPage = 1;
          this.count = 0;
          this.list = [];
          this.fn(type);
          if(type == 'info') {
            this.loading = false;
          }
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.list = [];
          this.fn(this.active);
          window.scrollTo(0, 0);
        },
        async editUserInfo(params) {
          const { status, result, info } = await editUserInfo(params)
          if(status != 1) {
            return this.$Message(info, 'error');
          }
          this.$Message(info, 'success');
          this.updateUserInfo(Object.assign({}, this.userInfo, params));
          this.editType = '';
          this.code = '';
        },
        async userCollect(params) {
          this.loading = true;
          const { status, result, info } = await userCollect(params)
          this.loading = false;
          if(status != 1) {
            return this.$Message(info, 'error');
          }
          this.list = result.list;
          if(!this.count) {
            this.count = result.count;
          }
        },
        async userWorks(params) {
          this.loading = true;
          const { status, result, info } = await userWorks(params)
          this.loading = false;
          if(status != 1) {
            return this.$Message(info, 'error');
          }
          this.list = result.list;
          if(!this.count) {
            this.count = result.count;
          }
        },
        uploadTab(index) {
          this.currentPage = 1;
          let params = {
            examine: index,
            page: this.currentPage - 1
          }
          this.myUploadActive = index;
          this.list = [];
          this.myUpload(params);
        },
        async myUpload(params) {
          this.loading = true;
          const { status, result, info } = await myUpload(params)
          this.loading = false;
          if(status != 1) {
            return this.$Message(info, 'error');
          }
          this.list = result.list;
          if(this.currentPage == 1) {
            this.count = result.count;
          }
        },
        async userDownload(params) {
          this.loading = true;
          const { status, result, info } = await userDownload(params)
          this.loading = false;
          if(status != 1) {
            return this.$Message(info, 'error');
          }
          this.list = result.list;
          if(!this.count) {
            this.count = result.count;
          }
        },
        roManger(sign) {
          this.goManager = true;
          this.companyMember({sign});
        },
        async companyMember(params) {
          const { status, result, info } = await companyMember(params)
          if(status != 1) {
            return this.$Message(info, 'error')
          }
          this.sign = result.sign;
          this.members = result.list;
        },
        async userMember(params) {
          this.loading = true;
          const { status, result, info } = await userMember(params)
          this.loading = false;
          if(status != 1) {
            return this.$Message(info, 'error')
          }
          (result.list || []).forEach(item => {
            item.name = result.vip_privilege[item.privilege_type].name;
            item.icon = result.vip_privilege[item.privilege_type].icon;
            item._endTime = item.end_time > 6666666666 ? '终身' : format(new Date(item.end_time*1000), 'yyyy-MM-dd');
          });
          (result.recommend || []).forEach(item => {
            item.name = result.vip_privilege[item.privilege_type].name;
            item.icon = result.vip_privilege[item.privilege_type].icon;
          });
          this.recommend = result.recommend;
          this.list = result.list;
          // this.vips = result.vip_privilege;
        },
        async searchUser() {
          let params = {
            sign: this.sign,
            mobile: this.searchMobile
          }
          const {status, result, info} = await findUser(params)
          if(status != 1) {
            return this.$Message(info, 'error');
          }
          this.searchResult = result;
        },
        async changeMobile(params) {
          const {status, result, info} = await changeMobile(params)
          if(status != 1) {
            return this.$Message(info, 'error');
          }
          this.$Message('修改成功，请重新登录！', 'success');
          clearInterval(this.timer);
          this.destorySession();
          // window.location.href = 'http://devlogin.meigongpuzi.cn' + '?' + 'source=' + 1;
          window.location.replace('http://localhost:8080' + '?' + 'source=' + 1)
        },
        async addVipUser() {
          let params = {
            sign: this.sign,
            add_uid: this.searchResult.user_id
          }
          const {status, result, info} = await addCompanyUser(params)
          if(status != 1) {
            return this.$Message(info, 'error')
          }
          this.$Message('添加成功', 'success');
          this.searchResult = {};
          this.searchMobile = '';
          this.companyMember({sign: this.sign});
        },
        async removeVip(id) {
          let params = {
            sign: this.sign,
            del_uid: id
          };
          const {status, result, info} = await exitMember(params)
          if(status != 1) {
            return this.$Message(info, 'error');
          }
          this.$Message('移除成功', 'success');
          this.companyMember({sign: this.sign});
        }
      }
    };
</script>
