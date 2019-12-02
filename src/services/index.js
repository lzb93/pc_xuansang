import { get, post } from '../utils/request'
var api = '/api';

// 注册
export function register(params) {
  return post('/data-api/Api/Index/register', params)
}
// // 登录
// export function login(params) {
//   return post('/data-api/Api/Index/login', params)
// }
// // 登录
// export function smsLogin(params) {
//   return post('/data-api/Api/Index/smsLogin', params)
// }
// 退出登录
export function logout(params) {
  return post('/data-api/Api/Index/logout', params)
}
// 获取个人信息
export function getUser(params) {
  return post('/data-api/Api/Index/getUser', params, false)
}
// 手机号验证码
export function getCode(params) {
  return get('/data-api/Api/Index/getCode', params)
}
// 签到
export function signIn(params) {
  return get('/data-api/Api/Index/signIn', params)
}
// 上传用户头像
export function uploadAvatar(params) {
  return get('/data-api/Api/Index/uploadHeadPic', params)
}
// 改用户信息
export function editUserInfo(params) {
  return get('/data-api/Api/Index/editUserInfo', params)
}
// 忘记密码
export function forgetPassword(params) {
  return get('/data-api/Api/Index/forgetPassword', params)
}
// 改手机号
export function changeMobile(params) {
  return get('/data-api/Api/Index/changeMobile', params)
}

// 头部数据
export function getHeader() {
  return get('/data-api/Api/Index/headers')
}
// 页脚
export function getFooter() {
  return get('/data-api/Api/Index/footer')
}
// 首页
export function home() {
  return get('/data-api/Api/Index/home')
}
// 首页二级分类tab
export function homeMaterial(params) {
  return get('/data-api/Api/Index/homeMaterial', params)
}
// 分类
export function type(params) {
  return get('/data-api/Api/Index/themePage', params)
}
// 详情
export function detail(params) {
  return get('/data-api/Api/Index/themeDetail', params)
}
// 收藏
export function collect(params) {
  return get('/data-api/Api/Index/collectionTheme', params)
}
// 更多收藏
export function moreCollect(params) {
  return get('/data-api/Api/Index/getMoreCollect', params)
}

// 商品列表
export function goodsList(params) {
  return get('/data-api/Api/Goods/goodsList', params)
}
//视频列表
export function videoList(params) {
  return get('/data-api/Api/Index/videoList', params)
}
//视频详情
export function videoDetail(params) {
  return get('/data-api/Api/Index/videoDetail', params)
}
// 个人中心
export function userCenter(params) {
  return get('/data-api/Api/Index/userCenter', params)
}
// 个人中心 - 作品
export function userWorks(params) {
  return get('/data-api/Api/Index/userWorks', params)
}
// 个人中心 - 收藏
export function userCollect(params) {
  return get('/data-api/Api/Index/userCollect', params)
}
// 个人中心 - 上传
export function myUpload(params) {
  return get('/data-api/Api/Index/myUpload', params)
}
// 个人中心 - 下载
export function userDownload(params) {
  return get('/data-api/Api/Index/userDownload', params)
}
// 个人中心 - 会员中心
export function userMember(params) {
  return get('/data-api/Api/Index/userMember', params)
}
// 企业会员详情
export function companyMember(params) {
  return get('/data-api/Api/Index/companyMember', params)
}
// 查找用户
export function findUser(params) {
  return get('/data-api/Api/Index/findUser', params)
}
// 添加企业会员
export function addCompanyUser(params) {
  return get('/data-api/Api/Index/addCompanyUser', params)
}
// 移除会员
export function exitMember(params) {
  return get('/data-api/Api/Index/exitMember', params)
}
// 获取用户系统消息
export function getMessage(params) {
  return get('/data-api/Api/Index/getMessage', params)
}
// 首页获取用户系统消息
export function getUserMsg(params) {
  return get('/data-api/Api/Index/getUserMsg', params)
}
// 获读取消息
export function readMsg(params) {
  return get('/data-api/Api/Index/readMsg', params)
}

