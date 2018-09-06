<template>
  <div v-on:click="$emit('getdetails', order._id)">
    <p>{{ order.status }}</p>
    <p>{{ order.description }}</p>
    <p>{{ order.placedOn }}</p>
  </div>
</template>

<script>
export default {
  props: ['order']
}
</script>

<style>

</style>
