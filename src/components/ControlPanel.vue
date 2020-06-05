<template>
  <div class="container">
    <br />
    <Input />
    <br />
    <input
      type="range"
      min="1"
      max="10"
      v-model="value"
      @change="setLineWidth"
      class="slider"
    />
    <br />
    <br />
    <CheckboxWithLabel :checked="isImageHidden" @change="toggleBackground">
      Hide Image
    </CheckboxWithLabel>
    <br />
    <Button ref="download" @click="onClickDownload">Download drawing</Button>
    <br />
  </div>
</template>

<script>
import { EventBus } from "../services/event-bus.js";
import Input from "./Input.vue";
import Button from "./Button.vue";
import CheckboxWithLabel from "./CheckboxWithLabel.vue";
import axios from "axios";

export default {
  components: {
    Input,
    Button,
    CheckboxWithLabel
  },

  props: {
    isImageHidden: {
      type: Boolean
    }
  },

  data() {
    return {
      image: "",
      randomNumber: Math.random(),
      value: 5
    };
  },

  methods: {
    toggleBackground() {
      this.$emit("toggle-background");
    },

    getRandomNumber(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },

    setLineWidth() {
      this.$emit("line-width", this.value);
    },

    onClickDownload() {
      EventBus.$emit("download");
    }
  },

  mounted() {
    axios
      .get("https://api.jikan.moe/v3/search/character?q=pikachu&rated=pg")
      .then(response => {
        this.image =
          response.data.results[
            this.getRandomNumber(response.data.results.length)
          ].image_url;

        this.$emit("anime", this.image);
      });
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  left: 0;
  width: 200px;
  height: 100vh;
  border-right: 1px solid hsl(222, 100%, 85%);
  background: white;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 85%;
  height: 5px;
  background: #11998e;
  outline: none;
  opacity: 0.8;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 3px;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 2px solid #11998e;

  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #38ef7d;
  cursor: pointer;
}
</style>