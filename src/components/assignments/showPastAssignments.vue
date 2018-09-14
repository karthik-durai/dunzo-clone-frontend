<template>
  <div>
    <router-link to="/showPastAssignments/menu">menu</router-link>
    <router-view/>
    <p>{{ orders }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pastOrderUrl: 'http://localhost:8000/runner/pastOrders',
      orders: null
    }
  },
  methods: {
    async getPastAssignments () {
      let fetchedObj = await fetch(this.pastOrderUrl, this.constructFetchBody())
      let orders = (await fetchedObj.json())[0]
      return orders
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
    this.orders = await this.getPastAssignments()
  }
}
</script>

<style>

</style>
