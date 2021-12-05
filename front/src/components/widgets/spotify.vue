<template>
  <w-flex class="card" v-show="data.item" column>
    <p>Played on: {{data.device?.name}}</p>
    <img :src="data.item?.album?.images[1].url"/>
    <div id="myProgress">
      <div :id="`myBar${widgetid}`" :style="{
        width: '1%',
        height: '30px',
        'background-color': 'green'}"></div>
      </div>
    <p>Playing: {{data.item?.name}}</p>
    <p>Artist: {{data.item?.artists[0].name}}</p>
  </w-flex>
  <w-flex v-show="!data.item && accessToken" justify-center align-center>
    No music currently played
  </w-flex>
  <w-flex v-show="!accessToken" justify-center align-center>
    Please connect yourself
  </w-flex>
</template>

<script>
import { api } from '../../consts'
export default {
  props: ['widgetid'],
  data () {
    return {
      data: {},
      accessToken: '',
      loop: null
    }
  },
  created () {
    this.apiCall(this.widgetid)
  },
  methods: {
    apiCall (widgetid) {
      this.loop = setInterval(() => {
        this.accessToken = this.$cookies.get('spotify_accessToken')
        this.$http.get(`${api}/widgets/spotify?token=${this.$cookies.get('spotify_accessToken')}`)
          .then((response) => {
            this.data = response.data
            document.getElementById(`myBar${widgetid}`).style.width = (response.data.progress_ms / response.data.item.duration_ms * 100) + '%'
          })
          .catch((error) => {
            console.log(error)
          })
      }, 5000)
    },
    clearLoop () {
      clearInterval(this.loop)
    }
  }
}
</script>

<style scoped>
#myProgress {
  width: 100%;
  background-color: grey;
}

#myBar {
  width: 1%;
  height: 30px;
  background-color: green;
}
</style>
