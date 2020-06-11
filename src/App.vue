<template>
  <div id="app">
    <TikiBackground class="background" />
    <ControlPanel
      :isImageHidden="isImageHidden"
      @toggle-background="onToggleImage()"
      @anime="setImageUrl"
      @color-pick="setColor"
      @line-width="onChangeLineWitdh"
    />
    <div class="canvas-container">
      <img
        @load="getImageDimensions"
        ref="drawable"
        :src="imageUrl"
        :class="{ hide: isImageHidden }"
        class="background-image"
      />
      <Canvas
        v-if="imageWidth && imageHeight"
        :width="imageWidth"
        :height="imageHeight"
        :lineWidth="localLineWidth"
        :color="localColor"
        :src="imageUrl"
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
      isImageHidden: false,
      imageUrl: "",
      imageWidth: null,
      imageHeight: null,
      localLineWidth: null,
      localColor: "#000000"
    };
  },

  methods: {
    onToggleImage() {
      this.isImageHidden = !this.isImageHidden;
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

    setColor(color) {
      this.localColor = color;
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
  width: 100%;
  position: absolute;
  display: grid;
  grid-template-rows: 40% 40%;
  grid-template-columns: auto auto;
  background: linear-gradient(
    180deg,
    rgb(102, 234, 253),
    rgb(184, 247, 114),
    rgb(250, 150, 128),
    rgb(249, 220, 129)
  );
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

@media only screen and (max-width: 600px) {
  .canvas-container {
    position: relative;
    float: left;
    left: calc(50% - 150px);
    top: 50px;
  }
}
</style>
