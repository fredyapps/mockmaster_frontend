
<template>

   <!-- Hero Start -->
        <section class="bg-profile d-table w-100 bg-primary" style="background: url('images/account/bg.png') center center;">
        
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card public-profile border-0 rounded shadow" style="z-index: 1;">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-lg-2 col-md-3 text-md-start text-center">
                                        <!-- <img src="images/mock_logo.png" class="avatar avatar-large shadow d-block mx-auto" alt=""> -->
                                    </div><!--end col-->
    
                                    <div class="col-lg-10 col-md-9">
                                        <div class="row align-items-end">
                                            <div class="col-md-7 text-md-start text-center mt-4 mt-sm-0">
                                                <h3 class="title mb-0">{{fullname}} </h3>
                                                <small class="text-muted h6 me-2">{{email}}</small>
                                                <ul class="list-inline mb-0 mt-3">
                                                    <li class="list-inline-item me-2"><a href="javascript:void(0)" class="text-muted" title="Instagram"><i data-feather="instagram" class="fea icon-sm me-2"></i></a></li>
                                                </ul>
                                            </div><!--end col-->

                                            <div v-if="take_mock" class="col-md-5 text-md-end text-center">
                                          
                                                    <a href="/mockexam" class="btn btn-soft-info mt-3">Take a mock</a>
                                          
                                            </div><!--end col-->
   
                                        </div><!--end row-->
                                    </div><!--end col-->
                                </div><!--end row-->
                            </div>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
            </div><!--ed container-->
        </section><!--end section-->
        <!-- Hero End -->

</template>


<script>

import axios from "axios";
export default {

  name: 'ProfileHeader',

  data () {

      return{
  
        email :"",
        fullname:"",
        take_mock:false

      }

  }, 


        methods: {


        loading_header_info(){

            this.email = localStorage.getItem('email');
            this.fullname = localStorage.getItem('fullname');

            console.log("printing fullname");
            console.log(this.fullname);

         },



        check_eligibility() {
      
                this.loading = true;

                var config = {
                    method: 'GET',
                    url: this.api_url+'/examAPIs/v1/attempts',
                     headers: { 
                    'user_token': localStorage.getItem('token'),
                },
                    };
                    
                axios(config).then(result => {
                    
                    console.log(result.data);
                   
                    if(result.data.attempts > 0 ){
                            this.take_mock = true;
                    }else{
                            this.take_mock = false;
                    }
                   
                
                }, error => {
                   
                    //console.log(error.response);
                   
                });
            },


        
        },


         create(){

         
        },


        mounted(){

            this.loading_header_info();
            this.check_eligibility();

        }


}



</script>