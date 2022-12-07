<template>
  <div class="file-add">
    <div class="file-wrap">
      <v-file-input
        prepend-icon="mdi-plus-box-multiple"
        :rules="rules"
        :accept="accept"
        v-model="test"
        multiple
        truncate-length="15"
        @change="selectFile"
        placeholder="세로 영상이미지"
        :class="{ 'file-select': addClass === true }"
      >
        <template v-slot:selection="{ index, text, file }">
          <v-chip small label close @click:close="deleteChip(index, file)">
            {{ text }}
          </v-chip>
        </template>
      </v-file-input>
    </div>
    <!-- 알럿 -->
  </div>
</template>

<script>
import bus from '@/utils/bus';
import Compressor from 'compressorjs';
export default {
  props: ['deleteAll', 'fileType', 'videoType'],
  data() {
    return {
      test: [],
      nextm2Files: [],
      nextm2FilesOrigin: [],
      deleteFile: '',
      fileSizing: 100000000,
      addClass: false,
      accept: this.fileType,
      //파일용량
      volume: true,
      rules: [
        files => {
          if (files !== undefined) {
            this.volume = true;
            files.forEach(row => {
              if (row.size > this.fileSizing) {
                this.volume = false;
                this.volumeAlim();
              }
            });
            return true;
          } else {
            return false;
          }
        },
      ],
    };
  },
  watch: {
    deleteAll() {
      this.deleteAllChip();
    },
    nextm2Files(data) {
      this.$emit('uploadFiles2', data);
    },
    //파일 리사이징
    nextm2FilesOrigin(file) {
      const uploadfileLen = this.nextm2Files.length;
      const len = file.length;
      const fileSize = [];
      const _this = this;
      if (uploadfileLen < len) {
        bus.$emit('start:spinnerBg');
        if (file.length === 0) {
          this.nextm2Files = [];
          bus.$emit('end:spinnerBg');
        }
        file.forEach(ele => {
          if (ele.type == 'image/png' || ele.type == 'image/jpg' || ele.type == 'image/jpeg' || ele.type == 'image/gif') {
            new Compressor(ele, {
              quality: 1,
              success(result) {
                fileSize.push(new File([result], ele.name));
                if (fileSize.length === len) {
                  _this.nextm2Files = fileSize;
                  bus.$emit('end:spinnerBg');
                }
              },
              error(err) {
                console.log(err.message);
              },
            });
          } else {
            fileSize.push(ele);
            if (fileSize.length === len) {
              _this.nextm2Files = fileSize;
              bus.$emit('end:spinnerBg');
            }
          }
        });
      } else {
        if (this.deleteFile !== '') {
          let delfile = this.deleteFile.name;
          const newFile = [];
          this.nextm2Files.forEach(ele => {
            if (ele.name !== delfile) {
              newFile.push(ele);
            }
          });
          this.nextm2Files = newFile;
        }
        if (this.nextm2FilesOrigin < 1) {
          this.nextm2Files = [];
        }
      }
    },
  },
  //videoType이 video일 경우 파일 사이징 500mb로
  mounted() {
    this.setFileSize();
  },
  methods: {
    //파일 첨부
    selectFile(file) {
      this.nextm2FilesOrigin = file;
      if (file.length > 0) {
        this.addClass = true;
      } else {
        this.addClass = false;
      }
    },
    deleteChip(index, file) {
      this.nextm2FilesOrigin.splice(index, 1);
      this.deleteFile = file;
    },
    deleteAllChip(index) {
      if (this.nextm2FilesOrigin.length > 0) {
        this.nextm2FilesOrigin.splice(index);
        this.nextm2Files = [];
      }
    },
    //용량체크 알림
    volumeAlim() {
      this.$notify({
        group: 'notifyMessage',
        text: '용량이 너무 큽니다. 10MB이하로 줄여주세요',
      });

      this.deleteAllChip();
    },
    setFileSize() {
      if (this.videoType === 'video') {
        this.fileSizing = 5000000000;
      } else {
        this.fileSizing = 100000000;
      }
    },
  },
};
</script>

<style></style>
