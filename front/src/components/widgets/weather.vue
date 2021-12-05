<template>
  <w-flex class="card" column>
    <w-card>
      <w-input v-model="city" placeholder="Enter city/country"></w-input>
      <w-button @click="startLoop">Search</w-button>
    </w-card>
    <div v-if="!notFound && city !== ''">
      <p> Country: {{ data.country }} </p>
      <p> Weather: {{ data.weather }} </p>
      <p> Feels like: {{ data.feel }} </p>
      <p> Temperature: {{ data.temp }} </p>
      <p> Minimal Temperature: {{ data.minTemp }} </p>
      <p> Maximum Temperature: {{ data.maxTemp }} </p>
    </div>
    <div v-if="notFound">
      <p>Country/city not found</p>
    </div>
  </w-flex>
</template>

<script>
import { api } from '../../consts'
export default {
  props: ['widgetid'],
  data () {
    return {
      city: '',
      data: {},
      notFound: false,
      loop: null
    }
  },
  created () {
    this.axios.get(`${api}/widgets/get/${this.widgetid}`).then(res => {
      if (res.data.widget.config) {
        this.city = res.data.widget.config
        this.getWeather()
        this.startLoop()
      }
    })
  },
  methods: {
    startLoop () {
      if (this.loop !== null) {
        console.log('zob')
        this.clearLoop()
      }
      this.getWeather()
      this.loop = setInterval(() => {
        this.getWeather()
      }, 1000 * 3600)
    },
    getWeather () {
      this.axios.get(`${api}/widgets/weather?city=${this.city}`).then(({ data }) => {
        this.notFound = false
        this.data = {
          country: data.sys.country,
          weather: data.weather[0].main,
          temp: data.main.temp,
          minTemp: data.main.temp_min,
          maxTemp: data.main.temp_max,
          feel: data.main.feels_like
        }
        this.axios.put(`${api}/widgets/config/${this.widgetid}`, {
          config: this.city
        })
      }).catch(e => {
        console.log(e)
        this.data = {}
        this.notFound = true
      })
    },
    clearLoop () {
      clearInterval(this.loop)
    }
  }
}
</script>

<style scoped>

</style>
