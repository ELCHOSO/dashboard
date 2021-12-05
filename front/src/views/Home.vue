<template>
  <w-app v-if="show">
    <w-flex justify-center align-center>
      <main>
        <router-link to="/login">
          <a class="myButton">Log in</a>
        </router-link>
        <br>
        <a href="register" class="myButton">Register</a>
      </main>
      <aside>
        <img src="~@/assets/dashboard_logo.png"/>
      </aside>
    </w-flex>
  </w-app>
</template>

<script>
import { api } from '../consts.json'
export default {
  name: 'Home',
  data () {
    return {
      show: false
    }
  },
  created () {
    this.axios.get(api + '/whoami').then(response => {
      if (response.status === 200) {
        this.$router.replace('/dashboard')
      }
    }).catch(e => {
      this.show = true
    })
  }
}
</script>

<style scoped>

  .myButton {
    background-color:#bfa2db;
    border-radius:42px;
    border:2px solid #7f7c82;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-family:Arial;
    font-size:20px;
    padding:20px 53px;
    text-decoration:none;
    margin-bottom: 12px;
  }
  .myButton:hover {
    background-color: #7f7c82;
  }
  .myButton:active {
    position:relative;
    top:1px;
  }
  main {
    text-align: center;
  }

</style>
