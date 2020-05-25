<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      ctx: null,
      isDrawing: false,
      lastX: null,
      lastY: null,
      hue: 0,
      randomNumber: Math.random()
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
      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerWidth;
      this.loadImage()
        .then(img => {
          this.ctx.drawImage(
            img,
            window.innerWidth / 2 - 150,
            window.innerHeight / 2 - 150
          );
        })
        .catch(err => console.error(err));
    },
    draw(e) {
      if (!this.isDrawing) return;

      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = 6;
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;

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
      if (e.type === "touchmove") {
        [this.lastX, this.lastY] = [e.touches[0].clientX, e.touches[0].clientY];
      } else {
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
      }

      this.hue++;
      if (this.hue >= 360) {
        this.hue = 0;
      }
    },

    loadImage() {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.addEventListener("load", () => resolve(img));
        img.addEventListener("error", err => reject(err));
        img.src = `https://api.adorable.io/avatars/300/${this.randomNumber}`;
      });
    }
  },

  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.loadImage()
      .then(img => {
        this.ctx.drawImage(
          img,
          window.innerWidth / 2 - 150,
          window.innerHeight / 2 - 150
        );
      })
      .catch(err => console.error(err));

    window.addEventListener("resize", this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>



