<template>
  <div>
    <v-system-bar app class="toolBar">
      <v-spacer><img src="@/assets/next-m_Logo2.png" class="logo"/></v-spacer>
      <template v-if="isUserLogin">
        <a href="javascript:;" @click="logoutUser" class="toolBarMenu">
          Logout
        </a>
      </template>
      <template v-else>
        <router-link to="/login" class="toolBarMenu">로그인</router-link>
        <router-link to="/signup" class="toolBarMenu">회원가입</router-link>
      </template>
    </v-system-bar>
    <v-navigation-drawer v-model="drawer" app class="leftMenu" v-if="isUserLogin">
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"><img data-v-10a58f4e="" :src="getHomepageUserLoginImage" width="100" height="100"/></v-avatar>

        <div v-if="isUserLogin">{{ getHomepageUserLoginName }}님 환영합니다.</div>
      </v-sheet>
      <v-divider></v-divider>

      <v-list v-if="isUserLogin">
        <v-list-item v-for="[icon, text] in menu" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link :to="`${text[1]}`" class="subMenu">{{ text[0] }}</router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    drawer: null,
    menu: [
      ['mdi-inbox-arrow-down', ['홈', '/main']],
      ['mdi-send', ['콘텐츠 관리', '/creatorvideolist']],
      ['mdi-alert-octagon', ['크리에이터 정보 수정', '/userModify']],
    ],
  }),
  computed: {
    ...mapGetters('member', ['isLogin', 'getHomepageUserLoginName', 'getHomepageUserLoginImage']),
    isUserLogin() {
      return this.isLogin;
    },
    logoLink() {
      return this.$store.getters.isLogin ? '/main' : '/login';
    },
  },
  methods: {
    async logoutUser() {
      try {
        await this.$store.dispatch('member/LOGOUT');
        await this.$router.push('/login');
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
.leftMenu {
  top: 50px !important;
}
.logo {
  width: 150px;
  margin-top: 10px;
  margin-left: 40px;
}
.toolBar {
  height: 50px !important;
}
.logoTitle {
  color: white;
}
.theme--light.v-system-bar {
  background-color: #37393b;
  color: rgba(0, 0, 0, 0.6);
}
.toolBarMenu {
  color: white;
  padding: 0 10px 0 0;
}
.subMenu {
  color: rgba(0, 0, 0, 0.54);
  padding: 0 10px 0 0;
  text-decoration-line: none;
}
</style>
