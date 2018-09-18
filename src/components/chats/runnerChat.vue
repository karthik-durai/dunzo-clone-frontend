<template>
  <div>
    <past-messages v-bind:chats="pastChats" />
    <current-messages v-bind:chats="currentChat"/>
    <input type="text" v-model="message"/>
    <button v-on:click="sendMessage">send</button>
  </div>
</template>

<script>
import vueInstance from '../../views/runner/main.js'
import pastMessages from './pastMessages.vue'
import currentMessages from './currentMessages.vue'

export default {
  props: ['socket'],
  components: {
    pastMessages,
    currentMessages
  },
  data() {
    return {
      message: '',
      pastChats: [],
      currentChat: []
    }
  },
  methods: {
    sendMessage () {
      this.socket.emit('chat message', [this.$route.params.id, this.message])
      this.currentChat.push({ from: 'you', message: this.message })
    },
    getPastMessages (messages) {
      console.log('hello')
      this.pastChats = messages
    }
  },
  mounted() {
    this.socket.emit('join chat room', this.$route.params.id)
    this.socket.on('past messages', this.getPastMessages)
  }
}
</script>

<style>

</style>
