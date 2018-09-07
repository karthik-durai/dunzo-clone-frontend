<template>
  <div>
    <router-link to='/myProfile/menu'>menu</router-link>
    <router-view/>
    <div>
      <img v-bind:src="profile.profilePicture" alt="pic">
      <p>{{ profile.name }}</p>
      <p>{{ profile.emailID }}</p>
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
      getProfileUrl: 'http://localhost:8000/user/getme',
      profile: {}
    }
  },
  methods: {
    async getMyProfile() {
      let profile = (await (await fetch(this.getProfileUrl)).json()).profile
      return profile
    }
  },
  async mounted() {
    this.profile = await this.getMyProfile()
  }
}
</script>

<style>

</style>
