<template>
  <div>
    <p v-if="invalidForm">order form is incomplete, make sure order description is more than 10 characters and both addresses are filled</p>
    <p v-else-if="placed">order has been placed successfully</p>
    <p v-else-if="notPlaced">order did not get placed successfully, try again</p>
  </div>
</template>

<script>
export default {
  props: ['status'],
  computed: {
    invalidForm() {
      return this.status[0]
    },
    placed() {
      return this.status[1]
    },
    notPlaced() {
      return this.status[2]
    }
  }
}
</script>

<style>

</style>
