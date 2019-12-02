module.exports = {
  proxyList: {
    '/api': {
      target: 'http://devfront.meigongpuzi.cn',  //（这里是代理接口的位置）
      changeOrigin: true,//（允许跨域，如果这不写，调用接口接口时会有跨域错误说缺少请求头）
      pathRewrite: {'^/api': '' } //（路由规则下面详细介绍）
    }
  }
}
