<template>
  <div class="container">
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
    <Button @click="loadRickAndMorty">Load new Rick and Morty</Button>
    <Button @click="loadNewPokemon">Load new Pokemon</Button>
    <Button @click="undoLine">Undo Line</Button>
    <br />
  </div>
</template>

<script>
import { EventBus } from "../services/event-bus.js";
import { getImage } from "../services/api.js";
import Button from "./Button.vue";
import CheckboxWithLabel from "./CheckboxWithLabel.vue";

export default {
  components: {
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
      randomNumber: this.getRandomNumber(591),
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
    },

    undoLine() {
      EventBus.$emit("undo-line");
    },

    async loadRickAndMorty() {
      this.randomNumber = this.getRandomNumber(591);
      const url = `https://rickandmortyapi.com/api/character/${this.randomNumber}`;

      const img = await getImage(url);
      this.image = img.image;
      this.$emit("anime", this.image);
    },

    async loadNewPokemon() {
      const url = `https://api.jikan.moe/v3/search/anime?q=pokemon&rated=pg`;

      const response = await getImage(url);
      this.randomNumber = this.getRandomNumber(response.results.length);

      this.image = response.results[this.randomNumber].image_url;
      this.$emit("anime", this.image);
    }
  },

  async mounted() {
    const url = `https://rickandmortyapi.com/api/character/${this.randomNumber}`;
    const response = await getImage(url);

    this.image = response.image;
    this.$emit("anime", this.image);
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
  user-select: none;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 85%;
  height: 5px;
  margin: 25px 0;
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

@media only screen and (max-width: 600px) {
  .container {
    bottom: 0;
    width: 100%;
    height: auto;
    border-top: 1px solid hsl(222, 100%, 85%);
    user-select: none;
  }
}
</style>