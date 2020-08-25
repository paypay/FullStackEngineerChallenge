<template>
  <div>
    <custom-button
      :title="btnTitle"
      :pending="pending"
      @click="openAddModal()"
    />
    <employees
      :pending="pending"
      :employees="employeesList"
      @click="handleOpen"
    />
    <employee-modal
      :employee="employee"
      :visible="isModalOpen"
      :modal-type="modalType"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CustomButton from '../components/base-ui/CustomButton';
import Employees from '../components/employees/Employees';
import EmployeeModal from './EmployeeModal';

export const MODAL_STATE = {
  ADD: 'ADD',
  WATCH: 'WATCH',
  EDIT: 'EDIT',
};

export default {
  name: 'EmployeesList',
  components: {
    CustomButton,
    Employees,
    EmployeeModal,
  },
  data: () => ({
    btnTitle: 'Add employee',
    pending: false,
    isModalOpen: false,
    employee: null,
    modalType: '',
  }),
  computed: {
    ...mapState('employees', ['employeesList']),
  },
  async created() {
    this.pending = true;
    await this.fetchEmployeesList();
    this.pending = false;
  },
  methods: {
    ...mapActions('employees', ['fetchEmployeesList', 'fetchEmployeeInfo', 'clearState']),

    openAddModal() {
      this.clearState();
      this.isModalOpen = true;
      this.modalType = MODAL_STATE.ADD;
    },

    async handleOpen({ type, id }) {
      await this.fetchEmployeeInfo(id);
      this.isModalOpen = true;
      this.modalType = type;
    },

    closeModal() {
      this.isModalOpen = false;
      this.modalType = '';
    },
  },
};
</script>

<style>

</style>
