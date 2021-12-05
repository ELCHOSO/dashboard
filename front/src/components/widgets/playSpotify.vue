<template>
  <w-flex column>
    <w-flex row>
      <w-input
        placeholder="Enter spotify song/playlist"
        v-model="songUri"
      ></w-input>
      <w-button @click="parseURL">Play</w-button>
    </w-flex>
    <iframe :src="embed" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  </w-flex>
</template>

<script>
import { api } from '@/consts.json'
export default {
  props: ['widgetid'],
  data () {
    return {
      songUri: '',
      embed: ''
    }
  },
  created () {
    this.axios.get(`${api}/widgets/get/${this.widgetid}`).then(res => {
      this.songUri = res.data.widget.config
      this.parseURL()
    })
  },
  methods: {
    parseURL () {
      this.embed = this.songUri.split('/')
      this.embed.splice(1, 1)
      this.embed.splice(2, 0, 'embed')
      this.embed = this.embed.join('/')
      this.axios.put(`${api}/widgets/config/${this.widgetid}`, {
        config: this.songUri
      })
    }
  }
}
</script>

<style scoped>
</style>
