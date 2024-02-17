import { defineStore } from 'pinia'
import { nextTick } from 'vue'

import pinia from '@/store'
import { getLocalStorage, setLocalStorage } from '@/common/localstorage'
import { showMessageVN } from '@/common/message'
import { templates, TemplateType } from '@/templates/config'
import { ensureEmptyPreWhiteSpace } from '@/views/editor/components/tabbar/hook'

const MARKDOWN_CONTENT = 'markdown-content'
const WRITABLE = 'writable'

export const getCurrentTypeContent = (type: string): string => {
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

const useEditorStore = defineStore('editorStore', {
  state: () => ({
    title: '',
    MDContent: '',
    nativeContent: '',
    writable: Boolean(getLocalStorage(WRITABLE)) || false,
    templateName: '',
    resumeType: ''
  }),
  actions: {
    // 初始化编辑器内容（默认为Markdown模式）
    initMDContent(resumeType: string) {
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
