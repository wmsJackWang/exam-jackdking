<template>
  <el-container>
    <el-header height="61" class="student-header">
      <div class="head-user">
        <el-dropdown trigger="click" placement="bottom">
          <el-badge :is-dot="messageCount!==0" >
            <el-avatar  class="el-dropdown-avatar" size="medium"  :src="userInfo.imagePath === null ? require('@/assets/avatar.png') : userInfo.imagePath"></el-avatar>
          </el-badge>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push({path:'/user/index'})">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push({path:'/user/message'})">
              <el-badge :value="messageCount" v-if="messageCount!==0">
                <span>消息中心</span>
              </el-badge>
              <span  v-if="messageCount===0">消息中心</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout" divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>
        <a href="/"><img src="@/assets/logo2.png" height="56"/></a>

        <div style="margin-top: -50px; margin-left: 45%">
          <el-radio-group v-model="radio2" size="medium">
            <el-radio-button @click.native.prevent="benchClick('工作台')" label="工作台" ></el-radio-button>
            <el-radio-button @click.native.prevent="benchClick('知识图谱')" label="知识图谱"></el-radio-button>
            <el-radio-button @click.native.prevent="benchClick('考试中心')" label="考试中心"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </el-header>
    <div class="main">
      <div ref = "leftMain" class="left_main" :class="{ left_main_show: !openStatus }">
        <div class="open_close_v2" ref = "leftOpenClose" style="margin-left: 0px;">
          <div style="margin-left: 170px; width: 34px">
            <i @click="change" v-if="open_close" class="el-icon-s-fold"></i>
          </div>
          <!--   display: none;     <Tree />-->
          <!--        <ProgressMenu/>-->

          <el-menu id = "workbench"
            :default-active="defaultUrl"
            :router="true"
            class="el-menu-vertical-demo bg_color"
            style="float: right;width: 300px;text-align: left;">

            <el-menu-item index="/index" >
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/workbenches/shareSpace">
              <i class="el-icon-ice-drink"></i>
              <span slot="title">工作台</span>
            </el-menu-item>
          </el-menu>

          <el-menu id = "knowledge"
            :default-active="knowledgeUrl"
            :router="true"
            class="el-menu-vertical-demo bg_color"
            style="float: right;width: 300px;text-align: left;">

            <el-menu-item index="/index" >
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/knowledge/list">
              <i class="el-icon-school"></i>
              <span slot="title">进步空间</span>
            </el-menu-item>
          </el-menu>
          <el-menu id = "exam"
            :default-active="examUrl"
            :router="true"
            class="el-menu-vertical-demo bg_color"
            style="float: right;width: 300px;text-align: left;">
            <el-menu-item index="/index" >
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/paper/index">
              <i class="el-icon-document"></i>
              <span slot="title">考试中心</span>
            </el-menu-item>
            <el-menu-item index="/record/index">
              <i class="el-icon-document"></i>
              <span slot="title">考试记录</span>
            </el-menu-item>
            <el-menu-item index="/question/index">
              <i class="el-icon-document"></i>
              <span slot="title">错题本</span>
            </el-menu-item>
          </el-menu>

        </div>
      </div>
      <el-divider style="height: auto" direction="vertical"></el-divider>
      <div class="right_main">
        <div class="open_close">
          <i @click="change" v-if="!open_close" class="el-icon-s-unfold"></i>
          <el-main style="height: 100%">
            <router-view/>
          </el-main>
        </div>
      </div>
    </div>

    <div>
        <floating-button>
          <!-- 这里是按钮内容，例如一个图标 -->
          <font-awesome-icon icon="plus" />
          <!-- 弹窗内容 -->
          <div slot="modal">
            <!-- 这里是你的弹窗内容 -->
          </div>
        </floating-button>
      </div>
  </el-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import loginApi from '@/api/login'
