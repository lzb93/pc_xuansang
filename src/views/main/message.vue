<style lang="scss" rel="stylesheet/scss" src="./message.scss"></style>
<template>
  <div class="message_container">
    <div v-if="loading" style="padding-top: 30px;">
      <loadings v-on:getLoadingHeight="getLoadingHeight" :noneTop="true"></loadings>
    </div>
    <div v-show="!loading" class="message_wrap">
      <div style="text-align: center; padding: 20px 0; color: #999" :style="{'min-height': loadingHeight + 'px'}" v-if="messages.length == 0">
        <span>暂无消息！</span>
      </div>
      <div class="message_body" v-if="messages.length > 0">
        <div :style="{'min-height': loadingHeight + 'px'}">
          <div class="item_message clearfix" v-for='(item, index) in messages' :key='index'>
              <a href="javascript:;" class="clearfix" @click="readItem(item)">
                <div class="icon_message left"><i class="iconfont">&#xe616;</i></div>
                <div class="item_main left">
                  <div class="title tx_ov">
                    <h3 style="font-weight: normal">{{item.title}}</h3>
                  </div>
                  <span :class="{'color': !item.mr_id}">{{item.content}}</span>
                </div>
                <div class="item_system right">
                  <div style="margin-bottom: 5px">系统消息</div>
                  <span>{{item.date}}</span>
                </div>
              </a>
            </div>
        </div>
        <!-- 底部下一页 -->
        <div style="text-align: center; padding: 30px 0 40px" v-if='count'>
          <el-pagination
            background
            :page-size="10"
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
  import { getMessage, readMsg, getUserMsg } from '@/services';
  import { format } from '@/utils/tools';
  import loadings from '../main/loading.vue';
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        messages: [],
        loading: true,
        currentPage: 1,
        count: 1,
        loadingHeight: 420,
      }
    },
    components: {
      loadings
    },
    async created() {
      this.getMessage({page: this.currentPage - 1});
    },
    methods: {
      ...mapActions([ 'refreshMessage' ]),
      getLoadingHeight(val) {
        this.loadingHeight = val;
      },
      handleCurrentChange(val) {
        this.messages = [];
        this.currentPage = val;
        this.loading = true;
        this.getMessage({page: this.currentPage - 1});
        window.scrollTo(0, 0);
      },
      readItem(item) {
        if(!item.mr_id) {
          this.readMsg(item);
        }
        if(!item.link_url) {
          return;
        }
        window.open(item.link_url, '_blank');
      },
      async readMsg(item) {
        let params = {
          id: item.id
        }
        const {status, result, info} = await readMsg(params)
        if(status != 1) {
          return this.$Message(info, 'error')
        }
        (this.messages || []).forEach(each => {
          if(each.id == item.id) {
            each.mr_id = result;
          }
        })
        this.getUserMsg();
      },
      async getMessage(params) {
        const { status, result, info } = await getMessage(params)
        this.loading = false;
        if(status != 1) {
          return this.$Message(info, 'error');
        }
        (result.list || []).forEach(item => {
          item.date = format(new Date(item.create_time * 1000), 'yyyy-MM-dd hh:mm:ss');
        })
        this.messages = result.list;
        if(this.count == 1) {
          this.count = result.count;
        }
      },
      async getUserMsg() {
        const {status, result, info} = await getUserMsg()
        if(status != 1) {
          return this.$Message(info, 'error')
        }
        this.refreshMessage(result);
      }
    }
  }
</script>
