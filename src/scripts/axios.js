const errorHandler = async (mainFunction, $q, $t) => {
  try {
    await mainFunction();
  } catch (err) {
    if (err.hasOwnProperty('data') && err.data.hasOwnProperty('message')) {
      $q.notify({
        type: 'warning',
        message: $t(err.data.message),
        caption: err.data.reason
      });
    } else if (err.hasOwnProperty('code')) {
      $q.notify({
        type: 'negative',
        message: err.message,
        caption: err.code
      });
    }
    console.log(err);
  }
};

export {errorHandler};
