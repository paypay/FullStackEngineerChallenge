<template>
  <div :class="$style.header">
    <div :class="$style.menu">
      <router-link
        v-for="(link, index) in links"
        :key="index"
        :to="{ name: link.path }"
        :class="$style.menuLink"
        :active-class="$style.active"
      >
        {{ link. title }}
      </router-link>
      <custom-button
        :title="btnTitle"
        @click="changeRole()"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CustomButton from './CustomButton';

export default {
  name: 'Header',
  components: {
    CustomButton,
  },
  computed: {
    ...mapGetters('user', ['isAdmin']),

    links() {
      return this.isAdmin
        ? [{
          path: 'EmployeesList',
          title: 'List of Employees',

        }, {
          path: 'ReviewsList',
          title: 'Performance Reviews',
        }]
        : [{
          path: 'EmployeePage',
          title: 'Personal Page',
        }];
    },

    btnTitle() {
      return this.isAdmin ? 'enter by user' : 'enter by admin';
    },
  },
  methods: {
    ...mapActions('user', ['changeRole']),
  },
};
</script>

<style module lang="scss">
@import 'colors.scss';
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: $ui-color-red;
}
.menu {
  display: flex;
  align-items: center;
}
.menuLink {
  color: $ui-color-white;
  font-size: 20px;
  font-weight: 400;
  text-decoration: none;
  & + .menuLink {
    margin-left: 10px;
  }
  &:hover {
    text-decoration: underline;
  }
  &.active {
    font-weight: 700;
  }
}
</style>
