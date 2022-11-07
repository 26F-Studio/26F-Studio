import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({ baseURL: "https://api.example.com" });

const githubApi = axios.create({ baseURL: "https://api.github.com" });

const useGithub = () => ({
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$github = useGithub();
});

export { api, githubApi };
