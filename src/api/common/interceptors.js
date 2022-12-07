import router from '@/routes/index';
import { deleteCookie, getAccessTokenCookie } from '@/utils/cookie';

export function setInterceprors(instance, data, type, commit) {
  const accessCookie = getAccessTokenCookie();
  const isHaveCommit = arguments[3] === undefined ? false : true;
  instance.interceptors.request.use(
    function(config) {
      config.headers['Content-Type'] = type;
      config.headers['Authorization'] = 'Bearer ' + accessCookie;
      config.headers['Access-Control-Allow-Origin'] = '*';
      config.headers['Access-Control-Allow-Headers'] = '*';

      // header('Access-Control-Allow-Origin: *');
      // header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS, post, get');
      // header("Access-Control-Max-Age", "3600");
      // header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
      // header("Access-Control-Allow-Credentials", "true");

      if (isHaveCommit) {
        config.onUploadProgress = ProgressEvent => {
          let percentage = (ProgressEvent.loaded * 100) / ProgressEvent.total;
          let percentCompleted = Math.round(percentage);

          commit('common/percentage', percentCompleted, { root: true }); // 퍼센테이지 리턴
        };
      }
      config.data = data;
      return config;
    },
    function(error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function(response) {
      if (response.status === 401) {
        //alert(response.data.nextmApiResult.token.errorMessage);
        deleteCookie('accessToken');
        deleteCookie('adminUserName');
        router.push('/login');
      }
      return response;
    },
    function(error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    },
  );

  return instance;
}
