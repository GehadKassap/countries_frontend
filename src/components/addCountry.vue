<template>
  <h1 class="text-center mt-4">Add New Number</h1>
  <form class="my-5"  @submit.prevent="submitData">
      <div class="my-3">
        <label  class="form-label">Select a Country</label>
        <select class="form-select js-example-basic-single" v-model="countryName" ref="selectInput" @change="getCountryData">
            <option :value="country.country_name" v-for="country in allCountries" :key="country.id">
            {{ country.country_name }}
            </option>
        </select>
      </div>
      <div class="my-3">
        <label  class="form-label">Phone Number</label>
        <input type="text" class="form-control" v-model="phoneNumber">
      </div>
      <div class="my-3">
        <button type="submit" class="form-control btn btn-success text-light">Add New Phone</button>
      </div>
  </form>
</template>

<script>
    // import $ from 'jquery';
    import axios from "axios";
    import router from '@/router';
    export default {
        name: "addCountry" , 
        data(){
          return{
            allCountries : [] ,
            countryInfo : '',
            phoneNumber : '' ,
            countryFlag : '' ,
            countryName : '' ,
            countryCode : '' ,
            countryStatus : '' ,
            phoneRegex :''
          }
        },
        methods :{
            //get all countries from api to display in dropdown
            getAllCountries(){
                axios.get("http://127.0.0.1:8000/api/all_countries").
                then((res) =>{
                this.allCountries = res.data;
                // console.log(this.allCountries);
                })
                .catch((error) => {console.log(error);});
            },
            getCountryData(){
                axios.get(`https://restcountries.com/v3.1/name/${this.countryName}`).
                then( (response) =>{ 
                    // console.log(response.data[0]);
                    this.countryInfo = response.data[0]; //update countries array list
                    this.countryFlag = this.countryInfo.flags.png; //get country flag
                    this.countryCode = this.countryInfo.idd.root + this.countryInfo.idd.suffixes[0] ; //get country flag
                    this.phoneRegex = this.countryInfo.postalCode.regex; //get country phone regex          
                })
                .catch((error) =>{
                    console.log(error);
                });
            },
            submitData(){
                this.phoneRegex = new RegExp(this.phoneRegex); //match regex 
                console.log(this.phoneRegex);
                if (this.phoneRegex.test(this.phoneNumber)) {
                  this.countryStatus = "ok";
                } else {
                  this.countryStatus = "nok";
                }
                axios.post('http://127.0.0.1:8000/api/country/save', {
                    country_name: this.countryName,
                    country_code: this.countryCode ,
                    phone_number: this.phoneNumber,
                    phone_status: this.countryStatus,
                    country_flag: this.countryFlag,
                })
                .then(response => {
                    
                    console.log(response.data);
                    router.push('/');
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        created(){
            this.getAllCountries();
        },
        mounted(){
            //  $('.js-example-basic-single').select2();
        },
    }
</script>

<style lang="scss" scoped>

</style>