import userApi from '@/api/user'
export default {
  name: 'Layout',
  data () {
    return {
      radio2: '工作台',
      openStatus: true,
      open_close: true,
      defaultUrl: '/index',
      knowledgeUrl: '/knowledge/list',
      examUrl: '/paper/index',
      userInfo: {
        imagePath: null
      }
    }
  },
  created () {
    let _this = this
    this.defaultUrl = this.routeSelect(this.$route.path)
    this.getUserMessageInfo()
    userApi.getCurrentUser().then(re => {
      _this.userInfo = re.response
    })
  },
  mounted () {
    // this.$nextTick(() => {
    //   const width = this.$refs.leftMain.clientWidth
    //   console.log('leftMain的宽度是：', width)
    //   this.$refs.leftOpenClose.style.marginLeft = width - 30 + 'px'
    //   console.log('leftOpenClose的宽度是：', this.$refs.leftOpenClose.style.marginLeft)
    // })
    // 监听鼠标点击事件
    document.addEventListener('click', (e) => {
      if (!this.folderShow && !this.fileShow) return // 如果右键菜单不显示，则不处理点击事件
      let target = e.target
      while (target && target.parentNode) {
        if (target.parentNode.class === 'folderContainer') {
          return
        }
        target = target.parentNode
      }
      this.folderShow = false
      this.fileShow = false // 如果点击的是其他区域，则隐藏
      this.clickFolderId = -1
      this.clickFileId = -1
    })

    document.getElementById('workbench').style.display = '' // 显示
    document.getElementById('knowledge').style.display = 'none' // 隐藏
    document.getElementById('exam').style.display = 'none' // 隐藏
    this.$router.push({ path: '/workbenches/shareSpace' })
  },
  watch: {
    $route (to, from) {
      this.defaultUrl = this.routeSelect(to.path)
    }
  },
  methods: {
    benchClick (e) {
      console.log(e)
      e === this.radio2 ? this.radio2 = '' : this.radio2 = e
      if (e === '工作台') {
        document.getElementById('workbench').style.display = '' // 显示
        document.getElementById('knowledge').style.display = 'none' // 隐藏
        document.getElementById('exam').style.display = 'none' // 隐藏
        this.$router.push({ path: '/workbenches/shareSpace' })
      }
      if (e === '知识图谱') {
        document.getElementById('knowledge').style.display = '' // 显示
        document.getElementById('workbench').style.display = 'none' // 隐藏
        document.getElementById('exam').style.display = 'none' // 隐藏
        this.$router.push({ path: '/knowledge/list' })
      }
      if (e === '考试中心') {
        document.getElementById('exam').style.display = '' // 显示
        document.getElementById('knowledge').style.display = 'none' // 隐藏
        document.getElementById('workbench').style.display = 'none' // 隐藏
        this.$router.push({ path: '/paper/index' })
      }
    },
    change () {
      this.openStatus = !this.openStatus
      if (this.openStatus) {
        setTimeout(() => {
          this.open_close = true
          console.log('top:' + this.$refs.panel.style.marginTop)
          this.$refs.panel.style.marginTop = 5 + 'px'
          console.log('top:' + this.$refs.panel.style.marginTop)
        }, 100)
      } else {
        setTimeout(() => {
          this.open_close = false
          console.log('top:' + this.$refs.panel.style.marginTop)
          this.$refs.panel.style.marginTop = -23 + 'px'
          console.log('top:' + this.$refs.panel.style.marginTop)
        }, 100)
      }
    },
    routeSelect (path) {
      let topPath = ['/', '/index', '/paper/index', '/record/index', '/question/index']
      if (topPath.indexOf(path)) {
        return path
      }
      return null
    },
    logout () {
      let _this = this
      loginApi.logout().then(function (result) {
        if (result && result.code === 1) {
          _this.clearLogin()
          _this.$router.push({ path: '/login' })
        }
      })
    },
    ...mapActions('user', ['getUserMessageInfo']),
    ...mapMutations('user', ['clearLogin'])
  },
  computed: {
    ...mapState('user', {
      messageCount: state => state.messageCount
    })
  }
}
</script>

<!--<style lang="less" scoped>-->
<style scoped>
.bg_color {
  background-color: #fbfbfb;
}
.main {
  display: flex;
  width: 100%;
  height: 100vh;
}
.left_main {
  margin: 0;
  width: 200px;
  text-align: center;
  background-color: #fbfbfb;
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
  margin-left: 0px;
  height: 100%;
}
.open_close {
  position: absolute;
  left: 0;
  top: 0;
  color: #bbbbbb;
  font-size: 24px;
  width: 100%;
  height: 100%;
}
.panel {
  margin-left: 30px;
  margin-top: 5px;
  width: 95%
}
.left_main_show {
  width: 0px;
}
</style>

<style lang="scss">
.pageHeader {
  .el-page-header__content {
    font-size: 16px !important;
  }
}
</style>

<style scoped lang="scss">
.drawing_card {
  width: 100%;
  height: 100%;
  float: left;
  margin-top: 15px;
  overflow: auto;
  box-shadow: 0 5px 5px rgb(0 0 0 /10%);
  transition: all 0.9s;
  border-radius: 10px;
}

.folderContainer {
  width: 150px;
  float: left;
  display: block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-left: 30px;
}

.folder {
  width: 110px;
  height: 80px;
  perspective: 600px;
  transform-style: preserve-3d;
  cursor: pointer;
}

.folderWrapper {
  width: 140px;
  height: 130px;
  padding: 20px 20px 10px 20px;
  position: relative;
  transition: all .2s ease;
  border-radius: 6px;
  cursor: pointer;
}

.folderWrapper:hover {
  background-color: aliceblue;
}

.folderName {
  margin-top: 5px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  width: 100px;
}

.add-folder-9 {
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 2px;
  align-items: center;
  width: 130px;
  background-color: rgba(6, 13, 20, .18);
  border-radius: 12px;
  box-shadow: 0px 8px 24px rgba(25, 25, 26, .06), 0px 4px 16px rgba(25, 25, 26, .04), 0px 0px 4px rgba(25, 25, 26, .04);
}

.add-folder-1 {
  overflow: hidden;
  width: 97%;
  height: 96%;
  background-color: #fff;
  border-radius: 10px;
}

.add-folder-2 {
  color: #19191a;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
  // margin-top: 5px;
  // margin-bottom: 5px
}

.add-folder-2:hover {
  background-color: rgba(6, 13, 20, .18);
  // border-radius: 10px;
  cursor: pointer;
}

.add-folder-6 {
  color: #19191a;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 36px;
  // margin-top: 5px;
}

.add-folder-6:hover {
  background-color: red;
  // border-radius: 10px;
  cursor: pointer;
}
</style>
