<template>
  <div></div>
</template>

<script>
import { api } from '../consts.json'
export default {
  created () {
    const code = this.$route.query.code
    this.$http.get(`${api}/oauth/google?code=${code}`, {
      code: code
    }).then((response) => {
      this.$cookies.set('auth', response.data.jwt)
      this.$cookies.set('google_accessToken', response.data.access_token)
      this.axios.defaults.headers.common.Authorization = `Bearer ${this.$cookies.get('auth')}`
      this.$emit('checkConnect')
      this.$router.replace('/dashboard')
    })
  }
}
</script>
