import { post } from '@/utils/request'

export default {
  getProgressRecordList: (mid, current, pageSize) => {
    let query = {
      startIndex: mid,
      pageIndex: current,
      pageSize: pageSize
    }
    return post('/api/student/progress/pageList', query)
  }
}
