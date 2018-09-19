<template>
  <div>
    <past-messages v-bind:chats="pastChats" />
    <current-messages v-bind:chats="currentChat"/>
    <input type="text" v-model="message"/>
    <button v-on:click="sendMessage">send</button>
  </div>
</template>

<script>
import vueInstance from '../../views/user/main.js'
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
      this.socket.emit('chat message', [this.$route.path.split('/')[2], this.message])
      this.currentChat.push({ from: 'you', message: this.message })
    },
    getPastMessages (messages) {
      this.pastChats = messages
    }
  },
  mounted() {
    this.socket.emit('join chat room', this.$route.path.split('/')[2])
    this.socket.on('past messages', this.getPastMessages)
    this.socket.on('chat message', (messageObj) => this.currentChat.push(messageObj))
  }
}
</script>

<style>

</style>
