<template>
  <div>
    <v-row class="pl-3 pt-5">
      <h1>콘탠츠 관리</h1>
      <caption class="pl-2 pt-4">
        유튜브 콘탠츠 수정/삭제 화면입니다.
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
                    <li v-for="(item, index) in file1" :key="index" class="imageArea">
                      <v-icon @click="confirmPhoto(item.url)" class="imageDeleteButton">mdi-close-circle</v-icon>
                      <div v-if="message1 === false" class="thubmnail-type">
                        <img :src="`${url}/api/h1/file/fileView/${item.url}?size=200`" />
                      </div>
                    </li>
                    <div v-if="message1 === true">첨부된 파일이 없습니다.</div>
                  </ul>
                </div>
                <div class="file-wrap">
                  <file-uploadv @uploadFiles2="uploadFiles2" :fileType="'image/*'"></file-uploadv>
                  <ul class="thumbnail mt10">
                    <li v-for="(item, index) in file2" :key="index" class="imageArea">
                      <v-icon @click="confirmPhoto(item.url)" class="imageDeleteButton">mdi-close-circle</v-icon>
                      <div v-if="message2 === false" class="thubmnail-type">
                        <img :src="`${url}/api/h1/file/fileView/${item.url}?size=200`" />
                      </div>
                    </li>
                    <div v-if="message2 === true">첨부된 파일이 없습니다.</div>
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
                <v-text-field v-model="creatorVideoStatusName" label="영상등록 상태" readonly></v-text-field>
              </v-col>
            </v-row>
            <hr />
            <v-card-actions class="justify-center ma-10">
              <v-btn type="submit" color="success" x-large class="pl-10 pr-10">
                영상 수정
              </v-btn>
              <v-btn type="button" color="default" @click="confirm(creatorVideoSid, 'video')" x-large class="pl-10 pr-10">
                영상 삭제
              </v-btn>
              <v-btn type="button" color="default" x-large class="pl-10 pr-10" @click="creatorVideoListClick">
                목록
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
  </div>
</template>

<script>
import router from '../routes';
import confirm from '@/components/common/Confirm.vue';
import { mapGetters } from 'vuex';
import bus from '@/utils/bus';
import deleteMixin from '@/mixins/delete.js';
import FileUploadh from '@/components/form/FileUpload_h.vue';
import FileUploadv from '@/components/form/FileUpload_v.vue';
import fileUploadMixin from '@/mixins/fileUpload';

