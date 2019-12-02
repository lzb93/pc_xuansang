<template>
  <div id="app">
    <headers v-if='!$route.meta.header'></headers>
    <router-view :key="$route.fullPath"></router-view>
    <footers v-if='!$route.meta.noFooters'></footers>
  </div>
</template>

<script>
  import headers from './views/main/header.vue';

  import footers from './views/main/footer.vue';
  import { getHeader, getUserMsg, getUser } from '@/services';
  import { mapActions, mapState } from 'vuex';
import { setTimeout } from 'timers';
  export default {
    name: 'App',
    components: {
      headers,
      footers
    },
    mounted() {
      this.getUser()
    },
    created() {
      window.vm = this;
       

      // if(window.location.href.includes('?')&&window.location.href.includes('#/')&& window.location.href.includes('&')){
      //   const query = window.location.href.split('?')[1].replace('#/', '').split('&');
      // //   let params = {
      // //   user_id: query[0].split('=')[1],
      // //   token: query[1].split('=')[1]
      // // };
      // // console.log(params)
      // self.getUser()
      
      // }
    },
    computed: {
      ...mapState([ 'userInfo' ]),
    },
    watch: {
      $route(){
        console.log('this.userInfo:' + this.userInfo)
        if(this.userInfo && this.userInfo.token) {
          // this.getUserMsg();
        }
      }
    },
    destroyed() {
      console.log(this.$store.state.userInfo)
      this.$store.state.userInfo = {}
     console.log(this.$store.state.userInfo)
     localStorage.setItem('USER_INFO', {})
    },
    methods: {
      ...mapActions([ 'refreshMessage', 'getUser']),
      async getUserMsg() {
        const {status, result, info} = await getUserMsg()
        if(status != 1) {
          return this.$Message(info, 'error')
        }
        this.refreshMessage(result);
      },
    }
  }
</script>
