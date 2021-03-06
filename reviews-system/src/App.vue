<template>
  <div id="app">
    <v-app style="width: 100%; height: 100%">
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script lang="ts">
import {Component, Watch, Vue} from 'vue-property-decorator';
import {State, Action, Getter, namespace} from 'vuex-class';

@Component
export default class App extends Vue {
}

/**
 * It's used to block mouse right click menu
 */
document.oncontextmenu = (e: any) => {
  if (window.event) {
    e = window.event;
    e.returnValue = false;
  } else {
    e.preventDefault();
  }
};
</script>

<style lang="scss" scoped>
</style>
