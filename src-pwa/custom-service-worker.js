/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxPluginMode is set to "InjectManifest"
 */

import {precacheAndRoute} from 'workbox-precaching';
import {Love} from "src/scripts/love.js";

var threadInfoStruct = 0;
var selfThreadId = 0;
var parentThreadId = 0;
var Module = {};

function threadPrintErr() {
  var text = Array.prototype.slice.call(arguments).join(" ");
  console.error(text)
}

function threadAlert() {
  var text = Array.prototype.slice.call(arguments).join(" ");
  postMessage({cmd: "alert", text: text, threadId: selfThreadId})
}

var err = threadPrintErr;
self.alert = threadAlert;
Module["instantiateWasm"] = function (info, receiveInstance) {
  var instance = new WebAssembly.Instance(Module["wasmModule"], info);
  Module["wasmModule"] = null;
  receiveInstance(instance);
  return instance.exports
};
self.onmessage = function (e) {
  try {
    if (e.data.cmd === "load") {
      Module["DYNAMIC_BASE"] = e.data.DYNAMIC_BASE;
      Module["DYNAMICTOP_PTR"] = e.data.DYNAMICTOP_PTR;
      Module["wasmModule"] = e.data.wasmModule;
      Module["wasmMemory"] = e.data.wasmMemory;
      Module["buffer"] = Module["wasmMemory"].buffer;
      Module["ENVIRONMENT_IS_PTHREAD"] = true;
      if (typeof e.data.urlOrBlob === "string") {
        importScripts(e.data.urlOrBlob)
      } else {
        var objectUrl = URL.createObjectURL(e.data.urlOrBlob);
        importScripts(objectUrl);
        URL.revokeObjectURL(objectUrl)
      }
      Love(Module).then(function (instance) {
        Module = instance;
        postMessage({"cmd": "loaded"})
      })
    } else if (e.data.cmd === "objectTransfer") {
      Module["PThread"].receiveObjectTransfer(e.data)
    } else if (e.data.cmd === "run") {
      Module["__performance_now_clock_drift"] = performance.now() - e.data.time;
      threadInfoStruct = e.data.threadInfoStruct;
      Module["registerPthreadPtr"](threadInfoStruct, 0, 0);
      selfThreadId = e.data.selfThreadId;
      parentThreadId = e.data.parentThreadId;
      var max = e.data.stackBase;
      var top = e.data.stackBase + e.data.stackSize;
      Module["establishStackSpace"](top, max);
      Module["_emscripten_tls_init"]();
      Module["PThread"].receiveObjectTransfer(e.data);
      Module["PThread"].setThreadStatus(Module["_pthread_self"](), 1);
      try {
        var result = Module["dynCall"]("ii", e.data.start_routine, [e.data.arg]);
        if (!Module["getNoExitRuntime"]()) Module["PThread"].threadExit(result)
      } catch (ex) {
        if (ex === "Canceled!") {
          Module["PThread"].threadCancel()
        } else if (ex != "unwind") {
          Atomics.store(Module["HEAPU32"], threadInfoStruct + 4 >> 2, ex instanceof Module["ExitStatus"] ? ex.status : -2);
          Atomics.store(Module["HEAPU32"], threadInfoStruct + 0 >> 2, 1);
          Module["_emscripten_futex_wake"](threadInfoStruct + 0, 2147483647);
          if (!(ex instanceof Module["ExitStatus"])) throw ex
        }
      }
    } else if (e.data.cmd === "cancel") {
      if (threadInfoStruct) {
        Module["PThread"].threadCancel()
      }
    } else if (e.data.target === "setimmediate") {
    } else if (e.data.cmd === "processThreadQueue") {
      if (threadInfoStruct) {
        Module["_emscripten_current_thread_process_queued_calls"]()
      }
    } else {
      err("worker.js received unknown command " + e.data.cmd);
      err(e.data)
    }
  } catch (ex) {
    err("worker.js onmessage() captured an uncaught exception: " + ex);
    if (ex.stack) err(ex.stack);
    throw ex
  }
};

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST)
