<template>
  <div>
    <template v-if="pending">LOADING...</template>
    <template v-else>
      <div :class="$style.title">Add feedback task</div>
      <input
        v-model="feedbackFrom"
        :class="$style.input"
        type="text">
      <input
        v-model="feedbackTo"
        :class="$style.input"
        type="text">
      <custom-button
        :title="'Add'"
        @click="createTask()" />
      <div :class="$style.title">List of feedback tasks</div>
      <feedback-task
        v-for="feedback in feedbacksList"
        :key="feedback.id"
        :feedback="feedback"
        :class="$style.row"
      />
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import FeedbackTask from '@/components/feedbacks/FeedbackTask';
import CustomButton from '@/components/base-ui/CustomButton';

export default {
  name: 'ReviewsList',
  components: {
    FeedbackTask,
    CustomButton,
  },
  data: () => ({
    pending: false,
    feedbackFrom: '',
    feedbackTo: '',
  }),
  computed: {
    ...mapState('feedbacks', ['feedbacksList']),
  },
  async created() {
    this.pending = true;
    await this.fetchFeedbacksList();
    this.pending = false;
  },
  methods: {
    ...mapActions('feedbacks', ['fetchFeedbacksList', 'createFeedbackTask']),
    async createTask() {
      await this.createFeedbackTask({
        to: this.feedbackTo,
        from: this.feedbackFrom,
      });
      this.feedbackTo = '';
      this.feedbackFrom = '';
    },
  },
};
</script>

<style module lang="scss">
.row {
  margin-bottom: 36px;
  &:last-child {
    margin-bottom: 0;
  }
}
.input {
  margin: 6px 0;
  display: block;
}
</style>
