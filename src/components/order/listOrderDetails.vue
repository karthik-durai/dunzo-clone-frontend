<template>
  <div>
    <p>{{ order.status }}</p>
    <p>{{ order.description }}</p>
    <p>Placed-On: {{ order.placedOn }}</p>
    <p>Order-Id: {{ order._id }}</p>
    <p>Runner: {{ }}</p>
  </div>
</template>

<script>
export default {
  props: ['order']
}
</script>

<style>

</style>
