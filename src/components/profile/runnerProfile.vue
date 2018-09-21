<template>
  <div class="profile">
    <img v-bind:src="profile.profilePicture" alt="pic" class="profile__pic">
    <p>Name: {{ profile.name }}</p>
    <p>EmailId: {{ profile.emailID }}</p>
    <p>First Signin: {{ profile.firstSignedIn }}</p>
    <p>Recent Signin: {{ profile.recentSignedIn }}</p>
    <p>Number of orders: {{ profile.pastOrders.length }}</p>
  </div>
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
      console.log(profile)
      return profile
    },
    constructFetchBody() {
      return {
        headers: {
          authorization: document.cookie.split(';').map(e=>e.trim()).filter(e=>e.startsWith('access_token='))[0].substring(13)
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
.profile {
  text-align: center;
  color: #ffffff;
  font-size: 6vw;
}
.profile__pic {
  width: 50px;
}
</style>
