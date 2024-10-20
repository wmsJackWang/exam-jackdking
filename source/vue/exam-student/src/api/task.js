// folder.js
import { post } from '@/utils/request'

export default {
  // 查询文件夹及文件列表
  queryTaskList: query => {
    console.log('/api/student/task/list');
    return post('/api/student/task/list')
  },

//  // 移动 前置请求-获取所有目录结构
//  getTreeDirectory: () => get('/api/admin/fileSystem/folder/listFolderids'),

  // 新建任务
  saveOrUpdateJdkTask: data => post('/api/student/task/add', data),

}
