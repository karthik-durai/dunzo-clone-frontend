<template>
  <div>
    <p>{{ order.status }}</p>
    <p>{{ order.description }}</p>
    <p>Placed-On: {{ order.placedOn }}</p>
    <p>Order-Id: {{ order._id }}</p>
    <p>Pickup: {{ order.fromAddr }}</p>
    <p>Drop: {{ order.toAddr }}</p>
    <p>Runner: {{ runner }}</p>
  </div>
</template>

<script>
export default {
  props: ['order'],
  computed: {
    runner() {
      if (this.order.runner) return this.order.runner
      return 'not assigned'
    }
  }
}
</script>

<style>

</style>
