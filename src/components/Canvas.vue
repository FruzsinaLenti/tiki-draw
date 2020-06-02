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
export default {
  props: {
    height: {
      type: Number,
      default: 300
    },

    width: {
      type: Number,
      default: 300

    }
  },

  watch: {
    width: {
      immediate: true,
      handler() {
        this.canvas.width = this.width;
      },
    },
    height: {
      immediate: true,
      handler() {
        this.canvas.height = this.height;
      },
    },
  },

  data() {
    return {
      canvas: null,
      ctx: null,
      isDrawing: false,
      lastX: null,
      lastY: null,
      hue: 0
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
      this.ctx.lineWidth = 5;
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
      this.ctx.lineWidth = 6;
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
      this.lastX = lineToX




      this.lastY = lineToY

      this.hue++;
      if (this.hue >= 360) {
        this.hue = 0;
      }
    }
  },

  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.height = this.height;
    this.canvas.width = this.width;

    window.addEventListener("resize", this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>




