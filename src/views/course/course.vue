<style lang='scss' rel='stylesheet/scss' src='./course.scss'></style>
<template>
  <div>
    <div v-show="loading" style="min-height: 400px; text-align: center; padding-top: 50px;">
      <i class="el-icon-loading" style="font-size: 22px; vertical-align: text-top;"></i>
      <span style="color: #999;">正在加载中...</span>
    </div>
    <div v-show="!loading" class="video_detail_wrap">
      <div class="all_wrap">
        <div class="header">
          <h2>{{title}}</h2>
          <div class="line"></div>
          <video class="teaching" :src="video" controls="controls" ></video>
        </div>
        <div id='vhtml' v-html='content' class="content_wrap"></div>
      </div>
    </div>
  </div>

</template>
<script>
  import { videoDetail } from '@/services';
  export default {
      data(){
          return{
              host: process.env.HOST,
              loading: true,
              title:'',
              video:'',
              content:''
          }
      },
      async created(){
          const routeParams = this.$route.params;
          const {status,result,info} = await videoDetail({m_id: routeParams.mId})
          this.loading = false;
          if(status != 1){
              return this.$Message(info,'error')
          }
          this.video = result.download_file;
          this.title = result.title;
          this.content = result.content;
      }

  }
</script>
