<template>
  <div class="app">
    <w-flex>
      <w-card
      outlined
      :style=" {
      'border-radius': '12px',
      'background-color': '#eeeeee',
      height: '100%'
      }">
        <div class="textfields">
          <w-input
          v-model="email"
          class="css-input"
          label="Email"
          inner-icon-left="fa fa-envelope"
          :style="{
          'margin-bottom': '10px'
          }"/>
          <w-input
          v-model="password"
          class="css-input"
          label="Password"
          type="password"
          inner-icon-left="fa fa-key"/>
        </div>
          <w-button :style="{width: '100%', height: '25%'}" class="button" @click="connect">Login</w-button>
        <div>
          <p>Not registered yet ?
          <router-link to="/register">
            <a>Click here !</a>
          </router-link></p>
        </div>
        <w-flex justify-center class="mt4">
          <w-button @click="google">
            <w-icon>
              fa fa-google
            </w-icon>
            Google
          </w-button>
          <w-button class="mx4">
            <w-icon>
              fa fa-facebook
            </w-icon>
            Facebook
          </w-button>
          <w-button>
            <w-icon>
              fa fa-windows
            </w-icon>
            Office 365
          </w-button>
        </w-flex>
      </w-card>
    </w-flex>
  </div>
</template>

<script>
import { api } from '../consts.json'
// import { useCookies } from 'vue3-cookies'
export default {
  // setup () {
  //   const { cookies } = useCookies()
  //   return { cookies }
  // },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  created () {
    this.axios.get(api + '/whoami').then(response => {
      if (response.status === 200) {
        this.$router.replace('/dashboard')
      }
    })
  },
  methods: {
    connect () {
      if (this.email === '' || this.password === '') {
        this.$toast.error('Please enter an email and a password !')
      } else {
        this.axios.post(api + '/users/login', {
          email: this.email,
          password: this.password
        }).then((response) => {
          if (response.status === 200) {
            this.$cookies.set('auth', response.data.jwt, -1)
            this.axios.defaults.headers.common.Authorization = `Bearer ${this.$cookies.get('auth')}`
            this.$toast.success(response.data.message)
            this.$emit('checkConnect')
            this.$router.replace('/dashboard')
          }
        })
      }
    },
    google () {
      this.axios.get(api + '/oauth/google/url').then(response => {
        window.location.replace(response.data)
      })
    }
  }
}
</script>

<style scoped>
#oauth {
  display: flex;
  flex-direction: column;
}

.app {
  margin: auto;
}

.textfields {
  display: flex;
  flex-direction: column;
}

.css-input {
  margin-right: 5px;
  padding: 8px;
  font-size: 22px;
  border-width: 1px;
  border-color: #CCCCCC;
  background-color: #FFFFFF;
  color: #000000;
  border-style: solid;
  border-radius: 10px;
  box-shadow: 0px 0px 0px rgba(66,66,66,.0);
  text-shadow: 0px 0px 0px rgba(66,66,66,.75);
}
.css-input:focus {
  outline:none;
}

.button {
  font-size: 150%;
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
