<template>
  <div>
    <v-btn to="/users/edit" color="primary">
      Create
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="rows"
      :items-per-page="20"
    >
      <template v-slot:[`item.login`]="{ item }">
        <router-link
          :to="`users/edit/?id=${item._id}`"
        >
          {{ item.login }}
        </router-link>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { request } from '~/utils/api'

export default {
  data () {
    return {
      headers: [
        { text: 'Display Name', value: 'displayName' },
        { text: 'Login', value: 'login' }
      ],
      rows: []
    }
  },
  mounted () {
    request('/users').then((d) => {
      this.rows = d
    })
  }
}
</script>
