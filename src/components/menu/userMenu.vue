<template>
  <div class="menu-block" >
    <menu class="user-menu">
      <li class="close-menu"><span v-on:click="$emit('hideMenu')">X</span></li>
      <li class="component-link"><router-link to="/">place order</router-link></li>
      <li class="component-link"><router-link to="/showOrders">show my orders</router-link></li>
      <li class="component-link"><router-link to="/myProfile">my profile</router-link></li>
      <li class="component-link"><router-link to="/about">about</router-link></li>
      <li class="component-link"><a href="http://localhost:8000/user/signout" role="button">sign out</a></li>
    </menu>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.user-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: black;
  height: 100vh;
  width: 50vw;
  color: #ffffff;
  display: flex;
  flex-direction: column;
}

.component-link {
  text-decoration-style: none;
  margin: 3em;
}

.close-menu {
  text-align: end;
}
</style>
