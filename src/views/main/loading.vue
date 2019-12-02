<template>
  <div :style="{height: loadingHeight + 'px', 'padding-top': this.noneTop ? paddingTop + 'px' : ''}">
    <img style="display: block; width: 80px; margin: 0 auto" src="../../assets/images/loading.gif" alt="">
  </div>
</template>
<script>
  export default {
    props: ['noneTop'],
    data() {
      return {
        windowHeight: document.documentElement.clientHeight,
        loadingHeight: 420,
        paddingTop: 30,
        top: 0
      }
    },
    created() {
      if(this.noneTop) {
        this.top = 329
      } else {
        this.top = 385
      }
      this.loadingHeight = this.windowHeight - this.top > 420 ? this.windowHeight - this.top : 420;
      this.$emit('getLoadingHeight', this.loadingHeight)
    }
  }
</script>
