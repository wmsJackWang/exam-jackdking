import { IResumeFile } from '@@types/type'
import { post } from '@/api/config'
import { getLocalStorage } from '@/common/localstorage'
import useUserStore, { TOKEN } from '@/store/modules/user'

export interface IResumeConfig {
  content: string
  style: string
  link: string
  name: string
  type?: number
}

const UPSTASH_BASE_URL = import.meta.env.VITE_UPSTASH_BASE_URL as string

export async function resumeExport(data: IResumeConfig) {
  const res = await fetch(import.meta.env.VITE_EXPORT_URL as string, {
    method: 'POST',
    body: JSON.stringify(data)
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
  return await res.json()
}

export function getExportCount() {
  return new Promise((resolve, reject) => {
    fetch(`${UPSTASH_BASE_URL}/get/count`, {
      headers: {
        Authorization: import.meta.env.VITE_UPSTASH_GET_TOKEN as string
      }
    })
      .then(response => response.json())
      .then(data => resolve(data.result))
      .catch(reject)
  })
}

export async function setExportCount() {
  let count: string
  try {
    count = (await getExportCount()) as string
  } catch {
    return Promise.resolve('获取失败...')
  }
  return new Promise(resolve => {
    fetch(`${UPSTASH_BASE_URL}/set/count/${parseInt(count) + 1}`, {
      headers: {
        Authorization: import.meta.env.VITE_UPSTASH_SET_TOKEN as string
      }
    })
      .then(response => response.json())
      .then(data => resolve(data.result))
      .catch(resolve)
  })
}

export function queryResumeInfo(data: any) {
  return post('/api/codecv/resume/getResumeInfo', data)
}

export function deleteResumeInfo(data: any) {
  return post('/api/codecv/resume/deleteResumeInfo', data)
}
// export function queryResumeInfo(id: number) {
//   console.log('url:' + `${UPSTASH_BASE_URL}/api/codecv/resume/getResumeInfo`)
//   const res = fetch(`${UPSTASH_BASE_URL}/api/codecv/resume/getResumeInfo`, {
//     // headers: {
//     //   Authorization: import.meta.env.VITE_UPSTASH_GET_TOKEN as string
//     // }
//     method: 'POST',
//     body: JSON.stringify({ id: id }),
//     headers: {
//       'x-access-token': getLocalStorage(TOKEN) as string,
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
//   return res
// }

export async function getAllTemplate() {
  const res = await fetch(`${UPSTASH_BASE_URL}/api/codecv/resume/get/allTemplateData`, {
    // headers: {
    //   Authorization: import.meta.env.VITE_UPSTASH_GET_TOKEN as string
    // }
    method: 'POST',
    body: JSON.stringify({ title: 'title' }),
    headers: {
      'x-access-token': getLocalStorage(TOKEN) as string,
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
  return res.json()
}

export async function getTemplateCondition() {
  const res = await fetch(`${UPSTASH_BASE_URL}/api/codecv/resume/get/templateData`, {
    // headers: {
    //   Authorization: import.meta.env.VITE_UPSTASH_GET_TOKEN as string
    // }
    method: 'POST',
    body: JSON.stringify({ title: 'title' }),
    headers: {
      'x-access-token': getLocalStorage(TOKEN) as string,
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
  return await res.json()
}
// resumeFileList

export async function getResumeFileList() {
  // const { userInfo } = useUserStore()
  const res = await fetch(`${UPSTASH_BASE_URL}/api/codecv/resume/resumeFileList`, {
    // headers: {
    //   Authorization: import.meta.env.VITE_UPSTASH_GET_TOKEN as string
    // }
    method: 'POST',
    body: JSON.stringify({ token: getLocalStorage(TOKEN) as string }),
    headers: {
      'x-access-token': getLocalStorage(TOKEN) as string,
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  return res.json()
}

export async function setTemplateCondition(params: { name: string }) {
  let data,
    templateData: { [key: string]: string } = {}
  try {
    data = await getTemplateCondition()
    console.log('data：' + JSON.stringify(data))
  } catch {
    return Promise.resolve({ msg: '获取模板数据失败...', result: null })
  }
  if (data.result) {
    templateData = JSON.parse(data.result)
  }
  templateData[`t${params.name}`] = String(+(templateData[`t${params.name}`] || 0) + 1)
  const res = await fetch(`${UPSTASH_BASE_URL}/set/templateData`, {
    method: 'POST',
    body: JSON.stringify(templateData),
    headers: {
      Authorization: import.meta.env.VITE_UPSTASH_SET_TOKEN as string
    }
  })
  return await res.json()
}
// 获取 Gitee 仓库 star 数量
export function queryGiteeRepoStars() {
  return new Promise(resolve => {
    fetch(import.meta.env.VITE_GITEE_API_URL as string)
      .then(res => res.json())
      .then(data => {
        // 获取仓库 star 数量
        resolve(data)
      })
      .catch(() => resolve([]))
  })
}

export function saveMdFile(data: IResumeFile) {
  return post('/api/codecv/resume/save', data)
}

export function queryAllTemplate() {
  return post('/api/codecv/resume/get/allTemplateData', {})
}

export async function queryAllTemplateV2() {
  // const { userInfo } = useUserStore()
  const res = await fetch(`${UPSTASH_BASE_URL}/api/codecv/resume/get/allTemplateData`, {
    // headers: {
    //   Authorization: import.meta.env.VITE_UPSTASH_GET_TOKEN as string
    // }
    method: 'POST',
    body: JSON.stringify({ token: getLocalStorage(TOKEN) as string }),
    headers: {
      'x-access-token': getLocalStorage(TOKEN) as string,
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  return res.json()
}
