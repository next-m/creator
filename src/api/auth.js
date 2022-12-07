import { createInstanceWithAuth } from './index';

// // 로그인, 회원 가입, (ex) 회원 탈퇴
// import { instance } from './index';

// 회원가입 API
function registerUser(userData) {
  return createInstanceWithAuth('/api/h1/signup', userData, {}, 'application/json; charset=utf-8').post();
}

// 로그인 API
function loginUser(userData) {
  return createInstanceWithAuth('/api/h1/login', {}, userData, 'application/json; charset=utf-8').post();
}

// 회원가입 이메일 체크 API
function emailAuthentication(userData) {
  return createInstanceWithAuth('/api/h1/emailAuthentication', userData, {}, 'application/json; charset=utf-8').post();
}

// 회원가입 이메일 체크 코드 확인 API
function emailAuthenticationCode(userData) {
  return createInstanceWithAuth('/api/h1/emailAuthenticationNumber', userData, {}, 'application/json; charset=utf-8').post();
}

// 개인정보 취급 방침
function policyDoc(userData) {
  return createInstanceWithAuth('/api/h1/policy/privacy', {}, userData, 'application/json; charset=utf-8').get();
}
// 이용약관
function termsDoc(userData) {
  return createInstanceWithAuth('/api/h1/policy/terms', {}, userData, 'application/json; charset=utf-8').get();
}

export { registerUser, loginUser, emailAuthentication, emailAuthenticationCode, policyDoc, termsDoc };

// // 로그인, 회원 가입, (ex) 회원 탈퇴
// import { instance } from './index';

// // 회원가입 API
// function registerUser(userData) {
//   return instance.post('api/h1/signup', userData);
// }

// // 로그인 API
// function loginUser(userData) {
//   return instance.post('api/h1/login', userData);
// }

// // 회원가입 이메일 체크 API
// function emailAuthentication(userData) {
//   return instance.post('api/h1/emailAuthentication', userData);
// }

// // 회원가입 이메일 체크 코드 확인 API
// function emailAuthenticationCode(userData) {
//   return instance.post('api/h1/emailAuthenticationNumber', userData);
// }

// // 개인정보 취급 방침
// function policyDoc(userData) {
//   return instance.get('api/h1/policy/privacy', userData);
// }
// // 이용약관
// function termsDoc(userData) {
//   return instance.get('api/h1/policy/terms', userData);
// }

// // 회원정보 가지고 오기
// function creatorUserInfo(userData) {
//   return instance.post('api/h1/creatorUserInfo', userData);
// }

// export { registerUser, loginUser, emailAuthentication, emailAuthenticationCode, policyDoc, termsDoc, creatorUserInfo };
