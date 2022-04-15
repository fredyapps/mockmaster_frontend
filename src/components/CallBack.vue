
<template>


                <div v-if="loading" class="text-center">

                        <div class="spinner-border" role="status">
                                                               
                        </div>
                </div>

                <div v-if="success_layout" class="row justify-content-center">
                    <div class="col-12">
                        <div class="text-center">
                               <i style="font-size:8em" class="text-success bi bi-check2-circle" ></i>  
                            <h1 class="my-4 fw-bold">Thank You !</h1>
                            <p class="text-muted para-desc mx-auto">Your payment was Successful.</p>
                            <a href="/mockexam" class="btn btn-soft-info mt-3">Take a mock</a>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->


                <div v-if="error_layout" class="row justify-content-center">
                    <div class="col-12">
                        <div class="text-center">
                               <i style="font-size:8em" class="text-danger bi bi-exclamation-triangle-fill"></i>
                            <h1 class="my-4 fw-bold">Failed</h1>
                            <p class="text-muted para-desc mx-auto">{{message}}</p>
                            <a href="/dashboard" class="btn btn-soft-info mt-3">Try again</a>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->


     
  

</template>


<script>

import axios from "axios";
export default {

  name: 'CallBack',
  props: [ 'transaction_id'],

  data () {

      return{
  
        transact:{},
        success_layout: false,
        error_layout: false,

      }

  }, 


        methods: {




            check_transaction_status() {
      
                this.loading = true;

                var config = {
                    method: 'GET',
                    url: this.api_url+'/themockmasterAPIs/v1/checkTransactionStatus/'+this.transaction_id,
                    };
                axios(config).then(result => {
                    
                   // console.log(result.data);
                    this.transact = result.data;
                    this.loading = false;
                    if(result.data.status=="success" && result.data.data.status=="successful"){
                            this.success_layout = true;
                    }else{

                            this.message = result.data.message;
                            this.error_layout = true;
                    }
                   
                
                }, error => {
                    this.loading = false;
                    this.message = "Sorry, something went wrong and we could not confirm your transaction";
                   // console.log(error.response);
                    this.error_layout = true;
                });
            },




 
      


        
        },


         create(){



            
         
        },


        mounted(){

            this.check_transaction_status();

        }


}



</script>