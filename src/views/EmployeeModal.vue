<template>
  <modal
    :visible="visible"
    @close="$emit('close')"
  >
    <employee-info v-if="isWatchState" />
    <employee-form
      v-else
      :modal-type="modalType"
      @close="$emit('close')"
    />
  </modal>
</template>

<script>
import Modal from '@/components/base-ui/Modal';
import EmployeeInfo from '@/components/employees/EmployeeInfo';
import EmployeeForm from '@/components/employees/EmployeeForm';
import { MODAL_STATE } from './EmployeesList';

export default {
  name: 'EmployeeModal',
  components: {
    Modal,
    EmployeeInfo,
    EmployeeForm,
  },
  props: {
    employee: {
      type: Object,
      default: () => {},
    },
    modalType: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isWatchState() {
      return this.modalType === MODAL_STATE.WATCH;
    },
  },
};
</script>

<style>

</style>
