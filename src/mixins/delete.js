let del = {
  data() {
    return {
      dialog: false,
      dialogTitle: '',
      dialogText: '',
      dialogKind: '', // 한 화면에서 2개 이상의 모달을 띄우기 위한 구분 변수?
      type: '',
      sid: '',
    };
  },
  methods: {
    // custom
    // alert띄워야할때(삭제가아닌 확인용으로)
    customConfirm(kind) {
      this.type = 'list';
      this.dialog = true;
      this.dialogTitle = this.confirmTitle;
      this.dialogText = this.confirmText;
      this.dialogKind = kind;
    },
    copyConfirm() {
      this.type = 'list';
      this.dialog = true;
      this.dialogTitle = this.confirmTitle;
      this.dialogText = this.confirmText;
      this.dialogKind = 'YY';
    },
    //삭제컨펌 호출
    confirm(id, kind) {
      if (id == '') {
        this.alim('삭제할 데이터를 선택해주세요.', this.errorColor);
      } else {
        this.type = 'deleteData';
        this.dialog = true;
        this.dialogTitle = '삭제';
        this.dialogText = '선택한 데이터를 삭제 하시겠습니까?';
        this.dialogKind = kind;
        this.sid = id;
      }
    },
    //사진 삭제컨펌 호출
    confirmPhoto(id) {
      if (id !== '') {
        this.delId = id;
      }
      this.dialog = true;
      this.dialogTitle = '파일 삭제';
      this.dialogText = '선택한 파일을 삭제 하겠습니까?';
      this.type = 'photo';
    },
    //파일 삭제컨펌 호출
    confirmFile(id) {
      this.delId = id;
      this.dialog = true;
      this.dialogTitle = '첨부파일 삭제';
      this.dialogText = '선택한 첨부파일을 삭제 하겠습니까?';
      this.type = 'file';
    },
    confirmVideo(id) {
      this.delId = id;
      this.dialog = true;
      this.dialogTitle = '첨부파일 삭제';
      this.dialogText = '선택한 비디오를 삭제 하겠습니까?';
      this.type = 'video';
    },
    resetDeleteData() {
      this.dialog = false;
      this.dialogTitle = '';
      this.dialogText = '';
      this.type = '';
    },
    completeDelete() {
      this.dialog = true;
      this.dialogTitle = '';
      this.dialogText = '정상적으로 삭제되었습니다.';
      this.type = 'list';
    },
  },
};
export default del;
