<template>
  <navBarComp></navBarComp>
  <router-view/>
</template>
<script>
import navBarComp from './components/navBarComp.vue';
export default {
  components:{navBarComp}
}
</script>

<style>


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
