<template>
  <v-dialog persistent v-model="show" max-width="500px">
    <v-card style="padding-top: 10px">
      <v-spacer></v-spacer>
      <v-card-text>
        <v-text-field v-model="staffInfo.name" label="Name"></v-text-field>
        <v-text-field v-model="staffInfo.email" label="Email"></v-text-field>
        <v-autocomplete
          v-model="staffInfo.score"
          :items="[1, 2, 3, 4, 5]"
          label="score"
        ></v-autocomplete>
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
  @Prop() private show!: boolean;
  @Prop() private staffInfo!: any;
  private save() {
    this.$emit('logChange', false);
    this.$emit('reviewChange', this.staffInfo);
  }
  private cancel() {
    this.$emit('logChange', false);
  }
  private created() {
    console.log(this.staffInfo);
  }
}
</script>

