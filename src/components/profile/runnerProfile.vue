<template>
  <p>runner profile</p>
</template>

<script>
export default {
  data() {
    return {
      profileUrl: 'http://localhost:8000/runner/profile',
      profile: {}
    }
  },
  methods: {
    async getMyProfile() {
      let fetchedObj = await fetch(this.profileUrl, this.constructFetchBody())
      let profile = await fetchedObj.json()
      return profile
    },
    constructFetchBody() {
      return {
        headers: {
          authorization: document.cookie.split(';')[1].split('=')[1]
        }
      }
    }
  },
  async mounted() {
    this.profile = await this.getMyProfile()
    console.log(this.profile)
  }
}
</script>

<style>

</style>
