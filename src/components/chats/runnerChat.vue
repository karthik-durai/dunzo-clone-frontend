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
      currentChat: [],
      orderID: null
    }
  },
  methods: {
    async getCurrentAssignment () {
      let fetchedObj = await fetch(this.currentOrderUrl, this.constructFetchBody())
      let order = await fetchedObj.json()
      return order
    },
    sendMessage () {
      this.socket.emit(
        'chat message',
        [this.orderID, this.message],
        (msgObj) => this.currentChat.push(msgObj)
      )
    },
    getPastMessages (messages) {
      this.pastChats = messages
      console.log(this.pastChats)
    }
  },
  async mounted() {
    const currentOrder = await (await fetch(
      'http://localhost:8000/runner/currentOrder',
      {
        mode: 'cors',
        headers: {
          authorization: document.cookie.split(';').map(e=>e.trim()).filter(e=>e.startsWith('access_token='))[0].substring(13)
        }
      }
    )).json()
    this.orderID = currentOrder._id
    this.socket.emit('join chat room', this.orderID)
    this.socket.on('past messages', this.getPastMessages)
    this.socket.on('chat message', (messageObj) => this.currentChat.push(messageObj))
  }
}
</script>

<style>

</style>
