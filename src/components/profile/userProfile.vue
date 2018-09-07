<template>
  <div>
    <div class="menu">
      <router-link to='/myProfile/menu' class="menu__button">&#9776;</router-link>
      <router-view/>
    </div>
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
