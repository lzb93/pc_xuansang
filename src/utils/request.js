
import qs from 'qs'
import axios from 'axios';
import { mapActions, mapState } from 'vuex';
export default function request(url, data = {}, methods = 'GET', showMsg = true) {
  let userInfo = vm.$store.state['userInfo'];
  let data2 = data;
  if (userInfo.user_id) {
    // Object.assign(data2, {
    //   token: userInfo['token'],
    //   user_id: userInfo['user_id'],
    // })


  }
  var api = process.env.NODE_ENV === 'production' ? '' : 'api';
  return axios({
    url:  api + url,
    params: methods === 'GET' ? data2 : '',
    data: methods === 'POST' ? qs.stringify(data2) : '',
    method: methods,
    header: {
      'Accept': 'application/json',
      'Content-type': 'application/json;charset=UTF-8' // application/x-www-form-urlencoded
    }
  })
  .then(({ status, data, statusText }) => {
    if (status === 200) {
      if ( data.status === -1 ) {
        vm.$store.commit('overdue', { userInfo: '{}' });
        // vm.$router.push('/login')
        setTimeout(() => {
          if (showMsg) vm.$Message('未登录，请先登录', 'error')
        }, 500)
        // return Promise.reject(data.msg)
      }
      return data
    } else {
      return Promise.reject(statusText)
    }
  })
}

export function get(url, data = {}, showMsg = true) {
  return request(url, data, 'GET', showMsg)
}
export function post(url, data = {}, showMsg = true) {
  return request(url, data, 'POST', showMsg)
}
