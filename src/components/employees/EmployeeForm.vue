<template>
  <div :class="$style.container">
    <label :class="$style.label">
      Full Name
      <input
        v-model="formState.fullName"
        :class="$style.input"
        type="text"
      />
    </label>
    <label :class="$style.label">
      Age
      <input
        v-model="formState.age"
        :class="$style.input"
        type="number"
      />
    </label>
    <label :class="$style.label">
      Job Title
      <input
        v-model="formState.jobTitle"
        :class="$style.input"
        type="text"
      />
    </label>
    <label :class="$style.label">
      Department
      <input
        v-model="formState.department"
        :class="$style.input"
        type="text"
      />
    </label>
    <label :class="$style.label">
      Email
      <input
        v-model="formState.email"
        :class="$style.input"
        type="text"
      />
    </label>
    <custom-button
      :title="'Submit'"
      :class="$style.btn"
      :pending="pending"
      @click="handleSubmit()"
    />
  </div>
</template>

<script>
import { MODAL_STATE } from '@/views/EmployeesList';
import { mapActions, mapState } from 'vuex';
import CustomButton from '../base-ui/CustomButton';

export default {
  name: 'EmployeeForm',
  components: {
    CustomButton,
  },
  props: {
    modalType: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    formState: {
      fullName: '',
      age: '',
      jobTitle: '',
      department: '',
      email: '',
    },
    pending: false,
  }),
  computed: {
    ...mapState('employees', ['employee']),
    isEditState() {
      return this.modalType === MODAL_STATE.EDIT;
    },
  },
  created() {
    if (this.isEditState) {
      this.formState = this.employee;
    }
  },
  methods: {
    ...mapActions('employees', ['updateEmployeeInfo', 'addEmployee']),

    async handleSubmit() {
      const data = {
        ...this.formState,
        age: Number(this.formState.age),
      };
      this.pending = true;
      if (this.isEditState) {
        await this.updateEmployeeInfo(data);
      } else {
        this.addEmployee(data);
      }
      this.pending = false;
      this.$emit('close');
    },
  },
};
</script>

<style module lang="scss">
.container {
  max-width: 500px;
}
.label {
  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  & + & {
    margin-top: 16px;
  }
}
.input {
  display: block;
  width: 100%;
  margin-top: 8px;
  box-sizing: border-box;
}
.btn {
  margin-top: 16px;
}
</style>
