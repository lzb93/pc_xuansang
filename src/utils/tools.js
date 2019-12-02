export function format(d, fmt) {
  // 时间格式化
	// format(+new Date(), 'yyyy-MM-dd hh:mm:ss') ==> 2006-07-02 08:09:04.423
	// format(1202452662111, 'yyyy-M-d h:m:s.S')  ==> 2006-7-2 8:9:4.18
  const obj = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    'S': d.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var i in obj) {
    if (new RegExp('(' + i + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
        ? (obj[i])
        : (('00' + obj[i]).substr(('' + obj[i]).length)))
    }
  }
  return fmt
}
// 对象形式参数转url形式参数 a=1&b=2
export function json2Form(json) {
  let str = []
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]))
  }
  return str.join("&")
}
// 地址加上参数
export function modifyUrl(url, params = {}) {
  params = json2Form(params)
  if (url.indexOf('?') != -1) {
    url = url + '&' + params
  } else {
    url = url + '?' + params
  }
  return url
}
// 随机一个任意长度的字符串
export function randomString(len) {
  len = len || 32
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const maxPos = chars.length;
  let pwd = ''
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * (maxPos + 1)))
  }
  return pwd
}
// 节流函数
export const dalay = (function () {
  let timestamp = 0
  return function(dis = 1000) {
    const now = +new Date()
    if (now - timestamp > dis) {
      timestamp = now
      return true
    } else {
      return false
    }
  }
})()

// 简单深拷贝
export function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

//

export function getScript(url) {
  var scriptFile = document.createElement('script')
  scriptFile.setAttribute("type","text/javascript")
  scriptFile.setAttribute("src", url)
  document.querySelector("head").appendChild(scriptFile)
  return new Promise((resolve, reject) => {
    scriptFile.onload = resolve
    scriptFile.onerror = reject
  })
}

export function formatHttp(url, host) {
  if(url.indexOf('http') > -1) {
    return
  } else {
    return host;
  }
}
