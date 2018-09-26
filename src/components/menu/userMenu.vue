<template>
  <div class="menu-block" >
    <menu class="user-menu" v-on:click="$emit('hideMenu')">
      <li class="close-menu"><span v-on:click="$emit('hideMenu')">⬅</span></li>
      <li class="component-link"><router-link to="/">Place order</router-link></li>
      <li class="component-link"><router-link to="/showOrders">Show my orders</router-link></li>
      <li class="component-link"><router-link to="/myProfile">My profile</router-link></li>
      <!-- <li class="component-link"><router-link to="/about">About the app</router-link></li> -->
      <li class="component-link"><a href="https://dunzoclone.now.sh/user/signout" role="button">Sign out</a></li>
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
  height: 100%;
  background-color: black;
}

.user-menu {
  display: flex;
  flex-direction: column;
  list-style: none;
}

.component-link {
  margin: 2em;
}
.component-link a {
  text-decoration: none;
  font-size: 3em;
  color: white;
  outline: 0;
}
.close-menu span {
  font-size: 5em;
}
.close-menu span, .component-link {
  cursor: pointer;
}
.close-menu {
  text-align: end;
  color: white;
}

</style>
