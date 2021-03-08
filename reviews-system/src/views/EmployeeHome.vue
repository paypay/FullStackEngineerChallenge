<template>
  <div style="height: 100%; width: 100%">
    <v-container class="main">
      <v-card-text v-if="selectedItem">
        <v-card-text class="card-text title"
          >{{ selectedItem }}'s review</v-card-text
        >
        <v-autocomplete
          v-model="review.score"
          :items="[1, 2, 3, 4, 5]"
          label="score"
        ></v-autocomplete>
        <v-textarea
          v-model="review.reviews"
          auto-grow
          label="reviews"
        ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined color="primary" @click="save">save</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-container>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {Action, Getter, State, Mutation} from 'vuex-class';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEdit, faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';
import * as types from '../typedef';
library.add(faTimesCircle, faEdit, faUserEdit);

Vue.component('font-awesome-icon', FontAwesomeIcon);

@Component
export default class EmployeeHome extends Vue {
  private review: types.ReviewDetail = {reviewer: '', score: 0, reviews: ''};
  @Getter('staff') private _staff!: types.StaffResponse;
  @Getter('reviews') private _reviews!: types.ReviewResponse;
  @Action('updateReviewByName') private _updateReviewByName!: (input: types.UpdateReviewInput) => Promise<void>;
  @Prop() private selectedItem!: string;
  @Watch('selectedItem') private async titleChanged() {
    console.log(this.selectedItem);
    const allReviews: types.ReviewDetail[] = this._reviews.reviews;
    const selectedReview: types.ReviewDetail[] = this.selectedItem === 'myself' ?
      allReviews.filter((r: types.ReviewDetail) => r.reviewer === this._staff.name) :
      allReviews.filter((r: types.ReviewDetail) => r.reviewer === this.selectedItem);
    this.review = selectedReview[0];
  }

  private async save() {
    const allReviews: types.ReviewDetail[] = this._reviews.reviews;
    const newReviews: types.ReviewDetail[] = allReviews.filter((r: types.ReviewDetail) => r.reviewer !== this.review.reviewer);
    newReviews.push(this.review);
    await this._updateReviewByName({name: this._staff.name, reviews: newReviews});
  }
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-radius: 0px !important;
  // overflow-y: auto !important;
}
.employee-card {
  height: 70px;
  margin: 8px 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border-radius: 0px !important;
}
.card-text {
  padding: 0px;
}
.icon {
  margin-left: 5px;
  text-align: center;
}
</style>
