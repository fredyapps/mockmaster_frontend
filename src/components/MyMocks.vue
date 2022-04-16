
<template>

        <profile-header></profile-header>    

        <!-- Profile Start -->
        <section class="section mt-60">
            <div class="container mt-lg-4">
                <div class="row">

                       <side-menu :initiating_session="initiating_session"  :checking_session="checking_session"  :closing_session="closing_session"  :exam_active="exam_active"></side-menu>

                     <div class="col-lg-8 col-12">
                        <div class="rounded shadow p-4">
                                    <div class="row justify-content-center">
                                            <div class="col-12 text-center">
                                                <div class="section-title mb-4 pb-2">
                                                    <h4 class="title mb-4">Your Mocks</h4>
                                                </div>
                                            </div><!--end col-->
                                    </div><!--end row-->

                                    <div v-if="loading" class="text-center">

                                            <div class="spinner-border" role="status">
                                                                                
                                            </div>
                                    </div>

                                    <div v-if="mocks_layout" class="p-4">
                                        <div class="table-responsive bg-white shadow rounded">
                                            <table class="table mb-0 table-center">
                                                <thead>
                                                    <tr>
                                                    <th scope="col" class="border-bottom">Reference</th>
                                                    <th scope="col" class="border-bottom">Date</th>
                                                    <th scope="col" class="border-bottom">status</th>
                                                    <th scope="col" class="border-bottom">Results</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="my_mock in my_mocks" :key="my_mock.mockId" >
                                                        <th scope="row">{{my_mock.exam_token}}</th>
                                                        <td>{{my_mock.start_date_time}}</td>
                                                        <td>{{my_mock.status}}</td>
                                                        <td><a @click="view_results(my_mock.examResult,my_mock.exam_score)" data-bs-toggle="modal" data-bs-target="#viewResultPopup" class="btn btn-primary m-1"> View </a></td>
                                                    </tr>
                                               
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div><!--end row-->
            </div><!--end container-->


            <!-- popup code -->
                                   <div class="modal fade" id="viewResultPopup" tabindex="-1" aria-labelledby="LoginForm-title" style="display: none;" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content rounded shadow border-0">
                                                <div class="modal-header border-bottom">
                                                    <h5 class="modal-title" id="LoginForm-title">Your results :</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">

                                                    <h3>Overall score : <span class="text-primary mb-0"> {{overall_score}} </span></h3>
                                                <!--  -->
                                                 <div v-for="domain in my_results" :key="domain.result_id" class="custom-control custom-radio custom-control-inline">
                                                        <div class="form-check mb-0">
                                                         <p class="text"> {{domain.domain}} : <span class="text-primary mb-0"> {{domain.first_score}} </span></p>
                                                        </div>
                                                 </div>
                                                    <!--  -->
                                                </div>
                                            
                                            </div>
                                        </div>
                                    </div>

            <!--  end of popup code -->



        </section><!--end section-->
        <!-- Profile End -->

</template>


<script>

import axios from "axios";
import SideMenu from './SideMenu.vue'
import Packages from './Packages.vue'
import ProfileHeader from './ProfileHeader.vue'

export default {

  name: 'MyMocks',
    props: [ 'initiating_session','checking_session','closing_session' ],
    components: {
        'side-menu': SideMenu,
        'mock-packages': Packages,
        'profile-header': ProfileHeader,
    },

  data () {

      return{
  
          mocks_layout:false,
          loading:false,
          my_mocks:[],
          my_results:[],
          overall_score:null,
          exam_active:"navbar-item account-menu px-0 mt-2 active"

      }

  }, 


        methods: {


               list_my_mocks() {
      
                    this.loading = true;

                    var config = {
                        method: 'GET',
                        url: this.api_url+'/examAPIs/v1/my_mocks',
                        headers: { 
                            'user_token': localStorage.getItem('token'),
                        }
                        };
                    axios(config).then(result => {
                        
                        console.log(result.data);
                        this.my_mocks = result.data;
                        this.loading = false;
                        this.mocks_layout = true;
                       
                    }, error => {
                        this.loading = false;
                        console.log(error);
                    });
                },


                view_results(domain_res,score){
                 this.overall_score = score;
                 this.my_results = domain_res;

                }

        
        },


         create(){

            console.log("======== printing the created function =========");
        },


        mounted(){

            this. list_my_mocks();

        }


}



</script>