<template>
  <div class="menu-block">
    <menu class="runner-menu">
      <li class="close-menu"><span v-on:click="$emit('hideMenu')">X</span></li>
      <li class="component-link"><router-link to="/showCurrentAssignment">Current Assignment</router-link></li>
      <li class="component-link"><router-link to="/showPastAssignments">Past Assignments</router-link></li>
      <li class="component-link"><router-link to="/myProfile">My Profile</router-link></li>
      <li class="component-link"><router-link to="/about">About</router-link></li>
      <li class="component-link"><a href="http://localhost:8000/runner/signout">Sign out</a></li>
    </menu>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.runner-menu {
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
