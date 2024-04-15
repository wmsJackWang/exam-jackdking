import { post } from '@/utils/request'

export default {
  list: query => post('/api/student/education/subject/list'),
  select: id => post('/api/student/education/subject/select/' + id),
  add: name => post('/api/student/education/subject/add/' + name),
  update: (id, name) => post('/api/student/education/subject/update/' + id + '/' + name),
  remove: id => post('/api/student/education/subject/remove/' + id)
}
