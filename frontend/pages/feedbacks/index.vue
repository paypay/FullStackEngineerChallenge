<template>
  <div>
    <v-card-title>My Feedbacks</v-card-title>
    <v-data-table
      :headers="headers"
      :items="myRows"
      :items-per-page="20"
    >
      <template v-slot:[`item.review.title`]="{ item }">
        <router-link
          :to="`/reviews/edit/?id=${item.review._id}`"
        >
          {{ item.review.title }}
        </router-link>
      </template>
      <template v-slot:[`item.review.starts`]="{ item }">
        {{ new Date(item.review.starts).toLocaleString() }}
      </template>
      <template v-slot:[`item.review.ends`]="{ item }">
        {{ new Date(item.review.ends).toLocaleString() }}
      </template>
      <template v-slot:[`item.reviewer`]="{ item }">
        {{ userDisplayText(item.reviewer) }}
      </template>
      <template v-slot:[`item.reviewee`]="{ item }">
        {{ userDisplayText(item.reviewee) }}
      </template>
      <template v-slot:[`item.text`]="{ item }">
        <router-link
          :to="`/feedbacks/edit/?id=${item._id}`"
        >
          {{ item.text.length > 0 ? 'Done' : 'Pending' }}
        </router-link>
      </template>
    </v-data-table>
    <v-card-title v-if="isAdmin()">
      All Feedbacks (Admin Only)
    </v-card-title>
    <v-data-table
      v-if="isAdmin()"
      :headers="headers"
      :items="allRows"
      :items-per-page="20"
    >
      <template v-slot:[`item.review.title`]="{ item }">
        <router-link
          :to="`/reviews/edit/?id=${item.review._id}`"
        >
          {{ item.review.title }}
        </router-link>
      </template>
      <template v-slot:[`item.review.starts`]="{ item }">
        {{ new Date(item.review.starts).toLocaleString() }}
      </template>
      <template v-slot:[`item.review.ends`]="{ item }">
        {{ new Date(item.review.ends).toLocaleString() }}
      </template>
      <template v-slot:[`item.reviewer`]="{ item }">
        <router-link
          :to="`/users/edit/?id=${item.reviewer._id}`"
        >
          {{ userDisplayText(item.reviewer) }}
        </router-link>
      </template>
      <template v-slot:[`item.reviewee`]="{ item }">
        <router-link
          :to="`/users/edit/?id=${item.reviewee._id}`"
        >
          {{ userDisplayText(item.reviewee) }}
        </router-link>
      </template>
      <template v-slot:[`item.text`]="{ item }">
        <router-link
          :to="`/feedbacks/edit/?id=${item._id}`"
        >
          {{ item.text.length > 0 ? 'Done' : 'Pending' }}
        </router-link>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { request, isAdmin } from '~/utils/api'
import { userDisplayText } from '~/utils/format'

export default {
  data () {
    return {
      headers: [
        { text: 'Title', value: 'review.title' },
        { text: 'Starts', value: 'review.starts' },
        { text: 'Ends', value: 'review.ends' },
        { text: 'Reviewer', value: 'reviewer' },
        { text: 'Reviewee', value: 'reviewee' },
        { text: 'Done', value: 'text' }
      ],
      myRows: [],
      allRows: []
    }
  },
  mounted () {
    request('/feedbacks/from-me').then((d) => {
      this.myRows = d
    })
    if (this.isAdmin()) {
      request('/feedbacks').then((d) => {
        this.allRows = d
      })
    }
  },
  methods: {
    isAdmin () {
      return isAdmin()
    },
    userDisplayText (u) {
      return userDisplayText(u)
    }
  }
}
</script>
