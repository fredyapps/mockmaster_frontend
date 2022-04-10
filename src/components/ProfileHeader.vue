
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
                                                <h3 class="title mb-0">{{email}}</h3>
                                                <small class="text-muted h6 me-2">{{profession}}</small>
                                                <ul class="list-inline mb-0 mt-3">
                                                    <li class="list-inline-item me-2"><a href="javascript:void(0)" class="text-muted" title="Instagram"><i data-feather="instagram" class="fea icon-sm me-2"></i>fredysallah@gmail.com</a></li>

                                                </ul>
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


export default {

  name: 'ProfileHeader',

  data () {

      return{
  
        email : "",
        profession:""

      }

  }, 


        methods: {





        
        },


         create(){

            this.email = localStorage.getItem('email');
            this.profession = localStorage.getItem('profession');
        }


}



</script>