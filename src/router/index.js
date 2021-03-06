import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/main/home'
import About from '@/components/main/about'

import SignUp from '@/components/member/signUp'
import SignIn from '@/components/member/signIn'

import Post from "@/components/post/post"
import PostDetail from "@/components/post/postDetail"

import Lab from "@/components/lab/lab"
import Movie from "@/components/lab/movie"
import Vote from "@/components/lab/vote"

import MyAccount from "@/components/member/myAccount"

import Admin from "@/components/admin/admin"
import AdminView from '@/components/admin/view'

import cloud from "@/components/cloud/cloud"

import commonVote from "@/components/common/vote.vue"
import commonQr from "@/components/common/qr.vue"

import Support from '@/components/support/support.vue'

import error_404 from "@/components/error/404.vue"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/share/:id',
      name: 'Vote',
      component: commonVote,
      meta: {
        info: "투표",
        requiresAuth: false
      }
    },
    {
      path: '/qr/:id',
      name: 'Qr',
      component: commonQr,
      meta: {
        info: "QR",
        requiresAuth: false
      }
    },
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
      name: 'Admin',
      component: Admin,
      meta: {
        info: "관리자",
        requiresAuth: true
      }
    },
    {
      path: '/member/account',
      name: "MyAccount",
      component: MyAccount,
      meta: {
        info: "내계정 정보",
        requiresAuth: true
      }
    },
    {
      path: '/lab',
      name: 'Lab',
      component: Lab,
      meta: {
        info: '내창고',
        requiresAuth: false
      }
    },
    {
      path: '/lab/movie',
      name: 'Movie',
      component: Movie,
      meta: {
        info: "내창고-영화관 찾기",
        requiresAuth: false
      }
    },
    {
      path: '/lab/vote',
      name: 'Vote',
      component: Vote,
      meta: {
        info: "실시간 투표",
        requiresAuth: false
      }
    },
    {
      path: '/cloud',
      name: 'Cloud',
      component: cloud,
      meta: {
        info: "클라우드-저장소",
        requiresAuth: true
      }
    },
    {
      path: '/support',
      name: 'Support',
      component: Support
    },
    { path: '*', component: error_404}

  ],
  scrollBehavior(to, from, savedPosition) {
    // 포스트 상세보기 처리
    if (to.name == 'PostDetail') {
      document.getElementById('app').scrollIntoView();
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

router.beforeEach((to, from, next) => {
  // set title
  document.title = "GrepIU " + to.meta.info || "GrepIU"

  const auth = to.matched.some(record => record.meta.requiresAuth);
  let user = localStorage.user;
  if (auth && !user) {
    // router.push("/signIn");
    next({
      path: '/signIn',
      query: {redirect: to.fullPath}
    });
  } else if (auth && user) {
    next();
  } else {
    next();
  }
})
export default router;
