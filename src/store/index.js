import Vue from 'vue'
import Vuex from 'vuex'
import * as API from '@/services'
import cityData from '@/utils/city.data.js'
Vue.use(Vuex)
const state = {
  HOST: process.env.HOST,
  userInfo: JSON.parse(localStorage.getItem('USER_INFO') || '{}'),
  cityData: cityData,
  messages: 0,
  intePage: 1
}
const actions = {
  async getUser(state, params) {
      params = {}
      let {status, result, info} = await API.getUser(params)
      
      console.log(`status: ${status}, ${result}, ${info}`)

      if (!result) result = {}

        
      if( status == 1) {
        API.getUserMsg();
      }

      if(status != 1) {
        // return vm.$Message(info, 'error');
        // localStorage.clear();
      }
      // vm.$Message('登录成功', 'success');
      console.log(result, 'result');
      localStorage.setItem('USER_INFO', JSON.stringify(result))
      state.commit('update', { userInfo: result })
      // vm.$router.replace('/')
  },
  async logout(state) {
    const {status, result, info} = await API.logout()
    if(status != 1) {
      return this.$Message(info, "error");
    }
    localStorage.setItem('USER_INFO', '')
    state.commit('update', { userInfo: '{}' })
    vm.$Message('退出登录成功', 'success')

    let localUrl = 'http://local-login.meigongpuzi.cn?r=' + encodeURIComponent(location.protocol + '//' + location.hostname)
    let remoteUrl = 'http://login.meigongpuzi.cn?r=' + encodeURIComponent(location.protocol + '//' + location.hostname)
    window.location.href = process.env.NODE_ENV === 'production' ? remoteUrl : localUrl
  },
  
  async destorySession(state) {
    state.commit('update', { userInfo: '{}' })
    localStorage.setItem('USER_INFO', '{}')
  },
  async refreshUser(state) {
    const {status, result, info} = await API.refreshUserInfo()
    if(status != 1) {
      return vm.$Message(info, 'error');
    }
    localStorage.setItem('USER_INFO', JSON.stringify(result.user))
    state.commit('update', { userInfo: result.user })
  },
  async refreshMessage(state, params) {
    state.commit('updataMessage', { messages: params })
  },
  updateIntePage(state, page) {
    state.commit('update', { intePage: page })
  }
}
const mutations = {
  update(state, obj) {
    for (let key in obj) {
      state[key] = obj[key]
    }
  },
  updataMessage(state, obj) {
    state.messages = obj.messages;
  },
  updateUserInfo(state, obj) {
    for (let key in obj) {
      state.userInfo[key] = obj[key]
    }
    localStorage.setItem('USER_INFO', JSON.stringify(state.userInfo))
  },
  overdue(state, obj) {
    for (let key in obj) {
      state[key] = obj[key]
    }
    localStorage.setItem('USER_INFO', '{}');
  }
}
const getters = {

}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})

