import { post } from '../config'

export function queryNotification(data: { pageSize: number; pageNum: number; uid: number }) {
  return post('/api/codecv/notification/list', data)
}

export function updateNotificationState(data: { commentId: number }) {
  return post('/api/codecv/notification/read', data)
}
