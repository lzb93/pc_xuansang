<style lang="scss" rel="stylesheet/scss" src="./design.scss"></style>
<template>
    <div class="design_wrap">
      <div v-if="!loading">
        <div v-for="(item, index) in name" :key="index">
            <h2 :class="{'no_padding_top': index == 2}">{{item}}</h2>
            <div class="item_box flex_between">
                <div class="item_design" v-for="(secondItem, activeIndex) in list[index]" :key="activeIndex">
                    <img style="display: block; height: 110px;" :src="secondItem._image" alt="">
                    <p class="tx_ov2" >{{secondItem.introduce}}</p>
                    <a :href="secondItem.download_url" target="_blank">
                      <el-button class="btn_design" type="primary" round>立即下载</el-button>
                    </a>
                  </div>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
    import { designTool } from '@/services';
    export default {
        data(){
            return {
                host: process.env.HOST,
                name:{},
                list:[]
            }
        },
        async created(){
            const {status,result,info} = await  designTool()
            this.loading = false
            if(status != 1){
                return this.$Message(info,'error');
            }
            this.name  = result.name;
            for(let i in result.list) {
              (result.list[i]).forEach(item => {
                let arr = item.image.split('!');
                item._image = arr[0];
              });
            }
            this.list = result.list;
        },
        methods:{

        }
    }
</script>
