// folder.js
import { post } from '@/utils/request'

export default {
  // 查询文件夹及文件列表
  queryFolderList: query => {
    console.log('/api/student/fileSystem/folder/listFolderAndFile/' + query.folderId);
    return post('/api/student/fileSystem/folder/listFolderAndFile/' + query.folderId)
  },

//  // 移动 前置请求-获取所有目录结构
//  getTreeDirectory: () => get('/api/admin/fileSystem/folder/listFolderids'),

  // 新建公共文件夹
  createPublicFolder: data => post('/api/student/fileSystem/folder', data)
}

//= ==================文件夹=====================
//
//
//// 重命名文件夹
//export function renameFolder (data) {
//  return request({
//    url: '/api/admin/fileSystem/folder',
//    method: 'put',
//    data: data
//  })
//}
//// 删除文件夹
//export function deleteFolder (folderId) {
//  return request({
//    url: '/api/admin/fileSystem/folder/' + folderId,
//    method: 'delete'
//  })
//}
//// 移动文件夹
//export function moveFolder (data) {
//  return request({
//    url: '/api/admin/fileSystem/folder',
//    method: 'put',
//    data: data
//  })
//}
//
////= ==================文件=====================
//// oss资源上传 - 后端服务器
//export function policy () {
//  return request({
//    url: '/api/admin/fileSystem/ziyuan/oss/policy',
//    method: 'get'
//  })
//}
//// 上传文件-后端数据库
//export function addFile (data) {
//  return request({
//    url: '/api/admin/fileSystem/file',
//    method: 'post',
//    data: data
//  })
//}
//
//// 删除文件
//export function deleteFile (fileId) {
//  return request({
//    url: '/api/admin/fileSystem/file/' + fileId,
//    method: 'delete'
//  })
//}
//
//// 移动文件夹
//export function moveFile (data) {
//  return request({
//    url: '/api/admin/fileSystem/file',
//    method: 'put',
//    data: data
//  })
//}
