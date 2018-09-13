<template>
  <div> 
    <router-link to="/showAssignments/menu">menu</router-link>
    <router-view/>
    <div>
      <p>{{ order }}</p>
    </div>
  </div>
</template>

<script>
import runnerMenu from '../menu/runnerMenu.vue'
export default {
  components: {
    runnerMenu
  },
  data() {
    return {
      currentOrderUrl: 'http://localhost:8000/runner/currentOrder',
      order: null
    }
  },
  methods: {
    async getCurrentAssignments () {
      let fetchedObj = await fetch(this.currentOrderUrl, this.constructFetchBody())
      let order = await fetchedObj.json()
      return order
    },
    constructFetchBody() {
      return {
        mode: 'cors',
        headers: {
          authorization: document.cookie.split(';').map(e=>e.trim()).filter(e=>e.startsWith('access_token='))[0].substring(13)
        }
      }
    }
  },
  async mounted() {
    this.order = await this.getCurrentAssignments()
    console.log(this.order)
  }
}
</script>

<style>

</style>
