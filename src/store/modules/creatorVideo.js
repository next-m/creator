import { creatorVideoInsert, creatorVideoDetail, creatorVideoUpdate, creatorVideoDelete, creatorVideoList, youtubeSearch } from '@/api/creatorVideo';
const common = {
  namespaced: true,
  state: {
    creatorVideoResult: {},
    creatorVideoList: {},
  },
  getters: {
    getCreatorVideoList: state => {
      return state.creatorVideoList;
    },
    getCreatorVideoResult: state => {
      return state.creatorVideoResult;
    },
  },
  mutations: {
    setCreatorVideoList(state, data) {
      state.creatorVideoList = data;
    },
    setCreatorVideoResult(state, data) {
      state.creatorVideoResult = data;
    },
  },
  actions: {
    async CREATORVIDEO_LIST({ commit }, listData) {
      const { data } = await creatorVideoList(listData);
      commit('setCreatorVideoList', data);
    },
    async CREATORVIDEO_DETAIL({ commit }, detailData) {
      const { data } = await creatorVideoDetail(detailData);
      commit('setCreatorVideoResult', data);
    },
    async CREATORVIDEO_INSERT({ commit }, insertData) {
      const { data } = await creatorVideoInsert(insertData);
      commit('setCreatorVideoResult', data);
    },
    async CREATORVIDEO_UPDATE({ commit }, updateData) {
      const { data } = await creatorVideoUpdate(updateData);
      commit('setCreatorVideoResult', data);
    },
    async CREATORVIDEO_DELETE({ commit }, deleteData) {
      const { data } = await creatorVideoDelete(deleteData);
      console.log(data);
      commit('setCreatorVideoResult', data);
    },
    async YOUTUBE_SEARCH({ commit }, youtubeData) {
      const { data } = await youtubeSearch(youtubeData);
      commit('setCreatorVideoResult', data);
    },
  },
};

export default common;
