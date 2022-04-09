<template>
                    <div class="col-lg-4 col-md-6 col-12 d-lg-block d-none">
                        <div class="sidebar sticky-bar p-4 rounded shadow">
                            
                            <div class="widget mt-4">
                                <ul class="list-unstyled sidebar-nav mb-0" id="navmenu-nav">

                                    <li class="navbar-item account-menu px-0 active">
                                        <a href="#" class="navbar-link d-flex rounded shadow align-items-center py-2 px-4">
                                            <span class="h4 mb-0"><i class="uil uil-dashboard"></i></span>
                                            <h6 class="mb-0 ms-2">Dashboard</h6>
                                        </a>
                                    </li>
                                    

                                    <li class="navbar-item account-menu px-0">
                                        <a href="#" class="navbar-link d-flex rounded shadow align-items-center py-2 px-4">
                                            <span class="h4 mb-0"><i class="uil uil-user"></i></span>
                                            <h6 class="mb-0 ms-2">Profile</h6>
                                        </a>
                                    </li>
                                 
                                    <li class="navbar-item account-menu px-0 mt-2">
                                        <a href="#" class="navbar-link d-flex rounded shadow align-items-center py-2 px-4">
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
                                    
                                    <li class="navbar-item account-menu px-0 mt-2">
                                        <a href="#" class="navbar-link d-flex rounded shadow align-items-center py-2 px-4">
                                            <span class="h4 mb-0"><i class="uil uil-setting"></i></span>
                                            <h6 class="mb-0 ms-2">Settings</h6>
                                        </a>
                                    </li>
                                    
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


export default {

  name: 'SideMenu',

  props: [ 'initiating_session','checking_session','closing_session' ],

  data () {

      return{
  


      }

  }, 


   methods: {


       logout_user(){

          this.closing_session();
          this.$router.push('/login'); 
       }



   }


}



</script>