<template>
  <div>
    <div>Your feedback on {{ feedback.to }}</div>
    <div v-if="feedback.text">
      {{ feedback.text }}
    </div>
    <textarea
      v-else
      v-model="text"
      :class="$style.textarea" />
    <custom-button
      v-if="!feedback.text"
      :title="'Add'"
      @click="addFeedback({ id: feedback.id, text })"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CustomButton from '../base-ui/CustomButton';

export default {
  name: 'Feedback',
  components: {
    CustomButton,
  },
  props: {
    feedback: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    text: '',
  }),
  methods: {
    ...mapActions('feedbacks', ['addFeedback']),
  },
};
</script>

<style module lang="scss">
.textarea {
  resize: none;
}
</style>
