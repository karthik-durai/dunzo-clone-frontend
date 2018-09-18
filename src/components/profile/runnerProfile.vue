<template>
  <div class="profile">
    <img v-bind:src="profile.profilePicture" alt="pic" class="profile__pic">
    <p class="profile__name">{{ profile.name }}</p>
    <p class="profile__emailID">{{ profile.emailID }}</p>
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
.profile__pic {
  width: 50px;
}
</style>
