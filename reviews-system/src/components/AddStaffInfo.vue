<template>
  <v-dialog persistent v-model="showLog" max-width="500px">
    <v-card style="padding-top: 10px">
      <v-spacer></v-spacer>
      <v-card-text>
        <v-text-field v-model="staffInfo.name" label="Name"></v-text-field>
        <v-text-field v-model="staffInfo.email" label="Email"></v-text-field>
        <v-autocomplete
          v-model="staffInfo.type"
          :items="['employee', 'administrator']"
          label="type"
        ></v-autocomplete>
        <!-- <v-text-field v-model="staffInfo.reviewers" label="reviewers"> -->
        <v-autocomplete
          chips
          multiple
          v-model="staffInfo.reviewers"
          :items="['a', 'b']"
          label="reviewers"
        ></v-autocomplete>
        <!-- </v-text-field> -->
        <v-textarea
          auto-grow
          v-model="staffInfo.reviews"
          label="reviews"
        ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="cancel" color="black">Cancel</v-btn>
          <v-btn outlined @click="save" color="primary">save</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import * as types from '../typedef';

@Component
export default class StaffInfo extends Vue {
  @Prop() private showLog!: boolean;
  private staffInfo: types.StaffInfo = {
    name: '',
    email: '',
    type: '',
    reviewers: [],
    reviews: ''
  };
  private save() {
    this.$emit('showLog', false);
    // this.showLog = !this.showLog;
  }
  private cancel() {
    this.$emit('showLog', false);

  }
}
</script>

