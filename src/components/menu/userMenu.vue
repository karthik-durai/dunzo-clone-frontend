<template>
  <div class="menu-block" >
    <menu class="user-menu" v-on:click="$emit('hideMenu')">
      <li class="close-menu"><span v-on:click="$emit('hideMenu')">⬅</span></li>
      <li class="component-link"><router-link to="/">Place order</router-link></li>
      <li class="component-link"><router-link to="/showOrders">Show my orders</router-link></li>
      <li class="component-link"><router-link to="/myProfile">My profile</router-link></li>
      <li class="component-link"><router-link to="/about">About the app</router-link></li>
      <li class="component-link"><a href="http://localhost:8000/user/signout" role="button">Sign out</a></li>
    </menu>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.menu-block {
  position: fixed;
  margin: 0;
  border: solid;
}

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
  margin: 2em;
}

.component-link a {
  text-decoration: none;
  font-size: 3em;
}

.close-menu span {
  font-size: 2em;
}

.close-menu span, .component-link {
  cursor: pointer;
}

.close-menu {
  text-align: end;
}
</style>
