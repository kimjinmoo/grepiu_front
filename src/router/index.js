import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/main/home'
import About from '@/components/main/about'

import SignUp from '@/components/member/signUp'
import SignIn from '@/components/member/signIn'

import Post from "@/components/post/post"
import PostDetail from "@/components/post/postDetail"

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
        info: "홈",
        requiresAuth: false
      }
    },
    {
      path: "/about",
      name: 'About',
      component: About,
      meta: {
        info: "이것저것",
        requiresAuth: false
      }
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp,
      meta: {
        info: "가입하기",
        requiresAuth: false
      }
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn,
      meta: {
        info: "로그인",
        requiresAuth: false
      }
    },
    {
      path: '/post',
      name: 'Post',
      component: Post,
      meta: {
        info: "포스트",
        requiresAuth: false
      }
    },
    {
      path: '/post/:id',
      name: 'PostDetail',
      component: PostDetail,
      meta: {
        info: "포스트-상세보기",
        requiresAuth: false
      }
    },
    {
      path: '/admin/:id',
      name: 'AdminDetail',
      component: AdminView,
      meta: {
        info: "관리자-포스트-수정",
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name : 'Admin',
      component: Admin,
      meta: {
        info: "관리자",
        requiresAuth: true
      }
    },
    {
      path : "/member/account",
      name : "MyAccount",
      component : MyAccount,
      meta: {
        info: "내계정 정보",
        requiresAuth: true
      }
    },
    {
      path : "/search",
      name : "Search",
      component : Search,
      meta: {
        info: "검색",
        requiresAuth: false
      }
    },
    {
      path : "/lab/movie",
      name : "Movie",
      component : Movie,
      meta: {
        info: "Lab-영화관 찾기",
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
