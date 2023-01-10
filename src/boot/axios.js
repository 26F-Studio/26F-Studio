import axios from "axios";
import { boot } from "quasar/wrappers";

const Method = Object.freeze({
  GET: "get", POST: "post", PUT: "put", DELETE: "delete"
});

const ResultCode = Object.freeze({
  Unknown: 0,
  Completed: 200,
  Continued: 201,
  InvalidFormat: 400,
  InvalidArguments: 401,
  NotAvailable: 402,
  NoPermission: 403,
  NotFound: 404,
  NullValue: 405,
  NotAcceptable: 406,
  Conflict: 409,
  TooFrequent: 429,
  InternalError: 500,
  DatabaseError: 501,
  NetworkError: 502,
  EmailError: 503
});

const baseApi = axios.create({ baseURL: "https://cafuuchino.the26f.org:8443/studio26f/api/v1" });

const genericHttp = (
  url,
  method = Method.GET,
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
      data: data
    }).then(res => {
      if (res.data.code >= 200 && res.data.code < 300) {
        resolve(res.data);
      } else {
        reject(res.data);
      }
    }).catch(err => {
      if (err.hasOwnProperty("response")) {
        reject(err.response);
      } else {
        reject(err);
      }
    });
  });
};

const useApi = () => ({
  auth: {
    oauth: (accessToken, product, recaptcha) => genericHttp(
      "/auth/oauth",
      Method.POST,
      null,
      {
        "x-access-token": accessToken
      },
      {
        "product": product,
        "recaptcha": recaptcha
      }
    ),
    check: (accessToken) => genericHttp(
      "/auth/check",
      Method.GET,
      null,
      {
        "x-access-token": accessToken
      }
    ),
    verifyEmail: (email) => genericHttp(
      "/auth/verify/email",
      Method.POST,
      null,
      null,
      {
        email: email
      }
    ),
    seedEmail: (email) => genericHttp(
      "/auth/seed/email",
      Method.POST,
      null,
      null,
      {
        email: email
      }
    ),
    loginEmailPassword: (email, password) => genericHttp(
      "/auth/login/email",
      Method.POST,
      null,
      null,
      {
        email: email,
        password: password
      }
    ),
    loginEmailCode: (email, code) => genericHttp(
      "/auth/login/email",
      Method.POST,
      null,
      null,
      {
        email: email,
        code: code
      }
    ),
    resetEmail: (email, code, newPassword) => genericHttp(
      "/auth/reset/email",
      Method.PUT,
      null,
      null,
      {
        email: email,
        code: code,
        newPassword: newPassword
      }
    ),
    migrateEmail: (accessToken, newEmail, code) => genericHttp(
      "/auth/migrate/email",
      Method.PUT,
      null,
      {
        "x-access-token": accessToken
      },
      {
        newEmail: newEmail,
        code: code
      }
    ),
    deactivateEmail: (accessToken, code) => genericHttp(
      "/auth/deactivate/email",
      Method.DELETE,
      null,
      {
        "x-access-token": accessToken
      },
      {
        code: code
      }
    )
  },
  player: {
    getInfo: (accessToken, playerId) => genericHttp(
      "/player/info",
      Method.GET,
      {
        playerId: playerId
      },
      {
        "x-access-token": accessToken
      }
    ),
    updateInfo: (accessToken, data) => genericHttp(
      "/player/info",
      Method.PUT,
      null,
      {
        "x-access-token": accessToken
      },
      data
    ),
    getAvatar: (accessToken, playerId) => genericHttp(
      "/player/avatar",
      Method.GET,
      {
        playerId: playerId
      },
      {
        "x-access-token": accessToken
      }
    )
  }
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$http = genericHttp;
  app.config.globalProperties.$api = useApi;
});

export { Method, ResultCode, genericHttp, useApi };
