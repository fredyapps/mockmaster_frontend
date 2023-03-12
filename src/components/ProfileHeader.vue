
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
                                        <img src="/mock_logo.png" class="avatar avatar-large shadow d-block mx-auto" alt="">
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
                                          
                                                    <a  class="btn btn-soft-info mt-3" data-bs-toggle="modal" data-bs-target="#startExamPopup">Take a mock</a>
                                          
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

                                    <div class="modal fade" id="startExamPopup" tabindex="-1" aria-labelledby="LoginForm-title" style="display: none;" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content rounded shadow border-0">
                                                <div class="modal-header border-bottom">
                                                    <h5 class="modal-title" id="LoginForm-title"> Start Mock:</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                 <div class="custom-control custom-radio custom-control-inline">
                                                        <div class="form-check mb-0">
                                                         <p class="text">  Please do you want to take your mock exam now ?</p>
                                                        </div>
                                                 </div>

                                                 <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                                    <button @click="start_mock_exam"  aria-label="Close" type="button" data-bs-dismiss="modal" class="btn btn-primary"> Yes </button>
                                                </div>
                                                    <!--  -->
                                                </div>
                                            
                                            </div>
                                        </div>
                                    </div>

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
                    this.take_mock = false;
                   
                });
            },




            start_mock_exam(){

                this.$router.push('/mockexam');

            }


        
        },


         create(){

         
        },


        mounted(){

            this.loading_header_info();
            //this.check_eligibility();

        }


}



</script>