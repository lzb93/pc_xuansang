<style lang='scss' rel='stylesheet/scss' src='./problem.scss'></style>
<template>
  <div class="problem_wrap">
    <loadings v-if="loading" v-on:getLoadingHeight="getLoadingHeight"></loadings>
    <div class="problem_inner ">
      <div class="left_con">
        <div>
          <ul class="left_conList flex_between">
            <li v-for="(item, index) in category" :key="index">
              <a href="javascript:;" @click="switchTab(item.h_id, index)" class="tx_ov" :class="{active: activeIndex == index}">{{item.name}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="right_con">
        <div>
          <h2 class="tx_ov">{{category[activeIndex] && category[activeIndex].name}}</h2>

          <div v-if="params.h_id != 8">
            <div style="overflow-y: auto; min-height: 420px">
              <div style="padding: 0 20px" v-if="list.length > 0" v-for="(item, index) in list" :key="index">
                <h3>{{item.title}}</h3>
                <div style="line-height: 26px" v-html="item.content"></div>
              </div>
              <div v-if="list.length == 0" style="padding: 30px 0; text-align: center; color: #999; font-size: 14px">
                <span>暂无数据</span>
              </div>
            </div>
            <div style="text-align: center; padding: 30px 0 10px">
              <el-pagination
                background
                :page-size="1"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="parseInt(count)">
              </el-pagination>
            </div>
          </div>
          <div v-if="params.h_id == 8" style="overflow-y: auto; min-height: 488px; padding: 20px">
            <el-input type="textarea" rows="7" v-model="content" placeholder="请输入"></el-input>
            <div style="margin-top: 30px; text-align: center">
              <el-button type="primary" @click="submit">提交</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getHelp, feedback } from '@/services';
  import loadings from '../main/loading.vue';
  export default {
    data() {
      return {
        loading: true,
        activeIndex: 0,
        params: {},
        category: [],
        list: [],
        content: '',
        count: 1,
        currentPage: 1,
        loadingHeight: 420
      }
    },
    components: {
      loadings
    },
    async created() {
      const query = this.$route.query;
      this.params = {
        h_id: query.id,
        page: this.currentPage - 1
      }
      this.getHelp(this.params)
    },
    methods: {
      async submit() {
        const params = {
          content: this.content
        }
        if(!params.content) {
          return this.$Message('内容不能为空！', 'error');
        }
        const {status, result, info} = await feedback(params)
        if(status != 1) {
          return this.$Message(info, 'error')
        }
        this.$Message('提交成功！', 'success');
        this.content = '';
      },
      getLoadingHeight(val) {
        this.loadingHeight = val;
      },
      switchTab(id, index) {
        this.activeIndex = index;
        this.currentPage = 1 ;
        this.getHelp(Object.assign(this.params, {h_id: id, page: this.currentPage -1 }))
        console.log(this.params,'params')
        
      },
      handleCurrentChange(val) {
        this.list = [];
        this.currentPage = val;
        this.getHelp(Object.assign(this.params, {page: this.currentPage - 1}));
      },
      async getHelp(params) {
        const { status, result, info } = await getHelp(params)
        this.loading = false;
        if(status != 1) {
          return this.$Message(info, 'error');
        }
        this.category = result.category;
        this.activeIndex = (this.category || []).findIndex(item => {
          return item.h_id == this.params.h_id;
        })
        this.list = result.list;
      }
    }
  }
</script>
