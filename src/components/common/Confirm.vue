<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="text-h6 pa-2 grey lighten-2"> {{ title }} </v-card-title>

      <v-card-text class="pt-7">
        <span class="text">{{ text }}</span>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="close('N')"> 취소 </v-btn>
        <v-btn color="primary" text @click="close('Y')"> {{ deleteText === undefined ? '삭제' : deleteText }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['open', 'txt', 'h1', 'type', 'parentSid', 'kind', 'deleteText'],
  data() {
    return {
      dialog: false,
      title: '',
      text: '',
      select: '',
    };
  },
  watch: {
    open(data) {
      this.dialog = data;
    },
    txt(data) {
      this.text = data;
    },
    h1(data) {
      this.title = data;
    },
    type(data) {
      this.select = data;
    },
  },
  methods: {
    close(data) {
      this.dialog = false;
      this.$emit('resetConfirm', { del: data, type: this.select, kind: this.kind, parentSid: this.parentSid });
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 17px;
  margin-top: 15px;
}
</style>
