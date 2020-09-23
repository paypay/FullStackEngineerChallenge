<template>
  <div>
    <v-btn to="/reviews/edit" color="primary">
      Create
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="rows"
      :items-per-page="20"
    >
      <template v-slot:[`item.title`]="{ item }">
        <router-link
          :to="`reviews/edit/?id=${item._id}`"
        >
          {{ item.title }}
        </router-link>
      </template>
      <template v-slot:[`item.starts`]="{ item }">
        {{ new Date(item.starts).toLocaleString() }}
      </template>
      <template v-slot:[`item.ends`]="{ item }">
        {{ new Date(item.ends).toLocaleString() }}
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
        { text: 'Title', value: 'title' },
        { text: 'Starts', value: 'starts' },
        { text: 'Title', value: 'ends' }
      ],
      rows: []
    }
  },
  mounted () {
    request('/reviews').then((d) => {
      this.rows = d
    })
  }
}
</script>
