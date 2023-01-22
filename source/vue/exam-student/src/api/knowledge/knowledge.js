import { post } from '@/utils/request'

export default {
  select: id => post('/api/student/exam/paper/select/' + id),
  pageList: query => post('/api/student/konwledge/pageListV2', query),
  update: update => post('/api/student/konwledge/update', update)
}
