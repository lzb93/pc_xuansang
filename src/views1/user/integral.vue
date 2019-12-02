<style lang="scss" rel="stylesheet/scss" src="./integral.scss"></style>

<template>
  <div>
    <div class="integral_wrap index_wrap">
      <div class="mall_wrap clearfix">
        <div class="mall_nav left">
          <ul>
            <li :class="{active: active == 0}" @click="switchTab(0)">积分商城</li>
            <li :class="{active: active == 1}" @click="switchTab(1)">收支明细</li>
            <li :class="{active: active == 2}" @click="switchTab(2)">兑换记录</li>
          </ul>
        </div>
        <div class="mall_main right">
          <div v-show="loading" style="min-height: 400px; text-align: center;padding-top: 100px;">
            <i class="el-icon-loading" style="font-size: 22px; vertical-align: text-top;"></i>
            <span style="color: #999;">正在加载中...</span>
          </div>
          <div v-show="!loading">
            <div v-if='active == 0'>
              <div class="title">我的积分：<span>{{userInfo.integral}}</span></div>
              <div v-if="list.length == 0" style="min-height: 380px; text-align: center; color: #999;">
                <span>暂无积分商品</span>
              </div>
              <div class="clearfix" style="min-height: 380px;" v-if='list.length > 0'>
                <div class="item left" v-for="(item, index) in list" :key='index' @click="toDetail(item.goods_id)">
                  <img class="item_img" :src="item.image" alt="">
                  <div class="item_content">
                    <p>{{item.name}}</p>
                    <div>
                      <i class="iconfont">&#xe609;</i>
                      <span class="item_inte">{{item.integral}}</span>
                      <span>积分</span>
                    </div>
                  </div>
                </div>
                <div  class="footer_page">
                  <el-pagination
                    background
                    :page-size="8"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout="prev, pager, next"
                    :total="parseInt(count)">
                  </el-pagination>
                </div>
              </div>
            </div>

            <div v-if="active == 1">
              <div class="title">收支明细</div>
              <div style="min-height: 380px;">
                <el-table
                  :data="list"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="操作时间">
                  </el-table-column>
                  <el-table-column
                    prop="msg"
                    label="变更原因">
                  </el-table-column>
                  <el-table-column
                    prop="_inte"
                    label="积分">
                  </el-table-column>
                </el-table>
              </div> 
              <div v-if="list.length == 0" style="min-height: 380px; text-align: center; color: #999;">
                <span>无</span>
              </div>
              <div v-show="list.length > 0" class="footer_page">
                <el-pagination
                  background
                  :page-size="8"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  layout="prev, pager, next"
                  :total="parseInt(count)">
                </el-pagination>
              </div>
            </div>

            <div v-if="active == 2">
              <div class="title">兑换记录</div>
              <div style="min-height: 380px;">
                <el-table
                  :data="list"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="兑换时间">
                  </el-table-column>
                  <el-table-column
                    prop="goods_name"
                    label="兑换商品">
                  </el-table-column>
                  <el-table-column
                    prop="sum"
                    label="兑换数量">
                  </el-table-column>
                  <el-table-column
                    prop="integral"
                    label="使用积分">
                  </el-table-column>
                  <el-table-column
                    prop="_statusName"
                    label="兑换单状态">
                  </el-table-column>
                </el-table>
              </div>
              <div v-show="list.length > 0" class="footer_page">
                <el-pagination
                  background
                  :page-size="8"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  layout="prev, pager, next"
                  :total="parseInt(count)">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>
<script>
  import { integralList, integralDetail, integralExchange, exchangeRecord, incomeList, refreshUserInfo } from '@/services';
  import { format } from '@/utils/tools';
  import { mapActions, mapState } from 'vuex';
  export default {
    data() {
      return {
        host: process.env.HOST,
        loading: true,
        active: 0,
        list: [],
        count: 1,
        currentPage: 1,
        orderStatus: {
          1: '兑换成功',
          2: '运输中',
          3: '完成'
        }
      }
    },
    computed: {
      ...mapState([ 'userInfo', 'intePage' ]),
    },
    created() {
      const query = this.$route.query;
      this.currentPage = this.intePage;
      this.product({page: this.currentPage - 1});
      this.refreshUser();
    },
    methods: {
      ...mapActions([ 'refreshUser', 'updateIntePage' ]),
      switchTab(index) {
        this.active = index;
        this.currentPage = 1;
        this.count = 1;
        this.list = [];
        if(index == 0) {
          this.product({page: this.currentPage - 1});
        }
        if(index == 1) {
          this.getIncomeList({page: this.currentPage - 1});
        }
        if(index == 2) {
          this.exchangeRecord({page: this.currentPage - 1});
        }
      },
      toDetail(goodsId) {
        this.$router.push({ name: 'integralDeatil', query: {goodsId: goodsId , page: this.currentPage - 1}});
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.updateIntePage(val);
        if(this.active == 0) {
          this.product({page: this.currentPage - 1});
        }
        if(this.active == 1) {
          this.getIncomeList({page: this.currentPage - 1});
        }
        if(this.active == 2) {
          this.exchangeRecord({page: this.currentPage - 1});
        }
        window.scrollTo(0, 0)
      },
      async exchangeRecord(params) {
        this.loading = true;
        const { status, result, info } = await exchangeRecord(params)
        this.loading = false;
        if(status != 1) {
          return this.$Message(info, 'error');
        }
        (result.list || []).forEach(item => {
          item._statusName = this.orderStatus[item.status];
          item.date = format(new Date(item.create_time * 1000), 'yyyy-MM-dd hh:mm');
        })
        this.list = result.list;
        if(this.count == 1) {
          this.count = result.page;
        }
      },
      async product(params) {
        this.loading = true;
        const { status, result, info } = await integralList(params)
        this.loading = false;
        if(status != 1) {
          return this.$Message(info, 'error');
          
        }
        this.list = (result.list || []).map((item) => {
          let arr = item.image.split('!');
          return {
            image: arr[0],
            goods_id: item.goods_id,
            name: item.name,
            integral: item.integral
          }
        })
        if(this.count == 1) {
          this.count = result.count;
        }
      },
      async getIncomeList(params) {
        this.loading = true;
        const {status, result, info} = await incomeList(params)
        this.loading = false;
        if(status != 1) {
          return this.$Message(info, 'error')
        }
        (result.list || []).forEach(item => {
          if(item.sign == 2) {
            item._inte = '-' + item.integral
          } else if(item.sign == 1) {
            item._inte = '+' + item.integral
          }
          item.date = format(new Date(item.create_time * 1000), 'yyyy-MM-dd hh:mm');
        })
        this.list = result.list;
        if(this.count == 1) {
          this.count = result.count;
        }
      }
    }
  }
</script>
