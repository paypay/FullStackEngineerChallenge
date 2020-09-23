<template>
  <v-row align="center">
    <v-form ref="form" v-model="valid" :lazy-validation="true">
      <v-text-field
        v-model="review"
        label="Title"
        readonly
      />
      <v-text-field
        v-model="reviewer"
        label="Reviewer"
        readonly
      />
      <v-text-field
        v-model="reviewee"
        label="Reviewee"
        readonly
      />
      <v-textarea
        v-model="text"
        label="Text"
        :rules="[v => !!v]"
      />
      <v-text-field
        v-model="updatedAt"
        label="Updated At"
        readonly
      />
      <v-btn
        class="mr-4"
        :disabled="!valid"
        @click="go"
      >
        Save
      </v-btn>
    </v-form>
  </v-row>
</template>

<script>
import { request } from '~/utils/api'
import { userDisplayText } from '~/utils/format'
import { getQuery } from '~/utils/url'

export default {
  data () {
    return {
      valid: false,
      id: '',
      review: '',
      reviewer: '',
      reviewee: '',
      text: '',
      updatedAt: ''
    }
  },
  async mounted () {
    this.id = getQuery('id')
    if (this.id) {
      const r = await request(`/feedbacks/${this.id}`)
      this.id = r._id
      this.review = r.review.title
      this.reviewer = userDisplayText(r.reviewer)
      this.reviewee = userDisplayText(r.reviewee)
      this.text = r.text
      this.updatedAt = new Date(r.updatedAt).toLocaleString()
    }
  },
  methods: {
    go () {
      const { id, text } = this
      this.$refs.form.validate() && request(`/feedbacks${this.isCreate ? '' : '/' + id}`, { text }, 'PATCH')
        .then(r => alert('Success!')).catch(e => alert('Failed!'))
    },
    remove () {
      const { id } = this
      if (confirm('Are you sure?')) {
        request(`/feedbacks/${id}`, {}, 'DELETE').then(r => alert('Success!')).catch(e => alert('Failed!'))
      }
    }
  }
}
</script>
