import { ref } from 'vue'
import { getAllTemplate } from '@/api/modules/resume'
import { errorMessage } from '@/common/message'

const initialCVState: Map<string, string[]> = new Map()

// 创作模板的默认配置
initialCVState.set('create', ['#333', '#333', '', '25'])

type Module = {
  default: SubModule
}

type SubModule = {
  type: string
  id: number
  name: string
  font?: string
  lineHeight?: number
  content: string
  primaryColor: string
  primaryBackground: string
  img: string
  hot?: number | string
}
export type TemplateType = SubModule
const temp = ['ssss', 'vvvvv']

console.log('temp' + JSON.stringify(temp))

export const templates = ref<SubModule[]>([])

let moduleEntries = Object.entries(import.meta.glob('./modules/*/index.ts', { eager: true }))
const _templateData = await getAllTemplate()
console.log('_templateData：' + JSON.stringify(_templateData))
if (_templateData.code != 200) {
  errorMessage(_templateData.msg)
} else {
  moduleEntries = JSON.parse(_templateData.data)
  console.log('moduleEntries.length:' + moduleEntries.length)
  console.log('moduleEntries:' + JSON.stringify(moduleEntries))
  for (const [path, curModule] of moduleEntries) {
    const content = (curModule as Module).default
    content.id = Math.ceil(Math.random() * 1000000000)
    content.type = path.split('/')[2]
    templates.value.push(content)
    initialCVState.set(content.type, [
      content.primaryColor,
      content.primaryBackground,
      content.font || '',
      String(content.lineHeight || 25)
    ])
  }
}

// const match = (module: SubModule) => +(module.type.match(/^\d+/) as RegExpMatchArray)[0]
// // const match = (module: SubModule) => +(module.type.match(/^\d+/) as RegExpMatchArray)[0]
// templates.value.sort((a, b) => match(b) - match(a))

export function getPrimaryBGColor(type: string) {
  return (initialCVState.get(type) as string[])[1]
}

export function getPrimaryColor(type: string) {
  return (initialCVState.get(type) as string[])[0]
}

export function getFontFamily(type: string) {
  return (initialCVState.get(type) as string[])[2]
}
