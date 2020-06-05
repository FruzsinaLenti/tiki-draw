<template>
  <div
    class="checkbox-container"
    :class="{ disabled }"
    @click="change"
    @keyup.space="change"
  >
    <Checkbox
      :checked="checked"
      :disabled="disabled"
      class="checkbox"
      ref="checkbox"
    />
    <label class="label">
      <slot />
    </label>
  </div>
</template>

<script>
import Checkbox from "./Checkbox.vue";

export default {
  components: { Checkbox },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change() {
      this.$refs.checkbox.focus();
      this.$emit("change", !this.checked);
    }
  }
};
</script>

<style scoped lang="scss">
.checkbox-container {
  margin: 5px;
  display: flex;
  outline: none;
  align-items: center;
}

.disabled {
  pointer-events: none;
}

.checkbox {
  width: 26px;
  height: 26px;
  min-width: 16px;
}

.label {
  cursor: pointer;
  font-size: 18px;
  color: #11998e;
  padding-left: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.disabled + label {
  color: #11998e;
  cursor: default;
}
</style>
