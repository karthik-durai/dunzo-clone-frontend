<template>
  <div class="signin-button">
    <a v-bind:href="loginURL" class="signin-button__link">
      <img src="../../assets/btn_google_signin_light_normal_web@2x.png" 
            alt="sign in with google"
            class="signin-button__g-image">
    </a>
  </div>
</template>

<script>
export default {
  props: [ 'loginURL' ]

}
</script>

<style scoped>
  .signin-button {
    flex: 1;
    height: 10vh;
  }
  .signin-button__link {
    display: block;
  }
  .signin-button__g-image {
    width: 80%;
    margin: 0 auto;
    display: block;
    box-shadow: 1px 1px 3px black;
    padding: 0;
  }
</style>
