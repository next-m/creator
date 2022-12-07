import { loginUser, loginout, creatorUserInfo, modifyUser } from '@/api/member';
import {
  saveAccessTokenCookie,
  getAuthFromCookie,
  getCreatorUserSidCookie,
  creatorUserSidCookie,
  creatorUserImageCookie,
  getCreatorUserNameCookie,
  creatorUserNameCookie,
  getCreatorUserImageCookie,
  deleteCookie,
} from '@/utils/cookie';
const member = {
  namespaced: true,
  state: {
    homepageUserLoginInfo: {},
    token: getAuthFromCookie() || '',
    homepageUserLoginName: getCreatorUserNameCookie() || '',
    homepageUserLoginSid: getCreatorUserSidCookie() || '',
    homepageUserLoginImage: getCreatorUserImageCookie() || '',
  },
  getters: {
    getHomepageUserLoginInfo: state => {
      return state.homepageUserLoginInfo;
    },
    isLogin(state) {
      return state.token !== '';
    },
    getHomepageUserLoginName(state) {
      return state.homepageUserLoginName;
    },
    getHomepageUserLoginSid(state) {
      return state.homepageUserLoginSid;
    },
    getHomepageUserLoginImage(state) {
      return state.homepageUserLoginImage;
    },
  },
  mutations: {
    setLoginInfo(state, data) {
      state.homepageUserLoginInfo = data;
    },
    setToken(state, data) {
      state.token = data;
    },
    setHomepageUserLoginName(state, data) {
      state.homepageUserLoginName = data;
    },
    setHomepageUserLoginSid(state, data) {
      state.homepageUserLoginSid = data;
    },
    setHomepageUserLoginImage(state, data) {
      state.homepageUserLoginImage = data;
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      const result = data.nextmApiResult.login;
      if (data.nextmApiResult.errorCode == 200) {
        saveAccessTokenCookie(result.access_token);
        creatorUserSidCookie(result.current_user.homepageUserSid);
        creatorUserNameCookie(result.current_user.homepageUserName);
        creatorUserImageCookie(`${process.env.VUE_APP_API_URL}/api/h1/file/memberImageView/${result.current_user.homepageUserSid}/?size=200`);
        commit('setToken', result.access_token);
        commit('setHomepageUserLoginName', result.current_user.homepageUserName);
        commit('setHomepageUserLoginImage', `${process.env.VUE_APP_API_URL}/api/h1/file/memberImageView/${result.current_user.homepageUserSid}/?size=200`);
      }
      commit('setLoginInfo', data);
    },
    async USERMODIFY_ACTION({ commit }, userData) {
      const { data } = await modifyUser(userData);
      console.log(data);
      commit('setLoginInfo', data);
    },
    //회원 정보 가지고 오기
    async USERMODIFY_INFO({ commit }) {
      const { data } = await creatorUserInfo();
      commit('setLoginInfo', data); //재사용
    },

    async LOGOUT({ commit }) {
      await loginout();
      deleteCookie('accessToken');
      deleteCookie('creatorUserSid');
      deleteCookie('creatorUserName');
      commit('setToken', '');
    },
  },
};

export default member;
