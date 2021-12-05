<template>
  <div class="dashboard">
    <w-card class="card" bg-color="white">
      <template #title>
        <w-toolbar bg-color="amber-light3">
          <div class="title3">{{data.name}}</div>
          <div class="spacer"></div>
          <w-button
            xl
            bg-color="amber-light3"
            :style="{border: 0}"
            color="error"
            icon="wi-cross"
            @click="deleteWidget"
          ></w-button>
        </w-toolbar>
      </template>
      <div v-if="data.name === 'calendar'">
        <Calendar :ref="`${data.name}${data.id}`" :widgetid="data.id"></Calendar>
      </div>
      <div v-if="data.name === 'spotify'">
        <Spotify :ref="`${data.name}${data.id}`" :widgetid="data.id"></Spotify>
      </div>
      <div v-if="data.name === 'spotify player'">
        <SpotifyPlayer :ref="`${data.name}${data.id}`" :widgetid="data.id"></SpotifyPlayer>
      </div>
      <div v-if="data.name === 'weather'">
        <Weather :ref="`${data.name}${data.id}`" :widgetid="data.id"></Weather>
      </div>
      <div v-if="data.name === 'movies'">
        <Movies :ref="`${data.name}${data.id}`" :widgetid="data.id"></Movies>
      </div>
    </w-card>
  </div>
</template>

<script>
import Calendar from './widgets/calendar'
import Weather from './widgets/weather'
import Spotify from './widgets/spotify'
import SpotifyPlayer from './widgets/playSpotify'
import Movies from './widgets/movies'
export default {
  components: { Calendar, Spotify, SpotifyPlayer, Weather, Movies },
  name: 'widget',
  props: ['data'],
  created () {
  },
  methods: {
    deleteWidget () {
      this.$emit('delete', this.data.id)
      this.$refs[`${this.data.name}${this.data.id}`].clearLoop()
    }
  }
}
</script>

<style scoped>
.card {
  margin: 10px;
}
</style>
