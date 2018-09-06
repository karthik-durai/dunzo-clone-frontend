<template>
  <div>
    <p v-if="lessChars">Description should be more than 10 characters</p>
    <p v-if="inValidChars">
      Found invalid characters in the Description, please remove or replace them</p>
    <p v-if="placedSuccess">Your order has got place successfully</p>
    <p v-if="failedToPlace">Sorry, your order is not placed, try again</p>
  </div>
</template>

<script>
export default {
  props: ['lessChars', 'failedToPlace', 'inValidChars', 'placedSuccess']
}
</script>

<style>

</style>
