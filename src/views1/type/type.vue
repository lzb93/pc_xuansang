<style lang="scss" rel="stylesheet/scss" src="./type.scss"></style>


<template>
  <div class="type_container">
    <loadings v-if="loading" v-on:getLoadingHeight="getLoadingHeight"></loadings>
    <div v-show="!loading" :style="{'min-height': loadingHeight + 'px'}">
      <div class="content_wrap">
        <!-- 广告 -->
        <div style="box-shadow: 0 3px 10px 0 #e5e5e5; border-radius: 4px; margin-bottom: 30px" v-for="(item, index) in ad" :key="index">
          <a href="javascript:;" @click="jumpAd(item.url_link)">
            <img style="display: block; width: 100%" :src="item._image" alt="">
          </a>
        </div>
        <!-- 筛选 -->
        <div class="screen_wrap">
          <div class="screen_first clearfix">
            <div class="screen_header left">
              <span>当前位置</span>
              <span style="margin: 0 5px;"><i class="iconfont">&#xe607;</i></span>
            </div>
            <div class="sceen_first_item left" v-for='(item, index) in head' v-bind:key='index'>
              <div class="screen_item left">
                <span class="left">{{item.name}}</span>
                <a href="javascript:;" class="left" v-if='index != 0' @click='returnNav(index)'><i class="iconfont">&#xe625;</i></a>
              </div>
              <span v-if='index + 1 != head.length || params.keyword' style="margin: 0 5px;"> <i class="iconfont">&#xe607;</i> </span>
            </div>
            <div class="screen_header left" v-if='params.keyword'>
              <span>{{params.keyword}}</span>
            </div>
          </div>
          <!-- 筛选第二行 -->
          <div class="screen_second clearfix">
            <p class="left">分类：</p>
            <ul class="">
              <li class="left"
              v-bind:class='{active: activeId == index}'
              @click='jumpTo(item.t_id, index)'
              v-for='(item, index) in category'
              v-bind:key='index'>{{item.name}}</li>
            </ul>
          </div>
          <div class="screen_list clearfix">
            <div class="search_item left">
              <div><a href="javascript:;">类型 <span v-if='searchList.theme_type != 0'>({{search[0][searchList.theme_type]}})</span> <i class="iconfont">&#xe605;</i></a></div>
              <ul class="search_item_hover">
                <li><a href="javascript:;" @click='sortSearch("theme_type", 0)' :class="{active: searchList.theme_type == 0}">全部</a></li>
                <li v-for='(item,index) in search[0]' v-bind:key='index'>
                  <a href="javascript:;" @click='sortSearch("theme_type", index)' :class="{active: searchList.theme_type == index}">{{item}}</a>
                </li>
              </ul>
            </div>
            <div class="search_item left">
              <div><a href="javascript:;">版式 <span v-if='searchList.size_type != 0'>({{search[1][searchList.size_type]}})</span> <i class="iconfont">&#xe605;</i></a></div>
              <ul class="search_item_hover">
                <li><a href="javascript:;" @click='sortSearch("size_type", 0)' :class="{active: searchList.size_type == 0}">全部</a></li>
                <li v-for='(item,index) in search[1]' v-bind:key='index'>
                  <a href="javascript:;" @click='sortSearch("size_type", index)' :class="{active: searchList.size_type == index}">{{item}}</a>
                </li>
              </ul>
            </div>
            <div class="search_item left">
              <div><a href="javascript:;">格式 <span v-if='searchList.file_format != 0'>({{search[2][searchList.file_format]}})</span> <i class="iconfont">&#xe605;</i></a></div>
              <ul class="search_item_hover">
                <li><a href="javascript:;" @click='sortSearch("file_format", 0)' :class="{active: searchList.file_format == 0}">全部</a></li>
                <li v-for='(item,index) in search[2]' v-bind:key='index'>
                  <a href="javascript:;" @click='sortSearch("file_format", index)' :class="{active: searchList.file_format == index}">{{item}}</a>
                </li>
              </ul>
            </div>
            <div class="sort left">
              <p class="left"><strong>排序方式：</strong></p>
              <ul class="left">
                <li><a href="javascript:;" :class="{active: searchList.sort == 0}" @click='sortUpDown("sort")'>综合排序</a></li>
                <li>
                  <a href="javascript:;" :class="{active: searchList.sort == 11 || searchList.sort == 12}" @click='sortUpDown("sort", "hot", searchList.sort)'>
                    <span>热门下载</span>
                    <i class="iconfont" v-if='searchList.sort == 12'>&#xe621;</i>
                    <i class="iconfont" v-if='searchList.sort == 11'>&#xe620;</i>
                  </a>
                </li>
                <li>
                  <a href="javascript:;" :class="{active: searchList.sort == 21 || searchList.sort == 22}" @click='sortUpDown("sort", "new", searchList.sort)'>
                    <span>最新上传</span>
                    <i class="iconfont" v-if='searchList.sort == 22'>&#xe621;</i>
                    <i class="iconfont" v-if='searchList.sort == 21'>&#xe620;</i>
                  </a>
                </li>
              </ul>
            </div>
            <!-- 下一页 -->
            <div class="right" style="padding: 20px 25px;">
              <div class="next_one left"><span>当前：第</span> {{currentPage}} <span>页</span></div>
            </div>
          </div>
        </div>
         <!-- 排序方式 -->

        <div class="main_wrap" style="min-height: 420px;">
          <Waterfall
              :gutterWidth='26'
              :gutterHeight='26'
              :minCol='4'
            >
            <WaterfallItem v-for='(item, index) in list' :width='280' :order='index' :key='index'>
              <router-link target='_blank' :to='{path: "/detail/" + item.m_id}'>
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
      </div>
      <!-- 底部下一页 -->
      <div class="footer_page" style="text-align: center;" v-if='count'>
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
</template>
<script>
  import { type, getAd } from '@/services';
  import {Waterfall, WaterfallItem} from 'vue2-waterfall';
  import loadings from '../main/loading.vue';
  export default {
    data() {
      return {
        host: process.env.HOST,
        loading: true,
        category: [],
        list: [],
        head: [],
        search: [],
        searchList: {
          theme_type: 0,
          size_type: 0,
          file_format: 0,
          sort: 0
        },
        sort: 0,
        count: 0,
        activeId: 0,
        currentPage: 1,
        loadingHeight: 420,
        ad: []
      }
    },
    created() {
      const query = this.$route.query;
      const params = {
        ft_id: query.ftId || '',
        st_id: query.stId || '',
        tt_id: query.ttId || '',
        theme_type: query.theme_type || '',
        size_type: query.size_type || '',
        file_format: query.file_format || '',
        sort: query.sort || '',
        page: this.currentPage - 1,
        keyword: query.keyword || ''
      }
      this.params = params;
      if(query.theme_type) {
        this.searchList.theme_type = query.theme_type || 0
      }
      if(query.size_type) {
        this.searchList.size_type = query.size_type || 0
      }
      if(query.file_format) {
        this.searchList.file_format = query.file_format || 0
      }
      if(query.sort) {
        this.searchList.sort = query.sort || 0
      }
      this.getType(params);
      this.getAd({area_id: 10});
    },
    components: {
      Waterfall,
      WaterfallItem,
      loadings
    },
    watch: {

    },
    methods: {
      getLoadingHeight(val) {
        this.loadingHeight = val;
      },
      sortSearch(type, index) {
        const query = Object.assign({}, this.$route.query);
        query[type] = index;
        if(!index) {
          delete query[type];
        }
        this.$router.push({ name: 'type', query })
      },
      sortUpDown(type, sort, num) {
        const query = Object.assign({}, this.$route.query);
        if(query && query.sort) {
          this.searchList.sort = query.sort;
        }
        if(sort == 'hot') {
          switch (num) {
            case 0: this.searchList.sort = 11
            break;
            case 21: this.searchList.sort = 11
            break;
            case 22: this.searchList.sort = 11
            break;
            case 11: this.searchList.sort = 12
            break;
            case 12: this.searchList.sort = 11
            break;
          }
        }
        if(sort == 'new') {
          switch (num) {
            case 0: this.searchList.sort = 21
            break;
            case 11: this.searchList.sort = 21
            break;
            case 12: this.searchList.sort = 21
            break;
            case 21: this.searchList.sort = 22
            break;
            case 22: this.searchList.sort = 21
            break;
          }
        }
        query[type] = this.searchList.sort;
        if(!sort) {
          delete query[type];
        }
        this.$router.push({ name: 'type', query });
      },
      async getType(params) {
        const { status, result, info } = await type(params)
        this.loading = false;
        if(status != 1) {
            return this.$Message.error(msg)
        }

        (result.category || []).unshift({
          count: 1,
          t_id: '',
          name: '全部'
        })

        this.category = (result.category || []).filter( item => {
          return item.count == 1
        });
        this.list = result.list;
        this.head = result.head;
        this.search = result.search;
        if(result.count) {
          this.count = result.count;
        }
        let activeId = (this.category || []).findIndex(item => {
          return item.t_id == this.params.tt_id;
        })
        if(activeId) this.activeId = activeId;
      },
      returnNav(index) {
        const head = this.head;
        const nav = (this.head|| []).filter((item, key) => {
          return key < index;
        })
        let query = {};
        const ftType = nav.find(item => {
          return item.ft_id;
        })
        const stType = nav.find(item => {
          return item.st_id;
        })
        if(stType) {
          query = {
            ftId: ftType.ft_id,
            stId: stType.st_id
          }
        } else {
          query = {
            ftId: ftType.ft_id
          }
        }
        if(this.params.keyword) {
          Object.assign(query, {keyword: this.params.keyword});
        }
        this.$router.push({ name: 'type', query})
      },
      jumpDetail(mId) {
        // let routeData = this.$router.resolve({
        //   path: `/detail/${mId}`
        // })
        // window.open(routeData.href, '_blank');
        this.$router.push({ path: `/detail/${mId}`})
      },
      jumpTo(id, index) {
        let path = this.$router.path;
        let query = {};
        const ftType = (this.head || []).find(item => {
          return item.ft_id;
        })
        const stType = (this.head || []).find(item => {
          return item.st_id;
        })
        if(!ftType) {
          query = {
            ftId: id
          }
        } else if(stType) {
          query = {
            ftId: ftType.ft_id,
            stId: stType.st_id,
            ttId: id || ''
          }
        } else {
          query = {
            ftId: ftType.ft_id,
            stId: id || ''
          }
        }
        if(this.params.keyword) {
          Object.assign(query, {
            keyword: this.params.keyword
          })
        }
        this.$router.push({ name: 'type', query })
      },
      handleCurrentChange(val) {
        this.list = [];
        this.currentPage = val;
        Object.assign(this.params, {page: this.currentPage - 1})
        this.getType(this.params);
        window.scrollTo(0, 0);
      },
      jumpAd(url) {
        if(!url) {
          return;
        }
        window.open(url, '_blank');
      },
      async getAd(params) {
        const {status, result, info} = await getAd(params)
        if(status != 1) {
          return this.$Message(info, 'error');
        }
        (result || []).forEach(item => {
          let arr = item.image.split('!');
          item._image = arr[0];
        })
        this.ad = result;
      }
    }
  }
</script>
