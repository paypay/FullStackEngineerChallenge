<template>
  <div id="app">
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>

<script>
import Layout from './components/base-ui/Layout';

export default {
  name: 'App',
  components: {
    Layout,
  },
};
</script>

<style lang="scss">
@import 'components/base-ui/colors';

#app {
  min-width: 1200px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $ui-color-black;
}
body,
html {
  margin: 0;
  padding: 0;
}
button {
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  color: $ui-color-white;
  cursor: pointer;
  &:active {
    outline: none;
  }
}
a {
  text-decoration: none;
}
</style>
