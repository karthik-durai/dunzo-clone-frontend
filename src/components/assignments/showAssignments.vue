<template>
  <div> 
    <router-link to="/showAssignments/menu">menu</router-link>
    <router-view/>
    <p>assigment</p>
  </div>
</template>

<script>
import runnerMenu from '../menu/runnerMenu.vue'
export default {
  components: {
    runnerMenu
  }
}
</script>

<style>

</style>
