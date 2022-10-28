import { boot } from "quasar/wrappers";

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

const getSearchInfo = (platform) => {
  const extensionMap = {
    android: "Android.apk",
    linux: "Linux.AppImage",
    macosDmg: "macOS_portable.dmg",
    macosPkg: "macOS_portable.pkg",
    windows32: "Windows_x86.zip",
    windows64: "Windows_x64.zip"
  };
  return extensionMap[platform];
};

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const splitArray = (array, count, isBalanced) => {
  if (count < 2)
    return [array];

  let len = array.length,
    out = [],
    i = 0,
    size;

  if (len % count === 0) {
    size = Math.floor(len / count);
    while (i < len) {
      out.push(array.slice(i, i += size));
    }
  } else if (isBalanced) {
    while (i < len) {
      size = Math.ceil((len - i) / count--);
      out.push(array.slice(i, i += size));
    }
  } else {
    count--;
    size = Math.floor(len / count);
    if (len % size === 0)
      size--;
    while (i < size * count) {
      out.push(array.slice(i, i += size));
    }
    out.push(array.slice(size * count));
  }
  return out;
};

export default boot(({ app }) => {
  app.config.globalProperties.$project = useProject();
  app.config.globalProperties.$platforms = usePlatforms();
  app.config.globalProperties.$sleep = sleep;
  app.config.globalProperties.$splitArray = splitArray;
});

export { useProject, usePlatforms, getSearchInfo, sleep, splitArray };
