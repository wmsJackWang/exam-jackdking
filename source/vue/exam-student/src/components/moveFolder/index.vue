//moveFolder.vue
<template>
  <el-dialog v-if="dialogVisible" :modal-append-to-body="false" :close-on-click-modal="false" title="移动"
             :visible.sync="dialogVisible" :show-close="false" width="400px" class="moveFolderDialog">
    <el-alert title="请选择要将当前文件（夹）移动到：" type="info" show-icon>
    </el-alert>
    <el-tree accordion :data="data" node-key="id" ref="tree" highlight-current @node-click="handleNodeClick">
    </el-tree>
    <div style="margin-top: 20px">
      <el-button type="success" @click="submit">确定</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getTreeDirectory, moveFolder, moveFile } from '@/api/folder'
export default {
  name: 'moveFolder',
  props: ['moveData'],
  // moveDate对象中有两个参数： typeofFolder: 0,//所选对象的类型（1：文件夹；2：文件）
  //                          clickFolderId: -1,//所选对象的id
  data () {
    return {
      dialogVisible: false,
      data: [], // 树型目录
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      clickDirectoryId: -1// 所选择的移动目标文件夹id

    }
  },
  methods: {
    open () {
      this.dialogVisible = true
      getTreeDirectory().then(res => {
        console.log(res)
        this.data = res.data
      })
    },
    close () {
      this.dialogVisible = false
    },
    submit () {
      if (this.moveData.typeofFolder === 1 && this.moveData.clickFolderId === this.clickDirectoryId) {
        this.$message({
          type: 'error',
          message: '移动失败！请勿把文件夹移动到它本身中！ '
        })
      } else {
        if (this.moveData.typeofFolder === 1) {
          this.moveFolderFun()
        } else if (this.moveData.typeofFolder === 2) {
          this.moveFileFun()
        }
      }
    },
    // 移动 文件夹
    moveFolderFun () {
      let dataObj = {
        folderId: this.moveData.clickFolderId,
        parentId: this.clickDirectoryId
      }
      moveFolder(dataObj).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功 '
          })
          let that = this
          this.dialogVisible = false
          setTimeout(function () {
            that.$parent.refreshGetList() // 刷新当前页面
          }, 500)
        } else {
          this.$message({
            type: 'error',
            message: '修改失败 '
          })
        }
      })
    },
    // 移动 文件
    moveFileFun () {
      let dataObj = {
        fileId: this.moveData.clickFolderId,
        folderId: this.clickDirectoryId
      }
      moveFile(dataObj).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功 '
          })
          let that = this
          this.dialogVisible = false
          setTimeout(function () {
            that.$parent.refreshGetList() // 刷新当前页面
          }, 500)
        } else {
          this.$message({
            type: 'error',
            message: '修改失败 '
          })
        }
      })
    },

    // 树型目录被选择时
    handleNodeClick (DirectoryId) {
      this.clickDirectoryId = DirectoryId.id
    }
  }

}
</script>
<style lang="scss">
.moveFolderDialog {
  .el-dialog__body {
    padding-top: 0 !important;
  }

  .el-alert {
    margin-bottom: 20px;
  }
}
</style>
