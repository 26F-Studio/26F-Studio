import { boot } from "quasar/wrappers";
import axios from "axios";
import { getSearchInfo } from "boot/config";

const api = axios.create({ baseURL: "https://api.example.com" });

const githubApi = axios.create({ baseURL: "https://api.github.com" });

const appStoreIdMap = {
  Techmino: 1590869403,
  Techmino_Galaxy: 1635554527,
  Quatrack: 1637103655
};

const testFlightIdMap = {
  Techmino: "SZOFUqFv",
  Techmino_Galaxy: "VJmfHiZC",
  Quatrack: "oBsUkEYN"
};

const useGithub = () => ({
  getDownloadLink: async (repo, platform) => {
    if (platform === "appstore") {
      return `https://apps.apple.com/app/${appStoreIdMap[repo]}`;
    }
    if (platform === "testflight") {
      return `https://testflight.apple.com/join/${testFlightIdMap[repo]}`;
    }
    const { data: refs } = await githubApi.get(`/repos/26F-Studio/${repo}/git/matching-refs/tags`);
    if (refs.length > 0) {
      const { data: release } = await githubApi.get(`/repos/26F-Studio/${repo}/releases/tags/${refs.at(-1).ref.split("/").pop()}`);
      for (const asset of release.assets) {
        if (asset.name.includes(getSearchInfo(platform))) {
          return asset["browser_download_url"];
        }
      }
    } else {
      return null;
    }
  }
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$github = useGithub();
});

export { api, githubApi };
