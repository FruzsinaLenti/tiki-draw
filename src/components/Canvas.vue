<template>
  <div>
    <canvas
      ref="canvas"
      @mousemove="draw"
      @mousedown="startDrawing"
      @mouseup="stopDrawing"
      @mouseout="stopDrawingOut"
      @touchmove="draw"
      @touchstart="startDrawing"
      @touchend="stopDrawing"
    ></canvas>
  </div>
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
    },

    color: {
      type: String
    },

    src: {
      type: String
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
      redoList: [],
      undoList: []
    };
  },

  watch: {
    width: {
      handler(value) {
        if (value) {
          this.handleResize();
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }
    },

    height: {
      handler(value) {
        if (value) {
          this.handleResize();
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }
    }
  },

  methods: {
    startDrawing() {
      this.isDrawing = true;
      this.saveState();
    },

    stopDrawing() {
      this.saveState();

      this.stopDrawingOut();
    },

    stopDrawingOut() {
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
      this.ctx.strokeStyle = this.color;

      this.ctx.beginPath();
      let lineToX;
      let lineToY;
      if (e.type === "touchmove") {
        lineToX = e.touches[0].clientX - (window.innerWidth / 2 - 150);
        lineToY = e.touches[0].clientY - 50;
      } else {
        lineToX = e.offsetX;
        lineToY = e.offsetY;
      }

      this.ctx.moveTo(this.lastX || lineToX, this.lastY || lineToY);
      this.ctx.lineTo(lineToX, lineToY);

      this.ctx.stroke();
      this.lastX = lineToX;
      this.lastY = lineToY;
    },
    // draw(e) {
    //   if (!this.isDrawing) return;

    //   this.ctx.lineJoin = "round";
    //   this.ctx.lineWidth = this.lineWidth;
    //   this.ctx.lineCap = "round";
    //   this.ctx.strokeStyle = `hsl(${this.hue}, 100%, 84%)`;

    //   this.ctx.beginPath();
    //   let lineToX;
    //   let lineToY;
    //   if (e.type === "touchmove") {
    //     lineToX = e.touches[0].clientX;
    //     lineToY = e.touches[0].clientY;
    //   } else {
    //     lineToX = e.offsetX;
    //     lineToY = e.offsetY;
    //   }
    //   this.ctx.moveTo(this.lastX || lineToX, this.lastY || lineToY);
    //   this.ctx.lineTo(lineToX, lineToY);

    //   this.ctx.stroke();
    //   this.lastX = lineToX;
    //   this.lastY = lineToY;

    //   this.hue++;
    //   if (this.hue >= 360) {
    //     this.hue = 0;
    //   }
    // },

    getImageToDownload() {
      const image = this.$refs.canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      this.$emit("on-download", image);
    },

    loadImage() {
      const img = new Image();

      img.setAttribute("crossorigin", "anonymous");
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0);
      };
      img.src = this.src;
    },

    saveState() {
      this.undoList.push(this.canvas.toDataURL());
    },

    restoreState(pop) {
      if (pop.length) {
        pop.pop();
        const restoreSt = pop.pop();

        const img = new Image();

        img.onload = () => {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.drawImage(img, 0, 0);
        };
        img.src = restoreSt;
      }
    }
  },

  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.ctx.fillStyle = "blue";

    this.canvas.height = this.height;
    this.canvas.width = this.width;

    EventBus.$on("download", () => {
      const image = this.$refs.canvas.toDataURL("image/png");

      var link = document.createElement("a");
      link.download = "filename.png";
      link.href = image;
      link.click();
    });

    EventBus.$on("download-with-image", async () => {
      this.loadImage();
      await this.$nextTick(() => {
        const image = this.$refs.canvas.toDataURL("image/png");

        var link = document.createElement("a");
        link.download = "file.png";
        link.href = image;
        link.click();
      });
    });

    EventBus.$on("undo-line", () => {
      this.restoreState(this.undoList, this.redoList);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>




