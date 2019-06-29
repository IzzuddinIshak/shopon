import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AuthGuard from './auth-guard'

import viewProduct from '@/components/shopping/viewProduct'
import product from '@/components/shopping/product'
import manageProduct from '@/components/manage/manageProduct'
import addProduct from '@/components/manage/addProduct'
import salesRecord from '@/components/manage/salesRecord'
import signIn from '@/components/user/signIn'
import signUp from '@/components/user/signUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/viewproduct',
      name: 'viewProduct',
      component: viewProduct
    },
    {
      path: '/viewproduct/:id',
      name: 'product',
      props: true,
      component: product
    },
    {
      path: '/manageproduct',
      name: 'manageProduct',
      component: manageProduct,
      beforeEnter: AuthGuard
    },
    {
      path: '/addproduct',
      name: 'addProduct',
      component: addProduct,
    },
    {
      path: '/salesRecord',
      name: 'salesRecord',
      component: salesRecord,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/signup',
      name: 'signUp',
      component: signUp
    }
  ],
  mode: 'history'
})
