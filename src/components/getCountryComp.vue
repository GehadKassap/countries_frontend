<template>
<!-- Drop; Downs; for filter -->
    <div class="row my-5">
        <div class="col-md-4">
            <div class="mb-3">
                <!-- Drop Down of All Countries -->
                <select class="form-select" id="countryDropDown" @change="handleChangeCountry">
                    <option selected>Select Country</option>
                    <option :value="country.country_name" v-for="country in allCountries" :key="country.id">
                        {{ country.country_name }}
                    </option>
                </select>
            </div>
        </div>

        <div class="col-md-4">
             <!-- Drop Down of Phone Status -->
            <div class="mb-3">
                <select class="form-select" id="countryStatus" @change="handleChangeByValidNum">
                    <option selected>Valid Phone Numbers</option>
                    <option value="ok">OK</option>
                    <option value="nok">NOK</option>
                </select>
            </div>
        </div>
        <div class="col-md-3">
            <button class="btn btn-success text-light" @click="resetCountry">Reset</button>
        </div>
    </div>
    <!-- Show; Data; Part -->
    <!-- Main Table -->
    <table class="table table-hover table-bordered table-sm">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Country Name</th>
                <th scope="col">Country Code</th>
                <th scope="col">Country Phone</th>
                <th scope="col">Country State</th>
                <th scope="col">Operation</th>
            </tr>
        </thead>
        <!-- Country Data -->
        <tbody class="table-group-divider">
            <tr v-for="(country, index) in countries" :key="country.id">
                <th scope="row">{{index+1}}</th>
                <td>
                     <img style="width:50px ; height:50px" class="rounded-circle" :src="country.country_flag">
                     {{country.country_name}}
                </td>
                <td>{{ country.country_code }}</td>
                <td >{{country.phone_number}}</td>
                <td> {{ country.phone_status }} </td>
                <td class="operation"> 
                    <button  data-bs-toggle="modal" :data-bs-target="'#editCountry-' + index">
                       <i class="fas fa-edit me-2"></i>
                    </button>
                    <button @click="deleteCountry(country.id)">
                        <i class="fas fa-trash"></i>
                    </button>
                           
                </td>
                <!-- Modal -->
                <div  class="modal fade" :id="'editCountry-' + index" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header text-center">
                                <h1 class="modal-title my-4 ms-4  fs-5" id="exampleModalLabel">
                                    <img style="width:50px ; height:50px" class="rounded-circle" :src="country.country_flag">
                                    {{country.country_name }}
                                </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <input :value="country.phone_number" :id="'phone_number-' + index" tabindex="-1">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button @click="updateCountry(country,index)" data-bs-dismiss="modal" type="button" class="btn btn-info text-light">update {{country.country_name }}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </tr>
        </tbody>
    </table>

    <!-- Pagination Part -->
   <nav aria-label="Page navigation">
        <ul class="pagination d-flex flex-row-reverse">
            <li  :class="!detailedCountries.prev_page_url?'disabled':''">
                 <a :disabled="!detailedCountries.prev_page_url" @click.prevent="loadPage(detailedCountries.current_page-1)" href="#" class="page-link">
                   Previous
                </a>
            </li>
           

            <li v-for="(pageNumber, i) in detailedCountries.links" :key="i" class="page-item">
                <a  @click.prevent="loadPage(pageNumber.label)" href="#" class="page-link" :class="pageNumber.label == currentPage ? 'active':''">
                    {{ pageNumber.label }} 
                </a>
            </li>

            <li  :class="!detailedCountries.next_page_url?'disabled':''">
                 <a :disabled="!detailedCountries.next_page_url" @click.prevent="loadPage(detailedCountries.current_page+1)" href="#" class="page-link">
                   Next
                </a>
            </li>

            <span class="mx-4 my-2">{{detailedCountries.current_page}} of {{detailedCountries.last_page}}</span>

        </ul>
   </nav>
</template>

