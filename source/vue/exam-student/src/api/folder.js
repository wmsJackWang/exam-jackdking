// folder.js
import request from '@/utils/request'

// 查询文件夹及文件列表
export function qeryFolderList (query) {
  return request({
    url: '/system/folder/listFolderAndFile/' + query.folderId,
    method: 'get',
    params: query
  })
}

// 移动 前置请求-获取所有目录结构
export function getTreeDirectory () {
  return request({
    url: '/system/folder/listFolderids',
    method: 'get'
  })
}

//= ==================文件夹=====================

// 新建公共文件夹
export function createPublicFolder (data) {
  return request({
    url: '/system/folder',
    method: 'post',
    data: data
  })
}
// 重命名文件夹
export function renameFolder (data) {
  return request({
    url: '/system/folder',
    method: 'put',
    data: data
  })
}
// 删除文件夹
export function deleteFolder (folderId) {
  return request({
    url: '/system/folder/' + folderId,
    method: 'delete'
  })
}
// 移动文件夹
export function moveFolder (data) {
  return request({
    url: '/system/folder',
    method: 'put',
    data: data
  })
}

//= ==================文件=====================
// oss资源上传 - 后端服务器
export function policy () {
  return request({
    url: '/system/ziyuan/oss/policy',
    method: 'get'
  })
}
// 上传文件-后端数据库
export function addFile (data) {
  return request({
    url: '/system/file',
    method: 'post',
    data: data
  })
}

// 删除文件
export function deleteFile (fileId) {
  return request({
    url: '/system/file/' + fileId,
    method: 'delete'
  })
}

// 移动文件夹
export function moveFile (data) {
  return request({
    url: '/system/file',
    method: 'put',
    data: data
  })
}
