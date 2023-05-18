import { boot } from "quasar/wrappers";
import { VueReCaptcha } from "vue-recaptcha-v3";
import { getLatestRelease } from "boot/axios";

const repoMap = {
  techminoGalaxy: "Techmino_Galaxy",
  techmino: "Techmino",
  quatrack: "Quatrack",
};
const appStoreIdMap = {
  Techmino: 1590869403,
  Techmino_Galaxy: 1635554527,
  Quatrack: 1637103655,
};
const testFlightIdMap = {
  Techmino: "SZOFUqFv",
  Techmino_Galaxy: "VJmfHiZC",
  Quatrack: "oBsUkEYN",
};
const extensionMap = {
  android: "Android.apk",
  linux: "Linux.AppImage",
  macosDmg: "macOS_portable.dmg",
  macosPkg: "macOS_portable.pkg",
  windows32: "Windows_x86.zip",
  windows64: "Windows_x64.zip",
  windowsInstaller: "Windows_installer.exe",
};

const useProject = () => "26f-studio";
const useProducts = () => ["techmino", "quatrack", "techminoGalaxy"];
const usePlatforms = () => [
  "android",
  "appstore",
  "linux",
  "macosDmg",
  "macosPkg",
  "testflight",
  "windows32",
  "windows64",
];

const getLatestVersion = async (product) => {
  try {
    return (await getLatestRelease("26F-Studio", repoMap[product]))["tag_name"];
  } catch (e) {
    return null;
  }
};

const getLatestDownloadLink = (product, platform) => {
  if (useProducts().includes(product)) {
    if (platform === "appstore") {
      return `https://apps.apple.com/app/${appStoreIdMap[repoMap[product]]}`;
    }
    if (platform === "testflight") {
      return `https://testflight.apple.com/join/${
        testFlightIdMap[repoMap[product]]
      }`;
    }
    if (extensionMap.hasOwnProperty(platform)) {
      return (
        "https://ghproxy.com/https://github.com/26F-Studio/" +
        repoMap[product] +
        "/releases/latest/download/" +
        `${repoMap[product]}_${extensionMap[platform]}`
      );
    }
  }
  return null;
};

export default boot(({ app }) => {
  app.use(VueReCaptcha, {
    siteKey: "6LcwWwceAAAAAMBMVVWHO05T2fxdKncts2e7aflQ",
    loaderOptions: {
      autoHideBadge: true,
      useRecaptchaNet: true,
      size: "invisible",
    },
  });
  app.config.globalProperties.$project = useProject();
  app.config.globalProperties.$products = useProducts();
  app.config.globalProperties.$platforms = usePlatforms();
});

export {
  useProject,
  useProducts,
  usePlatforms,
  getLatestVersion,
  getLatestDownloadLink,
};
