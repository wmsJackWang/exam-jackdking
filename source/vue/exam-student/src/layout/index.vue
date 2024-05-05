<template>
  <el-container>

    <div class="main">
      <div ref = "leftMain" class="left_main" :class="{ left_main_show: !openStatus }">
        <div class="open_close_v2" ref = "leftOpenClose">
          <div>
            <i @click="change" v-if="open_close" class="el-icon-s-fold"></i>
          </div>
          <!--        <Tree />-->
          <!--        <ProgressMenu/>-->

          <el-menu
            :default-active="defaultUrl"
            :router="true"
            class="el-menu-vertical-demo bg_color"
            style="float: right;width: 300px;text-align: left">

            <el-menu-item index="/file/index">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-time"></i>
              <span slot="title">最近查看</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-collection"></i>
              <span slot="title">我的收藏</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-school"></i>
              <span slot="title">知识中心</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-document"></i>
              <span slot="title">考试中心</span>
            </el-menu-item>
            <el-submenu index="6" class="bg_color">
              <template slot="title" class="bg_color">
                <i class="el-icon-time"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group class="bg_color">
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2" class="bg_color">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4" class="bg_color">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>

        </div>
      </div>
      <el-divider direction="vertical" class="el-divider--vertical"></el-divider>
      <div class="right_main">
        <div class="open_close">
          <i @click="change" v-if="!open_close" class="el-icon-s-unfold"></i>
          <el-main>
            <router-view/>
          </el-main>
        </div>
      </div>
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
      defaultUrl: '/index',
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
    this.$nextTick(() => {
      const width = this.$refs.leftMain.clientWidth
      console.log('leftMain的宽度是：', width)
      this.$refs.leftOpenClose.style.marginLeft = width - 30 + 'px'
      console.log('leftOpenClose的宽度是：', this.$refs.leftOpenClose.style.marginLeft)
    })
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
  },
  watch: {
    $route (to, from) {
      this.defaultUrl = this.routeSelect(to.path)
    }
  },
  methods: {
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

<style lang="scss" scoped>

</style>
