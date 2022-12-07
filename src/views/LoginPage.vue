<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-10">
      <v-card-title>
        <h1>Login</h1>
      </v-card-title>
      <v-form @submit.prevent="submitForm" class="form">
        <v-card-text>
          <v-text-field label="Username" prepend-icon="mdi-account-circle" v-model="username" />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid && username">
              이메일 주소 형식이 틀립니다.
            </span>
          </p>
          <v-text-field type="Password" label="Password" prepend-icon="mdi-lock" v-model="password" />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" :disabled="!isUsernameValid || !password" type="submit">Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import { validateEmail } from '@/utils/validation';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters('member', ['getHomepageUserLoginInfo']),
    isUsernameValid() {
      return validateEmail(this.username);
    },
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          homepageUserEmail: this.username,
          password: this.password,
          homepageUserKind: 'SYS22A26B001',
        };
        await this.$store.dispatch('member/LOGIN', userData);
        if (this.getHomepageUserLoginInfo.nextmApiResult.errorCode == 200) {
          await this.$router.push('/main');
        } else {
          console.log(this.getHomepageUserLoginInfo.nextmApiResult);
          this.$notify({
            group: 'notifyMessage',
            text: this.getHomepageUserLoginInfo.nextmApiResult.errorMessage,
          });
        }
      } catch (error) {
        this.$notify({
          group: 'notifyMessage',
          text: error.response.data.nextmApiResult.errorMessage,
        });
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style></style>
