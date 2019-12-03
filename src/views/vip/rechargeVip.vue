<style lang='scss' rel='stylesheet/scss' src='./rechargeVip.scss'></style>
<template>
  <div class="recharge_vip_wrap">
    <!-- <div class="header_img">
        <img src="" alt="">
    </div> -->
    <div class="flex_between" style="width:900px;margin:50px auto;padding-left: 60px;">
        <div class="date_infor ">
            <div class="six_one">
                <div class="add">+</div>
                <h3>800 <span> 万</span></h3>
                <h5>全站作品</h5>
                <div class="line"></div>
            </div>
            <div class="six_two"></div>
            <div class="six_three"></div>
            <div class="six_four"></div>
            <div class="six_five"></div>
        </div>
        <div class="date_infor ">
            <div class="six_one">
                <div class="add" style="right:30px">+</div>
                <h3>80000</h3>
                <h5>每日更新</h5>
                <div class="line"></div>
            </div>
            <div class="six_two"></div>
            <div class="six_three"></div>
            <div class="six_four"></div>
            <div class="six_five"></div>
        </div>
        <div class="date_infor ">
            <div class="six_one">
                <h3>20 <span> 元起/月</span></h3>
                <h5>平均价格</h5>
            </div>
            <div class="six_two"></div>
            <div class="six_three"></div>
            <div class="six_four"></div>
            <div class="six_five"></div>
        </div>
    </div>
    <div class="list_content">
        <div class="change_meal">
            <h2 >选择套餐</h2>
        </div>
        <div class="clearfix" style="height:570px; width: 1000px; margin: 0 auto;">
            <div class="ver_list left" style="z-index:5;">
                <p style=" border-top: 0">特权对比</p>
                <div class="how_maney"></div>
                <p class="date_gx">共享标作品专区</p>
                <p class="date_yc">原创标作品专区</p>
                <p class="date_sp">视频专区</p>
                <p>下载数量</p>
                <p>身份标识</p>
                <p>商务授权</p>
            </div>
            <!-- 免费用户 -->
            <div class="ver_list free left">
                <p style=" border-top: 0">免费用户</p>
                <h1 class="how_maney ">0 <span>元</span></h1>
                <p class="reduction">1次/天</p>
                <p class="reduction"><i class="iconfont">&#xe625;</i></p>
                <p class="reduction">1次/天</p>
                <p>1次/天</p>
                <p>无</p>
                <p><i class="iconfont">&#xe625;</i></p>
                <!-- <div class="bottom_btn" style="background-color:#fff;color:#707070;border:1px solid #707070;">
                    立即注册
                </div> -->
            </div>
            <!-- 共享VIP -->
            <div class="ver_list gx left">
                <p class="header" style="background-color:#E57213;color:#fff; border-top: 0">共享VIP</p>
                <h1 class="how_maney ">999<span>元</span></h1>
                <p class="reduction">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gou-copy2"></use>
                  </svg>
                </p>
                <p class="reduction"><i class="iconfont">&#xe625;</i></p>
                <p class="reduction"><i class="iconfont">&#xe625;</i></p>
                <p>海量</p>
                <p><img src="result[2].icon" alt=""></p>
                <p><i class="iconfont">&#xe625;</i></p>
                <div class="bottom_btn">
                  <router-link :to="{name: 'recharge', query: {id:88}}">
                    <div style="background-color: rgb(229, 114, 19);">
                        立即抢购
                    </div>
                  </router-link>
                </div>
            </div>
            <!-- 原创VIP -->
            <div class="ver_list gx left">
                <p class="header" style="background-color:#56C61B;color:#fff; border-top: 0">原创VIP</p>
                <h1 class="how_maney ">999<span>元</span></h1>
                <p class="reduction"><i class="iconfont">&#xe625;</i></p>
                <p class="reduction">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gou-copy1"></use>
                  </svg>
                </p>
                <p class="reduction"><i class="iconfont">&#xe625;</i></p>
                <p>海量</p>
                <p><img src="result[1].icon" alt=""></p>
                <p>个人作品商用</p>
                <div class="bottom_btn">
                  <router-link :to="{name: 'recharge', query: {id: 33}}">
                    <div style="background-color:#56C61B;">
                        立即抢购
                    </div>
                  </router-link>
                </div>
            </div>
            <!-- 视频VIP -->
            <div class="ver_list gx left">
                <p class="header" style="background-color:#09B6EC;color:#fff; border-top: 0">视频VIP</p>
                <h1 class="how_maney ">999<span>元</span></h1>
                <p class="reduction"><i class="iconfont">&#xe625;</i></p>
                <p class="reduction"><i class="iconfont">&#xe625;</i></p>
                <p class="reduction">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gou-copy3"></use>
                  </svg>
                </p>
                <p>海量</p>
                <p><img src="result[3].icon" alt=""></p>
                <p><i class="iconfont">&#xe625;</i></p>
                <div class="bottom_btn">
                  <router-link :to="{name: 'recharge', query: {id:22}}">
                    <div>
                        立即抢购
                    </div>
                  </router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="describe">
        * 免费下载规则/免费权益可由美工铺子根据实际运营情况进行优化调整，下载速度与用户所用网络亦有关系
    </div>
    <div class="qz_and_qy clearfix">
        <div class="qz_vip left">
            <div class="qz_vip_top left">
                <img style="margin-right: 20px;" src="result[4].icon" alt="">
                <span>全站VIP</span>
            </div>
            <p>共享+原创+视频</p>
            <h1>999<span style="font-size:14px;">元</span> </h1>
            <router-link :to="{name: 'recharge', query: {id: 111}}"><div class="qz_vip_btn">立即抢购</div></router-link>
        </div>
            <div class="qz_vip left">
            <div class="qz_vip_top left">
                <img style="margin-right: 20px;" src="result[5].icon" alt="">
                <span>企业VIP</span>
            </div>
            <p>适用于团队及企业</p>
            <h1>999<span style="font-size:14px;">元</span> </h1>
            <router-link :to="{name: 'recharge', query: {id: 99}}"><div class="qz_vip_btn"> 立即抢购</div></router-link>
        </div>
    </div>
  </div>
</template>
<script>
  import { getMemberInfo } from '@/services';
  export default {
    data() {
      return {
        host: process.env.HOST,
        result: {}
      }
    },
    // async created() {
    //   const { status, result, info } = await getMemberInfo()
    //   if(status != 1) {
    //     return this.$Message(info, 'error');
    //   }
    //   for(let i in result.vip_privilege) {
    //     (result.list || []).forEach(item => {
    //       if(item.privilege_type == i) {
    //         result.vip_privilege[i].money = item.money;
    //       }
    //     })
    //   }
    //   this.result = result.vip_privilege;
    // }
  }
</script>
