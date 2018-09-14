<template>
  <div>
    <p>chat window</p>
  </div>
</template>

<script>
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
