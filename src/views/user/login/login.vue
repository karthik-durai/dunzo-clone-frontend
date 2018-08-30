<template>
  <div>
    <h1>Dunzo-Clone</h1>
    <p @click="getLoginURL">click</p>
    <p>{{ userLoginURL }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userLoginURL: null
    }
  },
  methods: {
    async getLoginURL() {
      this.userLoginURL = await fetch('http://localhost:8000/user/loginURL')
    }
  }
}
</script>


<style>

</style>
