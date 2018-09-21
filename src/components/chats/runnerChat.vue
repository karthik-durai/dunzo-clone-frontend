<template>
  <div class="chat-component">
    <render-chat v-bind:chats="chats" />
    <div class="chat-input-box">
      <input type="text" v-model="message" placeholder="Enter your message"/>
      <button v-on:click="sendMessage" v-bind:disabled="disabledSendBtn">send</button>
    </div>
  </div>
</template>

<script>
import vueInstance from '../../views/runner/main.js'
import renderChat from './renderChat.vue'

export default {
  props: ['socket'],
  components: {
    renderChat
  },
  data() {
    return {
      message: '',
      chats: [],
      orderID: null,
      intervalId: null
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
        (msgObj) => this.chats.push(msgObj)
      )
      this.message = ''
    },
    getPastMessages (messages) {
      this.chats = messages
    },
    checkForSocket () {
      if (this.socket) {
        this.socket.emit('join chat room', this.orderID)
        this.socket.on('past messages', this.getPastMessages)
        this.socket.on('chat message', (messageObj) => this.chats.push(messageObj))
        clearInterval(this.intervalId)
      }
    }
  },
  computed: {
    disabledSendBtn() {
      if (this.message.length > 0) return false
      return true
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
    this.intervalId = setInterval(this.checkForSocket, 3000)
  }
}
</script>

<style>
.chat-component {
  margin-top: 5vh;
  height: 90vh;
  display: grid;
  grid-template-rows: 70vh auto;
}

.chat-rendering-window {
  overflow: auto;
  padding-left: 0.3em;
  padding-right: 0.3em;
}

.user, .runner {
  margin: 0.3em;
  padding-left: 0.5em;
  font-size: 1.5em;
}

.user {
  text-align: right;
  background-color: #4A00E0;
  color: #ffffff;
  padding-right: 0.5em;
}

.runner {
  text-align: left;
  background-color: #f05053;
  color: #ffffff;
  padding-right: 0.5em;
}

.chat-input-box {
  display: flex;
  flex-direction: column;
}

.chat-input-box input, button {
  height: 50%;
}
</style>
