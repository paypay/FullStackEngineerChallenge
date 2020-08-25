<template>
  <div :class="$style.container">
    <template v-if="pending">
      LOADING
    </template>
    <template v-else>
      <div
        v-for="item in employees"
        :key="item.id"
        :class="$style.row"
      >
        <div
          :class="$style.linkToEmployee"
          @click="$emit('click', { type: MODAL_STATE.WATCH, id: item.id })"
        >
          {{ item.fullName }}
        </div>
        <custom-button
          :title="editBtnTitle"
          :class="$style.btn"
          @click="$emit('click', { type: MODAL_STATE.EDIT, id: item.id })"
        />
        <custom-button
          :title="deleteBtnTitle"
          :pending="deleteUserPending"
          :class="$style.btn"
          @click="handleDelete(item.id)"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { MODAL_STATE } from '@/views/EmployeesList';
import CustomButton from '../base-ui/CustomButton';

export default {
  name: 'Employees',
  components: { CustomButton },
  props: {
    employees: {
      type: Array,
      required: true,
    },
    pending: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    editBtnTitle: 'Edit',
    deleteBtnTitle: 'Delete',
    deleteUserPending: false,
    MODAL_STATE,
  }),
  methods: {
    ...mapActions('employees', ['deleteUser']),

    async handleDelete(employeeId) {
      this.deleteUserPending = true;
      await this.deleteUser(employeeId);
      this.deleteUserPending = false;
    },
  },
};
</script>

<style module lang="scss">
@import '../base-ui/colors';

.container {
  margin: 32px 0;
}
.row {
  display: flex;
  align-items: center;
  padding: 12px 0;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
}
.linkToEmployee {
  width: 300px;
  margin-right: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: $ui-color-blue;
  cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
}
.btn {
  & + .btn {
    margin-left: 10px;
  }
}
</style>
