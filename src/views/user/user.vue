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
      showMenu: false,
      socket: '',
      urlMapsAPI: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCyrqmHGMWIf_a_EmXRsFi_3KWTr2koaBU&libraries=places',
      urlSocketio: 'http://localhost:8000/socket.io/socket.io.js',
      intervalId: null
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
    },
    async getPublicVapidKey () {
      let url = 'http://localhost:8000/publicVapidKey'
      let publicVapidKey = (await (await fetch(url)).json())
      return publicVapidKey
    },
    async initiateServiceWorker () {
      try {
        let registeredSW = await navigator.serviceWorker.register('userSW.js', { scope: '/' })
        let subscriptionObj = await registeredSW.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: await this.getPublicVapidKey()
        })
        return subscriptionObj
      } catch (e) {
        console.log(e)
      }
    },
    async subscribePushNotification (subscriptionObj) {
      await fetch('/subscribe', {
        method: 'post',
        body: JSON.stringify(subscriptionObj),
        headers: {
          'content-type': 'application/json'
        }
      })
    },
    loadScript (url) {
      let script = document.createElement('script')
      script.setAttribute('src', url)
      script.setAttribute('async', true)
      script.setAttribute('defer', true)
      document.head.appendChild(script)
    },
    checkForSocket () {
      if (io) {
        this.socket = io('http://localhost:8000/')
        clearInterval(this.intervalId)
      }
    }
  },
  async mounted() {
    this.loadScript(this.urlMapsAPI)
    this.loadScript(this.urlSocketio)
    this.intervalId = setInterval(this.checkForSocket, 3000)
    if (navigator.serviceWorker) {
      let subscriptionObj = await this.initiateServiceWorker()
      this.subscribePushNotification(subscriptionObj)
    }
  }
}
</script>

<style>

</style>
