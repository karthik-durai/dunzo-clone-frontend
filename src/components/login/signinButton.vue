<template>
  <div class="signin-button">
    <a v-bind:href="loginURL">
      <img src="../../assets/btn_google_light_normal_ios.svg" 
            alt="G"
            class="signin-button__g-image">
      <span class ="signin-button__link-text">Sign in with Google</span>
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
    border: solid;
    display: grid;
  }
  .signin-button__link-text {
    border: solid;
    display: inline-flex;
  }
  .signin-button__g-image {
    border: solid;
  }
</style>
