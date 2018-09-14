<template>
  <div>
    <div class="menu">
      <router-link v-bind:to="menuRoute" class="menu__button">&#9776;</router-link>
      <router-view/>
    </div>
    <p>chat window</p>
  </div>
</template>

<script>
import vueInstance from '../../views/user/main.js'

export default {
  data () {
    return {
      socket: io('http://localhost:8000')
    }
  },
  mounted() {
    console.log(this.socket)
  }
}
</script>

<style>

</style>
