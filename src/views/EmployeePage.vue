<template>
  <div>
    <feedback
      v-for="item in feedbacksByUserId"
      :key="item.id"
      :feedback="item"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Feedback from '@/components/feedbacks/Feedback';

export default {
  name: 'EmployeePage',
  components: {
    Feedback,
  },
  computed: {
    ...mapGetters('feedbacks', ['feedbacksByUserId']),
  },
  created() {
    this.fetchFeedbacksList();
  },
  methods: {
    ...mapActions('feedbacks', ['fetchFeedbacksList']),
  },
};
</script>
