<template>
  <div>
    <v-row class="pl-3 pt-5">
      <h1>회원가입</h1>
      <caption class="pl-2 pt-4">
        (Creator 회원만 가입할 수 있으며 가입 후 관리자의 인증을 통해 로그인 할 수 있습니다.)
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
                <v-virtual-scroll height="200" item-height="20" class="termsDoc" v-html="termsDoc"></v-virtual-scroll>
                <v-checkbox v-model="homepageUserFlag" :rules="[v => !!v || '필수 동의 사항입니다.']" label="이용약관에 동의 합니다." required></v-checkbox>
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
                회원가입
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { registerUser, emailAuthentication, emailAuthenticationCode, termsDoc } from '@/api/auth';
import { validateEmail } from '@/utils/validation';
export default {
  data() {
    return {
      // form values
      homepageUserName: '',
      homepageUserEmail: '',
      homepageUserCreatorTel: '',
      homepageUserCreatorGender: 'M',
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
      homepageUserKind: 'SYS22A26B001', //creator 회원가입
      isEmailCheck: false,
      termsDoc: '',
      // log
      logMessage: '',
      valid: true,
      nameRules: [v => !!v || '해당 대용을 입력해 주세요!', v => (v && v.length <= 100) || '입력 자리수를 확인해 주세요'],
      emailRules: [v => !!v || '이메일을 입력해 주세요!', v => /.+@.+\..+/.test(v) || '이메일 형식이 맞지 않습니다.'],
      checkbox: false,
    };
  },
  async created() {
    try {
      const { data } = await termsDoc();
      this.termsDoc = data;
    } catch (error) {
      this.$notify({
        group: 'notifyMessage',
        text: error.response.data.nextmApiResult.errorMessage,
      });
    }
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.homepageUserEmail);
    },
  },
  methods: {
    async submitForm() {
      if (this.isEmailCheck == false) {
        alert('이메일 인증을 완료후 회원가입 해주세요!');
        return;
      }
      const userData = {
        homepageUserName: this.homepageUserName,
        homepageUserEmail: this.homepageUserEmail,
        homepageUserCreatorTel: this.homepageUserCreatorTel,
        homepageUserCreatorGender: this.homepageUserCreatorGender,
        homepageUserKind: this.homepageUserKind, //creator 회원가입
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
      };
      const { data } = await registerUser(userData);
      this.$notify({
        group: 'notifyMessage',
        text: data.nextmApiResult.errorMessage,
      });
      if (data.nextmApiResult.errorCode != '999') {
        this.initForm();
      }
    },
    initForm() {
      this.homepageUserName = '';
      this.homepageUserEmail = '';
      this.homepageUserCreatorTel = '';
      this.homepageUserCreatorGender = 'M';
      this.homepageUserCreatorChurch = '';
      this.password = '';
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
  },
};
</script>
<style scoped>
.termsDoc {
  border: 1px solid #ccc;
  font-size: 12px;
  padding: 10px;
}
</style>
