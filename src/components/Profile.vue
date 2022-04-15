
<template>
       <profile-header></profile-header>    

        <!-- Profile Start -->
        <section class="section mt-60">
            <div class="container">
                <div class="row">

                    <side-menu :initiating_session="initiating_session"  :checking_session="checking_session"  :closing_session="closing_session"></side-menu>


                    
                             <div class="col-lg-8 col-8">
                             
                              <div class="card border-0 rounded shadow">
                            <div class="card-body">
                                <h5 class="text-md-start text-center">Candidate Details :</h5>

                                <form>
                                    <div class="row mt-4">
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label class="form-label">Your fullname</label>
                                                <div class="form-icon position-relative">
                                                    <i data-feather="user" class="fea icon-sm icons"></i>
                                                    <input  v-model="candidate.fullname" type="text" class="form-control ps-5" placeholder="Your fullname :">
                                                </div>
                                            </div>
                                        </div><!--end col-->
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label class="form-label">Phone number</label>
                                                <div class="form-icon position-relative">
                                                    <i data-feather="user-check" class="fea icon-sm icons"></i>
                                                    <input v-model="candidate.phone_number" type="text" class="form-control ps-5" placeholder="Phone number :">
                                                </div>
                                            </div>
                                        </div><!--end col-->
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label class="form-label">Your Email</label>
                                                <div class="form-icon position-relative">
                                                    <i data-feather="mail" class="fea icon-sm icons"></i>
                                                    <input  disabled v-model="candidate.email" type="email" class="form-control ps-5" placeholder="Your email :">
                                                </div>
                                            </div> 
                                        </div><!--end col-->
                                        <div class="col-md-6">
                                            <div class="mb-3">
                                                <label class="form-label">Occupation</label>
                                                <div class="form-icon position-relative">
                                                    <i data-feather="bookmark" class="fea icon-sm icons"></i>
                                                    <input  v-model="candidate.profession" type="text" class="form-control ps-5" placeholder="Occupation :">
                                                </div>
                                            </div> 
                                        </div><!--end col-->
                                     
                                    </div><!--end row-->
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <input type="submit" id="submit" name="send" class="btn btn-primary" value="Save Changes">
                                        </div><!--end col-->
                                    </div><!--end row-->
                                </form><!--end form-->

                                
                             
                            </div>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->
            </div><!--end container-->
        </section><!--end section-->

</template>


<script>

import SideMenu from './SideMenu.vue'
import Packages from './Packages.vue'
import CallBack from './CallBack.vue'
import ProfileHeader from './ProfileHeader.vue'
import axios from "axios";
export default {

  name: 'Profile',
   props: [ 'initiating_session','checking_session','closing_session'],
      components: {
    'side-menu': SideMenu,
    'mock-packages': Packages,
    'profile-header': ProfileHeader,
    'callback-layout': CallBack,
  },

  data () {

      return{
  
        email :"",
        fullname:"",
        take_mock:false,
        candidate:{email:"",phone_number:"",fullname:"",profession:""},

      }

  }, 


        methods: {


            get_user_details() {
      
                this.loading = true;

                var config = {
                    method: 'POST',
                    url: this.api_url+'/onboarding/v1/user_details',
                     headers: { 
                    'user_token': localStorage.getItem('token'),
                },
                    };
                    
                axios(config).then(result => {
                    
                    console.log(result.data);
                    this.candidate.email = result.data.email;
                    this.candidate.phone_number = result.data.phone_number;
                    this.candidate.fullname = result.data.fullname;
                    this.candidate.profession = result.data.profession;
               
                   
                
                }, error => {
                   
                    console.log(error.response);
                   
                });
            },
      
        },


         create(){
        
      
         
        },


        mounted(){

           this.get_user_details();

             

            //    var countDownDate = new Date().getTime() + (3600*4*1000);

            //     setInterval(function(){ 
                               
            //             var now = new Date().getTime();
                        
            //             // Find the distance between now an the count down date
            //             var distance = countDownDate - now;

            //             var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            //             var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            //             var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            //             console.log( hours + "h " + minutes + "m " + seconds + "s ");  

            //                 if (distance < 0) {
                                
            //                     console.log("end of it");
            //                 }

            //                 }, 1000);

        }


}



</script>