<template>
  <div>
    <input type="text" v-model="message"/>
    <button v-on:click="sendMessage">send</button>
  </div>
</template>

<script>
import vueInstance from '../../views/user/main.js'

export default {
  props: ['socket'],
  data() {
    return {
      message: ''
    }
  },
  methods: {
    sendMessage () {
      this.socket.emit('chat message', [this.$route.params.id, this.message])
    }
  },
  mounted() {
    this.socket.emit('join chat room', this.$route.params.id)
    this.socket.on('past messages', console.log)
  }
}
</script>

<style>

</style>
