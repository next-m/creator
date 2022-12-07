<template>
  <div>
    <v-row class="pl-3 pt-5">
      <h1>콘탠츠 관리</h1>
      <caption class="pl-2 pt-4">
        유튜브 콘탠츠 등록 화면입니다.
      </caption>
    </v-row>
    <v-row class="mt-5">
      <v-col>
        <v-card class="pa-15" outlined tile>
          <v-form @submit.prevent="submitForm">
            <v-row>
              <v-col cols="6">
                <div class="file-wrap">
                  <file-uploadh @uploadFiles1="uploadFiles1" :fileType="'image/*'"></file-uploadh>
                  <ul class="thumbnail mt10">
                    <li v-for="(item, index) in file" :key="index" class="imageArea">
                      <v-icon @click="confirmPhoto(item.url)" class="imageDeleteButton">mdi-close-circle</v-icon>
                      <div v-if="message === false" class="thubmnail-type">
                        <img :src="`${url}/api/h1/file/fileView/${item.url}?size=200`" />
                      </div>
                    </li>
                    <div v-if="message === true">첨부된 파일이 없습니다.</div>
                  </ul>
                </div>
                <div class="file-wrap">
                  <file-uploadv @uploadFiles2="uploadFiles2" :fileType="'image/*'"></file-uploadv>
                  <ul class="thumbnail mt10">
                    <li v-for="(item, index) in file" :key="index" class="imageArea">
                      <v-icon @click="confirmPhoto(item.url)" class="imageDeleteButton">mdi-close-circle</v-icon>
                      <div v-if="message === false" class="thubmnail-type">
                        <img :src="`${url}/api/h1/file/fileView/${item.url}?size=200`" />
                      </div>
                    </li>
                    <div v-if="message === true">첨부된 파일이 없습니다.</div>
                  </ul>
                </div>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="creatorVideoSid" label="영상고유코드" readonly></v-text-field>
                <v-text-field v-model="creatorVideoTitle" :counter="120" :rules="nameRules" label="영상타이틀" required></v-text-field>
                <div class="d-flex">
                  <v-text-field v-model="creatorVideoYoutubeUrl" :counter="120" :rules="nameRules" label="유튜브 URL" required></v-text-field>
                  <v-btn class="ma-2 mt-4" @click="youtubeSearch()"> Youtube </v-btn>
                </div>
                <v-select v-model="creatorVideoCategory" :items="creatorVideoCategoryList" item-text="categoryName" item-value="categoryCode" attach chips label="영상 카태고리" multiple></v-select>
                <v-text-field v-model="creatorVideoLangs" label="영상길이(초)" required></v-text-field>
                <v-textarea v-model="creatorVideoDoc" label="영상 설명" value=""></v-textarea>
                <!-- <v-text-field v-model="creatorVideoDate" label="등록날짜" required></v-text-field>
                <v-text-field v-model="creatorVideoStatus" label="영상등록 상태" readonly></v-text-field> -->
              </v-col>
            </v-row>
            <hr />
            <v-card-actions class="justify-center ma-10">
              <v-btn type="submit" color="success" x-large class="pl-10 pr-10">
                영상 등록
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import router from '../routes';
import bus from '@/utils/bus';
import deleteMixin from '@/mixins/delete.js';
import FileUploadh from '@/components/form/FileUpload_h.vue';
import FileUploadv from '@/components/form/FileUpload_v.vue';
import fileUploadMixin from '@/mixins/fileUpload';

export default {
  mixins: [deleteMixin, fileUploadMixin],
  components: {
    FileUploadh,
    FileUploadv,
  },
  data() {
    return {
      creatorVideoSid: '',
      creatorVideoTitle: '',
      creatorVideoYoutubeUrl: '',
      creatorVideoCategoryList: [],
      creatorVideoCategory: [],
      creatorVideoLangs: '',
      creatorVideoDoc: '',
      // creatorVideoDate: '',
      // creatorVideoStatus: '',
      file: [],
      nextm1Files: [],
      nextm2Files: [],
      message: true,
      nameRules: [v => !!v || '해당 대용을 입력해 주세요!', v => (v && v.length <= 100) || '입력 자리수를 확인해 주세요'],
    };
  },
  computed: {
    ...mapGetters('common', ['getCreatoryVideoCategorys']),
    ...mapGetters('common', ['getFileDeleteResult']),
    ...mapGetters('creatorVideo', ['getCreatorVideoInsert', 'getCreatorVideoResult']),
  },
  async created() {
    bus.$emit('start:spinner');
    try {
      await this.$store.dispatch('common/CREATORVIDEO_CATEGORY');
      this.creatorVideoCategoryList = this.getCreatoryVideoCategorys;
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
    isFiles(flag) {
      this.message = flag;
    },
    creatorVideoListClick() {
      router.push({ path: '/creatorvideolist' });
    },
    async submitForm() {
      const creatorVideoData = {
        creatorVideoTitle: this.creatorVideoTitle,
        creatorVideoYoutubeUrl: this.creatorVideoYoutubeUrl,
        creatorVideoCategory: this.creatorVideoCategory,
        creatorVideoLangs: this.creatorVideoLangs,
        creatorVideoDoc: this.creatorVideoDoc,
        creatorVideoDate: this.creatorVideoDate,
        nextm1Files: this.nextm1Files,
        nextm2Files: this.nextm2Files,
      };

      await this.$store.dispatch('creatorVideo/CREATORVIDEO_INSERT', creatorVideoData);
      if (this.getCreatorVideoResult.nextmApiResult.errorCode == 200) {
        alert(this.getCreatorVideoResult.nextmApiResult.errorMessage);
        this.creatorVideoListClick();
      } else {
        this.$notify({
          group: 'notifyMessage',
          text: this.getCreatorVideoResult.nextmApiResult.errorMessage,
        });
      }
    },
    async youtubeSearch() {
      if (this.creatorVideoYoutubeUrl == '') {
        this.$notify({
          group: 'notifyMessage',
          text: '유튜브 URL을 입력해 주세요!',
        });
        return false;
      }
      let youtubeId = this.creatorVideoYoutubeUrl.split('/').slice(-1)[0];
      console.log(youtubeId);
      const youtubeData = {
        youtubeId: youtubeId,
      };
      await this.$store.dispatch('creatorVideo/YOUTUBE_SEARCH', youtubeData);
      if (this.getCreatorVideoResult.nextmApiResult.errorCode == 200) {
        let video = this.getCreatorVideoResult.nextmApiResult.youtube.video;

        this.creatorVideoTitle = video.snippet.title;
        this.creatorVideoLangs = video.contentDetails.videoTimeSec;
        this.creatorVideoDoc = video.snippet.description;
      } else {
        this.$notify({
          group: 'notifyMessage',
          text: this.getCreatorVideoResult.nextmApiResult.errorMessage,
        });
      }
    },
  },
};
</script>

<style></style>
