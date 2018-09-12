<template>
  <div>
    <label for="input-pick-up">Choose a Pick Up Location</label>
    <select id="input-pick-up" v-model="inputType">
      <option value="">--Choose an option--</option>
      <option value="CurrentLocation">Current Location</option>
      <option value="addressForm">Use Address Form</option>
      <option value="autoComplete">Use AutoComplete</option>
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
      this.$emit('input-type', this.inputType)
    }
  }
}
</script>

<style>

</style>
