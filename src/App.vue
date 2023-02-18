<template>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {
  },
  methods : {
   getPosts(){
    axios.get("http://127.0.0.1:8000/api/countries")
    .then((res) =>{
      // console.log(res.data);
      this.posts = res.data;
      console.log(this.posts.data);
      })
    .catch((error) => {console.log(error)})
   }
  },
   created(){
    this.getPosts();
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
