import Vue from 'vue';
import Vuex from 'vuex';
import member from '@/store/modules/member';
import common from '@/store/modules/common';
import creatorVideo from '@/store/modules/creatorVideo';
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    member,
    common,
    creatorVideo,
  },
});

// import Vue from 'vue';
// import Vuex from 'vuex';
// import { getAuthFromCookie, getUserFromCookie, saveAuthToCookie, saveUserToCookie, saveUserEmailToCookie } from '@/utils/cookie';
// import { loginUser } from '@/api/auth';

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     homepageUserEmail: getUserFromCookie() || '',
//     token: getAuthFromCookie() || '',
//   },
//   getters: {
//     isLogin(state) {
//       return state.token !== '';
//     },
//   },
//   mutations: {
//     setHomepageUserEmail(state, homepageUserEmail) {
//       state.homepageUserEmail = homepageUserEmail;
//     },
//     clearHomepageUserEmail(state) {
//       state.homepageUserEmail = '';
//     },
//     setToken(state, token) {
//       state.token = token;
//     },
//     clearToken(state) {
//       state.token = '';
//     },
//   },
//   actions: {
//     async LOGIN({ commit }, userData) {
//       const { data } = await loginUser(userData);
//       commit('setToken', data.nextmApiResult.login.access_token);
//       commit('setHomepageUserEmail', data.nextmApiResult.login.current_user.homepageUserEmail);
//       saveAuthToCookie(data.nextmApiResult.login.access_token);
//       saveUserToCookie(data.nextmApiResult.login.current_user.homepageUserSid);
//       saveUserEmailToCookie(data.nextmApiResult.login.current_user.homepageUserEmail);
//       return data;
//     },
//     async NOTICEARERT({ commit }, message) {
//       commit('setNoticeAlertMessage', message);
//     },
//   },
// });
