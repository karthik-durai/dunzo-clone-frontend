<template>
  <div class="chat-rendering-window">
    <p v-for="chat of chats" 
      v-bind:class="[chat.from === 'user' ? 'user' : 'runner']"
      class="each-message"
      >{{ `${chat.from}: ${chat.message}` }}</p>
  </div>
</template>

<script>
export default {
  props: ['chats'],
  data() {
    return {
    }
  },
  computed: {
    isUser() {
      if (this.chat.from === 'user') return true
      return false
    }
  }
}
</script>

<style>
.chat-rendering-window {
  display: flex;
  overflow: auto;
  flex-direction: column;
}

</style>