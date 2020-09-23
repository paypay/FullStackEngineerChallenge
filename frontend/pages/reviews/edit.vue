<template>
  <div>
    <v-row>
      <v-form ref="form" v-model="valid" :lazy-validation="true">
        <v-text-field
          v-model="title"
          label="Title"
          required
          :rules="[v => !!v]"
        />
        <v-text-field
          v-model="starts"
          label="Start Time"
          type="date"
          required
          :rules="[v => !!v]"
        />
        <v-text-field
          v-model="ends"
          label="End Time"
          type="date"
          required
          :rules="[v => !!v]"
        />
        <v-checkbox
          v-model="isHidden"
          label="Is Hidden"
        />
        <v-btn
          class="mr-4"
          :disabled="!valid"
          @click="go"
        >
          {{ isCreate ? 'Create': 'Update' }}
        </v-btn>
        <v-btn
          v-if="!isCreate"
          class="mr-4"
          color="error"
          @click="remove"
        >
          Remove
        </v-btn>
      </v-form>
    </v-row>
    <v-row>
      <v-form v-if="!isCreate" ref="form2" v-model="valid2" :lazy-validation="true">
        <v-card-title>Assign Participants</v-card-title>
        <v-select
          v-model="reviewer"
          :items="employees"
          :rules="[v => !!v]"
          label="Reviewer"
        />
        <v-select
          v-model="reviewee"
          :items="employees"
          :rules="[v => !!v]"
          label="Reviewee"
        />
        <v-btn
          class="mr-4"
          :disabled="!valid2"
          @click="assign"
        >
          Assign
        </v-btn>
      </v-form>
    </v-row>
  </div>
</template>

<script>
import { request } from '~/utils/api'
import { getQuery } from '~/utils/url'

export default {
  data () {
    return {
      isCreate: true,
      valid: false,
      valid2: false,
      id: '',
      title: '',
      starts: '1970-01-01',
      ends: '1970-01-01',
      isHidden: false,
      questions: [],
      employees: [],
      reviewer: '',
      reviewee: ''
    }
  },
  async mounted () {
    this.id = getQuery('id')
    if (this.id) {
      const r = await request(`/reviews/${this.id}`)
      this.id = r._id
      this.title = r.title
      this.starts = this.dateConv(r.starts)
      this.ends = this.dateConv(r.ends)
      this.isHidden = r.isHidden
      this.isCreate = false
      const e = await request('/users')
      this.employees = e.map(e => ({ text: `${e.displayName} (${e.login})`, value: e._id }))
    }
  },
  methods: {
    go () {
      const { id, title, starts, ends, isHidden, questions } = this
      this.$refs.form.validate() && request(`/reviews${this.isCreate ? '' : '/' + id}`, { title, starts, ends, isHidden, questions }, this.isCreate ? 'POST' : 'PATCH')
        .then(r => alert('Success!')).catch(e => alert('Failed!'))
    },
    remove () {
      const { id } = this
      if (confirm('Are you sure?')) {
        request(`/reviews/${id}`, {}, 'DELETE').then(r => alert('Success!')).catch(e => alert('Failed!'))
      }
    },
    dateConv (str) {
      const d = new Date(str)
      return `${d.getFullYear()}-${d.toLocaleString('en-US', { month: '2-digit' })}-${d.toLocaleString('en-US', { day: '2-digit' })}`
    },
    assign () {
      const { id, reviewer, reviewee } = this
      this.$refs.form2.validate() && request('/feedbacks', { review: id, reviewer, reviewee }, 'POST')
        .then(r => alert('Success!')).catch(e => alert('Failed!'))
    }
  }
}
</script>
