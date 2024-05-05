<script setup lang="ts">
import { type TemplateType } from '@/templates/config'
import { useRouter } from 'vue-router'
import Empty from '@/components/empty.vue'
import { deleteResumeInfo } from '@/api/modules/resume'
import { refresh } from '@/api/config'
import { successMessage } from '@/common/message'

defineProps<{ theme: TemplateType }>()
const router = useRouter()

const edit = (type: string, id: number) => {
  router.push({ path: '/editor', query: { type, id } })
}
const deleteResume = (type: string, id: number) => {
  deleteResumeInfo({ id: id }).then((res: any) => {
    if (res.code === 200) {
      refresh()
      successMessage('删除成功!')
    }
  })
}
</script>

<template>
  <div class="resume-card" data-aos="zoom-in" style="height: 80%">
    <div @click="edit(theme.type, theme.id)">
      <img :src="theme.img" loading="lazy" />
      {{ theme.name }}
    </div>
    <!--    <div class="resume-card-mask">-->
    <!--      <button class="btn center pointer">编辑</button>-->
    <!--    </div>-->
    <div style="text-align: right">
      <p>简历名称：{{ theme.name }}</p>
      <div style="text-align: left">
        <!--            <button @click="$router.push('/template')" class="main-color-picker" sty>登录</button>-->
        <button
          class="exporter local-export btn"
          @click="edit(theme.type, theme.id)"
          style="text-align: center; background: #ff7449; color: white"
        >
          编辑
        </button>
        <button
          class="exporter local-export btn"
          @click="deleteResume(theme.type, theme.id)"
          style="margin-left: 10px; text-align: center; background: #ff7449; color: white"
        >
          删除
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resume-card {
  margin: 5px 20px 80px 0;
  width: 185px;
  height: 240px;
  position: relative;
  text-align: center;
  transition: transform 0.4s;
  color: var(--font-color);
  cursor: pointer;

  .template-hot {
    height: 25px;
    background: var(--background);
    font-size: 12px;
    top: -25px;
    position: absolute;
    text-align: left;
    i {
      color: orangered;
    }
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .resume-card-mask {
    border-radius: 5px;
    position: absolute;
    height: calc(100% + 25px);
    width: 100%;
    top: 0;
    left: 0;
    display: none;
    background: rgba(0, 0, 0, 0.5);

    button {
      border-radius: 3px;
      color: white;
      background: var(--theme);
    }
  }

  &:hover {
    transform: translateY(10px);
    .resume-card-mask {
      display: block;
    }
  }
}
</style>
