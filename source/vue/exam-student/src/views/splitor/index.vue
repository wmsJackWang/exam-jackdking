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
        <div style="width: 100%">
          <div ref = "panel" class="panel">
            <el-page-header class="pageHeader" :content="'当前所处：' + currentLocationName" @back="goBack">
            </el-page-header>
            <el-divider></el-divider>
            <el-row :gutter="10" class="mb8">
              <el-col :span="1.5" style="float: right;">
                <el-button plain icon="el-icon-refresh" size="mini" @click="refreshGetList">刷新</el-button>
              </el-col>
              <el-col :span="1.5" style="float: right;">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="addFolder">新建文件夹</el-button>
              </el-col>
              <el-col :span="1.5" style="float: right;">
                <el-button type="success" plain icon="el-icon-upload" size="mini" @click="addFile">上传文件</el-button>
              </el-col>
            </el-row>

            <!-- 文件浏览区 -->
            <div style="overflow: hidden;">
              <el-card class="drawing_card" v-loading="cardLoading" style="height: 60vh">
                <template v-if="folderList.length === 0 && filesList.length === 0">
                  <el-empty description="暂无文件，请创建一个文件夹吧" style="height:60vh"></el-empty>
                </template>
                <!-- 文件夹 -->
                <div v-for="( item, index ) in  folderList ">
                  <div class="folderContainer">
                    <div class="folderWrapper" @dblclick="doubleClickFolder(index, item)"
                         @contextmenu.prevent.stop="rightClickFolder(index, item, $event)">
                      <img src="@/assets/folder/folder.png" style="width: 100px;height: 90px;margin-top: -13px"
                           @contextmenu.prevent.stop="rightClickFolder(index, item, $event)" />
                      <div class="folderName">
                  <span>{{
                      item.folderName.length > 10 ? item.folderName.substring(0, 6) + '...' : item.folderName
                    }}</span>
                      </div>

                    </div>

                  </div>
                </div>
                <!-- 文件 -->
                <div v-for="( item, index ) in  filesList ">
                  <div class="folderContainer">
                    <div class="folderWrapper" @dblclick="down(item.fileUrl)">
                      <img src="@/assets/folder/fileImg.png" style="width: 100px;height: 90px;margin-top: -13px"
                           @contextmenu.prevent.stop="rightClickfile(index, item, $event)" />
                      <div class="folderName">
                  <span>{{
                      item.fileName.length > 10 ? item.fileName.substring(0, 6) + '...' : item.fileName
                    }}</span>
                      </div>

                    </div>
                  </div>
                </div>
              </el-card>
            </div>

            <!-- 文件夹【右键菜单】 -->
            <div class="add-folder-9" :style="folderStyle" v-show="folderShow">
              <div class="add-folder-1">
                <div class="add-folder-2" @click="openFolder">
                  打开文件夹
                </div>
                <div style="border: 2px solid rgba(18,17,42,.07)"></div>
                <div class="add-folder-2" @click="moveFolder">
                  移动
                </div>
                <div style="border: 2px solid rgba(18,17,42,.07)"></div>
                <div class="add-folder-2" @click="updateFloder">
                  重命名
                </div>
                <div style="border: 2px solid rgba(18,17,42,.07)"></div>
                <div class="add-folder-6" @click="deleteFolder">
                  删 除
                </div>
              </div>
            </div>
            <!-- 文件【右键菜单】 -->
            <div class="add-folder-9" :style="fileStyle" v-show="fileShow">
              <div class="add-folder-1">

                <div class="add-folder-2">
                  <a :href="clickFilePath" download="1">下载文件</a>

                </div>
                <div style="border: 2px solid rgba(18,17,42,.07)"></div>
                <!-- <div class="add-folder-2" @click="updateFloder">
                  重命名
                </div>
                 <div style="border: 2px solid rgba(18,17,42,.07)"></div> -->
                <div class="add-folder-2" @click="moveFolder">
                  移动
                </div>
                <div style="border: 2px solid rgba(18,17,42,.07)"></div>
                <div class="add-folder-6" @click="deleteFileFun">
                  删 除
                </div>
              </div>
            </div>
            <!-- 上传文件 弹窗 -->
            <addFolder ref="addFolder1" :currentLocationId="currentLocationId" />
            <moveFolder ref="moveFolder1" :moveData="moveData"></moveFolder>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import addFolder from '@/components/AddFolder'
import moveFolder from '@/components/MoveFolder'
import { qeryFolderList, createPublicFolder, renameFolder, deleteFolder, deleteFile } from '@/api/folder'

