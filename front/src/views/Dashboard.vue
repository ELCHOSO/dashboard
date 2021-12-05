<template>
  <div class="dashboard">
    <Widget @delete="deleteWidget" :data="widgets[index]" v-for="(widget, index) in widgets" :key="index"></Widget>
    <w-card>
      <img class="plusbtn" :src="plusButton" @click="dialog = true"/>
    </w-card>
    <w-dialog v-model="dialog" width="500px">
      <w-flex align-center justify-center>
        <w-card :style="{ width: '500px'}">
          <w-checkboxes v-model="selection" :items="checkboxes"></w-checkboxes>
          <w-button class="mt3" @click="addWidget">Create</w-button>
        </w-card>
      </w-flex>
  </w-dialog>
  </div>
</template>

<script>
import Widget from '../components/Widget.vue'
import plusButton from '@/assets/plus_button.png'
import { api } from '../consts.json'
export default {
  components: {
    Widget
  },
  data () {
    return ({
      plusButton: plusButton,
      widgets: [],
      dialog: false,
      checkboxes: [
        { label: 'Spotify', value: 'spotify' },
        { label: 'Spotify Player', value: 'spotify player' },
        { label: 'Calendar', value: 'calendar' },
        { label: 'Weather', value: 'weather' },
        { label: 'Movies', value: 'movies' }
      ],
      selection: []
    })
  },
  created () {
    if (!this.$cookies.get('auth')) {
      this.$router.replace('/')
    }
    this.getWidgets()
  },
  methods: {
    getWidgets () {
      this.axios.get(api + '/widgets').then(response => {
        this.widgets = response.data.widgets
      })
    },
    addWidget () {
      this.selection.forEach(widget => {
        this.axios.post(api + '/widgets/create', { name: widget }).then(response => {
          if (response.status === 200) {
            this.getWidgets()
          }
        })
      })
      this.selection = []
    },
    deleteWidget (id) {
      this.axios.delete(api + '/widgets/' + id).then(response => {
        if (response.status === 200) {
          this.getWidgets()
        }
      })
    }
  }
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-wrap: wrap;
}
.card {
  margin: 10px;
  height: 400px;
  width: 300px;
}
.plusbtn:hover {
  cursor: pointer;
}
</style>
