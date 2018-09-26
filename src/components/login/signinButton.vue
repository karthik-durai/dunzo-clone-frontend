<template>
  <div>
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
.signin-button__link {
  display: block;
}
.signin-button__g-image {
  border: none;
  width: 100%;
}
</style>
