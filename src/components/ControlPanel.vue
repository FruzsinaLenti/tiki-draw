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
    />
    <br />
    <Button @click="toggleBackground">Hide/Show Image</Button>
    <br />
    <br />
    <Button @click="download">Download</Button>
    <br />
  </div>
</template>

<script>
import Input from "./Input.vue";
import Button from "./Button.vue";
import axios from 'axios'


export default {
  components: {
    Input,
    Button
  },

  data() {
    return {
      image: '',
      randomNumber: Math.random(),
      value: 5,
    }
  },

  methods: {
    toggleBackground() {
      this.$emit("toggle-background");
    },

    getRandomNumber(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },

    setLineWidth() {
      this.$emit('line-width', this.value);
    },
    
    download() {
      console.log('asd')
    }
  },

  mounted() {
    axios
      .get('https://api.jikan.moe/v3/search/character?q=pikachu&rated=pg')
      .then(response => {
        this.image = response.data.results[this.getRandomNumber(response.data.results.length)].image_url

        this.$emit('anime', this.image)
      })
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
</style>