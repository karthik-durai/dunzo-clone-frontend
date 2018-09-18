<template>
  <div>
    <a href="" v-on:click.prevent="renderMenu">&#9776;</a>
    <user-menu v-if="showMenu"/>
    <router-view
    v-on:coords="getCoords"
    v-bind:pickUpLocation="pickUpLocation"
    v-bind:dropLocation="dropLocation"
    v-bind:socket="socket"/>
  </div>
</template>

<script>
import userMenu from '../../components/menu/userMenu.vue'

export default {
  components: {
    userMenu
  },
  data() {
    return {
      pickUpLocation: null, 
      dropLocation: null,
      showMenu: false
    }
  },
  methods: {
    getCoords (data) {
      console.log('got coordinates')
      if (data[0] === 'provideDropAddress') {
        this.dropLocation = data[1]
      } else if (data[0] === 'providePickUpAddress') {
        this.pickUpLocation = data[1]
      }
    },
    renderMenu () {
      this.showMenu = !this.showMenu
    }
  },
  computed: {
    socket() {
      return io('http://localhost:8000')
    }
  }
}
</script>

<style>

</style>
