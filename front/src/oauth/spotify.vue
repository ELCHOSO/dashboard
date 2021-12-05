<template>
  <div></div>
</template>

<script>
export default {
  created () {
    const code = this.$route.hash.split('&')[0].split('=')[1]
    this.$cookies.set('spotify_accessToken', code, 3600)
    this.$router.replace('/dashboard')
  }
}
</script>
