<template>
  <div>
    <canvas
      width="800"
      height="800"
      ref="canvas"
      v-once
      @mousemove="draw"
      @mousedown="startDrawing"
      @mouseup="stopDrawing"
      @mouseout="stopDrawing"
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
      lastX: 0,
      lastY: 0,
      hue: 0
    };
  },

  methods: {
    startDrawing() {
      this.isDrawing = true;
    },
    stopDrawing() {
      this.isDrawing = false;
    },
    draw(e) {
      if (!this.isDrawing) return;

      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = 1;
      this.ctx.lineCap = "round";

      this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.stroke();
      this.ctx.beginPath();
      //this.ctx.moveTo(this.lastX, this.lastY); //this is awesome
      this.ctx.moveTo(e.offsetX, e.offsetY);

      this.hue++;
      if (this.hue >= 360) {
        this.hue = 0;
      }
    },

    loadImage() {
      const img = new Image();
      const randomNumber = Math.random();

      console.log(
        `https://api.adorable.io/avatars/${window.innerHeight}/${randomNumber}`
      );

      img.src = `https://api.adorable.io/avatars/300/${randomNumber}`;
      img.onload = () => {
        this.ctx.drawImage(
          img,
          window.innerWidth / 2 - 150,
          window.innerHeight / 2 - 150
        );
        let pixels = this.ctx.getImageData(100, 100, 1, 1);

        this.ctx.putImageData(pixels, 150, 10);
        console.log(pixels, "pp");
      };

      // const faceColor =  window.innerWidth/2 - 152
    }
  },

  mounted() {
    window.addEventListener("DOMContentLoaded", this.loadImage);
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
  }
};
</script>



