<template>
  
</template>

<script>
export default {
  data() {
    return {
      pastOrderUrl: 'http://localhost:8000/runner/pastOrders',
      orders: {}
    }
  },
  methods: {
    async getPastAssignments () {
      let fetchedObj = await fetch(this.pastOrderUrl, this.constructFetchBody())
      let orders = await fetchedObj.json()
      return orders
    },
    constructFetchBody() {
      return {
        mode: 'cors',
        headers: {
          authorization: document.cookie.split(';')[1].split('=')[1]
        }
      }
    }
  },
  async mounted() {
    this.orders = await this.getPastAssignments()
    console.log(this.orders)
  }
}
</script>

<style>

</style>
