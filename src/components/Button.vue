<template>
  <button v-on="$listeners"><slot /></button>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
button {
  height: 50px;
  width: 150px;
  border: 1px solid hsl(111, 100%, 66%);
  border-radius: 20px;
  background: hsl(187, 100%, 85%);
}
</style>