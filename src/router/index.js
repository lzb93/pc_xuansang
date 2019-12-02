import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
// 路由
import HOME from '../views/home/home.vue';
import LOGIN from '../views/main/login.vue';
import TYPE from '../views/type/type.vue';
import RECHARGE from '../views/vip/recharge.vue';
import RECHARGEVIP from '../views/vip/rechargeVip.vue';
import USER from '../views/user/user.vue';
import COURSE from '../views/course/course.vue';
import TEACHINGVIDEO from '../views/teachingVideo/teachingVideo.vue';
import RANKING from '../views/ranking/ranking.vue';
import DETAIL from '../views/detail/detail.vue';
import UPLOAD from '../views/main/upload.vue';
import PROBLEM from '../views/main/problem.vue';
import MESSAGE from '../views/main/message.vue';
import INTEGRAL from '../views/user/integral.vue';
import DESIGN from '../views/more/design.vue';
import SPECIAL from '../views/more/special.vue';
import PROTOTYPE from '../views/more/prototype.vue';
import INTEGRALDETAIL from '../views/user/integralDetail.vue';
import NEWS from '../views/more/news.vue';

const routes = [
  {
    path: '/',
    component: HOME
  },
  {
    path: '/login',
    name: 'login',
    component: LOGIN,
    meta: { noFooters: true, header: true }
  },
  {
    name: 'type',
    path: '/type',
    component: TYPE,
    meta: { normal: false }
  },
  {
    path: '/detail/:mId',
    component: DETAIL,
    meta: { normal: false }
  },
  {
    //vip详情
    name: 'recharge',
    path:'/recharge',
    component: RECHARGE
  },
  {
    path:'/about',
    name:'about',
    component: () => import('../views/about/about.vue'),
    children: [
      {
        path: 'aboutUs',
        name: 'aboutUs',
        component:() => import('../views/about/aboutUs')
      },
      {
        path: 'statement',
        name: 'statement',
        component:() => import('../views/about/statement')
      },
      {
        path: 'problem',
        name: 'problem',
        component:() => import('../views/about/problem')
      },
      {
        path: 'vip',
        name: 'vip',
        component:() => import('../views/about/vip')
      },
      {
        path: 'opinion',
        name: 'opinion',
        component:() => import('../views/about/opinion')
      }
    ]
  },
  {
    //vip充值页面
    name: 'rechargeVip',
    path:'/rechargeVip',
    component: RECHARGEVIP
  },
  {
    path:'/ranking',
    component:RANKING
  },
  {
    //视频教程详情
    path:'/course/:mId',
    component:COURSE
  },
  {
     //视频教程
    name: 'teachingVideo',
    path:'/teachingVideo',
    component:TEACHINGVIDEO
  },
  {
    //页脚常见问题
    name: 'problem',
    path:'/problem',
    component: PROBLEM
  },
  {
    name: 'user',
    path:'/user',
    component: USER,
    meta: { normal: false },
    children:[
      {
        path: '/info',
        name: 'mineInfo',
        component:() => import('../views/user/mineInfo')
      },
      {
        path: '/vipCenter',
        name: 'mineVipCenter',
        component:() => import('../views/user/mineVipCenter')
      }
    ]
  },
  {
    name: 'upload',
    path: '/upload',
    component: UPLOAD
  },
  {
    name: 'message',
    path: '/message',
    component: MESSAGE
  },
  {
    name: 'integral',
    path: '/integral',
    component: INTEGRAL
  },
  //设计工具
  {
    name: 'design',
    path:'/design',
    component: DESIGN
  },
  {
    name: 'news',
    path:'/newest',
    component: NEWS
  },
  //样机
  {
    name: 'prototype',
    path:'/prototype',
    component:PROTOTYPE
  },
  //专题
  {
    name:'special',
    path:'/special',
    component:SPECIAL
  },
  {
    name: 'integralDeatil',
    path: '/integral-detail',
    component: INTEGRALDETAIL
  }
]
const router =  new Router({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})


export default router

