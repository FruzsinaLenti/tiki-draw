<template>
  <div id="app">
    <TikiBackground class="background" />
    <ControlPanel
      @toggle-background="onToggleBackground"
      @anime="setImageUrl"
      @line-width="onChangeLineWitdh"
    />
    <div class="canvas-container">
      <img
        @load="getImageDimensions"
        ref="drawable"
        :src="imageUrl"
        :class="{ hide: hideImage }"
        class="background-image"
      />
      <Canvas
        :width="imageWidth"
        :height="imageHeight"
        :lineWidth="localLineWidth"
        class="canvas-wrapper"
      />
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
      imageUrl: "",
      imageWidth: 300,
      imageHeight: 300,
      localLineWidth: null,
      localImageForDownload: null
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

    async getImageDimensions() {
      await this.$nextTick(() => {
        this.imageWidth = this.$refs.drawable.width;
        this.imageHeight = this.$refs.drawable.height;
      });
    },

    setImageUrl(image) {
      this.imageUrl = image;
    },

    onChangeLineWitdh(lineWidth) {
      this.localLineWidth = lineWidth;
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
  grid-template-rows: 40% 40%;
  grid-template-columns: auto auto;
  /* grid-template-rows: 40% 50%;
  grid-template-columns: 300px 350px auto; */
}

.canvas-container {
  position: relative;
  float: left;
  left: calc(50% - 100px);
  top: 100px;
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