export default {
  name: 'Home',
  components: { addFolder, moveFolder },
  data () {
    return {
      openStatus: true,
      open_close: true,

      isCollapse: true,
      historyFolderId: 0, // 历史文件夹id，用于【返回上一级】
      historyFolderName: '', // 历史文件夹name，用于【返回上一级】

      currentLocationId: 0, // 当前所处位置（文件夹）id，0为根目录
      currentLocationName: '共享空间', // 当前所处位置（文件夹）名

      // 移动文件（夹）时需要的参数
      moveData: {
        typeofFolder: 0, // 所选对象的类型（1：文件夹；2：文件）
        clickFolderId: -1// 被右键的文件夹id
      },

      cardLoading: false,
      folderList: [], // 文件夹列表
      filesList: [], // 文件列表
      // 文件夹 右键菜单栏
      folderStyle: {
        left: '0px',
        top: '0px'
      },
      folderShow: false,
      clickFolderId: -1, // 被右键的文件夹id
      clickFolderName: '', // 被右键的文件夹名
      // 文件 右键菜单栏
      fileStyle: {
        left: '0px',
        top: '0px'
      },
      fileShow: false,
      clickFileId: -1, // 被右键的文件id
      clickFileName: '', // 被右键的文件名
      clickFilePath: '', // 被右键的文件路径-已加上下载的路径网站前端

      queryParams: { // 查询参数
        folderId: 0 // 目标文件（夹）id，值为0则查询根目录文件（夹）
      }
    }
  },
  methods: {
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

    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    a () {
      window.open(`这里填服务器储存文件的地址啦~` + this.clickFileName)
    },

    // 返回上一级
    goBack () {
      if (this.currentLocationId === 0) {
        this.$message({
          message: '已经不能再往后退啦！',
          type: 'warning'
        })
      } else {
        this.queryParams.folderId = this.historyFolderId
        this.currentLocationId = this.historyFolderId
        this.currentLocationName = this.historyFolderName == null ? '文件管理空间' : this.historyFolderName
        this.historyFolderId = this.currentLocationId
        this.historyFolderName = this.currentLocationName
        this.getList()
      }
    },
    // 获取列表数据
    getList () {
      this.loading = true
      qeryFolderList(this.queryParams).then(response => {
        console.log(response)
        this.folderList = response.data.folders
        this.filesList = response.data.sysFiles

        this.historyFolderId = response.data.sysFolder == null ? 0 : response.data.sysFolder.parentId
        this.historyFolderName = response.data.sysFolder == null ? '文件管理空间' : response.data.sysFolder.parentName
      })
    },
    // 刷新当前列表
    refreshGetList () {
      this.queryParams.folderId = this.currentLocationId
      this.getList()
      this.$message({
        message: '已经成功获取最新数据啦！',
        type: 'success'
      })
      this.initClickId()
    },

    // 上传文件
    addFile () {
      this.$refs.addFolder1.open()
    },

    // 创建文件夹
    addFolder () {
      this.$prompt('请输入新文件夹名称', '创建文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        let sysFolder = {
          folderName: value,
          parentId: this.currentLocationId
        }
        createPublicFolder(sysFolder).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '创建成功 '
            })
            const that = this
            setTimeout(function () {
              that.refreshGetList() // 刷新当前页面
            }, 500)
          } else {
            this.$message({
              type: 'error',
              message: '创建失败 '
            })
          }
        })
      }).catch(() => {
      })
    },
    // 重命名文件夹
    updateFloder () {
      this.folderShow = false
      this.$prompt('请输入文件夹的新名称', '重命名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.clickFolderName,
        inputErrorMessage: '输入不能为空',
        inputValidator: (value) => { // 点击按钮时，对文本框里面的值进行验证
          if (!value) {
            return '输入不能为空'
          }
        }
      }).then(({ value }) => {
        let sysFolder = {
          folderName: value,
          folderId: this.clickFolderId // 默认为0
        }
        renameFolder(sysFolder).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功 '
            })
            let that = this
            setTimeout(function () {
              that.refreshGetList() // 刷新当前页面
            }, 500)
          } else {
            this.$message({
              type: 'error',
              message: '修改失败 '
            })
          }
        })
      })
    },
    // 删除文件夹
    deleteFolder () {
      this.folderShow = false
      this.$confirm('此操作将永久删除该文件夹，包括文件夹内的所有内容，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFolder(this.clickFolderId).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功 '
            })
            let that = this
            setTimeout(function () {
              that.refreshGetList() // 刷新当前页面
            }, 1000)
          } else {
            this.$message({
              type: 'error',
              message: '删除失败！ '
            })
          }
        })
      })
    },
    // 打开文件夹
    openFolder () {
      this.folderShow = false
      this.queryParams.folderId = this.clickFolderId

      this.currentLocationId = this.clickFolderId
      this.currentLocationName = this.clickFolderName
      this.getList()
    },
    // 鼠标双击文件夹
    doubleClickFolder (index, item) {
      this.clickFolderId = item.folderId
      this.clickFolderName = item.folderName
      this.openFolder()
    },

    // 文件夹右键
    rightClickFolder (index, item, e) {
      this.initClickId()

      this.clickFolderId = item.folderId
      this.clickFolderName = item.folderName
      this.folderStyle.left = e.pageX - 140 + 'px'
      this.folderStyle.top = e.pageY - 70 + 'px'
      this.folderShow = true

      this.moveData.typeofFolder = 1
    },
    // 文件 右键
    rightClickfile (index, item, e) {
      this.initClickId()

      this.clickFileId = item.fileId
      this.clickFileName = item.fileName
      this.clickFilePath = 'https://huang-pu.oss-cn-guangzhou.aliyuncs.com/' + item.filePath
      this.fileStyle.left = e.pageX - 140 + 'px'
      this.fileStyle.top = e.pageY - 70 + 'px'
      this.fileShow = true

      this.moveData.typeofFolder = 2
    },
    // 删除文件
    deleteFileFun () {
      this.fileShow = false
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFile(this.clickFileId).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功 '
            })
            let that = this
            setTimeout(function () {
              that.refreshGetList() // 刷新当前页面
            }, 1000)
          } else {
            this.$message({
              type: 'error',
              message: '删除失败！ '
            })
          }
        })
      })
    },

    // 移动文件(夹)
    moveFolder () {
      this.fileShow = false

      // 通过判断文件/文件夹被右键选择而进行参数存储
      if (this.clickFolderId !== -1) {
        this.moveData.clickFolderId = this.clickFolderId
      } else {
        this.moveData.clickFolderId = this.clickFileId
      }

      this.$refs.moveFolder1.open()
    },

    // 初始化右键选择相关参数
    initClickId () {
      this.clickFileId = -1
      this.clickFolderId = -1
      this.fileShow = false
      this.folderShow = false
    }
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

  created () {
    this.getList()
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
  width: 100%;
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
