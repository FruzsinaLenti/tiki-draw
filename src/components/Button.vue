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
  border: 2px solid #11998e;
  border-radius: 3px;
  background: white;
  color: #11998e;
  font-size: 1rem;

}
</style>