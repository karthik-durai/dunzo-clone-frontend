<template>
  <div>
    <div class="profile">
      <img v-bind:src="profile.profilePicture" alt="pic" class="profile__pic">
      <p class="profile__name">{{ profile.name }}</p>
      <p class="profile__emailID">{{ profile.emailID }}</p>
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
      getProfileUrl: 'http://localhost:8000/user/profile',
      profile: {}
    }
  },
  methods: {
    async getMyProfile() {
      let fetchedObj = await fetch(this.getProfileUrl, this.constructFetchBody())
      let profile = (await fetchedObj.json())[0]
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
.profile__pic {
  width: 50px;
}
</style>