export default {
  mixins: [deleteMixin, fileUploadMixin],
  components: {
    confirm,
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
      creatorVideoStatusName: '',
      file1: [],
      file2: [],
      nextm1Files: [],
      nextm2Files: [],
      message1: true,
      message2: true,
      nameRules: [v => !!v || '해당 대용을 입력해 주세요!', v => (v && v.length <= 100) || '입력 자리수를 확인해 주세요'],
      url: process.env.VUE_APP_API_URL,
    };
  },
  mounted() {
    this.creatorVideoSid = this.$route.params.creatorVideoSid;
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
    await this.creatorVideoDetail();
  },

  methods: {
    isFiles(flag) {
      this.message = flag;
    },
    initForm() {
      this.creatorVideoTitle = '';
      this.creatorVideoYoutubeUrl = '';
      this.creatorVideoCategory = [];
      this.creatorVideoLangs = '';
      this.creatorVideoDoc = '';
      this.creatorVideoStatusName = '';
      this.file1 = [];
      this.file2 = [];
    },

    async creatorVideoDetail() {
      try {
        await this.initForm();
        bus.$emit('start:spinner');
        await this.$store.dispatch('creatorVideo/CREATORVIDEO_DETAIL', {
          creatorVideoSid: this.creatorVideoSid,
        });
        console.log(this.getCreatorVideoResult.nextmApiResult);
        if (this.getCreatorVideoResult.nextmApiResult.errorCode === 200) {
          const creatorVideoDetail = this.getCreatorVideoResult.nextmApiResult.creatorVideo;
          this.creatorVideoTitle = creatorVideoDetail.creatorVideoTitle;
          this.creatorVideoYoutubeUrl = creatorVideoDetail.creatorVideoYoutubeUrl;
          this.creatorVideoLangs = creatorVideoDetail.creatorVideoLangs;
          this.creatorVideoDoc = creatorVideoDetail.creatorVideoDoc;
          this.creatorVideoDate = creatorVideoDetail.creatorVideoDate;
          this.creatorVideoStatusName = creatorVideoDetail.creatorVideoStatusName;
          this.file = [];
          creatorVideoDetail.category_result.forEach(item => {
            this.creatorVideoCategory.push(item.creatorVideoCategorySid);
          });

          creatorVideoDetail.file_result.forEach(row => {
            console.log(row);
            if (row.fileSid !== '' && row.fileKind == 'SYS22B01B001') {
              //pdf 업로드 가능시 보내야할 데이터
              this.file1.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });
            }
            if (row.fileSid !== '' && row.fileKind == 'SYS22B07B001') {
              //pdf 업로드 가능시 보내야할 데이터
              this.file2.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });
            }
          });
          if (this.file1[0] === undefined) {
            this.message1 = true;
          } else {
            this.message1 = false;
          }
          if (this.file2[0] === undefined) {
            this.message2 = true;
          } else {
            this.message2 = false;
          }
        } else {
          this.$notify({
            group: 'notifyMessage',
            text: this.getCreatorVideoResult.nextmApiResult.errorMessage,
          });
        }
      } catch (error) {
        this.$notify({
          group: 'notifyMessage',
          text: error,
        });
      } finally {
        bus.$emit('end:spinner');
      }
    },
    async submitForm() {
      const creatorVideoData = {
        creatorVideoSid: this.creatorVideoSid,
        creatorVideoTitle: this.creatorVideoTitle,
        creatorVideoYoutubeUrl: this.creatorVideoYoutubeUrl,
        creatorVideoCategory: this.creatorVideoCategory,
        creatorVideoLangs: this.creatorVideoLangs,
        creatorVideoDoc: this.creatorVideoDoc,
        creatorVideoDate: this.creatorVideoDate,
        nextm1Files: this.nextm1Files,
        nextm2Files: this.nextm2Files,
      };

      await this.$store.dispatch('creatorVideo/CREATORVIDEO_UPDATE', creatorVideoData);
      this.$notify({
        group: 'notifyMessage',
        text: this.getCreatorVideoResult.nextmApiResult.errorMessage,
      });
      this.creatorVideoDetail();
    },
    creatorVideoListClick() {
      router.push({ path: '/creatorvideolist' });
    },
    async emitResetConfirm(data) {
      if (data.del === 'Y') {
        if (data.type === 'photo') {
          try {
            bus.$emit('start:spinner');
            await this.$store.dispatch('common/FILE_DELETE', this.delId);
            if (this.getFileDeleteResult.nextmApiResult.errorCode == 200) {
              this.$notify({
                group: 'notifyMessage',
                text: this.getFileDeleteResult.nextmApiResult.errorMessage,
              });
              this.isFiles(false);
            } else {
              this.$notify({
                group: 'notifyMessage',
                text: this.getFileDeleteResult.nextmApiResult.errorMessage,
              });
            }
          } catch (error) {
            this.$notify({
              group: 'notifyMessage',
              text: error.response.data.nextmApiResult.errorMessage,
            });
          } finally {
            bus.$emit('end:spinner');
            this.resetDeleteData();
            this.creatorVideoDetail();
          }
        } else if (data.type === 'deleteData') {
          try {
            bus.$emit('start:spinner');
            await this.$store.dispatch('creatorVideo/CREATORVIDEO_DELETE', this.sid);
            if (this.getCreatorVideoResult.nextmApiResult.errorCode == 200) {
              alert(this.getCreatorVideoResult.nextmApiResult.errorMessage);
            } else {
              this.$notify({
                group: 'notifyMessage',
                text: this.getCreatorVideoResult.nextmApiResult.errorMessage,
              });
            }
          } catch (error) {
            this.$notify({
              group: 'notifyMessage',
              text: error.response.data.nextmApiResult.errorMessage,
            });
          } finally {
            bus.$emit('end:spinner');
            this.resetDeleteData();
            this.creatorVideoListClick();
          }
        }
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

<style scoped>
.imageArea {
  list-style: none;
  border: 1px solid #ededed;
}
</style>
