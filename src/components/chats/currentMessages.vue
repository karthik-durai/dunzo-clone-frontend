<template>
  <ol>
    <li v-for="chat of chats">
      <p>{{ chat }}</p>
    </li>
  </ol>
</template>

<script>
export default {
  props: ['chats']
}
</script>

<style>

</style>