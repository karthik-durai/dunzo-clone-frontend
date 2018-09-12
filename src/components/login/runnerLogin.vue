<template>
  <div class="login-component">
    <div class="heading">
      <h1 class="heading__h1">Dunzo-Clone</h1>
      <h2>Hey, Runner</h2>
    </div>
    <p v-if="fetchingURL">loading</p>
    <a v-else v-bind:href="loginURL">Sign in with google</a>
    <!-- <signin-button
      v-else
      v-bind:loginURL="loginURL"
      class="signin-button-block"
    /> -->
  </div>
</template>

<script>
import signinButton from './signinButton.vue'

export default {
  components: {
    signinButton
  },
  data() {
    return {
      loginURL: null
    }
  },
  methods: {
    async getLoginURL() {
      try {
        let fetchedObj =  await fetch('http://localhost:8000/runner/login')
        let url = (await fetchedObj.json()).url
        return url
      } catch (err) {
        return null
      }
    }
  },
  async mounted() {
    this.loginURL = await this.getLoginURL()
  },
  computed: {
    fetchingURL() {
      return this.loginURL ? false : true
    }
  }
}
</script>

<style>
  
</style>
