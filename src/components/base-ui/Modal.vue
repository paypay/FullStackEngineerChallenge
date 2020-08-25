<template>
  <div v-if="visible">
    <transition
      :enter-active-class="$style.modalEnterActive"
      :leave-active-class="$style.modalLeaveActive"
      :enter-class="$style.modalEnter"
      :leave-to-class="$style.modalLeaveTo"
      appear
    >
      <div
        v-bind="$attrs"
        :class="$style.overlay"
        @click.self="close"
      >
        <div :class="$style.modal">
          <div
            v-if="$slots.default"
            :class="$style.content"
          >
            <custom-button
              :title="'X'"
              :class="$style.buttton"
              @click="close"
            />
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CustomButton from './CustomButton';

export default {
  name: 'Modal',
  components: {
    CustomButton,
  },
  // model: {
  //   prop: 'visible',
  //   event: 'close',
  // },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    visible: {
      immediate: true,
      handler(isVisible) {
        document.body.classList[isVisible ? 'add' : 'remove']('_overflow_hidden');
      },
    },
  },
  beforeDestroy() {
    document.body.classList.remove('_overflow_hidden');
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style module lang="scss">
@import './colors';

.overlay {
  padding: 50px 24px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  background: rgba(0,0,0,.3);
  overflow: auto;
}

.modal {
  width: 100%;
  max-width: 990px;
  margin: 0 auto;
  padding: 24px;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  transform: translate3d(0, 0, 0);
  background-color: $ui-color-white;
}

.buttton {
  position: absolute;
  right: 24px;
}

.content {
  max-width: 780px;
  margin: 0 auto;
  position: relative;
}
</style>
