<template>
  <div>
    <el-tooltip class="item" effect="dark" content="任务看板" placement="top-start">
      <el-button placement="bottom" @click="createMyTaskDialogFormVisible = true" class="floating-button" type="info" icon="el-icon-s-cooperation" circle />
    </el-tooltip>

<!--    <div v-if="showModal" class="modal-overlay">-->
<!--      <div class="modal-content">-->
<!--        &lt;!&ndash; 弹窗内容 &ndash;&gt;-->
<!--        <label style="padding: 10px; font-size: x-large">我的任务看板</label>-->
<!--        <vueDraggableBoard style="width: 100%; height: 80%;"/>-->
<!--        <el-button type="info" @click="showModal = false" style="position: relative; bottom: auto" round>关闭</el-button>-->
<!--      </div>-->
<!--    </div>-->

    <el-dialog width="80%" height="80%"  title="我的任务看板" :visible.sync="createMyTaskDialogFormVisible">
      <!-- 弹窗内容 -->
        <vueDraggableBoard style="width: 100%; height: 80%;"/>
        <div slot="footer" class="dialog-footer">
          <el-button type="info" @click="createMyTaskDialogFormVisible = false" style="position: relative; bottom: auto" round>关闭</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>

// import kanBan from '@/components/KanBan'
import vueDraggableBoard from '@/components/VueDraggableBoard'

export default {
  components: { vueDraggableBoard },
  data () {
    return {
      createMyTaskDialogFormVisible: false,
      showModal: false,
      createTaskForm: {

      }
    }
  }
}
</script>
<style scoped>
.floating-button {
  position: fixed;
  bottom: 8%;
  left: 40px;
  z-index: 100; /* 确保按钮在其他内容之上 */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100; /* 比浮动按钮更高，以确保在顶层显示 */
}

.modal-content {
  height: 80%;
  width: 80%;
  background-color: white;
  padding: 0px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
}
.el-dialog {
   width: 80%; /* 你想要设置的宽度 */
 }
</style>
