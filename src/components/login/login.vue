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
        let fetchedObj =  await fetch('https://dunzoclone.now.sh/user/getLoginURL')
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
  border: solid;
  width: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.heading {
  flex: 1;
}

.heading__h1 {
  text-align: center;
  height: 50%;
  border: solid yellow;
}

.heading__user-greeting {
  text-align: center;
  height: 50%;
  border: solid green;
}

.signin-button-block {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  flex: 1;
}
</style>
