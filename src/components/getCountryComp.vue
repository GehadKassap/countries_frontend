<template>
<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Country Name</th>
      <th scope="col">Country Code</th>
      <th scope="col">Country Phone</th>
      <th scope="col">Country State</th>
    </tr>
  </thead>
  <tbody>
     
    <tr v-for="(country, index) in countries" :key="country.id">
      <th scope="row">{{index+1}}</th>
      <td>
         <img style="width:100px ; height:100px" class="rounded-circle" :src="country.country_flag">
         {{country.country_name}}
      </td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>

  
  </tbody>
</table>
</template>

<script>
import axios from "axios";

    export default {
        name : "getCountry",
        data(){
          return {
           countries :[]
          }
        },
        methods : {
            getCountries(){
                axios.get("http://127.0.0.1:8000/api/countries")
                .then((res) =>{
                // console.log(res.data);
                this.countries = res.data.data;
                console.log(this.countries.data.data);
                })
                .catch((error) => {console.log(error)})
            }
        },
        created(){
            this.getCountries();
        },
    }
</script>

<style lang="scss" scoped>

</style>