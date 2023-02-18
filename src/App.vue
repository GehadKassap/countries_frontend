<template>
  <getCountry></getCountry>
</template>

<script>
import getCountry from './components/getCountryComp.vue';
export default {
  name: "App",
  components: {
    getCountry
  },

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