// 会员充值列表
export function getMemberList(params) {
  return get('/data-api/Api/Index/memberList', params)
}
// 会员信息
export function getMemberInfo(params) {
  return get('/data-api/Api/Index/memberInfo', params)
}
// 生成订单
export function createOrder(params) {
  return get('/data-api/Api/Pay/createOrder', params)
}
// 生成订单
export function checkOrder(params) {
  return get('/data-api/Api/Pay/checkOrder', params)
}

//上传文件
export function upload(params) {
  return post('/data-api/Api/Asset/webuploader', params)
}
//上传文件下一步
export function addworks(params) {
  return post('/data-api/Api/upworks/addworks', params)
}
//上传文件添加信息
export function updWorks(params) {
  return post('/data-api/Api/upworks/updWorks', params)
}
//上传文件添加信息
export function getCategory(params) {
  return get('/data-api/Api/upworks/getCategory', params)
}
//获取草稿箱信息
export function drafts(params) {
  return get('/data-api/Api/Upworks/drafts', params)
}
//获取协议
export function getAgreement(params) {
  return get('/data-api/Api/Index/getAgreement', params)
}
//删除上传
export function deleteUpload(params) {
  return post('/data-api/Api/Index/deleteUpload', params)
}

// 下载文件
export function downloadTheme(params) {
  return get('/data-api/Api/index/downloadTheme', params)
}

// 积分商城
export function integralList(params) {
  return get('/data-api/Api/Goods/goodsList', params)
}
// 积分商品详情页
export function integralDetail(params) {
  return get('/data-api/Api/Goods/goodsDetail', params)
}
// 积分兑换
export function integralExchange(params) {
  return post('/data-api/Api/Goods/exchange', params)
}
// 保存地址
export function saveAddress(params) {
  return post('/data-api/Api/Goods/saveAddress', params)
}
// 获取地址
export function userAddress(params) {
  return get('/data-api/Api/Goods/userAddress', params)
}
// 兑换记录
export function exchangeRecord(params) {
  return get('/data-api/Api/Goods/exchangeRecord', params)
}
// 收支列表
export function incomeList(params) {
  return get('/data-api/Api/Goods/incomeList', params)
}

// 刷新用户信息
export function refreshUserInfo(params) {
  return get('/data-api/Api/Index/userInfo', params)
}

//获取getUpToken
export function getUpToken(params) {
  return get('/data-api/Api/Asset/getUpToken', params)
}

//获取getVersion
export function getVersion(params) {
  return get('/data-api/Api/Upworks/getVersion', params)
}

//设计工具
export function designTool(params) {
  return get('/data-api/Api/Index/designTool', params)
}

//样机专区
export function prototype(params) {
  return get('/data-api/Api/Index/prototype', params)
}
//最新
export function dailyLatest(params) {
  return get('/data-api/Api/Index/dailyLatest', params)
}
//样机信息
export function prototypeInfo(params) {
  return get('/data-api/Api/Index/prototypeInfo', params)
}
//专题
export function subject(params) {
  return get('/data-api/Api/Index/subject', params)
}
//广告
export function getAd(params) {
  return get('/data-api/Api/Index/getAd', params)
}
//页脚问题
export function getHelp(params) {
  return get('/data-api/Api/Index/getHelp', params)
}


// 关于我们
export function aboutUs(params) {
  return get('/data-api/Api/webinfo/aboutUs', params)
}

// 常见问题
export function problem(params) {
  return get('/data-api/Api/webinfo/problem', params)
}

// 意见反馈
export function feedback(params) {
  return get('/data-api/Api/webinfo/feedback', params)
}

// 版权声明
export function statement(params) {
  return get('/data-api/Api/webinfo/statement', params)
}
// 关于我们头部图片
export function banner(params) {
  return get('/data-api/Api/webinfo/banner', params)
}
