<template>
   <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/">Countries</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active"  to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active"  to="/addCountry">Add Country</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
    export default {
        name :"navBarComp"
    }
</script>

<style lang="scss" scoped>

</style>