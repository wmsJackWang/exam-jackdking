<script setup lang="ts">
import Empty from '@/components/empty.vue'
import { queryResumeFileList, useCategory, useNotification } from './hook'
import useUserStore from '@/store/modules/user'
import MyResumeCard from '@/views/resume/components/myResumeCard.vue'

const { resumeFileList } = queryResumeFileList()
const { flag, close } = useNotification()
const { loginModelToggle, userInfo, loginState } = useUserStore()
console.log('resumeFileList:' + JSON.stringify(resumeFileList))
const loginNow = () => {
  loginModelToggle()
}
</script>

<template>
  <div class="resume-container flex">
    <div class="resume-left-container content-card" style="width: 25%">
      <div class="resume-hot-rank content-cardy mb-20">
        <strong class="mb-20">扫码关注公众号</strong>
      </div>
      <img src="../../assets/img/login.jpg" style="max-width: 100%; height: auto" />
      <p style="color: orangered; font-weight: bold">关注公众号可以再多创建一份简历</p>
      <p class="line-1">
        1. ✨ 无需制作烦琐的Excel表格 <br />2. 😎 投递状态手机随查随改 <br />3. 🎈
        不怕忘记投了哪些公司 <br />4.🔒 隐私保护保证信息不泄漏
      </p>
    </div>
    <div class="resume-right-container width:1000px" style="width: 75%" data-aos="fade-left">
      <div class="resume-hot-rank content-card mb-20">
        <strong class="mb-20">我的简历</strong>
        <br />
        <template v-if="loginState.logined">
          <template v-if="resumeFileList">
            <div
              class="resume-card-container"
              style="display: grid; grid-template-columns: auto auto auto; gap: 5px"
            >
              <my-resume-card v-for="theme in resumeFileList" :key="theme.id" :theme="theme" />
            </div>
          </template>
          <template v-else>
            <Empty title="这里空空如也，您还没有创建过简历～" />
            <div style="width: 100%; text-align: center">
              <!--            <button @click="$router.push('/template')" class="main-color-picker" sty>登录</button>-->
              <button
                class="exporter local-export btn"
                @click="$router.push('/template')"
                style="text-align: center; background: #ff7449; color: white"
              >
                去创建
              </button>
            </div>
          </template>
          <br />
          <br />
          <hint>提示：您可以创建 无限份简历，如果您在编写简历过程中遇到任何使用上的问题</hint>
          <br />
          <br />
          <div style="width: 100%; text-align: center">
            <!--            <button @click="$router.push('/template')" class="main-color-picker" sty>登录</button>-->
            <button
              class="exporter local-export btn"
              @click="$router.push('/template')"
              style="text-align: center; background: #ff7449; color: white; width: 100%"
            >
              ✍🏻 去创建新模板
            </button>
          </div>
        </template>
        <template v-else>
          <Empty title="您还没有登录请先登录再查看" />
          <div style="width: 100%; text-align: center">
            <button
              class="exporter local-export btn"
              @click="loginNow()"
              style="text-align: center"
            >
              去登录
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
  <!--  <ToastModal :flag="flag" @close="close">-->
  <!--    <h3 style="margin-bottom: 10px">通知</h3>-->
  <!--    <p style="line-height: 27px">-->
  <!--      近期反应同学较多，发个通知告知一下，此网址为备用网址，若需体验更多功能请前往主站<a-->
  <!--        target="_blank"-->
  <!--        href="https://codecv.top"-->
  <!--        style="color: var(&#45;&#45;theme); text-decoration: none"-->
  <!--      >-->
  <!--        https://codecv.top</a-->
  <!--      >-->
  <!--    </p>-->
  <!--    <ol class="" style="margin: 10px 0; padding-left: 20px; line-height: 28px">-->
  <!--      <li>🌈 主站导出文件更稳定</li>-->
  <!--      <li>✍🏻 编写体验更好</li>-->
  <!--      <li>✨ 工具更加完善</li>-->
  <!--      <li>☁️ 数据云端实时保存</li>-->
  <!--    </ol>-->
  <!--    <p>若不需要请直接忽略，谢谢配合!</p>-->
  <!--    <br />-->
  <!--    <div class="flex group">-->
  <!--    <img src="@/assets/img/wechat_group.png" style="width: 30%" />-->
  <!--    <h4>加入群聊获取最新情报，兄弟萌速速来水群 ✌🏻</h4>-->
  <!--  </div>-->
  <!--  <p style="text-align: center; margin-top: 20px">-->
  <!--    <button class="primary btn" @click="close">知道了</button>-->
  <!--  </p>-->
  <!--  </ToastModal>-->
</template>

<style lang="scss" scoped>
.resume-container {
  max-width: var(--max-width);
  margin: 20px auto;

  .resume-notification {
    padding-bottom: 140px;
    position: sticky;
    top: 80px;
    font-size: 15px;
    line-height: 28px;
    strong {
      display: inline-block;
      margin-bottom: 10px;
      padding-bottom: 5px;
      color: var(--theme);
    }
    a {
      color: #5e75eb;
    }
  }

  .resume-hot-rank {
    strong {
      display: inline-block;
      color: var(--theme);
    }
    li {
      font-size: 14px;
      line-height: 30px;
      p {
        max-width: 135px;
      }
      sub {
        font-weight: 500;
        white-space: nowrap;
        color: orangered;
        text-align: right;
        flex-grow: 1;
      }
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        p span {
          color: orangered;
        }
      }
    }
  }

  .resume-left-container {
    margin-right: 20px;
    .resume-card-container {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }
  }
}
.group {
  align-items: center;
  gap: 40px;
}
@media screen and (max-width: 800px) {
  .resume-right-container {
    display: none;
  }
  .resume-left-container {
    margin-left: 20px;
  }
}
</style>
