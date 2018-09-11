<template>
  <router-view/>
</template>

<script>
export default {
  mounted() {
    navigator.geolocation.watchPosition((pos) => {
      console.log(pos.coords.latitude)
    })
  }
}
</script>

<style>

</style>
