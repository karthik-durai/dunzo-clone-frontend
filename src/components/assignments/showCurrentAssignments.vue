<template>
  <div> 
    <router-link to="/showAssignments/menu">menu</router-link>
    <router-view/>
    <p>assigment</p>
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
      orders: {}
    }
  },
  methods: {
    async getCurrentAssignments () {
      let fetchedObj = await fetch(this.currentOrderUrl, this.constructFetchBody())
      let orders = await fetchedObj.json()
      return orders
    },
    constructFetchBody() {
      return {
        headers: {
          authorization: document.cookie.split(';')[1].split('=')[1]
        }
      }
    }
  },
  async mounted() {
    this.orders = await this.getCurrentAssignments()
    console.log(this.orders)
  }
}
</script>

<style>

</style>
