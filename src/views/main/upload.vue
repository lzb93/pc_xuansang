
<style lang="scss" rel="stylesheet/scss" src="./upload.scss"></style>
<template>
  <div class="upload_wrap">
    <loadings v-if="loading" v-on:getLoadingHeight="getLoadingHeight" :noneTop="true"></loadings>
    <div v-if="!loading" style="background-color: #f8f8f8" :style="{'min-height': loadingHeight + 'px'}">
      <div style="width: 1180px; margin: 0 auto; padding-top: 30px;">
        <a href="javascript:;" class="color" @click="showStep = true">上传步骤查看</a>
      </div>
      <div class="upload_container" v-if='!isNextStop'>
        <div class="upload_item">
          <div class="header">
            <span class="header_title">上传封面</span>
            <span>注：尺寸宽度不得低于1024像素，高度不得低于300像素，不得高于1369像素，分辨率不得低于72, 图片大小最大1M</span>
          </div>
          <div class="body clearfix">
            <span class="left body_dot"></span>
            <div class="left" style="margin-left: 15px;">
              <div class="left" v-if="!imgs.coverImg && !coverLoading">
                <el-upload
                    ref="imageUpload"
                    class="upload-demo"
                    drag
                    action="https://upload-z2.qiniup.com"
                    :data="uptoken"
                    :on-error="imageError"
                    :on-success="coverSuccess"
                    :before-upload="coverBefore"
                    :limit=1
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将封面图拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </div>
              <div class="upload_hover_delete left" style="position: relative" v-if="imgs.coverImg">
                <img style="display: block; max-height: 180px; border: 1px solid #999; background-color: #f5f5f5;" :src="imgs.coverImg" alt="">
                <a class="delete" href="javascript:;" @click="deleteUpload('coverImg')"><span><i class="iconfont">&#xe625;</i></span></a>
              </div>
              <div class="left" v-if="coverLoading" style="width: 200px; height: 180px; padding-top: 55px; border: 1px solid rgb(153, 153, 153); border-radius: 6px; text-align: center">
                <i class="el-icon-loading" style="font-size: 32px"></i>
                <div style="padding-top: 10px;">上传中，请稍等</div>
              </div>
            </div>
          </div>
        </div>

        <div class="upload_item">
          <div class="header">
            <span class="header_title">上传详情图</span>
            <span>注：图片大小最大10M</span>
          </div>
          <div class="body clearfix">
            <span class="left body_dot"></span>
            <div class="left" style="margin-left: 15px;">
              <div class="left" v-if='!imgs.detailImg && !detailLoading'>
                <el-upload
                    ref="detailUpload"
                    class="upload-demo"
                    drag
                    action="https://upload-z2.qiniup.com"
                    :data="uptoken"
                    :on-error="detailError"
                    :on-success="detailSuccess"
                    :before-upload="detailBefore"
                    :limit=1
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将详情图拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </div>

              <div class="upload_hover_delete left" style="position: relative" v-if="imgs.detailImg">
                <img style="display: block; max-height: 180px; border: 1px solid #999; background-color: #f5f5f5;" :src="imgs.detailImg" alt="">
                <a class="delete" href="javascript:;" @click="deleteUpload('detailImg')"><span><i class="iconfont">&#xe625;</i></span></a>
              </div>
              <div class="left" v-if="detailLoading" style="width: 200px; height: 180px; padding-top: 55px; border: 1px solid rgb(153, 153, 153); border-radius: 6px; text-align: center">
                <i class="el-icon-loading" style="font-size: 32px"></i>
                <div style="padding-top: 10px;">上传中，请稍等</div>
              </div>
            </div>
          </div>
        </div>

        <div class="upload_item">
          <div class="header">
            <span class="header_title">上传源文件</span>
            <span>注：源文件为PSD/AI/EPS，源文件需要压缩成RAR/ZIP格式。最大300M</span>
          </div>
          <div class="body clearfix">
            <span class="left body_dot"></span>
            <div class="left" style="margin-left: 15px;">
              <div class="left" v-if="!imgs.packageFile && !fileLoading">
                <el-upload
                  ref="fileUpload"
                  class="upload-demo"
                  drag
                  action="https://upload-z2.qiniup.com"
                  :data="uptoken"
                  :on-success="fileSuccess"
                  :on-error="fileError"
                  :before-upload="fileBefore"
                  >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将源文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </div>
              <div class="upload_hover_delete left" style="position: relative" v-if="imgs.packageFile ">
                <span style="display: block; min-width: 200px; height: 180px; padding-top: 46px; text-align: center; border: 1px solid #999; border-radius: 6px">
                  <i class="iconfont" style="font-size: 36px">&#xe6d4;</i>
                  <span style="display: block; padding: 0 10px" class="tx_ov">{{imgs.packageName}}</span>
                </span>
                <a class="delete" href="javascript:;" @click="deleteUpload('packageFile')"><span><i class="iconfont">&#xe625;</i></span></a>
              </div>
              <div class="left" v-if="fileLoading" style="width: 200px; height: 180px; padding-top: 55px; border: 1px solid rgb(153, 153, 153); border-radius: 6px; text-align: center">
                <i class="el-icon-loading" style="font-size: 32px"></i>
                <div style="padding-top: 10px;">上传中，请稍等</div>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 20px 0 40px">
          <el-button type="primary" @click='nextStep' style="width: 200px">下一步</el-button>
        </div>
      </div>

      <div class="upload_container" v-if='isNextStop && Object.keys(form).length > 0'>
        <el-form ref="form" :model="form" label-width="100px" class="el-form--label-left">
          <div class="upload_item">
            <div class="header">
              <span class="header_title">补充信息</span>
            </div>
            <div class="body clearfix">
              <el-col :span='12'>
                <el-form-item label='素材分类'>
                  <el-col :span='20'>
                    <div style="margin-right: 20px;">
                      <el-select style="display: block" v-model="form.ft_id" placeholder="请选择一级分类" @change="getCate">
                        <el-option v-for='(item, index) in categorys' :key="index" :label="item.name" :value="item.t_id"></el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span='4'><el-button type="primary" plain @click='resetGrade'>重置</el-button></el-col>
                </el-form-item>
                <el-form-item v-if='secondCategorys.length > 0'>
                  <el-col :span='20'>
                    <div style="margin-right: 20px;">
                      <el-select style="display: block" v-model="form.st_id" placeholder="请选择二级分类" @change="getCate">
                        <el-option v-for='(item, index) in secondCategorys' :key="index" :label="item.name" :value="item.t_id"></el-option>
                      </el-select>
                    </div>
                  </el-col>
                </el-form-item>
                <el-form-item v-if="thirdCategorys.length > 0">
                  <el-col :span='20'>
                    <div style="margin-right: 20px;">
                      <el-select style="display: block" v-model="form.tt_id" placeholder="请选择三级分类">
                        <el-option v-for='(item, index) in thirdCategorys' :key="index" :label="item.name" :value="item.t_id"></el-option>
                      </el-select>
                    </div>
                  </el-col>
                </el-form-item>

                <el-form-item label='素材类型'>
                  <el-radio-group v-model="form.theme_type">
                    <el-radio label="1">原创</el-radio>
                    <el-radio label="2">共享</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label-width='0'>
                  <el-input v-model="form.title" :maxLength="20" placeholder="请输入标题">
                    <template slot="append">20字</template>
                  </el-input>
                </el-form-item>
                <el-form-item label-width='0'>
                  <el-col :span="8" style="padding-right: 10px;">
                    <el-select style="display: block" v-model="form.file_format" placeholder="请选择作品格式">
                      <el-option label="PSD" value="1"></el-option>
                      <el-option label="AI" value="2"></el-option>
                      <el-option label="CDR" value="3"></el-option>
                      <el-option label="EPS" value="4"></el-option>
                      <el-option label="JPG" value="5"></el-option>
                      <el-option label="PNG" value="6"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="16" style="padding-left: 10px;">
                    <el-select style="display: block" v-model="form.version" placeholder="请选择最低软件使用版本">
                      <el-option v-for="(item, index) in secondVersions" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item label='分辨率'>
                  <el-radio-group v-model="form.dpi">
                    <el-radio label="72">72dpi</el-radio>
                    <el-radio label="300">300dpi</el-radio>
                    <el-radio label="">
                      <el-input style="width: 200px;" v-model='dpi'>
                        <template slot="append">dpi</template>
                      </el-input>
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label='作品尺寸'>
                  <el-col :span='12'>
                    <div style="margin-right: 10px;">
                      <el-input v-model="form.pxw">
                          <template slot="append">px/宽</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col :span='12'>
                    <div style="margin-left: 10px;">
                      <el-input v-model="form.pxh">
                        <template slot="append">px/高</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-form-item>
                <el-form-item label='版权信息' style="margin-bottom: 0;">
                  <el-radio-group v-model="form.agreement">
                    <el-radio v-for="(item, index) in activeAgrees" :key="index" :label="item.id">{{item.title}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </div>
          </div>

          <div class="upload_item">
            <div class="header">
              <span class="header_title">关键词 <span style="color: #999; font-size: 12px;">(关键词之间enter键隔开)</span></span>
            </div>
            <div class="body clearfix">
              <el-col :span='12'>
                <el-form-item label-width='0' style="margin-bottom: 0;">
                  <el-input v-model="form.keyword" type="textarea" rows='5'></el-input>
                </el-form-item>
              </el-col>
            </div>
          </div>
          <div class="btn_wrap">
            <el-button type="primary" style="padding: 12px 50px;" @click="save">上传</el-button>
            <el-button style="padding: 12px 50px;" @click="provStop">上一步</el-button>
            <el-button type="text" disabled>草稿自动保存</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="上传步骤"
      :visible.sync="showStep"
      width="800px"
    >
      <div>
        <img style="display: block; width: 100%" src="../../assets/images/step.png" alt="">
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import AsyncValidator from 'async-validator'
  import { upload, addworks, updWorks, getCategory, getAgreement, drafts, getUpToken, getVersion } from '@/services';
  import loadings from '../main/loading.vue';
  export default {
    data() {
      return {
        host: process.env.HOST,
        prefix: 'http://cdn2.meigongpuzi.com/',
        loading: true,
        fileLoading: false,
        coverLoading: false,
        detailLoading: false,
        showStep: false,
        uptoken: '',
        versions: {},
        secondVersions: {},
        userInfo: JSON.parse(localStorage.getItem('USER_INFO') || '{}'),
        imageTypes: ['image/png', 'image/jpeg'],
        fileTypes: ['zip', 'rar'],
        imgs: {
          coverImg: '',
          detailImg: '',
          packageFile: '',
          packageName: ''
        },
        imageData: {},
        fileData: {},
        isNextStop: false,
        form: {
          theme_type: '1',
          dpi: '72',
          ft_id: '',
          st_id: '',
          tt_id: '',
          agreement: ''
        },
        dpi: '',
        formRules: {
          title: [
            { required: true, message: '标题不能为空'}
          ],
          file_format: [
            { required: true, message: '作品格式未选择'}
          ],
          // version: [
          //   { required: true, message: '软件使用版本未选择'}
          // ],
          pxw: [
            { required: true, message: '作品宽度不能为空'}
          ],
          pxh: [
            { required: true, message: '作品高度不能为空'}
          ],
          agreement: [
            { required: true, message: '版权信息未选择'}
          ],
          keyword: [
            { required: true, message: '关键词不能为空'}
          ]
        },
        categorys: [],
        secondCategorys: [],
        thirdCategorys: [],
        agreements: [],
        activeAgrees: [],
        loadingHeight: 420
      }
    },
    components: {
      loadings
    },
    async created() {
      let query = this.$route.query;
      this.imageData = {
        user_id: this.userInfo.user_id,
        token: this.userInfo.token,
        filetype: 'image'
      }
      this.fileData = {
        user_id: this.userInfo.user_id,
        token: this.userInfo.token,
        filetype: 'file'
      }
      this.getCate();
      this.getAgreement();
      this.getToken();
      this.getVersion();
      if(query.id) {
        const {status, result, info} = await drafts({ m_id: query.id })
        this.loading = false;
        if(status != 1) {
          return this.$Message(info, 'error');
        }

        this.imgs.coverImg = result.cover;
        this.imgs.detailImg = result.image;
        this.imgs.packageFile = result.download_file;
        this.imgs.packageName = result.file_name;
        this.imgs['m_id'] = query.id;
      } else {
        this.loading = false;
      }
    },
    watch: {
      'form.theme_type': {
        handler(val) {
          this.activeAgrees = (this.agreements || []).filter(item => {
            return item.theme_type == val;
          })
          this.form.agreement = this.activeAgrees[0].id;
        }
      },
      'form.file_format': {
        handler(val) {
          this.secondVersions = this.versions[val];
          delete this.form.version;
        }
      }
    },
    methods: {
      getLoadingHeight(val) {
        this.loadingHeight = val;
      },
      deleteUpload(type) {
        this.imgs[type] = '';
      },
      coverBefore(file) {
        const type = file.type;
        const exist = this.imageTypes.find(item => {
          return item == type;
        })
        if(!exist) {
          this.$Message('图片格式不正确！', 'error');
          return false;
        }
        if((file.size/1024/1024) > 1) {
          this.$Message('图片大小不得超过1M！', 'error')
          return false;
        }
        return new Promise(function(resolve, reject) {
            let width = 1024;
            let minHeight = 300;
            let maxHeight = 1369;
            let _URL = window.URL || window.webkitURL;
            let img = new Image();
            img.onload = function() {
                let valid = img.width >= width && img.height >= minHeight && img.height <= maxHeight;
                valid ? resolve() : reject();
            }
            img.src = _URL.createObjectURL(file);
        }).then(() => {
            this.coverLoading = true;
            return file;
        }, () => {
            this.$Message('图片宽大于1024px, 高大于300px小于1369px ！', 'error');
            return Promise.reject();
        });
      },
      detailBefore(file) {
        const type = file.type;
        const exist = this.imageTypes.find(item => {
          return item == type;
        })
        if(!exist) {
          this.$Message('图片格式不正确！', 'error');
          return false;
        }
        if((file.size/1024/1024) > 10) {
          this.$Message('图片大小不得超过10M！', 'error')
          return false;
        }
        this.detailLoading = true;
      },
      fileBefore(file) {
        let arr = file.name.split('.');
        let type = arr[arr.length - 1];
        const exist = this.fileTypes.find(item => {
          return item == type;
        })
        if(!exist) {
          this.$Message('文件类型不正确！', 'error')
          return false;
        }
        if((file.size/1024/1024) > 300) {
          this.$Message('文件大小不得超过300M！', 'error')
          return false;
        }
        this.fileLoading = true;
      },
      fileSuccess(res, file, fileList) {
        this.fileLoading = false;
        this.imgs.packageFile = this.prefix + res.key + '?attname=' + file.name;
        this.imgs.packageName = file.name;
      },
      coverSuccess(res, file, fileList) {
        this.coverLoading = false;
        this.imgs.coverImg = this.prefix + res.key + '!watermark';
      },
      detailSuccess(res, file, fileList) {
        this.detailLoading = false;
        this.imgs.detailImg = this.prefix + res.key + '!watermark';
      },

      fileError(res, file, fileList) {
        return this.$Message(res.info, 'error');
      },
      imageError(res, file, fileList) {
        return this.$Message(res.info, 'error');
      },
      detailError(res, file, fileList) {
        return this.$Message(res.info, 'error');
      },
      async getCate(id) {
        let params = {
          id: id ? id : ''
        }
        const { status, result, info } = await getCategory(params)
        if(status != 1) {
          return this.$Message(info, 'error')
        }
        if(!this.form.ft_id) {
          this.categorys = result;
          return;
        }
        if(this.form.ft_id == id) {
          this.secondCategorys = result;
          this.thirdCategorys = [];
          this.form.st_id = '';
          this.form.tt_id = '';
          return;
        }
        if(this.form.st_id == id) {
          this.thirdCategorys = result;
          this.form.tt_id = '';
        } else {
          this.thirdCategorys = [];
        }
      },
      resetGrade() {
        this.form.ft_id = '';
        this.form.st_id = '';
        this.form.tt_id = '';
        this.secondCategorys = [];
        this.thirdCategorys = [];
      },
      async save() {
        let form = this.form;
        if(!form.ft_id) {
          return this.$Message('素材分类未选择', 'error');
        }
        const validator = new AsyncValidator(this.formRules)
        validator.validate(form, async (errors, fields) => {
          if(errors) {
            errors.reverse().forEach(item => {
              this.$Message(item.message, 'error');
            })
            return;
          }
          if(this.dpi) {
            this.form.dpi = this.dpi;
          }
          this.updWorks(form)
        })
      },
      async updWorks(params) {
        Object.assign(params, this.params);
        const {status, result, info} = await updWorks(params)
        if(status != 1) {
          if(info) {
            return this.$Message(info, 'error');
          }
          return this.$Message('上传失败，请检查信息是否填写完善！', 'error')
        }
        this.$Message('上传成功！', 'success');
        setTimeout(() => {
          this.$router.push({name: 'user', params: {active: 'upload'}})
        }, 500)
      },
      provStop() {
        this.form = {
          theme_type: '1',
          dpi: '1'
        };
        this.isNextStop = false;
      },
      async getAgreement() {
        const {status, result, info} = await getAgreement()
        if(status != 1) {
          return this.$Message(info, 'error');
        }
        this.agreements = result;
        this.activeAgrees = (result || []).filter(item => {
          return item.theme_type == this.form.theme_type;
        })
        this.form.agreement = this.activeAgrees[0].id;
      },
      async nextStep() {
        let params = this.imgs;
        this.params = {
          m_id: params.m_id || '',
          image: params.detailImg,
          cover: params.coverImg,
          download_file: params.packageFile,
          file_name: params.packageName
        }
        if(!this.params.cover) {
          return this.$Message('请上传封面', 'error');
        } else if(!this.params.image) {
          return this.$Message('请上传详情图', 'error');
        } else if(!this.params.download_file) {
          return this.$Message('请上传源文件', 'error');
        }
        const {status, result, info} = await addworks(this.params)
        if(status != 1) {
          return this.$Message(info, 'error')
        }
        this.params.m_id = result.m_id;
        this.isNextStop = true;
        window.scrollTo(0, 0);
      },
      async getToken() {
        const {status, result, info} = await getUpToken()
        if(status != 1) {
          return this.$Message(info, 'error');
        }
        this.uptoken = {
          token: result.upToken
        };
      },
      async getVersion() {
        const {status, result, info} = await getVersion()
        if(status != 1) {
          return this.$Message(info, 'error');
        }
        this.versions = result;
      }
    }
  }
</script>
