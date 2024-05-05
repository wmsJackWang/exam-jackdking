import { defineStore } from 'pinia'
import { nextTick } from 'vue'

import pinia from '@/store'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/common/localstorage'
import { showMessageVN } from '@/common/message'
import { initTemplate, setCv, templates, TemplateType } from '@/templates/config'
import { ensureEmptyPreWhiteSpace } from '@/views/editor/components/tabbar/hook'
import { queryAllTemplate, queryResumeInfo } from '@/api/modules/resume'
import { onMounted, Ref, ref } from 'vue'
import { CURRENT_RESUME, USERNAME } from '@/store/modules/user'

const MARKDOWN_CONTENT = 'markdown-content'
const WRITABLE = 'writable'

initTemplate()
export const getCurrentTypeContent = (type: string): string => {
  console.log('templates length:' + templates.value.length)
  for (const template of templates.value) {
    if (type === template.type) {
      return template.content
    }
  }
  return ''
}
export const getCurrentTypeResumeInfo = (type: string): TemplateType | null => {
  for (const template of templates.value) {
    if (type === template.type) {
      return template
    }
  }
  return null
}

export function getResumeInfo(type: string, id: number) {
  const resumeInfo: Ref<any> = ref()
  console.log('type,id' + type + id)
  return queryResumeInfo({ id: id })
}

const useEditorStore = defineStore('editorStore', {
  state: () => ({
    title: '',
    MDContent: '',
    nativeContent: '',
    writable: Boolean(getLocalStorage(WRITABLE)) || false,
    templateName: '',
    resumeType: '',
    id: null,
    name: ''
  }),
  actions: {
    // 初始化编辑器内容（默认为Markdown模式）
    initMDContent(resumeType: string, resumeId: number) {
      console.log('resumeId:' + resumeId)
      console.log('resumeType:' + resumeType)
      queryAllTemplate().then((res: any) => {
        console.log(JSON.stringify(res))
        let moduleEntries
        if (res.code == 200) {
          moduleEntries = JSON.parse(res.data)
          console.log('moduleEntries.length:' + moduleEntries.length)
          console.log('moduleEntries:' + JSON.stringify(moduleEntries))
          for (const [path, curModule] of moduleEntries) {
            setCv(path, curModule)
          }
        }

        //初始化玩数据后，展示模板
        if (resumeId == 0) {
          const cacheKey = MARKDOWN_CONTENT + '-' + resumeType
          console.log('cacheKey:' + cacheKey)
          this.MDContent = getLocalStorage(cacheKey)
            ? (getLocalStorage(cacheKey) as string)
            : getCurrentTypeContent(resumeType)

          console.log('getCurrentTypeContent(resumeType):' + getCurrentTypeContent(resumeType))
          console.log('getLocalStorage(cacheKey):' + getLocalStorage(cacheKey))
          console.log('MDContent:' + this.MDContent)

          this.templateName = getCurrentTypeResumeInfo(resumeType)?.name as string
          this.resumeType = resumeType
          console.log('templateName:' + this.templateName)
        } else {
          console.log('resumeId:' + resumeId)
          console.log('resumeType:' + resumeType)
          this.templateName = getCurrentTypeResumeInfo(resumeType)?.name as string
          this.resumeType = resumeType
          getResumeInfo(resumeType, resumeId).then((res: any) => {
            if (res.code === 200) {
              console.log('queryResumeInfo:' + JSON.stringify(res.data))
              setLocalStorage(CURRENT_RESUME, res.data)
              this.MDContent = res.data.content
              this.id = res.data.id
              this.name = res.data.name
            }
          })
          // const currentResume = getLocalStorage(CURRENT_RESUME)
          // console.log('currentResume:' + JSON.stringify(currentResume))
          // this.MDContent = currentResume.content
        }
      })
    },
    initMDContentByMyResumeId(resumeType: string) {
      const cacheKey = MARKDOWN_CONTENT + '-' + resumeType
      console.log('cacheKey:' + cacheKey)
      this.MDContent = getLocalStorage(cacheKey)
        ? (getLocalStorage(cacheKey) as string)
        : getCurrentTypeContent(resumeType)

      console.log('getCurrentTypeContent(resumeType):' + getCurrentTypeContent(resumeType))
      console.log('getLocalStorage(cacheKey):' + getLocalStorage(cacheKey))
      console.log('MDContent:' + this.MDContent)

      this.templateName = getCurrentTypeResumeInfo(resumeType)?.name as string
      console.log('templateName:' + this.templateName)
    },
    setMDContent(nv: string, resumeType: string) {
      this.MDContent = nv
      console.log('setMDContent:' + this.MDContent)
      // 处理之后的操作
      if (!nv) return
      setLocalStorage(`${MARKDOWN_CONTENT}-${resumeType}`, nv)
    },
    // 切换编辑模式
    setWritableMode(originHTML: HTMLElement) {
      this.writable = !this.writable
      setLocalStorage(WRITABLE, this.writable)
      showMessageVN('您已切换至', this.writable ? '内容模式' : 'Markdown模式')
      if (this.writable) {
        nextTick(() => {
          originHTML = originHTML || (document.querySelector('.reference-dom') as HTMLElement)
          originHTML = <HTMLElement>originHTML.cloneNode(true)
          const DOMTree = document.querySelector('.writable-edit-mode') as HTMLElement
          ensureEmptyPreWhiteSpace(originHTML)
          DOMTree && (DOMTree.innerHTML = originHTML.innerHTML)
        })
      }
    },
    setNativeContent(content: string) {
      this.nativeContent = content
    },
    resetNativeContent() {
      this.nativeContent = ''
    }
  }
})

export default () => useEditorStore(pinia)
