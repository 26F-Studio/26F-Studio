import { argon2id } from "hash-wasm";

import { useApi } from "boot/axios";

const $api = useApi();

const errorHandler = async (mainFunction, $q, $t) => {
  try {
    await mainFunction();
  } catch (err) {
    if (err.hasOwnProperty("data") && err.data.hasOwnProperty("message")) {
      $q.notify({
        type: "warning",
        message: $t(err.data.message),
        caption: err.data.reason,
      });
    } else if (err.hasOwnProperty("code")) {
      $q.notify({
        type: "negative",
        message: err.message,
        caption: err.code,
      });
    }
    console.log(err);
    return err;
  }
};

const getPasswordHash = async (email, password) => {
  const { data: seed } = await $api.auth.seedEmail(email);
  return await argon2id({
    password: password.trim(),
    salt: seed,
    iterations: 256,
    parallelism: 16,
    memorySize: 512,
    hashLength: 64,
    outputType: "hex",
  });
};

export { errorHandler, getPasswordHash };
