<template>
  <div style="height: 100%; width: 100%" class="main">
    <v-card width="500" height="330">
      <v-card-text>
        <v-text-field title v-model="loginInput.account" label="account">
        </v-text-field
      ></v-card-text>
      <v-card-text>
        <v-text-field
          v-model="loginInput.password"
          :type="'password'"
          label="password"
        ></v-text-field>
        <v-card-text>{{
          error ? `*Login error, please retry` : ""
        }}</v-card-text>
      </v-card-text>
      <v-btn style="margin-left: 400px" outlined color="red" @click="login"
        >login</v-btn
      >
    </v-card>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Action, Getter, State, Mutation} from 'vuex-class';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEyeSlash, faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';
import * as types from './typedef';

library.add(faTimesCircle, faEyeSlash, faUserEdit);

Vue.component('font-awesome-icon', FontAwesomeIcon);

@Component
export default class Login extends Vue {
  @Action('getStaffByName') private _getStaffByName!: (name: string) => Promise<void>;
  private loginInput: types.LoginInput = {
    account: 'mock4@paypay.com', password: 'mock4'
  };
  private error: boolean = false;
  private async login() {
    const name: string = this.loginInput.account.split('@')[0];
    if (name !== this.loginInput.password) this.error = true;
    else {
      this.error = false;
      await this._getStaffByName(name);
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0px;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 1, 0.5);
  // overflow-y: auto !important;
}
</style>
