import axios from 'axios';
import { baseURL, createInstanceWithAuth } from './index';
//로그인 체크
// function loginUser(userData) {
//   return instance.post(`api/h1/login`, userData);
// }
async function loginUser(userData) {
  try {
    const response = await axios.post(`${baseURL}/api/h1/login`, userData, {
      validateStatus: function(status) {
        // 상태 코드가 402 이상일 경우 거부. 나머지(402보다 작은)는 허용.
        return status < 500;
      },
    });
    return response;
  } catch (error) {
    console.log('error :', error);
  }
}
async function modifyUser(data) {
  var frm = new FormData();
  if (data.nextmFiles.length > 0) {
    data.nextmFiles.forEach(row => {
      frm.append('nextmFiles[]', row);
    });
  }
  frm.append('homepageUserName', data.homepageUserName);
  frm.append('homepageUserEmail', data.homepageUserEmail);
  frm.append('homepageUserCreatorTel', data.homepageUserCreatorTel);
  frm.append('homepageUserCreatorGender', data.homepageUserCreatorGender);
  frm.append('password', data.password);

  frm.append('homepageUserConfigPromotion', data.homepageUserConfigPromotion);
  frm.append('homepageUserConfigSms', data.homepageUserConfigSms);
  frm.append('homepageUserConfigEmail', data.homepageUserConfigEmail);
  frm.append('homepageUserConfigPush', data.homepageUserConfigPush);
  frm.append('homepageUserCreatorChannelName', data.homepageUserCreatorChannelName);
  frm.append('homepageUserCreatorChurch', data.homepageUserCreatorChurch);
  frm.append('homepageUserCreatorChurchPlatform', data.homepageUserCreatorChurchPlatform);
  frm.append('homepageUserCreatorChurchPosition', data.homepageUserCreatorChurchPosition);
  frm.append('homepageUserCreatorYoutubeChannel', data.homepageUserCreatorYoutubeChannel);
  frm.append('homepageUserCreatorYoutubeUrl', data.homepageUserCreatorYoutubeUrl);

  return createInstanceWithAuth('/api/h1/creatorUserUpdate', frm, {}, 'application/json; charset=utf-8').post();
}
//로그아웃
function loginout() {
  return createInstanceWithAuth(`/api/h1/logout`, {}, {}, '').post();
}
// 회원정보 가지고 오기
function creatorUserInfo(userData) {
  return createInstanceWithAuth('/api/h1/creatorUserInfo', {}, userData, 'application/json; charset=utf-8').get();
}

export { loginUser, loginout, creatorUserInfo, modifyUser };
