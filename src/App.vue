<template>
  <div id="app">
    <TikiBackground class="background" />
    <ControlPanel @toggle-background="onToggleBackground" />
    <div class="canvas-container">
      <img v-show="!hideImage" :src="imageUrl" class="background-image" />
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
      randomNumber: Math.random(),
      hideImage: false
    };
  },

  watch: {
    hideImage: {
      handler() {
        this.hasError = false;
      }
    }
  },

  computed: {
    imageUrl() {
      return `https://api.adorable.io/avatars/300/${this.randomNumber}`;
    }
  },

  methods: {
    onToggleBackground() {
      this.hideImage = !this.hideImage;
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
</style>
