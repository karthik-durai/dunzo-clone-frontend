<template>
  <div v-on:click="$emit('getdetails', order._id)">
    <p>{{ order.status }}</p>
    <p>{{ order.description }}</p>
    <p>PlacedOn: {{ order.placedOn }}</p>
    <button v-on:click.prevent="$emit('cancelorder', order._id)">cancel</button>
  </div>
</template>

<script>
export default {
  props: ['order']
}
</script>

<style>
.each-order {
  margin: 0 auto;
  border: solid #ffffff;
  text-align: center;
  margin: 1em;
  cursor: pointer;
  font-size: 5vw;
}

</style>
