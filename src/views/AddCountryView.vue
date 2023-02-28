<template>
  <div class="container">
    <addCountry></addCountry>
  </div>
</template>

<script>
// @ is an alias to /src
import addCountry from '@/components/addCountry.vue';
export default {
  name: 'HomeView',
  components: {
    addCountry
  }
}
</script>