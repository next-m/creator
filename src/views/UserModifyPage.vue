<template>
  <div>
    <v-row class="pl-3 pt-5">
      <h1>정보 수정</h1>
      <caption class="pl-2 pt-4">
        수정화면
      </caption>
    </v-row>
    <v-row class="mt-5">
      <v-col>
        <v-card class="pa-15" outlined tile>
          <v-form @submit.prevent="submitForm">
            <div class="d-flex">
              <div class="md-6">
                <v-text-field full-width v-model="homepageUserName" :counter="10" :rules="nameRules" style="min-width:500px" label="이름" required class="lg-2"></v-text-field>
              </div>
              <div class="md-6">
                <v-radio-group v-model="homepageUserCreatorGender" class="ml-10 mr-10 mx-6">
                  <div class="d-flex">
                    <v-radio label="남자" value="M"></v-radio>
                    <v-radio label="여자" value="F" class="ml-5" style="height: fit-content;"></v-radio>
                  </div>
                </v-radio-group>
              </div>
            </div>
            <v-text-field full-width v-model="homepageUserCreatorTel" :counter="15" :rules="nameRules" label="전화번호" required></v-text-field>
            <div class="d-flex">
              <v-text-field class="pt-5 mr-2" v-model="homepageUserEmail" :rules="emailRules" label="E-mail/ID" required></v-text-field>
              <v-btn class="ma-2 mt-4" @click="emailCheck()"> 이메일로 인증 코드 받기 </v-btn>
              <v-text-field class="pt-5 pl-5 mr-2" v-model="homepageUserEmailAuthenticationCode" label="이메일 인증코드" required></v-text-field>
              <v-btn class="ma-2 mt-4" @click="emailAuthenticationClick()"> 이메일 인증 하기 </v-btn>
            </div>

            <v-text-field v-model="password" :counter="60" label="패스워드" required></v-text-field>
            <v-text-field v-model="password_confirmation" :counter="60" label="패스워드 확인" required></v-text-field>
            <v-text-field v-model="homepageUserCreatorChannelName" :counter="120" :rules="nameRules" label="NEXT-M 채널명" required></v-text-field>
            <v-text-field v-model="homepageUserCreatorChurch" :counter="120" :rules="nameRules" label="섬기는 교회" required></v-text-field>
            <v-text-field v-model="homepageUserCreatorChurchPlatform" :counter="120" :rules="nameRules" label="섬기는 교단" required></v-text-field>
            <v-text-field v-model="homepageUserCreatorChurchPosition" :counter="120" :rules="nameRules" label="섬기는 교회 직분" required></v-text-field>
            <v-text-field v-model="homepageUserCreatorYoutubeChannel" :counter="120" :rules="nameRules" label="유튜브 채널 명" required></v-text-field>
            <v-text-field v-model="homepageUserCreatorYoutubeUrl" :counter="120" :rules="nameRules" label="유튜브 URL" required></v-text-field>
            <v-row>
              <v-col cols="6">
                <div class="file-wrap">
                  <file-upload @uploadFiles="uploadFiles" :fileType="'image/*'"></file-upload>
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
                <v-checkbox v-model="homepageUserConfigPromotion" label="프로모션 수신에 동의 하십니까?"></v-checkbox>
                <v-checkbox v-model="homepageUserConfigSms" label="문자메세지 발송에 동의 하십니까?"></v-checkbox>
                <v-checkbox v-model="homepageUserConfigEmail" label="이메일 수신에 동의 하십니까?"></v-checkbox>
                <v-checkbox v-model="homepageUserConfigPush" label="푸시 알림에 동의 하십니까?"></v-checkbox>
              </v-col>
            </v-row>
            <hr />
            <v-card-actions class="justify-center ma-10">
              <v-btn type="submit" color="success" x-large class="pl-10 pr-10">
                정보 수정
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
import { emailAuthentication, emailAuthenticationCode } from '@/api/auth';
import confirm from '@/components/common/Confirm.vue';
import { validateEmail } from '@/utils/validation';
import { mapGetters } from 'vuex';
import bus from '@/utils/bus';
import deleteMixin from '@/mixins/delete.js';
import FileUpload from '@/components/form/FileUpload.vue';
import fileUploadMixin from '@/mixins/fileUpload';

