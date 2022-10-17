

<template>


  <RouterView  :initiating_session="initiating_session"  :checking_session="checking_session"  :closing_session="closing_session"/>

</template>

<script >

import DataService from "@/services/DataService";
import axios from "axios";
export default {

  name: 'App',

  data () {

      return{
      
      credentials:{email:"",password:""},
      user_data:{email:"hhh",token:"hiiii", role:"hoho"},


      }

  }, 


   methods: {




    //initiates a session when the user logs in.
    initiating_session(session_data){
      
       localStorage.email = session_data.email;
       localStorage.token = session_data.token;
       localStorage.role = session_data.role;
       localStorage.fullname = session_data.fullname;

    },



    //checking if there is an existing session
    checking_session(){

     if (localStorage.getItem('email') && localStorage.getItem('token') && localStorage.getItem('role')) {

         return true;

     }else{

         return false;
     }

    },



    // closes the session when the user logs out.
    closing_session(){

      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('fullname');

    },



     //print the session.
     printing_session(){

        console.log("=========printing email==========="); console.log(localStorage.getItem('email'));
        console.log("=========printing token==========="); console.log(localStorage.getItem('token'));
        console.log("=========printing role============"); console.log(localStorage.getItem('role'));
        console.log("=========printing profession======"); console.log(localStorage.getItem('fullname'));
     }



   },

     mounted(){

      // this.initiating_session(this.user_data);
      this.printing_session();
      // this.closing_session();
      // this.printing_session();
     


     }


}



</script>

<style>
/* @import '@/assets/base.css'; */
@import '@/assets/css/bootstrap.min.css';
@import '@/assets/css/materialdesignicons.min.css'; 
@import '@/assets/css/tiny-slider.css';
@import '@/assets/css/style.css';
@import '@/assets/css/colors/default.css';



</style>
