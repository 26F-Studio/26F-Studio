<script setup>
import {onMounted} from "vue";
import {Game} from "src/scripts/game.js";
import {Love} from "src/scripts/love.js";

function goFullScreen() {
  const canvas = document.getElementById("canvas");
  if (canvas.requestFullScreen)
    canvas.requestFullScreen();
  else if (canvas.webkitRequestFullScreen)
    canvas.webkitRequestFullScreen();
  else if (canvas.mozRequestFullScreen)
    canvas.mozRequestFullScreen();
}

function FullScreenHook() {
  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

onMounted(() => {
  const loadingContext = document.getElementById('loadingCanvas').getContext('2d');

  function drawLoadingText(text) {
    const canvas = loadingContext.canvas;

    loadingContext.fillStyle = "rgb(142, 195, 227)";
    loadingContext.fillRect(0, 0, canvas.scrollWidth, canvas.scrollHeight);

    loadingContext.font = '2em arial';
    loadingContext.textAlign = 'center'
    loadingContext.fillStyle = "rgb( 11, 86, 117 )";
    loadingContext.fillText(text, canvas.scrollWidth / 2, canvas.scrollHeight / 2);

    loadingContext.fillText("Powered By Emscripten.", canvas.scrollWidth / 2, canvas.scrollHeight / 4);
    loadingContext.fillText("Powered By LÖVE.", canvas.scrollWidth / 2, canvas.scrollHeight / 4 * 3);
  }

  window.onload = function () {
    window.focus();
  };
  window.onclick = function () {
    window.focus();
  };

  const module = {
    arguments: ["./game.love"],
    INITIAL_MEMORY: 134217728,
    printErr: console.error.bind(console),
    locateFile: function (path) {
      return process.env.PROD ? `../${path}` : path;
    },
    canvas: (function () {
      const canvas = document.getElementById('canvas');

      // As a default initial behavior, pop up an alert when webgl context is lost. To make your
      // application robust, you may want to override this behavior before shipping!
      // See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
      canvas.addEventListener("webglcontextlost", function (e) {
        alert('WebGL context lost. You will need to reload the page.');
        e.preventDefault();
      }, false);

      return canvas;
    })(),
    setStatus: function (text) {
      if (text) {
        drawLoadingText(text);
      } else if (module.remainingDependencies === 0) {
        document.getElementById('loadingCanvas').style.display = 'none';
        document.getElementById('canvas').style.visibility = 'visible';
      }
    },
    totalDependencies: 0,
    remainingDependencies: 0,
    monitorRunDependencies: function (left) {
      this.remainingDependencies = left;
      this.totalDependencies = Math.max(this.totalDependencies, left);
      module.setStatus(left ? 'Preparing... (' + (this.totalDependencies - left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
    }
  };
  module.setStatus('Downloading...');
  window.onerror = function (event) {
    console.error(event);
    // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
    module.setStatus('Exception thrown, see JavaScript console');
    module.setStatus = function (text) {
      if (text) module.printErr('[post-exception status] ' + text);
    };
  };
  Game(module);
  Love(module);
});
</script>

<template>
  <div class="column items-center full-width">
    <canvas id="loadingCanvas" @contextmenu.prevent width="800" height="600"></canvas>
    <canvas id="canvas" @contextmenu.prevent/>
    <div class="row justify-center q-py-xl q-mb-xl">
      <q-btn
        class="btn-primary"
        label="FullScreen"
        padding="0.4rem 1.25rem"
        size="1.25rem"
        @click="goFullScreen"/>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
