import { createRouter, createWebHashHistory } from 'vue-router'
import Style from '@/views/StyleView.vue'
import Home from '@/views/HomeView.vue'

const routes = [
  {
    meta: {
      title: 'Select style'
    },
    path: '/',
    name: 'style',
    component: ()=> import('@/views/Home.vue')
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {  
      title: 'Dashboard'
    },
    path: '/dashboard',
    name: 'dashboard',
    component: Home
  },
  {
    meta: {
      title: 'Tables'
    },
    path: '/tables',
    name: 'tables',
    component: () => import('@/views/TablesView.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/FormsView.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    meta: {
      title: 'Ui'
    },
    path: '/ui',
    name: 'ui',
    component: () => import('@/views/UiView.vue')
  },
  {
    meta: {
      title: 'Responsive layout'
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import('@/views/ResponsiveView.vue')
  },
  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    meta: {
      title: 'Error'
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  },
  // register
  {
    meta: {
      title: 'Register'
    },
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue')
  },
  // products
  {
    meta: {
      title: 'Products'
    },
    path: '/products',
    name: 'products',
    component: () => import('@/views/ProductsView.vue')
  },
  // tambah producst
  {
    meta: {
      title: 'Add Products'
    },
    path: '/products/add',
    name: 'add-products',
    component: () => import('@/views/AddProductsView.vue')
  },
  // edit products
  {
    meta: {
      title: 'Edit Products'
    },
    path: '/product/edit/:id',
    name: 'edit-products',
    component: () => import('@/views/EditProductsView.vue')
  },
  // orders
  {
    meta: {
      title: 'Orders'
    },
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/OrdersView.vue')
  },
  // ulasan
  {
    meta: {
      title: 'Ulasan Pembeli'
    },
    path: '/ulasan',
    name: 'ulasan',
    component: () => import('@/views/UlasanView.vue')
  },
  // complaint
  {
    meta: {
      title: 'Complaint'
    },
    path: '/complaint',
    name: 'complaint',
    component: () => import('@/views/ComplaintView.vue')
  },
  // chat
  {
    meta: {
      title: 'Chat'
    },
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/ChatView.vue')
  },
  // dana
  {
    meta: {
      title: 'Akun Saya'
    },
    path: '/dana',
    name: 'dana',
    component: () => import('@/views/DanaView.vue')
  },
  // profile
  {
    meta: {
      title: 'Saldo Toko'
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
