import axios from "axios";
import {boot} from "quasar/wrappers";

const METHOD = Object.freeze({
  GET: 'get', POST: 'post', PUT: 'put', DELETE: 'delete'
})

const baseApi = axios.create({baseURL: "https://cafuuchino.the26f.org:8443/studio26f/api/v1"});

const genericHttp = (
  url,
  method = METHOD.GET,
  params = null,
  headers = null,
  data = null
) => {
  return new Promise((resolve, reject) => {
    baseApi({
      url: url,
      method: method,
      params: params,
      headers: headers,
      data: data,
    }).then(res => {
      if (res.data.code >= 200 && res.data.code < 300) {
        resolve(res.data);
      } else {
        reject(res.data);
      }
    }).catch(err => {
      if (err.hasOwnProperty('response')) {
        reject(err.response);
      } else {
        reject(err);
      }
    });
  });
};

const useApi = () => ({
  auth: {
    check: (accessToken) => genericHttp(
      '/auth/check',
      METHOD.GET,
      null,
      {
        'x-access-token': accessToken
      }
    ),
    refresh: (refreshToken) => genericHttp(
      '/auth/refresh',
      METHOD.GET,
      null,
      {
        'x-refresh-token': refreshToken
      }
    ),
    verifyEmail: (email) => genericHttp(
      '/auth/verify/email',
      METHOD.POST,
      null,
      null,
      {
        email: email
      }
    ),
    seedEmail: (email) => genericHttp(
      '/auth/seed/email',
      METHOD.POST,
      null,
      null,
      {
        email: email
      }
    ),
    loginEmailPassword: (email, password) => genericHttp(
      '/auth/login/email',
      METHOD.POST,
      null,
      null,
      {
        email: email,
        password: password
      }
    ),
    loginEmailCode: (email, code) => genericHttp(
      '/auth/login/email',
      METHOD.POST,
      null,
      null,
      {
        email: email,
        code: code
      }
    ),
    resetEmail: (email, code, newPassword) => genericHttp(
      '/auth/reset/email',
      METHOD.PUT,
      null,
      null,
      {
        email: email,
        code: code,
        newPassword: newPassword
      }
    ),
    migrateEmail: (accessToken, newEmail, code) => genericHttp(
      '/auth/migrate/email',
      METHOD.PUT,
      null,
      {
        'x-access-token': accessToken
      },
      {
        newEmail: newEmail,
        code: code
      }
    ),
    deactivateEmail: (accessToken, code) => genericHttp(
      '/auth/deactivate/email',
      METHOD.DELETE,
      null,
      {
        'x-access-token': accessToken
      },
      {
        code: code
      }
    ),
  },
  player: {
    getInfo: (accessToken, playerId) => genericHttp(
      '/player/info',
      METHOD.GET,
      {
        playerId: playerId
      },
      {
        'x-access-token': accessToken
      }
    ),
    updateInfo: (accessToken, data) => genericHttp(
      '/player/info',
      METHOD.PUT,
      null,
      {
        'x-access-token': accessToken
      },
      data
    ),
    getAvatar: (accessToken, playerId) => genericHttp(
      '/player/avatar',
      METHOD.GET,
      {
        playerId: playerId
      },
      {
        'x-access-token': accessToken
      }
    )
  }
});

export default boot(({app}) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$http = genericHttp
  app.config.globalProperties.$api = useApi;
});

export {genericHttp, useApi};
