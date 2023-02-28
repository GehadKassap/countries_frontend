<template>
  <div class="home container">
    <getCountry></getCountry>
  </div>
</template>

<script>
// @ is an alias to /src
import getCountry from '@/components/getCountryComp.vue';
export default {
  name: 'HomeView',
  components: {
    getCountry
  }
}
</script>