export default {
  components: {
    confirm,
    FileUpload,
  },
  mixins: [deleteMixin, fileUploadMixin],
  data() {
    return {
      // form values
      homepageUserName: '',
      homepageUserCreatorGender: 'M',
      homepageUserCreatorTel: '',
      homepageUserEmail: '',
      password: '',
      password_confirmation: '',
      homepageUserConfigPromotion: false,
      homepageUserConfigSms: false,
      homepageUserConfigEmail: false,
      homepageUserConfigPush: false,
      homepageUserFlag: false,
      homepageUserCreatorChurch: '',
      homepageUserCreatorChurchPlatform: '',
      homepageUserCreatorChurchPosition: '',
      homepageUserCreatorYoutubeChannel: '',
      homepageUserCreatorYoutubeUrl: '',
      homepageUserEmailAuthenticationCode: '',
      homepageUserCreatorChannelName: '',
      isEmailCheck: true,
      // log
      valid: true,
      nameRules: [v => !!v || '해당 대용을 입력해 주세요!', v => (v && v.length <= 100) || '입력 자리수를 확인해 주세요'],
      emailRules: [v => !!v || '이메일을 입력해 주세요!', v => /.+@.+\..+/.test(v) || '이메일 형식이 맞지 않습니다.'],
      checkbox: false,
      message: true,
      file: [],
      nextmFiles: [],
      url: process.env.VUE_APP_API_URL,
    };
  },
  computed: {
    ...mapGetters('member', ['getHomepageUserLoginInfo']),
    ...mapGetters('common', ['getFileDeleteResult']),
    isUsernameValid() {
      return validateEmail(this.homepageUserEmail);
    },
  },
  async created() {
    bus.$emit('start:spinner');
    try {
      await this.$store.dispatch('member/USERMODIFY_INFO');
      const userInfo = this.getHomepageUserLoginInfo.nextmApiResult.homepageUserCreator;
      console.log(userInfo);
      this.homepageUserName = userInfo.homepageUserName;
      this.homepageUserCreatorGender = userInfo.homepageUserCreatorGender;
      this.homepageUserCreatorTel = userInfo.homepageUserCreatorTel;
      this.homepageUserEmail = userInfo.homepageUserEmail;
      this.homepageUserConfigPromotion = userInfo.homepageUserConfigPromotion == 'Y' ? true : false;
      this.homepageUserConfigSms = userInfo.homepageUserConfigSms == 'Y' ? true : false;
      this.homepageUserConfigEmail = userInfo.homepageUserConfigEmail == 'Y' ? true : false;
      this.homepageUserConfigPush = userInfo.homepageUserConfigPush == 'Y' ? true : false;
      this.homepageUserFlag = userInfo.aaa == 'Y' ? true : false;
      this.homepageUserCreatorChurch = userInfo.homepageUserCreatorChurch;
      this.homepageUserCreatorChurchPlatform = userInfo.homepageUserCreatorChurchPlatform;
      this.homepageUserCreatorChurchPosition = userInfo.homepageUserCreatorChurchPosition;
      this.homepageUserCreatorYoutubeChannel = userInfo.homepageUserCreatorYoutubeChannel;
      this.homepageUserCreatorYoutubeUrl = userInfo.homepageUserCreatorYoutubeUrl;
      this.homepageUserEmailAuthenticationCode = userInfo.homepageUserEmailAuthenticationCode;
      this.homepageUserCreatorChannelName = userInfo.homepageUserCreatorChannelName;

      this.file = [];
      userInfo.file_result.forEach(row => {
        if (row.fileSid !== '') {
          //pdf 업로드 가능시 보내야할 데이터
          this.file.push({ url: row.fileSid, fileExt: row.fileExt, name: row.fileFileName });
        }
      });
      if (this.file[0] === undefined) {
        this.message = true;
      } else {
        this.message = false;
      }
      bus.$emit('end:spinner');
    } catch (error) {
      this.$notify({
        group: 'notifyMessage',
        text: this.getHomepageUserLoginInfo.nextmApiResult.errorMessage,
      });
      bus.$emit('end:spinner');
    }
  },
  methods: {
    async submitForm() {
      if (this.isEmailCheck == false) {
        alert('이메일 인증을 완료후 회원가입 해주세요!');
        return;
      }
      const userData = {
        homepageUserName: this.homepageUserName,
        homepageUserCreatorGender: this.homepageUserCreatorGender,
        homepageUserCreatorTel: this.homepageUserCreatorTel,
        homepageUserEmail: this.homepageUserEmail,
        password: this.password,
        password_confirmation: this.password_confirmation,
        homepageUserConfigPromotion: this.homepageUserConfigPromotion ? 'Y' : 'N',
        homepageUserConfigSms: this.homepageUserConfigSms ? 'Y' : 'N',
        homepageUserConfigEmail: this.homepageUserConfigEmail ? 'Y' : 'N',
        homepageUserConfigPush: this.homepageUserConfigPush ? 'Y' : 'N',
        homepageUserCreatorChurch: this.homepageUserCreatorChurch,
        homepageUserCreatorChurchPlatform: this.homepageUserCreatorChurchPlatform,
        homepageUserCreatorChurchPosition: this.homepageUserCreatorChurchPosition,
        homepageUserCreatorYoutubeChannel: this.homepageUserCreatorYoutubeChannel,
        homepageUserCreatorYoutubeUrl: this.homepageUserCreatorYoutubeUrl,
        homepageUserCreatorChannelName: this.homepageUserCreatorChannelName,
        nextmFiles: this.nextmFiles,
      };
      await this.$store.dispatch('member/USERMODIFY_ACTION', userData);
      this.$notify({
        group: 'notifyMessage',
        text: this.getHomepageUserLoginInfo.nextmApiResult.errorMessage,
      });
    },
    isFiles(flag) {
      this.message = flag;
    },
    initForm() {
      this.homepageUserName = '';
      this.homepageUserCreatorGender = 'M';
      this.homepageUserCreatorTel = '';
      this.homepageUserEmail = '';
      this.homepageUserCreatorChurch = '';
      this.password_confirmation = '';
      this.homepageUserCreatorChurchPlatform = '';
      this.homepageUserCreatorChurchPosition = '';
      this.homepageUserCreatorYoutubeChannel = '';
      this.homepageUserCreatorYoutubeUrl = '';
      this.homepageUserCreatorChannelName = '';
    },
    async emailCheck() {
      try {
        const emailCheckData = {
          homepageUserEmail: this.homepageUserEmail,
        };
        const { data } = await emailAuthentication(emailCheckData);
        this.$notify({
          group: 'notifyMessage',
          text: data.nextmApiResult.errorMessage,
        });
      } catch (error) {
        this.$notify({
          group: 'notifyMessage',
          text: error.response.data.nextmApiResult.errorMessage,
        });
      }
    },
    async emailAuthenticationClick() {
      try {
        const emailAuthenticationData = {
          homepageUserEmailAuthenticationCode: this.homepageUserEmailAuthenticationCode,
          homepageUserEmailAuthenticationEmail: this.homepageUserEmail,
        };
        const { data } = await emailAuthenticationCode(emailAuthenticationData);
        this.$notify({
          group: 'notifyMessage',
          text: data.nextmApiResult.errorMessage,
        });
        this.isEmailCheck = true;
      } catch (error) {
        this.$notify({
          group: 'notifyMessage',
          text: error.response.data.nextmApiResult.errorMessage,
        });
      }
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
          }
        }
      }
      this.resetDeleteData();
    },
  },
};
</script>
<style scoped>
.imageDeleteButton {
  position: absolute;
}
.imageArea {
  list-style: none;
}
</style>
