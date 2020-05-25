<template>
  <div id="app">
    <Input />
    <Canvas />
  </div>
</template>

<script>
import Input from "./components/Input.vue";
import Canvas from "./components/Canvas.vue";

export default {
  components: {
    Canvas,
    Input
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(222, 255, 252);
}
body {
  margin: 0;
  overflow: hidden;
}
</style>
