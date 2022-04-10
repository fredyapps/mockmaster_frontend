<template>

    <!-- Hero Start -->
        <section class="bg-home bg-circle-gradiant d-flex align-items-center">
            <div class="bg-overlay bg-overlay-white"></div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5 col-md-8"> 
                        <div class="card login-page bg-white shadow rounded border-0">
                            <div class="card-body">
                                <h4 class="card-title text-center">Login</h4>  
                                <form class="login-form mt-4">
                                    <div class="row">

                                        <div class="col-lg-12 text-center">
                                           <!-- <img src="images/mock_logo.png"  width="90" alt=""> -->
                                        </div><!--end col-->

                                        <div v-if="failed==true" class="alert alert-outline-danger alert-pills" role="alert">
                                                       <span class="alert-content"> {{message}} </span>
                                        </div>

                                        <div class="col-lg-12">
                                            <div class="mb-3">
                                                <label class="form-label">Your Email <span class="text-danger">*</span></label>
                                                <div class="form-icon position-relative">
                                                    <i data-feather="user" class="fea icon-sm icons"></i>
                                                    <input type="email" class="form-control ps-5" placeholder="Email" v-model="credentials.email" required="">
                                                </div>
                                            </div>
                                        </div><!--end col-->

                                        <div class="col-lg-12">
                                            <div class="mb-3">
                                                <label class="form-label">Password <span class="text-danger">*</span></label>
                                                <div class="form-icon position-relative">
                                                    <i data-feather="key" class="fea icon-sm icons"></i>
                                                    <input type="password" class="form-control ps-5" placeholder="Password" v-model="credentials.password" required="">
                                                </div>
                                            </div>
                                        </div><!--end col-->

                                        <div class="col-lg-12">
                                            <div class="d-flex justify-content-between">
                                                <div class="mb-3">
                                                    <!-- <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                                        <label class="form-check-label" for="flexCheckDefault">Remember me</label>
                                                    </div> -->
                                                </div>
                                                <p class="forgot-pass mb-0"><a href="auth-re-password-three.html" class="text-dark fw-bold">Forgot password ?</a></p>
                                            </div>
                                        </div><!--end col-->

                                        <div class="col-lg-12 mb-0">
                                            <div class="d-grid">
                                                <button @click="check_credentials_data()" :disabled="isActive"  class="btn btn-primary">Sign in</button>
                                            </div>

                                            <div v-if="loading" class="text-center">
                                                            <div class="spinner-border" role="status">
                                                               
                                                            </div>
                                            </div>
                                        </div><!--end col-->


                                        <div class="col-12 text-center">
                                            <p class="mb-0 mt-3"><small class="text-dark me-2">Don't have an account ?</small> <a href="/signup" class="text-dark fw-bold">Sign Up</a></p>
                                        </div><!--end col-->
                                    </div><!--end row-->
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    <!-- Hero End -->

</template>

<script >


import axios from "axios";
export default {

  name: 'Login',

  props: [ 'initiating_session','checking_session','closing_session' ],

  data () {

      return{
      
        credentials: { email:"", password:"" },
        user:{},
        isActive: false,
        failed: false,
        message:"",
        loading:false,

      }

  }, 


   methods: {



        send_login(){

            this.isActive = true;
            this.loading = true;
            var data = JSON.stringify(this.credentials);
            var config = {
            method: 'post',
            url: 'http://localhost:9000/onboarding/v1/login',
            headers: { 
                'Content-Type': 'application/json',
            },
            data : data
            };
            axios(config).then(response => {

                  console.log(response);
                  this.reset_credentials();
                  this.isActive = false;
                  this.loading = false;
                  this.user = response.data;
                  this.initiating_session(this.user);
                  this.$router.push('/dashboard');

            }, error => {

                  console.log(error);
                  console.log(error.response);
                  this.isActive = false;
                  this.loading = false;
                  this.message = error.response.data.message;
                  this.failed = true;
                  
            });
            
        },



        reset_credentials(){

            this.credentials = { email:"", password:"" };
        },




        check_credentials_data(){
      
           if(this.credentials.email=="" || this.credentials.email==null || this.credentials.email==undefined){
              this.message = "Kindly provide email";
              this.failed = true;
           }else if(this.credentials.password=="" || this.credentials.password==null || this.credentials.password==undefined){
              this.message = "Kindly enter password" ;
              this.failed = true;
           } else {
              this.message = "" ;
              this.failed = false;
              this.send_login();
           }



        }

   },



    created(){

     
    },

    

    mounted(){

       
    }


}



</script>