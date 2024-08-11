import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  // noinspection JSUnusedGlobalSymbols
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const githubApi = axios.create({ baseURL: 'https://api.github.com' });
const studio26fApi = axios.create({
  baseURL: 'https://www.studio26f.org:8443/studio26f/api/v1',
});

// noinspection JSUnusedGlobalSymbols
export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$githubApi = githubApi;
  app.config.globalProperties.$studio26fApi = studio26fApi;
});

export { githubApi, studio26fApi };
