<template>
  <div>
    <div v-for="n in 6" :key="n" class="container">
      <TikiIcon
        v-bind:class="[base, `icon${n}`]"
        v-bind:style="{
          color: color(randomNumber(0, 255)),
          transform: rotate(randomNumber(-45, 45)),
          top: positionTop(randomNumber(-200, 0)),
          width: width(randomNumber(500, 600))
        }"
      />
    </div>
  </div>
</template>

<script>
import TikiIcon from "./icons/TikiIcon.vue";

export default {
  components: {
    TikiIcon
  },

  data() {
    return {
      position: "position",
      base: "base"
    };
  },

  methods: {
    positionTop(r) {
      return `${r}px`;
    },

    width(r) {
      return `${r}px`;
    },

    rotate(r) {
      return `rotate(${r}deg)`;
    },

    color(r) {
      return `hsla(${r}, 100%, 85%, 0.2)`;
    },

    randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
}
.base {
  position: relative;
}
</style>
