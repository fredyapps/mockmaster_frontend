<template>
                    <div class="col-lg-4 col-md-6 col-12 d-lg-block d-none">
                        <div class="sidebar sticky-bar p-4 rounded shadow">
                            
                            <div class="widget mt-4">
                                <ul class="list-unstyled sidebar-nav mb-0" id="navmenu-nav">

                                    <li v-bind:class="[dash_active]">
                                        <a href="/dashboard" class="navbar-link d-flex rounded shadow align-items-center py-2 px-4">
                                            <span class="h4 mb-0"><i class="uil uil-dashboard"></i></span>
                                            <h6 class="mb-0 ms-2">Dashboard</h6>
                                        </a>
                                    </li>
                                    

                                    <li v-bind:class="[prof_active]">
                                        <a href="/profile" class="navbar-link d-flex rounded shadow align-items-center py-2 px-4">
                                            <span class="h4 mb-0"><i class="uil uil-user"></i></span>
                                            <h6 class="mb-0 ms-2">Profile</h6>
                                        </a>
                                    </li>
                                 
                                    <li v-bind:class="[exam_active]">
                                        <a href="/my_mocks" class="navbar-link d-flex rounded shadow align-items-center py-2 px-4">
                                            <span class="h4 mb-0"><i class="uil uil-file"></i></span>
                                            <h6 class="mb-0 ms-2">My Exams</h6>
                                        </a>
                                    </li>
                            
                                    
                                    <li class="navbar-item account-menu px-0 mt-2">
                                        <a href="#" class="navbar-link d-flex rounded shadow align-items-center py-2 px-4">
                                            <span class="h4 mb-0"><i class="uil uil-transaction"></i></span>
                                            <h6 class="mb-0 ms-2">Payments</h6>
                                        </a>
                                    </li>
                                    
                                    <!-- <li class="navbar-item account-menu px-0 mt-2">
                                        <a href="#" class="navbar-link d-flex rounded shadow align-items-center py-2 px-4">
                                            <span class="h4 mb-0"><i class="uil uil-setting"></i></span>
                                            <h6 class="mb-0 ms-2">Settings</h6>
                                        </a>
                                    </li> -->
                                    
                                    <li class="navbar-item account-menu px-0 mt-2">
                                        <a @click="logout_user()" href="#" class="navbar-link d-flex rounded shadow align-items-center py-2 px-4">
                                            <span class="h4 mb-0"><i class="uil uil-power"></i></span>
                                            <h6 class="mb-0 ms-2">Logout</h6>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div><!--end col-->

</template>


<script >

import axios from "axios";
export default {

  name: 'SideMenu',

  props: [ 'initiating_session','checking_session','closing_session','dash_active','prof_active','exam_active'],

  data () {

      return{
  
            dash_active:this.dash_active,
            prof_active:this.prof_active,
            exam_active:this.exam_active,

      }

  }, 


   methods: {


        logout_user(){

          this.logout_service();
          this.closing_session();
          this.$router.push('/login'); 
        },



        logout_service() {

                var config = {
                    method: 'POST',
                    url: this.api_url+'/onboarding/v1/logout',
                    headers: { 
                    'user_token': localStorage.getItem('token'),
                },
                    };
                    
                axios(config).then(result => {
   
                }, error => {
                   
                    //console.log(error.response);
                   
                });
        },



   }


}



</script>