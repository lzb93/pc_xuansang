<style lang="scss" rel="stylesheet/scss" src="./prototype.scss"></style>
<template>
  <div class="prototype_wrap">
    <loadings v-if="loading" v-on:getLoadingHeight="getLoadingHeight"></loadings>
    <div v-if="!loading" :style="{'min-height': loadingHeight + 'px'}">
      <div style="background-color: #fff">
        <div class="content_top">
          <img style="display: block; width: 100%; background: #f5f5f5" :src="img" alt="">
        </div>
      </div>
      <div style="background-color: #f8f8f8">
        <div class="content_bottom clearfix">
          <ul class="prototype_list ">
            <li :class="{on: active == index}" v-for="(item, index) in category" :key="index" @click="switchTab(item.pc_id, index)">{{item.name}}</li>
          </ul>
          <div v-if="listLoading" style="min-height: 400px; padding-top: 30px">

          </div>
          <div v-if="!listLoading">
            <div v-if="list.length == 0" style="min-height: 400px; padding-top: 50px; text-align: center">
              <svg class="icon" aria-hidden="true" style="font-size: 200px">
                <use xlink:href="#icon-kongyemian"></use>
              </svg>
              <p>暂无数据</p>
            </div>
            <div class="list_wrap" style="min-height: 400px;" v-if="list.length > 0">
              <Waterfall
                :gutterWidth='20'
                :gutterHeight='20'
                :minCol='4'
              >
                <WaterfallItem v-for='(item, index) in list' :width='285' :order='index' :key='index'>
                  <div class="item">
                    <div class="item_hover" style="position: relative;">
                      <img :src="item.image" alt="" style="display: block; width: 100%;">
                      <div class="item_hover_bg">
                        <div class="btn_download">
                          <el-button type='primary' round @click="downLoad(item.download_url)">立即下载</el-button>
                        </div>
                      </div>
                    </div>
                    <div class="text">
                      <p class="tx_ov">{{item.title}}</p>
                    </div>
                  </div>
                </WaterfallItem>
              </Waterfall>
            </div>
            <div style="text-align: center; padding: 30px 0 20px" v-if="list.length > 0">
              <el-pagination
                background
                :page-size="8"
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :total="count">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import Swiper from 'swiper';
    import { prototype, prototypeInfo } from '@/services';
    import {Waterfall, WaterfallItem} from 'vue2-waterfall';
    import loadings from '../main/loading.vue';
    export default {
        data() {
          return {
            loading: true,
            listLoading: true,
            img: '',
            active: 0,
            category: [],
            list: [],
            count: 1,
            currentPage: 1,
            loadingHeight: 420
          }
        },
        created() {
          this.loading = true;
          this.getPrototypeInfo();
        },
        components: {
          Waterfall,
          WaterfallItem,
          loadings
        },
        methods: {
          getLoadingHeight(val) {
            this.loadingHeight = val;
          },
          downLoad(url) {
            if(!url) {
              return;
            }
            window.open(url, '_blank');
          },
          switchTab(pcId, index) {
            this.list = [];
            this.count = 1;
            this.active = index;
            this.pcId = pcId;
            this.getPrototype({ pc_id: this.pcId, page: this.currentPage - 1 });
          },
          handleCurrentChange(page) {
            this.currentPage = page;
            this.list = [];
            this.getPrototype({ pc_id: this.pcId, page: this.currentPage - 1 });
          },
          async getPrototypeInfo() {
            const { status, result, info } = await prototypeInfo()
            this.loading = false;
            if(status != 1) {
              return this.$Message(info, 'error');
            }
            let arr = result.info && result.info.image.split('!');
            this.img = arr && arr[0] || '';
            this.category = result.category;
            this.pcId = this.category[0].pc_id;
            this.getPrototype({pc_id: this.pcId});
          },
          async getPrototype(params) {
            this.listLoading = true;
            const { status, result, info } = await prototype(params)
            this.listLoading = false;
            if(status != 1) {
              return this.$Message(info, 'error');
            }
            this.list = result.list;
            if(this.count == 1) {
              this.count = result.count;
            }
          }
        }
    }
</script>
