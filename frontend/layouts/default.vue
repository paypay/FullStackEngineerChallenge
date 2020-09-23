<template>
  <v-app dark>
    <v-navigation-drawer
      fixed
      clipped
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { isLoggedIn, isAdmin } from '~/utils/api'

export default {
  data () {
    return {
      clipped: true,
      fixed: true,
      items: (() => {
        const guestItems = [{
          icon: 'mdi-apps',
          title: 'Login',
          to: '/login'
        }]
        const loggedInItems = [
          { icon: 'mdi-apps', title: 'Welcome', to: '/' },
          { icon: 'mdi-comment-quote', title: 'Feedback', to: '/feedbacks' }
        ]
        const adminItems = [
          { icon: 'mdi-account', title: 'Users', to: '/users' },
          { icon: 'mdi-message-draw', title: 'Reviews', to: '/reviews' },
          { icon: 'mdi-apps', title: 'Employees', to: '/feedback' }
        ]
        if (!isLoggedIn()) {
          return guestItems
        }
        if (!isAdmin()) {
          return loggedInItems
        }
        return [...loggedInItems, ...adminItems]
      })(),
      title: 'The Performance Review'
    }
  }
}
</script>
