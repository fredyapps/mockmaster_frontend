<template>
       
       
    
        <profile-header></profile-header>    

        <!-- Profile Start -->
        <section class="section mt-60">
            <div class="container">
                <div class="row">

                    <side-menu :initiating_session="initiating_session"  :checking_session="checking_session"  :closing_session="closing_session"  :dash_active="dash_active"></side-menu>

                    <div class="col-lg-8 col-12">
                        <div class="rounded shadow p-4">
                                <div class="row justify-content-center">
                                    <div class="col-12 text-center">

                                        <div v-if="!trans_mode" class="section-title mb-4 pb-2">
                                            <!-- <h4 class="title mb-4">CISA PACKAGES</h4> -->
                                            <h4 class="title mb-4">AVAILABLE  EXAMS</h4>
                                        </div>

                                        <div v-if="trans_mode" class="section-title mb-4 pb-2">
                                            <h4 class="title mb-4">YOUR TRANSACTION STATUS</h4>
                                        </div>
                                    </div><!--end col-->
                                </div><!--end row-->

                                <mock-packages  v-if="!trans_mode && display_packs"  :exam_name="exam_name"></mock-packages>

                                <callback-layout v-if="trans_mode" :transaction_id="transaction_id"  ></callback-layout>

                        </div>

                        <div class="row" v-if="show_packages">
                            <div class="col-lg-6 col-12 mb-4 pb-2">
                                <div class="card job-box rounded shadow border-0 overflow-hidden">
                                    <div class="border-bottom">
                                        <div class="position-relative">
                                            <img src="images/CISA.svg" class="img-fluid" alt="">
                                            <div class="job-overlay bg-white"></div>
                                        </div>
                                        <div class="mb-0 position"><a href="course_details.html" class="text-dark h5"></a>
                                     
                                        </div>
                                        <ul class="list-unstyled head mb-0">
                                           <li class="badge bg-warning rounded-pill"></li>
                                        </ul>
                                    </div>
                                    
                                    <div class="card-body content position-relative">
                                      
                                        <div class="company-detail text-center mt-3">
                                            <h5 class="mb-0"><a href="page-job-company.html" class="text-dark company-name">CISA Mock Exam</a></h5>
                                            <p class="text-muted"><a href="#" class="text-muted">Certified Information System Auditor</a></p>
                                        </div>
                                        
                                        <div class="d-grid">
                                            <a @click="choose_package('CISA')" class="btn btn-outline-primary">Choose Package</a>
                                        </div>
                                    </div>
                                </div>
                            </div><!--end col-->

                            <div class="col-lg-6 col-12 mb-4 pb-2">
                                        <div class="card job-box rounded shadow border-0 overflow-hidden">
                                            <div class="border-bottom">
                                                <div class="position-relative">
                                                    <img src="images/CISM.svg" class="img-fluid" alt="">
                                                    <div class="job-overlay bg-white"></div>
                                                </div>
                                               
                                                <ul class="list-unstyled head mb-0">
                                                <li class="badge bg-warning rounded-pill"></li>
                                                </ul>
                                            </div>
                                            
                                            <div class="card-body content position-relative">
                                            
                                                <div class="company-detail text-center mt-3">
                                                    <h5 class="mb-0"><a href="page-job-company.html" class="text-dark company-name">CISM Mock Exam</a></h5>
                                                    <p class="text-muted"><a href="#" class="text-muted">Certified Information Security Manager</a></p>
                                                </div>
                        
                                                <div class="d-grid">
                                                    <a @click="choose_package('CISM')" class="btn btn-outline-primary">Choose Package</a>
                                                </div>
                                            </div>
                                        </div>
                            </div><!--end col-->
                        </div>

                        <div class="row" v-if="show_attempts">
                    <div class="col-12">
                        <div class="table-responsive bg-white shadow">
                            <table class="table table-center table-padding mb-0">
                                <thead>
                                    <tr>
                                        <th class="border-bottom py-3" style="min-width: 300px;">You can take below exam(s) now</th>
                                        <th class="border-bottom text-center py-3" style="min-width: 160px;">Remaining Attempts</th>
                                        <th class="border-bottom text-center py-3" style="min-width: 160px;"></th>
                                          
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr class="shop-list" v-for="item in attempts" :key="item.reference">
                                        
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <img src="images/shop/product/corp.jpeg" class="img-fluid avatar avatar-small rounded shadow" style="height:auto;" alt="">
                                                <h6 class="mb-0 ms-3"> {{ item.description }}  Exam</h6>
                                            </div>
                                        </td>
                                        <td class="text-center">{{ item.attempts }} </td>
                                        <td class="text-center"><a  @click="start_mock_exam(item.description)" class="btn btn-outline-primary">Take Exam</a></td>
                                   
                                       
                                    </tr>

                               
                                </tbody>
                            </table>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->


                    </div><!--end col-->

                </div><!--end row-->
                
            </div><!--end container-->
        </section><!--end section-->
        <!-- Profile End -->


</template>

<script >

import DataService from "@/services/DataService";
import axios from "axios";
import SideMenu from './SideMenu.vue'
import Packages from './Packages.vue'
import CallBack from './CallBack.vue'
import ProfileHeader from './ProfileHeader.vue'

export default {

  name: 'Dashboard',

   props: [ 'initiating_session','checking_session','closing_session'],
   components: {
    'side-menu': SideMenu,
    'mock-packages': Packages,
    'profile-header': ProfileHeader,
    'callback-layout': CallBack,
  },
  data () {

      return{
  
            tx_ref:"",
            status:"",
            transaction_id:"",
            reference:"",
            exam_name:"",
            trans_mode: false,
            show_attempts:false,
            attempts:[],
            show_packages:false,
            display_packs:false,
            dash_active: "navbar-item account-menu px-0 active"
      }

  }, 


   methods: {

            choose_package(exam){
              
                this.exam_name = exam;
                console.log(exam);
                this.display_packs = true;
                this.show_packages = false;
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
                    this.attempts = result.data;
                    if(result.data.length > 0 ){
                            this.show_attempts = true;
                    }else{
                            this.show_attempts = false;
                            this.show_packages = true;
                    }
                    
                
                }, error => {
                    
                    //console.log(error.response);
                    this.show_attempts = false;
                    
                });
            },


            start_mock_exam(examid){

               this.$router.push('/mockexam?examid='+examid);

            }

           

   },



    created(){
          
        
        if(this.checking_session()){

            this.check_eligibility();
        }else{
            this.$router.push('/login');
        }
    },



    mounted(){

          const urlParams = new URLSearchParams(window.location.search);
         
          this.transaction_id = urlParams.get("transaction_id");


          if(this.transaction_id !=null){
            
                this.trans_mode = true;
          }else{

                this.trans_mode = false;
          }


          console.log("Printing the transaction_id");
          console.log(this.transaction_id); 

        

    }


   


}



</script>