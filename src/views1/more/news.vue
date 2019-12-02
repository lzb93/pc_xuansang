<style lang="scss" rel="stylesheet/scss" src="./news.scss"></style>
<template>
  <div class="new_wrap">
    <loadings v-if="loading" v-on:getLoadingHeight="getLoadingHeight" :noneTop="true"></loadings>
    <div v-if="!loading" class="new_inner" style="padding-top: 30px" :style="{'min-height': loadingHeight + 'px'}">
      <div v-if="list.length == 0" style="text-align: center">
        暂无数据！
      </div>
      <div v-if="list.length > 0">
        <div style="margin-bottom: 20px; font-size: 14px; color: #999">
          <span><i class="iconfont" style="vertical-align: text-top">&#xe60e;</i><span class="special" style="margin-left: 5px">最新</span></span><span style="margin-left: 10px">共<span class="special"> {{count}} </span>个结果</span>
        </div>
        <div>
            <Waterfall
              :gutterWidth='30'
              :gutterHeight='30'
              :minCol='4'
            >
            <WaterfallItem v-for='(item, index) in list' :width='275' :order='index' :key='index'>
              <router-link :to='{path: "/detail/" + item.m_id}'>
                <div class="item">
                  <div class="item_hover">
                    <img :src="item.cover" alt="" style="display: block; width: 100%;">
                    <div class="hover_content">
                      <el-button type='primary' class="btn_download" round>免费下载</el-button>
                    </div>
                  </div>
                  <div class="text tx_ov">{{item.title}}</div>
                </div>
              </router-link>
            </WaterfallItem>
          </Waterfall>
        </div>
        <div style="padding: 30px 0 40px; text-align: center">
          <el-pagination
            background
            :page-size="24"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next"
            :total="parseInt(count)">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {dailyLatest} from '@/services';
  import {Waterfall, WaterfallItem} from 'vue2-waterfall';
  import loadings from '../main/loading.vue';
  export default {
    data() {
      return {
        loading: true,
        list: [],
        count: 1,
        currentPage: 1,
        loadingHeight: 420
      }
    },
    components: {
      Waterfall,
      WaterfallItem,
      loadings
    },
    created() {
      this.dailyLatest({page: this.currentPage - 1})
    },
    methods: {
      getLoadingHeight(val) {
        this.loadingHeight = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.list = [];
        this.dailyLatest({page: this.currentPage - 1})
      },
      async dailyLatest(params) {
        const {status, result, info} = await dailyLatest(params)
        this.loading = false;
        if(status != 1) {
          return this.$Message(info, 'error');
        }
        this.list = result.list;
        if(this.currentPage == 1) {
          this.count = result.count;
        }
      }
    }
  }
</script>
