<template>
  <div style="height: 100%; width: 100%">
    <v-container v-if="selectedItem" class="main">
      <v-card-text class="title"
        >{{ selectedItem }}'s Member</v-card-text
      >
      <v-card
        class="employee-card"
        v-for="(obj, index) in employees"
        :key="index"
      >
        <v-flex class="card-name" subtitle-1>
          {{ name }}: {{ obj.name }},
          {{ `email: ${obj.email}` }}
        </v-flex>
        <v-card-actions>
          <v-btn class="btn" small outlined color="primary" @click="review"
            >review
            <font-awesome-icon class="icon" :icon="['far', 'edit']" />
          </v-btn>
          <reviews-info
            v-if="showReviewLog"
            :show="showReviewLog"
            :staffInfo="obj"
            @logChange="logChange"
            @reviewChange="reviewChange"
          ></reviews-info>
          <v-btn class="btn" small outlined @click="modify"
            >modify
            <font-awesome-icon class="icon" :icon="['fas', 'user-edit']" />
          </v-btn>
          <modify-info
            :show="showModifyLog"
            :staffInfo="obj"
            @logChange="logChange"
            @reviewChange="reviewChange"
          >
          </modify-info>
          <v-btn class="btn" small outlined color="red" @click="remove(index)">
            remove
            <font-awesome-icon class="icon" :icon="['far', 'times-circle']" />
          </v-btn>
        </v-card-actions>
      </v-card>
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
import ReviewsInfo from '../components/ReviewsInfo.vue';
import ModifyInfo from '../components/ModifyInfo.vue';
import * as types from '../typedef';
library.add(faTimesCircle, faEdit, faUserEdit);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('reviews-info', ReviewsInfo);
Vue.component('modify-info', ModifyInfo);

@Component
export default class AdminHome extends Vue {
  @Prop() private selectedItem!: string;
  @Getter('allStaffs') private _allStaffs!: types.StaffResponse[];
  private name: string = this.$i18n.t('name') as string;
  private showReviewLog: boolean = false;
  private showModifyLog: boolean = false;
  private employees: types.StaffResponse[] = [];
  @Watch('selectedItem') private async titleChanged() {
    this.employees = this._allStaffs.filter((staff: types.StaffResponse) => staff.team === this.selectedItem.split(' ')[0]);
  }

  private remove(index: number) {
    this.employees.splice(index, 1);
    console.log(this.employees);
  }

  private logChange(status: boolean) {
    this.showReviewLog = status;
    this.showModifyLog = status;
  }

  private review() {
    this.showReviewLog = true;
  }

  private modify() {
    this.showModifyLog = true;
  }

  private reviewChange(staffInfo: any) {
    this.employees.forEach((i: any) => {
      if (i.id === staffInfo.id) {
        i.score = staffInfo.score;
        i.reviews = staffInfo.reviews;
      }
    });
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
.card-name {
  margin-left: 10px;
}
.icon {
  margin-left: 5px;
  text-align: center;
}
.btn {
  margin-left: 5px !important;
}
</style>
