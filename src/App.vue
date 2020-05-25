<template>
  <div id="app">
    <ControlPanel @toggle-background="onToggleBackground" />
    <div class="canvas-container">
      <img v-if="!hideImage" :src="imageUrl" class="background-image" />
      <Canvas class="canvas" />
    </div>

  </div>
</template>

<script>
import ControlPanel from "./components/ControlPanel.vue";
import Canvas from "./components/Canvas.vue";

export default {
  components: {
    Canvas,
    ControlPanel
  },

  data() {
    return {
      randomNumber: Math.random(),
      hideImage: false,
    };
  },

  watch: {
    hideImage: {
      handler() {
        this.hasError = false
      },
    },
  },

  computed: {
    imageUrl() {
      return`https://api.adorable.io/avatars/300/${this.randomNumber}`;
    }
  },

  methods: {
    onToggleBackground() {
      console.log(this.hideImage)
      this.hideImage = !this.hideImage
    },

  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background: rgb(222, 255, 252); */
}
body {
  margin: 0;
  overflow: hidden;
}

.canvas-container {
  background: rgba(122,122,122,0.5);
}

.background-image {
  position: absolute;
  top: 303px;
}
.canvas {
  position: relative;
  top: 303px;
  background: rgba(22,22,22,0.5);
}
</style>
