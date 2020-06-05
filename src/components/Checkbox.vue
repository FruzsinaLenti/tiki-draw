<template>
  <div
    :tabindex="tabindex"
    :class="classObject"
    class="checkbox"
    @click="toggle"
    @keyup.space="toggle"
    ref="checkbox"
  >
    <CheckmarkIcon v-show="checked" class="icon" />
  </div>
</template>

<script>
import CheckmarkIcon from "./icons/CheckmarkIcon.vue";

export default {
  components: {
    CheckmarkIcon
  },
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
  computed: {
    classObject() {
      return {
        checked: this.checked,
        disabled: this.disabled
      };
    },

    tabindex() {
      return this.disabled ? -1 : 0;
    }
  },
  methods: {
    focus() {
      if (!this.disabled) {
        this.$refs.checkbox.focus();
      }
    },

    toggle() {
      this.$emit("change");
    }
  }
};
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  min-width: 18px;
  border: 1px solid #11998e;
  border-radius: 3px;
  cursor: pointer;
}

/* .checkbox:focus {
  @include input-outline;
} */

.checkbox.checked {
  border: 1px solid #38ef7d;
  background: #38ef7d;
}

.checkbox.disabled {
  border: 1px solid #38ef7d;
  cursor: default;
  pointer-events: none;
}

.checkbox.checked.disabled {
  background: #38ef7d;
}

.icon {
  width: percentage(8/18);
  height: percentage(6/18);
  color: white;
}
</style>
