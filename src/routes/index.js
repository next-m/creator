import Vue from 'vue';
import VueRouter from 'vue-router';
//import store from '@/store/index';
//import { getAccessTokenCookie } from '@/utils/cookie';
// import LoginPage from '@/views/LoginPage.vue';
// import SignupPage from '@/views/SignupPage.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupPage.vue'),
    },
    {
      path: '/main',
      component: () => import('@/views/MainPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/usermodify',
      component: () => import('@/views/UserModifyPage.vue'),
    },

    {
      path: '/creatorvideolist',
      component: () => import('@/views/CreatorVideoListPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/creatorvideo',
      component: () => import('@/views/CreatorVideoPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/creatorvideomodify/:creatorVideoSid',
      name: 'creatorVideoModify',
      component: () => import('@/views/CreatorVideoModifyPage.vue'),
      meta: { auth: true },
    },
    {
      path: '*',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
});

// //router guard
// router.beforeEach(async (to, from, next) => {
//   //액세스 토큰이 있을 경우
//   if (getAccessTokenCookie() !== null) {
//     return next();
//   }

//   //로그인 필요 없는 페이지
//   if (to.matched.some(record => record.meta.unauthorized) || getAccessTokenCookie()) {
//     return next();
//   }

//   //액세스 토큰이 없을 경우
//   return next('/login');
// });

export default router;
