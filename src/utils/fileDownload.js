import axios from 'axios';
function fileDownload(data) {
  axios({
    url: `${process.env.VUE_APP_API}/file/fileView/${data.id}`,
    method: 'GET',
    responseType: 'blob',
  }).then(response => {
    var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
    var fileLink = document.createElement('a');
    fileLink.href = fileUrl;
    fileLink.setAttribute('download', `${data.name}.${data.fileExt}`);
    document.body.appendChild(fileLink);

    fileLink.click();
  });
}

export { fileDownload };
