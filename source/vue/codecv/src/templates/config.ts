import { ref } from 'vue'
import { queryAllTemplate } from '@/api/modules/resume'

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
// const _templateData = await
initTemplate()
let key = 0

export function freshKey(this: any) {
  key++
  return {
    key
  }
}

export function setCv(path: string, curModule: any) {
  console.log('curModule:' + JSON.stringify(curModule))
  const content = (curModule as Module).default
  content.id = Math.ceil(Math.random() * 1000000000)
  content.type = path.split('/')[2]
  console.log('templates.value.length:' + templates.value.length)
  if (templates.value.length <= moduleEntries.length) {
    templates.value.push(content)
  }
  initialCVState.set(content.type, [
    // content.primaryColor,
    // content.primaryBackground,
    '#333',
    '#333',
    content.font || '',
    String(content.lineHeight || 25)
  ])
}
export function initTemplate() {
  queryAllTemplate().then((res: any) => {
    console.log(JSON.stringify(res))
    if (res.code == 200) {
      moduleEntries = JSON.parse(res.data)
      console.log('moduleEntries.length:' + moduleEntries.length)
      console.log('moduleEntries:' + JSON.stringify(moduleEntries))
      for (const [path, curModule] of moduleEntries) {
        console.log('curModule:' + JSON.stringify(curModule))
        const content = (curModule as Module).default
        content.id = Math.ceil(Math.random() * 1000000000)
        content.type = path.split('/')[2]
        if (templates.value.length <= moduleEntries.length) {
          templates.value.push(content)
        }
        initialCVState.set(content.type, [
          // content.primaryColor,
          // content.primaryBackground,
          '#333',
          '#333',
          content.font || '',
          String(content.lineHeight || 25)
        ])
      }
    }
  })
}

// const match = (module: SubModule) => +(module.type.match(/^\d+/) as RegExpMatchArray)[0]
// // const match = (module: SubModule) => +(module.type.match(/^\d+/) as RegExpMatchArray)[0]
// templates.value.sort((a, b) => match(b) - match(a))

export function getPrimaryBGColor(type: string) {
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
    return (initialCVState.get(type) as string[])[1]
  })
  return ''
}

export function getPrimaryColor(type: string) {
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
    console.log('type:' + type)
    console.log('initialCVState:' + JSON.stringify(initialCVState.entries()))
    console.log('initialCVState:' + JSON.stringify(initialCVState.get(type)))
    return (initialCVState.get(type) as string[])[0]
  })
  return ''
}

export function getFontFamily(type: string) {
  return (initialCVState.get(type) as string[])[2]
}
