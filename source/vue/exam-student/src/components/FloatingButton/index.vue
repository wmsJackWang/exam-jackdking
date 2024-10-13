<template>
  <div>
    <el-tooltip class="item" effect="dark" content="任务看板" placement="top-start">
      <el-button placement="bottom" @click="showModal = true" class="floating-button" type="info" icon="el-icon-s-cooperation" circle />
    </el-tooltip>

    <div v-if="showModal" class="modal-overlay" >
      <div class="modal-content">
        <!-- 弹窗内容 -->
        <kanBan>
        </kanBan>
        <slot name="modal"></slot>
        <el-button type="info" @click="showModal = false" round>关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import kanBan from '@/components/KanBan'

export default {
  components: { kanBan },
  data () {
    return {
      showModal: false
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
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
