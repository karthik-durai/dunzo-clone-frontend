<template>
  <div>
    <div class="profile">
      <img v-bind:src="profile.profilePicture" alt="pic" class="profile__pic">
      <p>Name: {{ profile.name }}</p>
      <p>EmailId: {{ profile.emailID }}</p>
      <p>First Signin: {{ profile.firstSignedIn }}</p>
      <p>Recent Signin: {{ profile.recentSignedIn }}</p>
      <p>Number of orders: {{ profile.pastOrders.length }}</p>
    </div>
  </div>
</template>

<script>
import userMenu from '../menu/userMenu.vue'
export default {
  components: {
    userMenu
  },
  data() {
    return {
      getProfileUrl: 'https://dunzoclone.now.sh/user/profile',
      profile: {}
    }
  },
  methods: {
    async getMyProfile() {
      let fetchedObj = await fetch(this.getProfileUrl, this.constructFetchBody())
      let profile = (await fetchedObj.json())[0]
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
  }
}
</script>

<style>
.profile{
  text-align: center;
  color: #ffffff;
  font-size: 6vw;
}
.profile__pic {
  width: 50px;
}
</style>
