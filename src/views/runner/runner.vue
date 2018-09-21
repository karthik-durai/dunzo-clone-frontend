<template>
  <div>
    <runner-menu 
      v-if="showMenu" v-on:hideMenu="hideMenu"/>
    <a href="" v-on:click.prevent="renderMenu" class="menu__hamburger-icon">&#9776;</a>
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
      showMenu: false,
      socket: '',
      urlMapsAPI: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCyrqmHGMWIf_a_EmXRsFi_3KWTr2koaBU&libraries=places',
      urlSocketio: 'https://dunzoclone.now.sh/socket.io/socket.io.js',
      intervalId: null,
      showHam: true
    }
  },
  methods: {
    hideMenu () {
      this.showMenu = false;
    },
    getCoordinates () {
      navigator.geolocation.watchPosition(pos => {
        this.lat = pos.coords.latitude
        this.lng = pos.coords.longitude
        this.socket.emit('position update', [this.lng, this.lat])
        console.log(this.lat, this.lng)
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
        this.socket = io('https://dunzoclone.now.sh/')
        clearInterval(this.intervalId)
      }
    },
    renderMenu () {
      this.showMenu = true;
    },
    async getPublicVapidKey () {
      let url = 'https://dunzoclone.now.sh/publicVapidKey'
      let publicVapidKey = (await (await fetch(url)).json())
      return publicVapidKey
    },
    async initiateServiceWorker () {
      try {
        let registeredSW = await navigator.serviceWorker.getRegistration()
        if (!registeredSW) {
          registeredSW = await navigator.serviceWorker.register('runnerSW.js', { scope: '/' })
        }
        let subscriptionObj = await registeredSW.pushManager.getSubscription()
        let isNewSubscription = !subscriptionObj
        if (!subscriptionObj) {
          subscriptionObj = await registeredSW.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: await this.getPublicVapidKey()
          })
        }
        return isNewSubscription ? subscriptionObj : false
      } catch (e) {
        console.log(e)
      }
    },
    async subscribePushNotification (subscriptionObj) {
      await fetch('https://dunzoclone.now.sh/subscribe', {
        mode: 'cors',
        method: 'post',
        body: JSON.stringify(subscriptionObj),
        headers: {
          'content-type': 'application/json',
          'authorization': document.cookie.split(';').map(e=>e.trim()).filter(e=>e.startsWith('access_token='))[0].substring(13)
        }
      })
    },
  },
  async mounted() {
    this.loadScript(this.urlMapsAPI)
    this.loadScript(this.urlSocketio)
    this.intervalId = setInterval(this.checkForSocket, 3000)
    this.getCoordinates()
    if (navigator.serviceWorker) {
      let subscriptionObj = await this.initiateServiceWorker()
      if (subscriptionObj) {
        this.subscribePushNotification(subscriptionObj)
      }
    }
  },
}
</script>

<style>
.menu__hamburger-icon {
  font-size: 5vh;
  text-decoration: none;
  color: #ffffff;
}

</style>