<script>
    import axios from "axios";
    import router from '@/router';
    export default {
        name : "getCountry",
        data(){
          return {
           countries :[],
           allCountries : [] ,
           selectedCountry : '' ,
           phoneNumberStatus : '',
           phoneNumber : '',
           phoneRegex :'',
           currentPage: 1,
           endIndex : 1,
           startIndex:0,
           detailedCountries :'',
           currentRoute: this.$route.path
          };
        },
        methods : {
            /*
             * get all countries api to display in table with pagination
            */
            getCountries(){
                 if (typeof this.currentPage === undefined) {
                    this.currentPage = 1;
                }
                axios.get(`http://127.0.0.1:8000/api/countries?page=${this.currentPage}`)
                .then((res) =>{
                this.countries = res.data.data;
                this.detailedCountries = res.data;
                this.detailedCountries.links= this.detailedCountries.links.slice(1,this.detailedCountries.links.length-1);
                // console.log(this.detailedCountries.links)
                this.currentPage = res.data.current_page;
                })
                .catch((error) =>{
                    console.log(error);
                });
            },
            /*
            * to make pagination functionality
            */
            loadPage(pageNumber) {
                // this.pageParameter = this.$route.query.page;
                axios.get(`http://127.0.0.1:8000/api/countries?page=${pageNumber}`)
                .then(response => {
                    this.countries = response.data.data;
                    this.currentPage = response.data.current_page;
                    this.detailedCountries = response.data;
                    // console.log(this.detailedCountries.links);
                    console.log(this.currentPage);
                    this.detailedCountries.links= this.detailedCountries.links.slice(1).reverse().slice(1).reverse();
                    // console.log(this.detailedCountries.links);
                    const newUrl = `?page=${pageNumber}`;
                    // history.pushState({}, '', newUrl);
                    this.$router.push(newUrl);
                })
                .catch(error => {
                    console.error("errorrrr" , error);
                });
            },
            /*
             * get all countries from api to display in dropdown
            */
            getAllCountries(){
                axios.get("http://127.0.0.1:8000/api/all_countries").
                then((res) =>{
                  this.allCountries = res.data;
                  //console.log(this.allCountries[0]);
                })
                .catch((error) => {console.log(error);});
            },
            /*
             * search on specific country
            */
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
            /*
             * search on a specific phone status
            */
            handleChangeByValidNum(e){
                this.phoneNumberStatus = e.target.value;
                // console.log(this.phoneNumberStatus);
                axios.get(`http://127.0.0.1:8000/api/get_countries_status?phone_status=${this.phoneNumberStatus}`)
                .then((response) =>{
                    this.countries = response.data.data; //update countries array list
                    // console.log(response.data);
                })
                .catch((err)=>{
                   console.log(err);
                });
            },
            /*
             * Delete Country from table by its id
            */
            deleteCountry(countryId){
                console.log(countryId);
                axios.get(`http://127.0.0.1:8000/api/country/delete?country_id=${countryId}`)
                .then((response)=>{
                    // console.log(response.data);
                    if(response.data.errors === false && response.data.status === 204){
                        // console.log(countryId);
                        // this.$router.push("/");
                        router.push('/');
                        // location.reload();
                    }
                })
                .catch((err)=>{
                    console.log(err)
                });
            },
            /*
             * to update phone number of country 
            */
            async updateCountry(country,index){
                // const myModal = document.querySelector(".modal");
                const phoneNumber = document.querySelector(`#phone_number-${index}`).value;
                const response1 = await fetch(`https://restcountries.com/v3.1/name/${country.country_name}`);
                const data1 = await response1.json();
                this.phoneRegex = data1[0].postalCode.regex;
                this.phoneRegex = new RegExp(this.phoneRegex);
                if (this.phoneRegex.test(country.phone_number)) {
                  country.phone_status = "ok";
                } else {
                  country.phone_status = "nok";
                }
                const body = {
                    "phone_number" : phoneNumber,
                    "phone_status" : country.phone_status
                };
                // console.log("body" , body);
                axios.post(`http://127.0.0.1:8000/api/country/update/${country.id}`,body)
                .then((response)=>{
                    console.log(response.data);
                    this.countries[index].phone_number = phoneNumber;
                    // document.querySelector('.modal').modal('hide');
                    
                    // console.log(this.countries[index]);
                })
                .catch((err)=> {
                    console.log(err)
                });
            },
            /*
             * reset search results
            */
            resetCountry(){
                this.getCountries();
                document.getElementById('countryDropDown').value = 'Select Country';
                document.getElementById('countryStatus').value = 'Valid Phone Numbers';
            },
            checkPagination(){
                if(
                this.detailedCountries.links[0].label == '&laquo; Previous' ||
                this.detailedCountries.links[this.detailedCountries.links.lenght-1].label == 'Next &raquo;'
                )return false;
            },
        },
        created(){
            this.getCountries();
            this.getAllCountries();
        },
        watch: {
            currentRoute(to) {
            this.currentRoute = to.path;
            window.scrollTop(0,0);
            }  
        }
    }
</script>

<style lang="scss" scoped>

</style>