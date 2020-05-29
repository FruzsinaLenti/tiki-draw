<template>
  <div class="container">
    <br />
    <Input />
    <br />
    <Button @click="toggleBackground">Hide/Show Image</Button>
  </div>
</template>

<script>
import Input from "./Input.vue";
import Button from "./Button.vue";

export default {
  components: {
    Input,
    Button
  },

  methods: {
    toggleBackground() {
      this.$emit("toggle-background");
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  left: 0;
  width: 18%;
  height: 100vh;
  border-right: 1px solid hsl(222, 100%, 85%);
  background: white;
}
</style>