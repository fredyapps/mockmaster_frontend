<template>
       
       
    
        <profile-header></profile-header>    

        <!-- Profile Start -->
        <section class="section mt-60">
            <div class="container">
                <div class="row">

                    <side-menu :initiating_session="initiating_session"  :checking_session="checking_session"  :closing_session="closing_session"  :dash_active="dash_active"></side-menu>

                    <div class="col-lg-8 col-12">
                        <div class="rounded shadow p-4">
                                <div class="row justify-content-center">
                                    <div class="col-12 text-center">
                                        <div v-if="!trans_mode" class="section-title mb-4 pb-2">
                                            <h4 class="title mb-4">CISA PACKAGES</h4>
                                        </div>

                                        <div v-if="trans_mode" class="section-title mb-4 pb-2">
                                            <h4 class="title mb-4">YOUR TRANSACTION STATUS</h4>
                                        </div>
                                    </div><!--end col-->
                                </div><!--end row-->

                                <mock-packages  v-if="!trans_mode"></mock-packages>

                                <callback-layout v-if="trans_mode" :transaction_id="transaction_id"  ></callback-layout>
                  
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
            </div><!--end container-->
        </section><!--end section-->
        <!-- Profile End -->


</template>

<script >

import DataService from "@/services/DataService";
import axios from "axios";
import SideMenu from './SideMenu.vue'
import Packages from './Packages.vue'
import CallBack from './CallBack.vue'
import ProfileHeader from './ProfileHeader.vue'

export default {

  name: 'Dashboard',

   props: [ 'initiating_session','checking_session','closing_session'],
   components: {
    'side-menu': SideMenu,
    'mock-packages': Packages,
    'profile-header': ProfileHeader,
    'callback-layout': CallBack,
  },
  data () {

      return{
  
            tx_ref:"",
            status:"",
            transaction_id:"",
            reference:"",
            trans_mode: false,
            dash_active: "navbar-item account-menu px-0 active"
      }

  }, 


   methods: {



   },



    created(){
          
        
        if(this.checking_session()){

        }else{
            this.$router.push('/login');
        }
    },



    mounted(){

          const urlParams = new URLSearchParams(window.location.search);
         
          this.transaction_id = urlParams.get("transaction_id");


          if(this.transaction_id !=null){
            
                this.trans_mode = true;
          }else{

                this.trans_mode = false;
          }


          console.log("Printing the transaction_id");
          console.log(this.transaction_id); 

        

    }


   


}



</script>