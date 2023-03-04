<template>
<!-- Drop; Downs; for filter -->
    <div class="row my-5">
        <div class="col-md-2"></div>
        <div class="col-md-4">
            <div class="mb-3">
                <!-- Drop Down of All Countries -->
                <select class="form-select" @change="handleChangeCountry">
                    <option selected>Select Country</option>
                    <option :value="country.country_name" v-for="country in allCountries" :key="country.id">
                        {{ country.country_name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-4">
             <!-- Drop Down of Phone Status -->
            <div class="mb-3">
                <select class="form-select" @change="handleChangeByValidNum">
                    <option selected>Valid Phone Numbers</option>
                    <option value="ok">OK</option>
                    <option value="nok">NOK</option>
                </select>
            </div>
        </div>
    </div>
    <!-- Show; Data; Part -->
    <table class="table ">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Country Name</th>
                <th scope="col">Country Code</th>
                <th scope="col">Country Phone</th>
                <th scope="col">Country State</th>
                <th scope="col">Edit</th>
            </tr>
        </thead>
        <!-- Country Data -->
        <tbody>
            
            <tr v-for="(country, index) in countries" :key="country.id">
                <th scope="row">{{index+1}}</th>
                <td>
                    <img style="width:100px ; height:100px" class="rounded-circle" :src="country.country_flag">
                    {{country.country_name}}
                </td>
                <td>{{ country.country_code }}</td>
                <td>{{country.phone_number}}</td>
                <td> {{ country.phone_status }} </td>
                <td> <button class="btn btn-info">Edit</button> </td>
            </tr>

        
        </tbody>
    </table>

    <!-- Pagination Part -->
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <!-- <li; class="page-item"><a class;="page-link"; href="#">1</a></li;>
            <li class;="page-item"><a class;="page-link"; href="#">2</a></li> -->
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
    </nav>
</template>

<script>
import axios from "axios";

    export default {
        name : "getCountry",
        data(){
          return {
           countries :[],
           allCountries : [] ,
           selectedCountry : '' ,
           phoneNumberStatus : ''

          };
        },
        methods : {
            //get all countries api to display in table with pagination
            getCountries(){
                axios.get("http://127.0.0.1:8000/api/countries")
                .then((res) =>{
                this.countries = res.data.data;
                // console.log(this.countries.data.data);
                })
                .catch((error) =>{
                    console.log(error);
                });
            },
            //get all countries from api to display in dropdown
            getAllCountries(){
                axios.get("http://127.0.0.1:8000/api/all_countries").
                then((res) =>{
                this.allCountries = res.data;
                // console.log(this.allCountries);
                })
                .catch((error) => {console.log(error);});
            },
            handleChangeCountry(e) {
                this.selectedCountry= e.target.value;
                axios.get(`http://127.0.0.1:8000/api/get_country?country=${this.selectedCountry}`).
                then( (response) =>{ 
                    // console.log(response.data.data);
                    this.countries = response.data.data; //update countries array list
                })
                .catch((error) =>{
                    console.log(error);
                });
            }, 
            handleChangeByValidNum(e){
                this.phoneNumberStatus = e.target.value;
                console.log(this.phoneNumberStatus);
                axios.get(`http://127.0.0.1:8000/api/get_countries_status?phone_status=${this.phoneNumberStatus}`)
                .then((response) =>{
                    this.countries = response.data.data; //update countries array list
                    console.log(response.data);
                })
                .catch((err)=>{
                   console.log(err);
                });
            }
        },
        created(){
            this.getCountries();
            this.getAllCountries();
        },
    }
</script>

<style lang="scss" scoped>

</style>