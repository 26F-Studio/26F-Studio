import { boot } from "quasar/wrappers";

const useProject = () => "26f-studio";
const usePlatforms = () => [
  "windows32",
  "windows64",
  "macos",
  "linux",
  "android",
  "ios"
];

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
  app.config.globalProperties.$project = project;
  app.config.globalProperties.$platforms = [
    "windows32",
    "windows64",
    "macos",
    "linux",
    "android",
    "ios"
  ];
  app.config.globalProperties.$sleep = sleep;
  app.config.globalProperties.$splitArray = splitArray;
});

export { useProject, usePlatforms, sleep, splitArray };
