import VueCookies from 'vue-cookies';
//생성
function saveAccessTokenCookie(value) {
  VueCookies.set('accessToken', value, '0');
}
function creatorUserSidCookie(value) {
  VueCookies.set('creatorUserSid', value, '0');
}
function creatorUserNameCookie(value) {
  VueCookies.set('creatorUserName', value, '0');
}
function creatorUserImageCookie(value) {
  VueCookies.set('creatorUserImage', value, '0');
}
function uiCodeCookie(value) {
  VueCookies.set('uiCode', value, '0');
}
//호출
function getCreatorUserNameCookie() {
  return VueCookies.get('creatorUserName');
}
function getAccessTokenCookie() {
  return VueCookies.get('accessToken');
}
function getCreatorUserSidCookie() {
  return VueCookies.get('creatorUserSid');
}
function getCreatorUserImageCookie() {
  return VueCookies.get('creatorUserImage');
}
function getUiCodeCookie() {
  return VueCookies.get('uiCode');
}
//삭제
function deleteCookie(value) {
  VueCookies.remove(value);
}

export {
  getAuthFromCookie,
  getUserFromCookie,
  uiCodeCookie,
  getUiCodeCookie,
  saveAccessTokenCookie,
  creatorUserSidCookie,
  creatorUserNameCookie,
  creatorUserImageCookie,
  deleteCookie,
  getAccessTokenCookie,
  getCreatorUserSidCookie,
  getCreatorUserNameCookie,
  getCreatorUserImageCookie,
};

// function saveAuthToCookie(value) {
//   document.cookie = `access_token=${value}`;
// }

// function saveUserToCookie(value) {
//   document.cookie = `homepageUserSid=${value}`;
// }
// function saveUserEmailToCookie(value) {
//   document.cookie = `homepageUserEmail=${value}`;
// }

function getAuthFromCookie() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
}

function getUserFromCookie() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)homepageUserEmail\s*=\s*([^;]*).*$)|^.*$/, '$1');
}

// function deleteCookie(value) {
//   document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
// }

// export { saveAuthToCookie, saveUserToCookie, getAuthFromCookie, getUserFromCookie, deleteCookie, saveUserEmailToCookie };
