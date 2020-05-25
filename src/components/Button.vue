<template>
  <button v-on="$listeners" class="container"><slot /></button>
</template>

<script>
export default {

};
</script>

<style scoped lang="scss">
  .container {
    background: blue;
    height: 30px;
    width: 30px;
  }
</style>