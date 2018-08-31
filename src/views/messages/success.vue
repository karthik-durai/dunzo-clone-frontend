<template>
  <div>
    <p>Your order has been placed successfully</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeToRedirect: null
    }
  },
  methods: {
    redirectToOrdersPage() {
      window.location = 'http://localhost:8080/orders.html'
      clearTimeout(this.timeToRedirect)
    }
  },
  mounted() {
    this.timeToRedirect = setTimeout(this.redirectToOrdersPage, 5000)
  }
}
</script>

<style>

</style>
