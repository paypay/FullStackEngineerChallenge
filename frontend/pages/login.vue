<template>
  <v-row align="center">
    <v-form ref="form" v-model="valid" :lazy-validation="true">
      <v-text-field
        v-model="user"
        label="Login"
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
      <v-btn
        class="mr-4"
        :disabled="!valid"
        @click="go"
      >
        Login
      </v-btn>
    </v-form>
  </v-row>
</template>

<script>
import { login } from '~/utils/api'

export default {
  data () {
    return {
      valid: false
    }
  },
  methods: {
    go () {
      this.$refs.form.validate() && login(this.user, this.password)
    }
  }
}
</script>
