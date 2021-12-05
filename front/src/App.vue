<template>
  <w-app class='bg'>
    <w-card tile bg-color='primary'>
      <w-toolbar bg-color='primary'>
        <div class="title2">Dashboard</div>
        <div class="spacer"></div>
        <div v-if="user" class="title2">User: {{ user }}</div>
        <div class="spacer"></div>
        <w-button xl @click="connect_google" v-if="user">
          <w-icon
            :color="googleColor"
            xl>
            fa fa-google
          </w-icon>
        </w-button>
        <w-button xl @click="connect_spotify" v-if="user">
          <w-icon
            :color="spotifyColor"
            xl>
            fa fa-spotify
          </w-icon>
        </w-button>
        <w-button xl @click="logout" v-if="user">
          <w-icon
            color="cwhite"
            xl>
            fa fa-sign-out
          </w-icon>
        </w-button>
      </w-toolbar>
    </w-card>
    <router-view @checkConnect="check_connect"/>
  </w-app>
</template>

<script>
import { api } from './consts.json'
import { useCookies } from 'vue3-cookies'
export default {
  setup () {
    const { cookies } = useCookies()
    return { cookies }
  },
  data () {
    return {
      user: '',
      spotifyColor: '',
      googleColor: ''
    }
  },
  created () {
    this.check_connect()
    if (!this.$cookies.get('google_accessToken')) {
      this.googleColor = 'white'
    } else {
      this.googleColor = 'red'
    }
    if (!this.$cookies.get('spotify_accessToken')) {
      this.spotifyColor = 'white'
    } else {
      this.spotifyColor = 'red'
    }
  },
  methods: {
    logout () {
      this.cookies.remove('auth')
      this.cookies.remove('google_accessToken')
      this.cookies.remove('spotify_accessToken')
      this.axios.defaults.headers.common = {}
      this.user = ''
      this.$router.replace('/')
    },
    connect_google () {
      if (!this.$cookies.get('google_accessToken')) {
        this.axios.get(api + '/oauth/google/url').then(res => {
          window.location.replace(res.data)
        })
      } else {
        this.$cookies.remove('google_accessToken')
        this.googleColor = 'white'
      }
    },
    connect_spotify () {
      if (!this.$cookies.get('spotify_accessToken')) {
        this.axios.get(api + '/oauth/spotify/url').then(res => {
          window.location.replace(res.data)
        })
      } else {
        this.$cookies.remove('spotify_accessToken')
        this.spotifyColor = 'white'
      }
    },
    check_connect () {
      if (this.cookies.isKey('auth')) {
        this.axios.defaults.headers.common = { Authorization: `Bearer ${this.cookies.get('auth')}` }
        this.axios.get(api + '/whoami').then(response => {
          if (response.status === 200) {
            this.user = response.data.email
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.title2 {
  text-align: center;
  vertical-align: middle;
  color: #eeeeee;
}

.bg {
  background-color: #393e46;
}

.profile {
  text-align: end;
}
</style>
