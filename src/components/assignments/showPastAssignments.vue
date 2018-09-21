<template>
  <div class="past-assignment-details">
    <li v-for="order in orders" class="each-assignment">
      <p>{{ order.status }}</p>
      <p>placed On: {{ order.placedOn }}</p>
      <p>{{ order.description }}</p>
    </li>
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
      let orders = (await fetchedObj.json())
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
.past-assignment-details {
  text-align: center;
  color: #ffffff;
}
.each-assignment {
  border: solid #ffffff;
  margin: 1em;
  list-style: none;
}

</style>
