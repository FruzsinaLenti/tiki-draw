<template>
  <div id="app">
    <TikiBackground class="background" />
    <ControlPanel @toggle-background="onToggleBackground" @anime='setImageUrl' />
    <div class="canvas-container">
      <img :src="imageUrl" class="background-image" :class="{'hide': hideImage }" />
      <Canvas class="canvas-wrapper" />
    </div>
  </div>
</template>

<script>
import ControlPanel from "./components/ControlPanel.vue";
import Canvas from "./components/Canvas.vue";
import TikiBackground from "./components/TikiBackground.vue";

export default {
  components: {
    Canvas,
    ControlPanel,
    TikiBackground
  },

  data() {
    return {
      hideImage: false,
      imageUrl: null
    };
  },

  watch: {
    hideImage: {
      handler() {
        this.hasError = false;
      }
    }
  },

  methods: {
    onToggleBackground() {
      this.hideImage = !this.hideImage;
    },

    setImageUrl(image) {
      this.imageUrl = image
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
}
body {
  margin: 0;
  overflow: hidden;
}

.background {
  position: absolute;
  display: grid;
  grid-template-rows: 40% 50%;
  grid-template-columns: 300px 350px auto;
}

.canvas-container {
  position: relative;
  float: left;
  left: 30%;
  top: 200px;
}

.canvas-wrapper {
  position: absolute;
  top: 0;
  right: 0;
}

.hide {
  opacity: 0;
}
</style>
