function creatorVideoCategoryList(data) {
  const cate = [];
  data.forEach(function(row, index) {
    cate[index] = { categoryCode: row.sysCodeSid, categoryName: row.sysCodeName };
  });

  return cate;
}
function creatorVideoList(data) {
  const cData = [];
  data.forEach(function(row, index) {
    cData[index] = {
      creatorVideoSid: row.creatorVideoSid,
      creatorVideoTitle: row.creatorVideoTitle,
      creatorVideoImage: `${process.env.VUE_APP_API_URL}/api/h1/file/videoImageView/${row.creatorVideoSid}`,
      creatorVideoYoutubeUrl: row.creatorVideoYoutubeUrl,
      category: category(row.category_result),
      creatorVideoLangs: row.creatorVideoLangs,
      creatorVideoStatusName: row.creatorVideoStatusName,
    };
  });

  return cData;
}
function category(data) {
  var cate = '';
  data.forEach(function(row) {
    cate += `${row.creatorVideoCategoryName}, `;
  });
  return cate;
}
export { creatorVideoCategoryList, creatorVideoList };
