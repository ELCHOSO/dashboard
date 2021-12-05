<template>
  <w-flex class="card" column>
    <w-select
      v-model="lang"
      :items="items"
      @item-click="getMovies(); page = 1"
      placeholder="Language"
      class="mb4">
    </w-select>
    <VPagination
      v-if="lang != ''"
      v-model="page"
      :pages="total"
      :range-size="1"
      active-color="#DCEDFF"
      @update:modelValue="getMovies"
    />
    <div class="movies">
      <w-card v-for="movie in movies" :key="movie">
        <w-flex row>
          <p class="title">{{ movie.title }}</p>
          <div class="spacer"></div>
          Date: {{ movie.release_date }}
        </w-flex>
        <p :style="{ overflow: scroll }">{{ movie.overview }}</p>
      </w-card>
    </div>
  </w-flex>
</template>

<script>
import { isoLangs, api } from '../../consts'
import VPagination from '@hennge/vue3-pagination'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'
export default {
  props: ['widgetid'],
  components: {
    VPagination
  },
  data () {
    return {
      lang: '',
      items: isoLangs,
      movies: [],
      total: 0,
      page: 1
    }
  },
  created () {
    this.axios.get(`${api}/widgets/get/${this.widgetid}`).then(res => {
      console.log(res)
      const config = res.data.widget.config.split('/')
      this.lang = config[0]
      this.page = config[1]
      this.getMovies()
    })
  },
  methods: {
    getMovies () {
      this.axios.get(`${api}/widgets/movies?language=${this.lang}&page=${this.page}`).then(res => {
        this.total = res.data.total_pages
        this.movies = res.data.results
        this.axios.put(`${api}/widgets/config/${this.widgetid}`, {
          config: `${this.lang}/${this.page}`
        })
      })
    }
  }
}
</script>

<style scoped>
.movies {
  width: 400px;
  height: 500px;
  overflow: scroll;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
</style>
