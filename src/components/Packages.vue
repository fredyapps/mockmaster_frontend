<template>
               <div v-if="loading" class="text-center">

                        <div class="spinner-border" role="status">
                                                               
                        </div>
                </div>

            <div v-if="offers_layout" class="row align-items-center">
                    <div v-for="offer in offers" :key="offer.package_id" class="col-md-4 col-12 mt-4 pt-2">
                        <div class="card pricing-rates business-rate shadow bg-light rounded text-center border-0">
                            <div v-if="offer.ghc_price==350" class="ribbon ribbon-right ribbon-warning overflow-hidden"><span class="text-center d-block shadow small h6">Best</span></div>
                            <div class="card-body py-5">
                                <h6 class="title fw-bold text-uppercase text-primary mb-4">{{offer.name}}</h6>
                                <div class="d-flex justify-content-center mb-4">
                                    <span class="h4 mb-0 mt-2">GHC</span>
                                    <span class="price h1 mb-0">{{offer.ghc_price}}</span>
                                    <span class="h4 align-self-end mb-1"></span>
                                </div>
                                
                                <ul class="list-unstyled mb-0 ps-0">
                                    <li v-for="item in offer.items" :key="item.item_id" class="h6 text-muted mb-0"><span class="text-primary h5 me-2"><i class="uil uil-check-circle align-middle"></i></span>{{item.name}}</li>
                                  
                                </ul>
                                <a @click="checkout_page(offer)"  class="btn btn-primary mt-4">Get started</a>
                            </div>
                        </div>
                    </div><!--end col-->
                    
            </div><!--end row-->

            <checkout-page v-if="checkout_layout" :offering="offering"></checkout-page>

</template>


<script >

import axios from "axios";

import Package_checkout from './Package_checkout.vue'
export default {

  name: 'Packages',
     components: {
    'checkout-page': Package_checkout,
  },

  data () {

      return{
  
        loading:false,
        offers :[],
        loading:false,
        offers_layout:false,
        checkout_layout:false,
        offering:{}

      }

  }, 


   methods: {


   get_packages() {
      
        this.loading = true;

        var config = {
            method: 'GET',
            url: this.api_url+'/examAPIs/v1/packages',
            };
        axios(config).then(result => {
            
            //console.log(result.data);
            this.offers = result.data;
            this.loading = false;
            this.offers_layout = true;
         
        }, error => {
            this.loading = false;
           // console.log(error.response);
        });
    },


    checkout_page(the_offer){

              this.offers_layout = false;
              this.checkout_layout = true;
              this.offering = the_offer;
    }


   },



   created(){

     this.get_packages();
   }


}



</script>