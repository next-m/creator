<template>
  <v-app id="inspire">
    <AppHeader></AppHeader>
    <v-main>
      <v-container class="" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Spinner :loading="loadingStatus"></Spinner>
    <notifications group="notifyMessage" classes="success" position="top right" />
  </v-app>
</template>
<script>
import AppHeader from '@/components/common/AppHeader.vue';
import Spinner from '@/components/common/LoadingSpinner.vue';
import bus from '@/utils/bus';
export default {
  components: { AppHeader, Spinner },
  computed: {},
  methods: {
    startSpinner() {
      this.loadingStatus = true;
    },
    endSpinner() {
      this.loadingStatus = false;
    },
  },
  data() {
    return {
      loadingStatus: false,
    };
  },
  created() {
    bus.$on('start:spinner', this.startSpinner);
    bus.$on('end:spinner', this.endSpinner);
  },
  beforeDestroy() {
    bus.$off('start:spinner', this.startSpinner);
    bus.$off('end:spinner', this.endSpinner);
  },
};
</script>
<style lang="scss" scoped>
@import '@/css/common.scss';
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
