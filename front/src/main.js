import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WaveUI from 'wave-ui'
import Toaster from '@meforma/vue-toaster'
import 'wave-ui/dist/wave-ui.css'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import cookies from 'vue3-cookies'

const app =
  createApp(App)
    .use(store)
    .use(router)
    .use(Toaster)
    .use(VueAxios, axios)
    .use(cookies)

/* eslint-disable */
new WaveUI(app, {
  colors: {
    primary: '#222831',
    secondary: '#393e46',
    tertiary: '#00adb5',
    cwhite: "#eeeeeee"
  }
})
/* eslint-enable */
app.mount('#app')
