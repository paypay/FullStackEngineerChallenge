<template>
  <v-row align="center">
    <v-form ref="form" v-model="valid" :lazy-validation="true">
      <v-text-field
        v-model="login"
        label="Login"
        required
        :readonly="!isCreate"
        :rules="[v => !!v]"
      />
      <v-text-field
        v-model="displayName"
        label="Display Name"
        required
        :rules="[v => !!v]"
      />
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        :rules="[v => !!v]"
        required
      />
      <v-checkbox
        v-model="isAdmin"
        label="Is Admin"
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
</template>

<script>
import { request } from '~/utils/api'
import { getQuery } from '~/utils/url'

export default {
  data () {
    return {
      isCreate: true,
      valid: false,
      id: '',
      login: '',
      displayName: '',
      password: '',
      isAdmin: false
    }
  },
  async mounted () {
    this.id = getQuery('id')
    if (this.id) {
      const r = await request(`/users/${this.id}`)
      this.id = r._id
      this.login = r.login
      this.displayName = r.displayName
      this.isAdmin = r.isAdmin
      this.isCreate = false
    }
  },
  methods: {
    go () {
      const { id, login, displayName, password, isAdmin } = this
      this.$refs.form.validate() && request(`/users${this.isCreate ? '' : '/' + id}`, { login, displayName, password, isAdmin }, this.isCreate ? 'POST' : 'PATCH')
        .then(r => alert('Success!')).catch(e => alert('Failed!'))
    },
    remove () {
      const { id } = this
      if (confirm('Are you sure?')) {
        request(`/users/${id}`, {}, 'DELETE').then(r => alert('Success!')).catch(e => alert('Failed!'))
      }
    }
  }
}
</script>
