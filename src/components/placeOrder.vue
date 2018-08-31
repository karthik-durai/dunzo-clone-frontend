<template>
  <div>
    <router-link to="/showOrders">show my orders</router-link>
    <form action="http://localhost:8000/user/placeorder" method="post">
      <input type="text" placeholder="Enter your order to place" name="description"/>
      <button>place</button>
    </form>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>
