<template>
  <h1 class="text-center mt-4">Add New Number</h1>
  <form class="my-5">
    <select class="form-select" aria-label="Default select example">
        <option selected>Choose Country</option>
        <option value="1">One</option>
    </select>
    <div class="my-3">
      <label  class="form-label">Phone Number</label>
      <input type="text" class="form-control">
    </div>
    <div class="my-3">
      <button type="submit" class="form-control btn btn-info text-light">Add New Phone</button>
    </div>
  </form>
</template>

<script>
    export default {
        name: "addCountry"
    }
</script>

<style lang="scss" scoped>

</style>