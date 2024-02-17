import { onActivated, ref } from 'vue'
import useEditorStore from '@/store/modules/editor'

const editorStore = useEditorStore()
export function useFile(emit: any) {
  const fileName = ref('')
  const exportFile = (type: string) => {
    document.title = fileName.value
    emit(`download-${type}` as any, fileName.value)
  }

  const importFile = (event: any) => {
    emit('import-md', event?.target?.files[0])
  }

  onActivated(() => (fileName.value = editorStore.templateName))
  return {
    fileName,
    exportFile,
    importFile
  }
}

// 规划：1. 模板数据增加多个。 2. 个人简历数据保存和列表查询
