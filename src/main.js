// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 样式
import './assets/scss/index.scss';
import 'swiper/dist/css/swiper.css';
import './assets/scss/elementUi/element-variables.scss';
// import 'vue-croppa/dist/vue-croppa.min.css'

import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import store from './store';
import router from './router';
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";

Vue.config.productionTip = true

Vue.use(ElementUI);
Vue.use(Croppa);

router.afterEach((to,from,next) => {
  window.scrollTo(0, 0);
})

Vue.prototype.$Message = function (msg, t) {
  this.$message({
    message: msg,
    type: t
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

