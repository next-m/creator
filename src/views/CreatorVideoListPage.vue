<template>
  <div>
    <v-row class="pl-3 pt-5">
      <h1>콘탠츠 관리</h1>
      <caption class="pl-2 pt-4">
        유튜브 콘탠츠 관리 화면입니다.
      </caption>
    </v-row>
    <v-row class="mt-5">
      <v-col col-12>
        <div class="d-flex">
          <v-col class="d-flex" cols="5" sm="6" md="5">
            <v-select v-model="creatorVideoCategory" :items="creatorVideoCategoryList" item-text="categoryName" item-value="categoryCode" label="카테고리" outlined></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="5">
            <v-text-field v-model="searchText" label="영상제목" outlined></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" md="5" sm="12">
            <v-btn x-large color="success" dark @click="searchButton()">
              조회
            </v-btn>
            <v-btn x-large color="primary" class="ml-2" dark @click="$router.push('creatorvideo')">
              등록
            </v-btn>
          </v-col>
        </div>
        <v-data-table :headers="headers" :items="desserts" :search="search" @click:row="handleClick">
          <template v-slot:item.creatorVideoImage="{ item }">
            <img :src="item.creatorVideoImage" width="100" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import router from '../routes';
import { mapGetters } from 'vuex';
import bus from '@/utils/bus';
import { creatorVideoList } from '@/utils/syscodeList.js';
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: '콘텐츠 이미지', value: 'creatorVideoImage' },
        {
          text: '콘탠츠 등록 코드',
          align: 'start',
          filterable: false,
          value: 'creatorVideoSid',
        },
        { text: '콘탠츠 재목', value: 'creatorVideoTitle' },
        { text: 'YoutubeURL', value: 'creatorVideoYoutubeUrl' },
        { text: '카테고리', value: 'category' },
        { text: '재생시간', value: 'creatorVideoLangs' },
        { text: '상태', value: 'creatorVideoStatusName' },
      ],
      desserts: [
        {
          creatorVideoImage: '',
          creatorVideoSid: '',
          creatorVideoTitle: '',
          creatorVideoYoutubeUrl: '',
          category: '',
          creatorVideoLangs: '',
          creatorVideoStatusName: '',
        },
      ],
      searchText: '',
      creatorVideoCategoryList: [],
      creatorVideoCategory: '',
    };
  },
  computed: {
    ...mapGetters('common', ['getCreatoryVideoCategorys']),
    ...mapGetters('creatorVideo', ['getCreatorVideoList']),
  },
  async created() {
    bus.$emit('start:spinner');
    try {
      await this.$store.dispatch('common/CREATORVIDEO_CATEGORY');
      this.creatorVideoCategoryList = this.getCreatoryVideoCategorys;

      await this.$store.dispatch('creatorVideo/CREATORVIDEO_LIST', {});
      this.desserts = creatorVideoList(this.getCreatorVideoList.nextmApiResult.creatorVideo);

      bus.$emit('end:spinner');
    } catch (error) {
      this.$notify({
        group: 'notifyMessage',
        text: this.getCreatoryVideoCategorys.nextmApiResult.errorMessage,
      });
      bus.$emit('end:spinner');
    }
  },
  methods: {
    async searchButton() {
      const searchTextData = {
        creatorVideoCategory: this.creatorVideoCategory,
        searchText: this.searchText,
      };
      await this.$store.dispatch('creatorVideo/CREATORVIDEO_LIST', searchTextData);
      this.desserts = creatorVideoList(this.getCreatorVideoList.nextmApiResult.creatorVideo);
      this.$notify({
        group: 'notifyMessage',
        text: this.getCreatorVideoList.nextmApiResult.errorMessage,
      });
    },
    handleClick(row) {
      // or just do something with your current clicked row item data
      console.log(row.creatorVideoSid);
      router.push({ name: 'creatorVideoModify', params: { creatorVideoSid: row.creatorVideoSid } });
    },
  },
};
</script>

<style scoped>
.selected {
  background-color: red;
}
</style>
