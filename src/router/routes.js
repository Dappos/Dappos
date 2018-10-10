
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/index'),
        // meta: { authRequired: true },
      },
      {
        path: 'signin',
        name: 'signin',
        component: () => import('pages/signin')
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
