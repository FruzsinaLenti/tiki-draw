<template>
  <canvas
    ref="canvas"
    @mousemove="draw"
    @mousedown="startDrawing"
    @mouseup="stopDrawing"
    @mouseout="stopDrawing"
    @touchmove="draw"
    @touchstart="startDrawing"
    @touchend="stopDrawing"
    @touchcancel="stopDrawing"
  ></canvas>
</template>

<script>
import { EventBus } from "../services/event-bus.js";

export default {
  props: {
    height: {
      type: Number
    },

    width: {
      type: Number
    },

    lineWidth: {
      type: String
    }
  },

  watch: {
    width: {
      immediate: true,
      handler() {
        this.localWidth = this.width;
      }
    },

    height: {
      immediate: true,
      handler() {
        this.localHeight = this.height;
      }
    }
  },

  data() {
    return {
      canvas: null,
      ctx: null,
      isDrawing: false,
      lastX: null,
      lastY: null,
      hue: 0,
      localWidth: 300,
      localHeight: 300
    };
  },

  methods: {
    startDrawing() {
      this.isDrawing = true;
    },

    stopDrawing() {
      this.isDrawing = false;
      this.lastX = null;
      this.lastY = null;
    },

    handleResize() {
      this.canvas.height = this.height;
      this.canvas.width = this.width;
    },

    funDraw(e) {
      if (!this.isDrawing) return;

      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.lineCap = "round";

      this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastX, this.lastY); //this is awesome

      this.hue++;
      if (this.hue >= 360) {
        this.hue = 0;
      }
    },

    draw(e) {
      if (!this.isDrawing) return;

      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 84%)`;

      this.ctx.beginPath();
      let lineToX;
      let lineToY;
      if (e.type === "touchmove") {
        lineToX = e.touches[0].clientX;
        lineToY = e.touches[0].clientY;
      } else {
        lineToX = e.offsetX;
        lineToY = e.offsetY;
      }
      this.ctx.moveTo(this.lastX || lineToX, this.lastY || lineToY);
      this.ctx.lineTo(lineToX, lineToY);

      this.ctx.stroke();
      this.lastX = lineToX;
      this.lastY = lineToY;

      this.hue++;
      if (this.hue >= 360) {
        this.hue = 0;
      }
    },

    getImageToDownload() {
      const image = this.$refs.canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      console.log(image, "image");
      this.$emit("on-download", image);
    }

    //     function loadImage() {
    //   const img = new Image()
    //   const randomNumber = Math.random()
    //   console.log(`https://api.adorable.io/avatars/${window.innerHeight}/${randomNumber}`)
    //   img.src = `https://api.adorable.io/avatars/300/${randomNumber}`
    //   img.onload = () => {
    //     ctx.drawImage(img, window.innerWidth/2 - 150, window.innerHeight/2 - 150)
    //   }

    //   const faceColor =  window.innerWidth/2 - 152

    //   let pixels = ctx.getImageData(window.innerWidth/2 - 140, window.innerHeight/2 - 140, 2, 3)
    //   console.log(pixels, 'pp')

    // }
  },

  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.height = this.localHeight;
    this.canvas.width = this.localWidth;

    // window.addEventListener("resize", this.handleResize);

    EventBus.$on("download", () => {
      const image = this.$refs.canvas.toDataURL("image/png");

      var link = document.createElement("a");
      link.download = "filename.png";
      link.href = image;
      link.click();
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>




