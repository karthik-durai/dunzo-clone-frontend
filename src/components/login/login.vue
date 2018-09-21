<template>
  <div class="login-component">
    <div class="heading">
      <h1 class="heading__h1">Dunzo-Clone</h1>
      <h2 class="heading__user-greeting">Hey, User</h2>
    </div>
    <div class="signin-button-block">
      <p v-if="fetchingURL">loading</p>
      <!-- <a v-else v-bind:href="loginURL">sign in with google</a> -->
    <signin-button
      v-else
      v-bind:loginURL="loginURL"/>
    </div>
  </div>
</template>

<script>
import signinButton from './signinButton.vue'

export default {
  components: {
    signinButton
  },
  data() {
    return {
      loginURL: null
    }
  },
  methods: {
    async getLoginURL() {
      try {
        let fetchedObj =  await fetch('http://localhost:8000/user/getLoginURL')
        let url = (await fetchedObj.json()).url
        return url
      } catch (err) {
        return null
      }
    }
  },
  async mounted() {
    this.loginURL = await this.getLoginURL()
  },
  computed: {
    fetchingURL() {
      return this.loginURL ? false : true
    }
  }
}
</script>

<style>
.login-component {
  height: inherit;
  width: inherit;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  color: #000000;
}
.heading {
  display: flex;
  flex-direction: column;
  color: #ffffff;
}
.heading__h1 {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  font-size: 10vw;
}
.heading__user-greeting {
  text-align: center;
  flex: 1;
  font-size: 7vw;
}
.signin-button-block {
  display: flex;
  justify-content: center;
  padding-top: 2em;
}


</style>
