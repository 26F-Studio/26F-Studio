import {boot} from "quasar/wrappers";

const repoMap = {
  techminoGalaxy: "Techmino_Galaxy",
  techmino: "Techmino",
  quatrack: "Quatrack",
};
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
const extensionMap = {
  android: "Android.apk",
  linux: "Linux.AppImage",
  macosDmg: "macOS_portable.dmg",
  macosPkg: "macOS_portable.pkg",
  windows32: "Windows_x86.zip",
  windows64: "Windows_x64.zip"
};

const useProject = () => "26f-studio";
const usePlatforms = () => [
  "android",
  "appstore",
  "linux",
  "macosDmg",
  "macosPkg",
  "testflight",
  "windows32",
  "windows64"
];

const getLatestDownloadLink = (product, platform) => {
  if (repoMap.hasOwnProperty(product)) {
    if (platform === "appstore") {
      return `https://apps.apple.com/app/${appStoreIdMap[repoMap[product]]}`;
    }
    if (platform === "testflight") {
      return `https://testflight.apple.com/join/${testFlightIdMap[repoMap[product]]}`;
    }
    if (extensionMap.hasOwnProperty(platform)) {
      return "https://ghproxy.com/https://github.com/26F-Studio/" +
        repoMap[product] + "/releases/latest/download/" +
        `${repoMap[product]}_${extensionMap[platform]}`;
    }
  }
  return null;
};

export default boot(({app}) => {
  app.config.globalProperties.$project = useProject();
  app.config.globalProperties.$platforms = usePlatforms();
});

export {useProject, usePlatforms, getLatestDownloadLink};
