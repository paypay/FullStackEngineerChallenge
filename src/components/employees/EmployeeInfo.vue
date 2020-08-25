<template>
  <div>
    <div
      v-for="item in employeeInfo"
      :key="item.key"
      :class="$style.row"
    >
      <div :class="$style.title">{{ item.title }}</div>
      <div :class="$style.info">{{ employee[item.key] }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'EmployeeInfo',
  computed: {
    ...mapState('employees', ['employee']),

    employeeInfo() {
      return [{
        key: 'fullName',
        title: 'Full name',
      }, {
        key: 'age',
        title: 'Age',
      }, {
        key: 'jobTitle',
        title: 'Job title',
      }, {
        key: 'department',
        title: 'Department',
      }, {
        key: 'email',
        title: 'Email',
      }];
    },
  },
};
</script>

<style module lang="scss">
@import '@/components/base-ui/colors';

.row {
  display: flex;
  align-items: center;
}
.title {
  max-width: 300px;
  margin-right: 20px;
  font-size: 16px;
  font-weight: 600;
  color: $ui-color-black
}
.info {
  font-size: 16px;
  color: $ui-color-gray-dark;
}
</style>
