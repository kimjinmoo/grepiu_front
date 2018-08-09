import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/main/home'
import About from '@/components/main/about'

import SignUp from '@/components/member/signUp'
import SignIn from '@/components/member/signIn'

import Post from "@/components/post/post"
import Movie from "@/components/lab/movie"

import MyAccount from "@/components/member/myAccount"

import Search from "@/components/search/search"

import Admin from "@/components/admin/admin"
import AdminView from '@/components/admin/view'

import store from "../store"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/about",
      name: 'About',
      component: About,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/post',
      name: 'Post',
      component: Post,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/admin/:id',
      name: 'AdminView',
      component: AdminView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name : 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path : "/member/account",
      name : "MyAccount",
      component : MyAccount,
      meta: {
        requiresAuth: true
      }
    },
    {
      path : "/search",
      name : "Search",
      component : Search,
      meta: {
        requiresAuth: false
      }
    },
    {
      path : "/lab/movie",
      name : "Movie",
      component : Movie,
      meta: {
        requiresAuth: false
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !store.getters.user) {
    next('/signIn');
  } else if (requiresAuth && store.getters.user) {
    next();
  } else {
    next();
  }
})
export default router;
