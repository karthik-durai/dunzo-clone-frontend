<template>
  <div>
    <a href="" v-on:click.prevent="renderMenu">&#9776;</a>
    <runner-menu v-if="showMenu"/>
    <router-view
      v-bind:socket="socket"/>
  </div>
</template>

<script>
import runnerMenu from '../../components/menu/runnerMenu.vue'

export default {
  components: {
    runnerMenu
  },
  data() {
    return {
      lat: 0,
      lng: 0,
      showMenu: false
    }
  },
  computed: {
    socket() {
      return io('http://localhost:8000')
    }
  },
  methods: {
    getCoordinates () {
      navigator.geolocation.watchPosition(pos => {
        this.lat = pos.coords.latitude
        this.lng = pos.coords.longitude
        this.socket.emit('position update', [this.lng, this.lat])
        console.log(this.lat, this.lng)
      })
    },
    renderMenu () {
      this.showMenu = !this.showMenu
    }
  },
  async mounted() {
    this.getCoordinates()
  },
}
</script>

<style>

</style>
