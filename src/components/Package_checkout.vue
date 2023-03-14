
<template>


                    <div class="row">
                        <div class="col-lg-12 col-12">
                    
                            <h5 class="col-12">Exam: </h5>
                            <p v-if="offering.exam=='CISA'" class="text-muted">
                                The CISA exam lasts <span class="text-primary mb-0">4 hours</span> and consists of <span class="text-primary mb-0">150 multiple-choice </span> questions. The exam tests candidates’ knowledge of five job practice domains: The Process of Auditing Information Systems; Government and Management of IT; Information Systems Acquisition, Development, and Implementation; Information Systems Operations, Maintenance and Service Management; and Protection of Information Assets. Candidates must score <span class="text-primary mb-0"> 450 </span>  to pass the exam. The exam scores on a scale between 200 and 800.
                             </p>

                             <p v-if="offering.exam=='CISM'" class="text-muted">
                                The Certified Information Security Manager® (CISM®) exam lasts <span class="text-primary mb-0">4 hours</span> and consists of
                                 <span class="text-primary mb-0">150 multiple-choice </span> questions questions covering 4 job practice domains, all testing your knowledge and ability on real-life job practices leveraged by expert professionals. Below are the key domains, subtopics and tasks candidates will be tested on: Information Security Governance, Risk Management, Information Security Program Development and Management, and Information Security Incident Management. Candidates must score 450 to pass the exam. The exam scores on a scale between 200 and 800.
                             </p>


                              <h5 class="col-12">The Package: </h5>
                             
                              <div class="card-body">
                                
                                    <div v-if="failed==true" class="alert alert-outline-danger alert-pills" role="alert">
                                                        <span class="alert-content"> {{message}} </span>
                                    </div>

                                <div class="d-flex widget align-items-center mt-3">
                                    <i data-feather="map-pin" class="fea icon-ex-md me-3"></i>
                                    <div class="flex-1">
                                        <h6 class="widget-title mb-1">Package name:</h6>
                                        <p class="text-primary mb-0">{{offering.name}}</p>
                                    </div>
                                </div>


                                <div class="d-flex widget align-items-center mt-3">
                                    <i data-feather="dollar-sign" class="fea icon-ex-md me-3"></i>
                                    <div class="flex-1">
                                        <h6 class="widget-title mb-1">Price:</h6>
                                        <p class="text-primary mb-0">{{offering.ghc_price}}</p>
                                    </div>
                                </div>

                                <div class="d-flex widget align-items-center mt-3">
                                    <i data-feather="clock" class="fea icon-ex-md me-3"></i>
                                    <div class="flex-1">
                                        <h6 class="widget-title mb-1">Attempts</h6>
                                        <p class="text-primary mb-0 mb-0">{{offering.attempts}}</p>
                                    </div>
                                </div>

                            </div>

                            <div v-if="loading" class="text-center">

                                    <div class="spinner-border" role="status">
                                                                        
                                    </div>
                            </div>
         

                            <div class="mt-4">
                               
                                <button @click="intiate_payment($event)" :disabled="isActive" class="btn btn-outline-primary">Make payment</button>
                            </div>
                        </div>
                    </div><!--end col-->


</template>


<script>

import axios from "axios";

export default {

  name: 'Package_checkout',
  props: [ 'offering' ],

  data () {

      return{
   
        email :"",
        profession:"",
        isActive: false,
        loading:false,
        failed:false,
        message:"",

        order:{email:localStorage.getItem('email'),package_id:this.offering.package_id}

      }

  }, 


        methods: {


            intiate_payment(event){

                event.preventDefault();
                this.loading = true;
                this.isActive = true;
                this.loading = true;
                this.exam_layout = false;
                var data = JSON.stringify(this.order);
                console.log(this.order);
                var config = {
                method: 'post',
                url: this.api_url+'/themockmasterAPIs/v2/InitiatePayment',
                headers: { 
                    'Content-Type': 'application/json',
                    'user_token': localStorage.getItem('token'),
                    'offer': this.offering.package_id
                },
                data : data
                };
                
                axios(config).then(response => {
                 this.loading = false;
                this.isActive = false;
                this.loading = false;
                console.log(response);
                console.log(JSON.stringify(response.data));

                console.log("printing status");
                console.log(response.data.status);
                //
                if(response.data.status==true){
                    //redirect
                     window.location.href = response.data.data.authorization_url;
                    

                }else{
                    this.failed = true;
                    this.message = "Oups! Something went wrong , please try again";
                }
        
                
                }, error => {
                    this.failed = true;
                //console.log(error.response);
                     this.message = error.response.message;
                });
    
            },


        
        },


         create(){

         
        },


        mounted(){
         

        }


}



// {
//     "status": "success",
//     "message": "Hosted Link",
//     "data": {
//         "link": "https://checkout.flutterwave.com/v3/hosted/pay/5a9274caa1e8f8d2a501"
//     }
// }






</script>