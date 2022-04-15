<template>

   
        <section class="cover-user bg-white">
            <div class="container-fluid px-0">
                <div class="row g-0 position-relative">
                    <div class="col-lg-4 cover-my-30 order-2">
                        <div class="cover-user-img d-lg-flex align-items-center">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card border-0" style="z-index: 1">
                                        <div class="card-body p-0">
                                            <h4 class="card-title text-center">Signup</h4>
                                            <form class="login-form mt-4">
                                                <div class="row">

                                                    <div class="col-md-12 text-center">
                                                       <!-- <img src="images/mock_logo.png"  width="90" alt=""> -->
                                                    </div><!--end col-->

                                                    <div v-if="failed==true" class="alert alert-outline-danger alert-pills" role="alert">
                                                       <span class="alert-content"> {{message}} </span>
                                                    </div>


                                                    <div class="col-md-12">
                                                        <div class="mb-3"> 
                                                            <label class="form-label">Full name <span class="text-danger">*</span></label>
                                                            <div class="form-icon position-relative">
                                                                <i data-feather="user-check" class="fea icon-sm icons"></i>
                                                                <input type="text" class="form-control ps-5" placeholder="Firstname  Lastname" v-model="candidate.fullname" required="">
                                                            </div>
                                                        </div>
                                                    </div><!--end col-->

                                                    <div class="col-md-12">
                                                        <div class="mb-3">
                                                            <label class="form-label">Your Email <span class="text-danger">*</span></label>
                                                            <div class="form-icon position-relative">
                                                                <i data-feather="mail" class="fea icon-sm icons"></i>
                                                                <input type="email" class="form-control ps-5" placeholder="username@site.com" v-model="candidate.email" required="">
                                                            </div>
                                                        </div>
                                                    </div><!--end col-->


                                                    <div class="col-md-12">
                                                        <div class="mb-3">
                                                            <label class="form-label">Phone Number <span class="text-danger">*</span></label>
                                                            <div class="form-icon position-relative">
                                                                <i data-feather="user" class="fea icon-sm icons"></i>
                                                                <input type="text" class="form-control ps-5" placeholder="+233 555 32 51 47" v-model="candidate.phone_number" required="">
                                                            </div>
                                                        </div>
                                                    </div><!--end col-->


                                                 

                                                    <div class="col-md-12">
                                                        <div class="mb-3">
                                                            <label class="form-label">Password <span class="text-danger">*</span></label>
                                                            <div class="form-icon position-relative">
                                                                <i data-feather="key" class="fea icon-sm icons"></i>
                                                                <input type="password" class="form-control ps-5" placeholder="-------" v-model="candidate.password" required="">
                                                            </div>
                                                        </div>
                                                    </div><!--end col-->

                                                    <div class="col-md-12">
                                                        <div class="mb-3">
                                                            <label class="form-label">Confirm Password <span class="text-danger">*</span></label>
                                                            <div class="form-icon position-relative">
                                                                <i data-feather="key" class="fea icon-sm icons"></i>
                                                                <input type="password" class="form-control ps-5" placeholder="-------" v-model="candidate.confirm_pass" required="">
                                                            </div>
                                                        </div>
                                                    </div><!--end col-->

                                                    <div class="col-md-12">
                                                        <div class="mb-3">
                                                            <div class="form-check">
                                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" required> 
                                                                <label class="form-check-label" for="flexCheckDefault">I Accept <a href="#" class="text-primary">Terms And Condition</a></label>
                                                            </div>
                                                        </div>
                                                    </div><!--end col-->

                                                    <div class="col-md-12">
                                                      
                                                        <div class="d-grid">
                                                            <button @click="check_candidate_data($event)" :disabled="isActive" class="btn btn-primary">Register</button>
                                                            
                                                        </div>

                                                        <div v-if="loading" class="text-center">
                                                            <div class="spinner-border" role="status">
                                                               
                                                            </div>
                                                        </div>
                                                         
                                                     
                                                    </div><!--end col-->

                                                    <div class="mx-auto">
                                                        <p class="mb-0 mt-3"><small class="text-dark me-2">Already have an account ?</small> <a href="/login" class="text-dark fw-bold">Sign in</a></p>
                                                    </div>
                                                </div>
                                            </form>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>    

                    <div class="col-lg-8 offset-lg-4 padding-less img order-1" style="background-image:url('images/user/02.jpg')" data-jarallax='{"speed": 0.5}'></div><!-- end col -->    
                </div>
            </div>
        </section>
      
</template>

<script >

import DataService from "@/services/DataService";
import axios from "axios";
export default {

  name: 'Signup',

   props: [ 'initiating_session','checking_session','closing_session' ],

  data () {

      return{
     
        candidate:{email:"",phone_number:"",fullname:"",password:"",confirm_pass:""},
        user:{},
        isActive: false,
        failed: false,
        message:"",
        loading:false,

      }

  }, 


   methods: {


        send_reg(){
            this.isActive = true;
            this.loading = true;
            var data = JSON.stringify(this.candidate);
            var config = {
            method: 'post',
            url: this.api_url+'/onboarding/v1/register',
            headers: { 
                'Content-Type': 'application/json',
            },
            data : data
            };
            axios(config).then(response => {

                  //console.log(response);
                  this.reset_candidate();
                  this.isActive = false;
                  this.loading = false;
                  this.user = response.data;
                  this.initiating_session(this.user);
                  this.$router.push('/dashboard');

            }, error => {

                 // console.log(error.response);
                  this.isActive = false;
                  this.loading = false;
                  this.message = error.response.data.message;
                  this.failed = true;

            });
            
        },


        reset_candidate(){

            this.candidate = {email:"",phone_number:"",fullname:"",password:""};
        },


        check_candidate_data(event){
      
           event.preventDefault();

           if(this.candidate.email=="" || this.candidate.email==null || this.candidate.email==undefined){
              this.message = "Kindly provide email";
              this.failed = true;
           } else if(this.candidate.phone_number=="" || this.candidate.phone_number==null || this.candidate.phone_number==undefined){
              this.message = "Kindly provide phone number";
              this.failed = true;
           } else if(this.candidate.fullname=="" || this.candidate.fullname==null || this.candidate.fullname==undefined){
              this.message = "Kindly provide profession";
              this.failed = true;
           } else if(this.candidate.password=="" || this.candidate.password==null || this.candidate.password==undefined){
              this.message = "Kindly provide profession" ;
              this.failed = true;
           } else if(this.candidate.confirm_pass=="" || this.candidate.confirm_pass==null || this.candidate.confirm_pass==undefined){
              this.message = "Kindly confirm your password" ;
              this.failed = true;
           } else if(this.candidate.password!==this.candidate.confirm_pass){
              this.message = "Sorry password does not match confirmation" ;
              this.candidate.password="";this.candidate.confirm_pass="";
              this.failed = true;  
           } else {
             // console.log("printing the last else");
              this.message = "" ;
              this.failed = false;
              this.send_reg();
           }



        }



   }


}



</script>