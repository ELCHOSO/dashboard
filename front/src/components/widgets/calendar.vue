<template>
  <w-flex class="card" column>
    <datepicker v-model="date" @input="printDate"/>
    <w-button @click="getCalendar">Valider</w-button>
    <w-card v-for="event in list" :key="event">
      <h2>{{ event.title }}</h2><br>
      {{ event.description }}<br><br>
      {{ event.start }}<br>
      {{ event.end }}<br>
    </w-card>
  </w-flex>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import { api } from '../../consts'
export default {
  props: ['widgetid'],
  components: {
    Datepicker
  },
  data () {
    return {
      list: [],
      date: new Date()
    }
  },
  created () {
    this.axios.get(`${api}/widgets/get/${this.widgetid}`).then(res => {
      if (res.data.widget.config) {
        this.date = new Date(res.data.widget.config)
        this.getCalendar()
      }
    })
  },
  methods: {
    getCalendar () {
      const dateMin = new Date(this.date)
      const dateMax = new Date(this.date)
      dateMin.setHours(0, 0, 0, 0)
      dateMax.setHours(0, 0, 0, 0)
      dateMax.setDate(this.date.getDate() + 1)
      this.axios.post(api + '/widgets/calendar', {
        oauth_token: this.$cookies.get('google_accessToken'),
        timeMin: dateMin,
        timeMax: dateMax
      }).then(res => {
        this.list = res.data.items.map(event => {
          const tmp = {
            title: event.summary,
            start: this.parseISOString(event.start.dateTime),
            end: this.parseISOString(event.end.dateTime),
            description: event.description
          }
          return (tmp)
        })
        this.axios.put(`${api}/widgets/config/${this.widgetid}`, {
          config: this.date
        })
      })
    },
    parseISOString (s) {
      var b = s.split(/\D+/)
      return (`${b[3]}:${b[4]} ${b[2]}/${b[1]}/${b[0]}`)
    }
  }
}
</script>

<style scoped>

</style>
