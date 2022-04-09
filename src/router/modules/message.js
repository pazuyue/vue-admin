
import Layout from '@/layout'

const messageRouter = {
  path: '/message',
  component: Layout,
  redirect: '/message/message-table',
  name: 'Message',
  meta: {
    title: 'Message',
    icon: 'message'
  },
  children: [
    {
      path: 'message-table',
      component: () => import('@/views/message/message-table'),
      name: 'MessageTable',
      meta: { title: 'messageTable' }
    },
    {
      path: 'message-create',
      component: () => import('@/views/message/components/message-create'),
      name: 'MessageCreate',
      meta: { title: 'messageCreate' }
    }
  ]
}
export default messageRouter
