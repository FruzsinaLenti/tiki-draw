<template>
  <div class="container">
    <Blossom class="blossom" />
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
    <div class="color-picker">
      <input
        type="color"
        id="head"
        name="head"
        value="#e66465"
        v-model="color"
        @change="setColor"
      />
      <label for="head" class="color-picker-label">Pick a color</label>
    </div>
    <CheckboxWithLabel :checked="isImageHidden" @change="toggleBackground">
      Hide Image
    </CheckboxWithLabel>
    <br />
    <Button @click="onClickDownload">Download drawing</Button>
    <br />
  </div>
</template>

<script>
import { EventBus } from "../services/event-bus.js";
import axios from "axios";
import Input from "./Input.vue";
import Button from "./Button.vue";
import CheckboxWithLabel from "./CheckboxWithLabel.vue";
import Blossom from "./icons/Blossom.vue";

export default {
  components: {
    Input,
    Button,
    CheckboxWithLabel,
    Blossom
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
      value: 1,
      color: "#000000"
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

    setColor() {
      this.$emit("color-pick", this.color);
    },

    onClickDownload() {
      if (this.isImageHidden) {
        EventBus.$emit("download");
      } else {
        EventBus.$emit("download-with-image");
      }
    }
  },

  mounted() {
    // Anime API not working rigth now
    //   axios
    //     .get("https://api.jikan.moe/v3/search/character?q=pikachu&rated=pg")
    //     .then(response => {
    //       this.image =
    //         response.data.results[
    //           this.getRandomNumber(response.data.results.length)
    //         ].image_url;

    //       this.$emit("anime", this.image);
    //     });
    // }
    const random = this.getRandomNumber(183);
    const url = `https://rickandmortyapi.com/api/character/${random}`;
    axios.get(url).then(response => {
      this.image = response.data.image;

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

.blossom {
  height: 300px;
  width: 300px;
  color: rgba(17, 153, 142, 0.2);
  position: absolute;
  bottom: -120px;
  left: -190px;
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

input[type="color"] {
  width: 26px;
  height: 26px;
  color: #11998e;
  border: 2px solid #11998e;
  border-radius: 3px;
  background: white;
}

.color-picker-label {
  color: #11998e;
  padding-left: 8px;
  font-size: 18px;
}

.color-picker {
  width: 100%;
  display: flex;
  padding: 5px;
}
</style>