import { fileDownload } from '@/utils/fileDownload';
let fileUpload = {
  data() {
    return {
      deleteAllFiles: false,
    };
  },
  methods: {
    //파일 업로드
    uploadFiles(data) {
      this.nextmFiles = data;
    },
    uploadFiles1(data) {
      this.nextm1Files = data;
    },
    uploadFiles2(data) {
      this.nextm2Files = data;
    },
    //파일 전체 삭제
    deleteAllChip() {
      this.deleteAllFiles = !this.deleteAllFiles;
    },
    //파일다운로드
    fileDownload(data) {
      fileDownload(data);
    },
  },
};
export default fileUpload;
