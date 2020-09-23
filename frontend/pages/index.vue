<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Welcome to the Performace Review
        </v-card-title>
        <v-card-text v-if="isLoggedIn" />
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-if="!isLoggedIn"
            color="primary"
            to="/login"
          >
            Login
          </v-btn>
          <v-btn
            v-if="isLoggedIn"
            color="primary"
            @click="logout"
          >
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { isLoggedIn, logout } from '~/utils/api'

export default {
  computed: {
    isLoggedIn: () => isLoggedIn()
  },
  methods: {
    logout
  }
}
</script>
