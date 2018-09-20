<template>
  <div v-on:click="$emit('getdetails', order._id)">
    <p>{{ order.status }}</p>
    <p>{{ order.description }}</p>
    <p>{{ order.placedOn }}</p>
    <button v-on:click.prevent="$emit('cancelorder', order._id)">cancel</button>
  </div>
</template>

<script>
export default {
  props: ['order']
}
</script>

<style>

</style>
