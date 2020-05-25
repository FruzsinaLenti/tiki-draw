<template>
  <div class="container">
    <div class="col">
      <TikiIcon class="icon" />
      <Input />
    </div>
    <div class="col">
      <Button @click="toggleBackground">Hide/Show Image</Button>
    </div>
  </div>
</template>

<script>
import Input from "./Input.vue";
import Button from "./Button.vue";
import TikiIcon from './icons/TikiIcon.vue';

export default {
  components: {
    Input,
    Button,
    TikiIcon,
  },

  methods: {
    toggleBackground() {
      this.$emit('toggle-background')
    }
  }
};
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 40px;
  }

  .col {
    width: 50%;
    height: 50%;
    float: left;
  }

  .icon {
    width: 100%;
    height: 100%;
    background: yellow;
    color: purple;
  }
</style>