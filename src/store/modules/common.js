import { fileDelete, creatoryVideCategory } from '@/api/common/common';
import { creatorVideoCategoryList } from '@/utils/syscodeList';
const common = {
  namespaced: true,
  state: {
    fileDeleteResult: {},
    creatoryVideoCategorys: {},
  },
  getters: {
    getFileDeleteResult: state => {
      return state.fileDeleteResult;
    },
    getCreatoryVideoCategorys: state => {
      return state.creatoryVideoCategorys;
    },
  },
  mutations: {
    setFileDeleteResult(state, data) {
      state.fileDeleteResult = data;
    },
    setCreatoryVideoCategorys(state, data) {
      state.creatoryVideoCategorys = data;
    },
  },
  actions: {
    async FILE_DELETE({ commit }, id) {
      const { data } = await fileDelete(id);
      commit('setFileDeleteResult', data);
    },
    async CREATORVIDEO_CATEGORY({ commit }) {
      const { data } = await creatoryVideCategory('SYS22A17B017');
      const cate = creatorVideoCategoryList(data.nextmApiResult.sysCodeList);
      commit('setCreatoryVideoCategorys', cate);
    },
  },
};

export default common;
