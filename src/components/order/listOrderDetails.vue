<template>
  <div>
    <p>{{ order.status }}</p>
    <p>{{ order.description }}</p>
    <p>Placed-On: {{ order.placedOn }}</p>
    <p>Order-Id: {{ order._id }}</p>
    <p>Pickup: {{ order.fromAddr }}</p>
    <p>Drop: {{ order.toAddr }}</p>
    <p>Runner: {{ runner }}</p>
    <a v-bind:href="chatRoute">chat with runner</a>
  </div>
</template>

<script>
export default {
  props: ['order', 'currentRoute'],
  computed: {
    runner() {
      if (this.order.runner) return this.order.runner.name
      return 'not assigned'
    },
    chatRoute() {
      return `${this.currentRoute}/chat`
    }
  },
  mounted() {
    console.log(this.currentRoute)
  }
}
</script>

<style>

</style>
