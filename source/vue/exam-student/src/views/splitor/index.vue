<template>
  <div class="main">
    <div ref = "leftMain" class="left_main" :class="{ left_main_show: !openStatus }">
      <div class="open_close_v2" ref = "leftOpenClose">
        <i @click="change" v-if="open_close" class="el-icon-s-fold"></i>
      </div>
    </div>
    <div class="right_main">
      <div class="open_close">
        <i @click="change" v-if="!open_close" class="el-icon-s-unfold"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      openStatus: true,
      open_close: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      const width = this.$refs.leftMain.clientWidth
      console.log('leftMain的宽度是：', width)
      this.$refs.leftOpenClose.style.marginLeft = width - 30 + 'px'
      console.log('leftOpenClose的宽度是：', this.$refs.leftOpenClose.style.marginLeft)
    })
  },
  methods: {
    change () {
      this.openStatus = !this.openStatus
      if (this.openStatus) {
        setTimeout(() => {
          this.open_close = true
        }, 100)
      } else {
        setTimeout(() => {
          this.open_close = false
        }, 100)
      }
    }
  }
}
</script>
<!--<style lang="less" scoped>-->
<style scoped>
  .main {
    display: flex;
    width: 100%;
    height: 100vh;
  }
  .left_main {
    margin: 0;
    width: 300px;
    text-align: center;
    background-color: whitesmoke;
    transition: width 1s;
  }
  .right_main {
    flex: 1;
    background-color: white;
    position: relative;
  }
  .open_close_v2 {
    position: absolute;
    left: 0;
    color: #bbbbbb;
    font-size: 24px;
  }
  .open_close {
    position: absolute;
    left: 0;
    top: 0;
    color: #bbbbbb;
    font-size: 24px;
  }
  .left_main_show {
    width: 0px;
  }
</style>
