
import Layout from '@/layout'

const SignInRouter = {
  path: '/sign-in',
  component: Layout,
  redirect: '/sign-in/components/sign-in-create',
  name: 'SignIn',
  meta: {
    title: 'SignIn',
    icon: 'example'
  },
  children: [
    {
      path: 'sign-in-create',
      component: () => import('@/views/sign-in/components/sign-in-create'),
      name: 'SignInCreate',
      meta: { title: 'signInCreate' }
    }
  ]
}
export default SignInRouter
