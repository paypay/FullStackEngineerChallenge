<template>
  <button
    :class="[$style.btn, { [$style.btnPending]: pending }]"
    :disabled="pending"
    :pending="pending"
    @click="click"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    pending: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isHover: false,
  }),
  methods: {
    async click($event) {
      if (this.$listeners.click) {
        const res = this.$listeners.click($event);
        if (res instanceof Promise) {
          await res;
        }
      }
    },
  },
};
</script>

<style module lang="scss">
@import 'colors.scss';

.btn {
  padding: 10px 32px;
  border-radius: 4px;
  background-color: $ui-color-red;
  cursor: pointer;
  &.btnPending {
    opacity: .6;
  }
}
</style>
