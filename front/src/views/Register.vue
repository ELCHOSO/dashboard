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
          inner-icon-left="fa fa-envelope"/>
          <w-input
          v-model="confirm_email"
          class="css-input"
          label="Confirm email"
          inner-icon-left="fa fa-envelope"/>
          <w-input
          v-model="password"
          class="css-input"
          label="Password"
          type="password"
          inner-icon-left="fa fa-key"/>
          <w-input
          v-model="confirm_password"
          class="css-input"
          label="Confirm password"
          type="password"
          inner-icon-left="fa fa-key"/>
        </div>
        <w-button :style="{width: '100%', height: '20%'}" class="button" @click="connect">Register</w-button>
        <div>
          Already registered ?
          <router-link to="/login">
            <a>Click here !</a>
          </router-link>
        </div>
      </w-card>
    </w-flex>
  </div>
</template>

<script>
import { api } from '../consts.json'
import { useCookies } from 'vue3-cookies'

export default {
  setup () {
    const { cookies } = useCookies()
    return { cookies }
  },
  data: () => ({
    email: '',
    confirm_email: '',
    password: '',
    confirm_password: ''
  }),
  created () {
    this.axios.get(api + '/whoami').then(response => {
      if (response.status === 200) {
        this.$router.replace('/dashboard')
      }
    })
  },
  methods: {
    connect () {
      if (this.email === '' || this.password === '' || this.confirm_email === '' || this.confirm_password === '') {
        this.$toast.error('Please enter all fields !')
      } else {
        if (this.email === this.confirm_email && this.password === this.confirm_password) {
          this.axios.post(api + '/users/register', {
            email: this.email,
            password: this.password
          }).then(response => {
            if (response.status === 200) {
              this.$toast.success(response.data.message)
              this.cookies.set('auth', response.data.jwt, -1)
              this.axios.defaults.headers.common.Authorization = `Bearer ${this.cookies.get('auth')}`
              this.$router.replace('/Dashboard')
            } else {
              this.$toast.error(response.data.message)
            }
          }).catch(() => {
            this.$toast.error('An error occured')
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.app {
  margin: auto;
}

.textfields {
  display: flex;
  flex-direction: column;
}

.css-input {
  margin-bottom: 10px;
  margin-right: 5px;
  padding: 8px;
  font-size: 22px;
  border-width: 1px;
  border-color: #CCCCCC;
  background-color: #FFFFFF;
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
  margin-bottom: 10px;
}

</style>
