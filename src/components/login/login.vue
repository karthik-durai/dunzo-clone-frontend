<template>
  <div>
    <h1>Dunzo-Clone</h1>
    <p v-if="fetchingURL">loading</p>
    <a v-else href="loginURL">sign in with google</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginURL: null
    }
  },
  methods: {
    getLoginURL() {
      return 'hello, world'
    }
  },
  mounted() {
    this.loginURL = this.getLoginURL()
    console.log(this.loginURL)
    
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
