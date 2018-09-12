<template>
  <div>
    <label for="input-pick-up">Provide Drop Location</label>
    <select id="input-pick-up" v-model="inputType">
      <option value="">--Choose an option--</option>
      <option value="CurrentLocation">Current Location</option>
      <option value="addressForm">Address Form</option>
      <option value="searchLocation">Search Location</option>
    </select>
  </div>
</template>

<script>

export default {
  data() {
    return {
      inputType:''
    }
  },
  watch: {
    inputType() {
      this.$emit('input-type', { input: this.inputType, type: 'drop' })
    }
  }
}
</script>

<style>

</style>
