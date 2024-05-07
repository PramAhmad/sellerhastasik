import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact
} from '@mdi/js'

export default [
  {
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    to: '/products',
    label: 'Products',
    icon: mdiTable
  },
  {
    to: '/orders',
    label: 'Order',
    icon: mdiSquareEditOutline
  },
  {
    to: '/ulasan',
    label: 'Ulasan Pembeli',
    icon: mdiTelevisionGuide
  },
  {
    to: '/complaint',
    label: 'Complaint',
    icon: mdiResponsive
  },
  {
    to: '/chat',
    label: 'Chat',
    icon: mdiPalette
  },
  {
    to: '/dana',
    label: 'Saldo Toko',
    icon: mdiAccountCircle
  },
  {
    to: '/account-setting',
    label: 'Akun Saya',
    icon: mdiLock
  },
  {
    // logout
    icon: mdiAlertCircle,
    label: 'Logout',
    isLogout: true
  }
]
