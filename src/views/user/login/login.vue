<template>
  <div>
    <h1>Dunzo-Clone</h1>
    <a :href="userLoginURL">sign in with google</a>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      userLoginURL: null
    }
  },
  methods: {
    async getLoginURL() {
      let fetchedURLObj = await fetch('http://localhost:8000/user/loginURL')
      this.userLoginURL = (await fetchedURLObj.json()).url
    }
  },
  mounted() {
    this.getLoginURL()
  }
}
</script>


<style>

</style>
