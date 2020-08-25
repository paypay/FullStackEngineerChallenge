<template>
  <div>
    <Header />
    <div :class="$style.container">
      <slot />
    </div>
  </div>
</template>

<script>
import Header from './Header';

export default {
  name: 'Layout',
  components: {
    Header,
  },
};
</script>

<style module lang="scss">
.container {
  padding: 24px;
}
</style>
