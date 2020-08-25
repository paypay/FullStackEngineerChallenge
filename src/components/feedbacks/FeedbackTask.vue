<template>
  <div>
    <div :class="$style.title">
      <input
        v-model="feedback.from"
        :readonly="isReadonly"
        :disabled="isReadonly"
        type="text" />
      about
      <input
        v-model="feedback.to"
        :readonly="isReadonly"
        :disabled="isReadonly"
        type="text" />
      <custom-button
        :title="btnTitle"
        @click="handleClick()" />
    </div>
  </div>
</template>

<script>
import CustomButton from '@/components/base-ui/CustomButton';
import { mapActions } from 'vuex';

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
    isReadonly: true,
  }),
  computed: {
    btnTitle() {
      return this.isReadonly ? 'Edit' : 'Save';
    },
  },
  methods: {
    ...mapActions('feedbacks', ['updateFeedback']),

    async handleClick() {
      if (this.isReadonly) {
        this.isReadonly = false;
      } else {
        await this.updateFeedback({
          id: this.feedback.id,
          from: this.feedback.from,
          to: this.feedback.to,
        });
        this.isReadonly = true;
      }
    },
  },
};
</script>

<style module lang="scss">
@import "@/components/base-ui/colors";
.title {
  margin-bottom: 4px;
}
.text {
  display: block;
  width: 500px;
  height: 40px;
  border: none;
  resize: none;
  &.editMode {
    border: 1px solid $ui-color-gray;
    border-radius: 4px;
  }
}
</style>
