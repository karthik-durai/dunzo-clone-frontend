<template>
  <div>
    <h1>Dunzo-Clone</h1>
    <p v-if="fetchingURL">loading</p>
    <signin-button
      v-else
      v-bind:loginURL="loginURL"
    />
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
        let fetchedObj =  await fetch('http://localhost:8000/user/getLoginURL')
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
