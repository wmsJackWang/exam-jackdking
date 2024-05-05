//addFolder.vue
<template>
  <el-dialog v-if="dialogVisible" :modal-append-to-body="false" :close-on-click-modal="false" title="上传文件"
             :visible.sync="dialogVisible" :show-close="false" width="400px">
    <el-upload ref="upload" :data="dataObj" action="这里填写文件上传到的服务器地址" class="upload-demo"
               drag :limit="1" :on-success="uploadSuccess" :on-error="uploadError" :on-exceed="handleExceed"
               :before-upload="beforeUpload" :auto-upload="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传,当前目录只允许上传1个文件</em></div>
    </el-upload>
    <div style="margin-top: 20px">
      <el-button icon="el-icon-upload2" type="success" @click="submit">提交</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>

import { policy, addFile } from '@/api/folder'
export default {
  name: 'addFolder',
  props: ['currentLocationId'], // 当前所处文件夹id
  data () {
    return {

      // oss资源
      dataObj: {},

      dialogVisible: false,

      // 文件信息 - 存于后端数据库
      fileInfo: {
        fileName: '',
        filePath: '',
        fileSize: 0, // 单位为kb
        folderId: 0
      }
    }
  },
  methods: {
    getUUID () {
      var len = 32// 32长度
      var radix = 16// 16进制
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
      var uuid = []; var i
      radix = radix || chars.length
      if (len) {
        for (i = 0; i < len; i++)uuid[i] = chars[0 | Math.random() * radix]
      } else {
        var r
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16
            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
          }
        }
      }
      return uuid.join('')
    },
    open () {
      this.dialogVisible = true
    },
    close () {
      this.dialogVisible = false
      this.$parent.refreshGetList()
    },
    // 文件改变调用
    handleExceed () {
      this.$message.error('当前目录只能上传一个文件!')
    },
    // 上传成功
    uploadSuccess (res) {
      this.dialogVisible = false
      this.$parent.refreshGetList()
    },
    // 上传失败
    uploadError () {
      this.$message.error('服务器异常请重试!')
    },
    // 上传文件
    submit () {
      this.$refs.upload.submit()
    },
    // 资源上传前
    beforeUpload (files) {
      return new Promise((resolve, reject) => {
        policy().then(response => {
          // 数据处理因为业务需求写入的，不必要。
          // 存储服务器数据处理
          this.dataObj.policy = response.data.policy
          this.dataObj.signature = response.data.signature
          this.dataObj.ossaccessKeyId = response.data.accessid
          this.dataObj.dir = response.data.dir
          this.dataObj.host = response.data.host
          this.dataObj.key = response.data.dir + this.getUUID() + files.name
          console.log(this.dataObj)
          // 后端数据库数据处理
          this.fileInfo.fileName = files.name
          this.fileInfo.filePath = this.dataObj.key
          this.fileInfo.fileSize = parseInt(files.size / 2024)// file.size的单位为字节，转换成kb
          console.log(this.fileInfo)
          resolve(true)

          this.fileInfo.folderId = this.currentLocationId// 确定该文件所处的文件夹id

          // 上传到后端数据库
          addFile(this.fileInfo).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '上传成功 '
              })
            } else {
              this.$message({
                type: 'error',
                message: '上传失败 '
              })
            }
          })
        })
      })
    }
  }
}
</script>
<style scoped lang="scss"></style>
