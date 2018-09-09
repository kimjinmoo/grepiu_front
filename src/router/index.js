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
      name: 'HOME',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/about",
      name: 'About Me',
      component: About,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/signUp',
      name: 'Sign Up',
      component: SignUp,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/signIn',
      name: 'Sign In',
      component: SignIn,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/post',
      name: 'Posting',
      component: Post,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/admin/:id',
      name: 'Admin-Detail',
      component: AdminView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name : 'Root',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path : "/member/account",
      name : "My Account",
      component : MyAccount,
      meta: {
        requiresAuth: true
      }
    },
    {
      path : "/search",
      name : "검색",
      component : Search,
      meta: {
        requiresAuth: false
      }
    },
    {
      path : "/lab/movie",
      name : "LAB / 영화관 검색",
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
  const auth = to.matched.some(record => record.meta.requiresAuth);
  let user = localStorage.user;
  if (auth && !user) {
    next({
      path : '/signIn',
      query: {redirect: to.fullPath}
    });
  } else if (auth && user) {
    next();
  } else {
    next();
  }
})
export default router;
