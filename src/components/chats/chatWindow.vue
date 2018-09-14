<template>
  <div>
    <p>chat window</p>
  </div>
</template>

<script>
import vueInstance from '../../views/runner/main.js'

export default {
  data () {
    return {
      socket: io('http://localhost:8000')
    }
  },
  mounted() {

  }
}
</script>

<style>

</style>
