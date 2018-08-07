import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/main/home'
import About from '@/components/main/about'

import SignUp from '@/components/member/signUp'
import SignIn from '@/components/member/signIn'

import Post from "@/components/post/post"

import MyAccount from "@/components/member/myAccount"

import Search from "@/components/search/search"

import Admin from "@/components/admin/admin"
import AdminView from '@/components/admin/view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: "/about",
      name: 'About',
      component: About
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/admin/:id',
      name: 'AdminView',
      component: AdminView
    },
    {
      path: '/admin',
      name : 'Admin',
      component: Admin,
      meta: {
        requiresAuth: false
      }
    },
    {
      path : "/member/account",
      name : "MyAccount",
      component : MyAccount,
      meta : {
        requiresAuth : true
      }
    },
    {
      path : "/search",
      name : "Search",
      component : Search,
      meta : {
        requiresAuth : false
      }

    }
  ]
})
