

<template>

        <profile-header></profile-header>    

        <!-- Profile Start -->
        <section class="section mt-60">
            <div class="container mt-lg-4">
                <div class="row">

                     <side-menu  v-if="isVisible" :initiating_session="initiating_session"  :checking_session="checking_session"  :closing_session="closing_session"></side-menu>

                    <div class="col-lg-8 col-12">
                        <div class="rounded shadow p-4">
                              <div class="row justify-content-center">
                    <div class="col-12 text-center">
                        <div class="section-title mb-4 pb-2">
                            <h4 class="title mb-4">{{ examid }} Mock Exam</h4>
                            <h4 class="title mb-4">{{countdown_var}}</h4>
                            
                        </div>
                        <div v-if="failed==true" class="alert alert-outline-danger alert-pills" role="alert">
                                <span class="alert-content text-center"> {{message}} </span>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->

                <div v-if="loading" class="text-center">

                        <div class="spinner-border" role="status">
                                                               
                        </div>
                </div>


            <!-- confirming the will of starting the exam -->

            <div v-if="confirm_to_take_mock" class="container">
                <div class="row justify-content-center">
                        <div id="countdown"></div>
                            <div class="card-body">
                                <h5 class="card-title">Start your Exam :</h5>

                                <div class="form-check mb-0">
                                        <p class="text">  Do you really want to take your Mock Exam now ?</p>
                                </div>
                            </div>
                            <div class="modal-footer">
                                    <button @click="back_to_dashboard" type="button" class="btn btn-secondary" >Cancel</button>
                                    <button @click="new_mock_exam" aria-label="Close" data-bs-dismiss="modal" type="button" class="btn btn-primary"> Yes </button>
                            </div>
                </div><!--end row-->
            </div><!--end container-->
                 
            <!--  -->
               

                         
            <div  v-if="exam_layout"  class="container">
                <div class="row justify-content-center">
                   
                        <!-- <div id="countdown"></div> -->

                            <div class="card-body">
                                <h5 class="card-title">Question : {{qindex+1}}</h5>
                                <p class="text-muted"> {{current_question.question_text}}</p>
                            
                                <h5 class="card-title">Choose the correct answer: </h5>
                                <div class="p-4">
                                        <div v-for="option in current_question.options" :key="option.option_id" class="custom-control custom-radio custom-control-inline">
                                            <div class="form-check mb-0">
                                                <input class="form-check-input" :value="option.option_code" v-model="pick" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                                <label class="form-check-label" for="flexRadioDefault1">{{option.option_text}}</label>
                                            </div>
                                        </div>
                                    <!-- :value="option.option_code" -->
                                </div>
    
                                <div class="p-4">

                                    <a @click="go_previous" class="btn btn-primary me-2 mt-2">Previous</a>
                                    <a @click="go_next" class="btn btn-primary me-2 mt-2">Next</a>
                                    
                                </div>

                                    <a  class="btn btn-info me-3 mt-3" data-bs-toggle="modal" data-bs-target="#endExamPopup">End Exams</a>
                            </div>
                      
                </div><!--end row-->
            </div><!--end container-->
    

          
            <div v-if="result_layout" class="container">
                <div class="row justify-content-center">
                        <div id="countdown"></div>
                            <div class="card-body">
                                <h5 class="card-title">Your {{examid}} Exam Score is : {{results.exam_score}}</h5>
                                
                                 <h5 class="card-title">Status : 

                                      <span v-if="results.status=='Passed'"  class="badge rounded-pill bg-soft-success"> {{results.status}} </span>

                                      <span v-if="results.status=='Failed'"  class="badge rounded-pill bg-soft-danger"> {{results.status}} </span>
                                 </h5>

                                <h5 class="card-title">Find below your score per domain: </h5>
                                <div class="p-4">
                                        <div v-for="domain in results.examResult" :key="domain.result_id" class="custom-control custom-radio custom-control-inline">
                                            <div class="form-check mb-0">
                                              {{domain.domain_id}}  <p class="text"> ({{domain.domain}}) : <span class="text-primary mb-0"> {{domain.first_score}} </span></p>
                                            </div>
                                        </div>
                                    <!-- :value="option.option_code" -->
                                </div>
                                <h7 class="card-title"><button @click="back_to_dashboard" class="text-primary mb-0">Go back to Dashboard </button></h7>
                            </div>
                </div><!--end row-->
            </div><!--end container-->

                                   <div class="modal fade" id="endExamPopup" tabindex="-1" aria-labelledby="LoginForm-title" style="display: none;" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content rounded shadow border-0">
                                                <div class="modal-header border-bottom">
                                                    <h5 class="modal-title" id="LoginForm-title"> End Exams :</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                 <div class="custom-control custom-radio custom-control-inline">
                                                        <div class="form-check mb-0">
                                                         <p class="text">  Do you really want to end the exam and submit your answers ?</p>
                                                        </div>
                                                 </div>

                                                 <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal" data-bs-dismiss="modal">Cancel</button>
                                                    <button @click="submit_mock_exam" aria-label="Close" data-bs-dismiss="modal" type="button" class="btn btn-primary"> Yes </button>
                                                </div>
                                                    <!--  -->
                                                </div>
                                            
                                            </div>
                                        </div>
                                    </div>


                                    <!--  -->

                 

                                    <!--  -->
       
                  
                        </div>
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
import ProfileHeader from './ProfileHeader.vue'

export default {
  name: 'MockExam',
     components: {
    'side-menu': SideMenu,
    'mock-packages': Packages,
    'profile-header': ProfileHeader,
  },

  props: [ 'initiating_session','checking_session','closing_session' ],

  data () {

      return{
          questions:[],
          mock:{},
          results:{},
          current_question:{},
          qindex:0,
          pick:0,
          exam_layout:false,
          result_layout:false,
          loading:false,
          message:"",
          failed:false,
          countdown_var :"",
          the_interval: null,
          isVisible : true,
          examid:"",
          mock_uri:"",
          result_uri:"",
          confirm_to_take_mock:true
          


      }

  }, 


   methods: {



    back_to_dashboard(){

        this.$router.push('/dashboard');
    },


    start_mock_exam(){
      
        console.log("===========starting exam now ==================");
    },



    new_mock_exam() {
      

        this.confirm_to_take_mock = false;
        this.loading = true;

        var config = {
        method: 'GET',
        //url: this.api_url+'/examAPIs/v1/cisaQuestions',
        url: this.api_url+this.mock_uri,
        headers: { 
            'user_token': localStorage.getItem('token'),
        }
        };
        console.log(this.api_url+this.mock_uri);
      axios(config).then(result => {
        
        console.log(result);
         this.questions = result.data.questions;
         this.mock = result.data.mock;
         this.loading = false;
         this.exam_layout = true;
         this.isVisible = false;
         this.current_question = this.questions[this.qindex];

                        // starting the 4 hours timer countdown 
                        var countDownDate = new Date().getTime() + (3600*4*1000);
                        const self = this;
                    self.the_interval = setInterval(function(){ 
                               
                        var now = new Date().getTime();
                        
                        // Find the distance between now an the count down date
                        var distance = countDownDate - now;

                        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        //countdown_var = "kkkkkkkkkk";
                        console.log( hours + " Hours " + minutes + " Minutes " + seconds + " Seconds "); 
                        self.countdown_var = hours + " Hours " + minutes + " Minutes " + seconds + " Seconds "; 
                        

                            if (distance < 0) {
                                
                                console.log("end of it");
                                self.submit_mock_exam();
                            }

                            }, 1000);
                        // end of the 4 hours timer countdown
      }, error => {
          this.loading = false;
          console.log(error);
          if(error.response.status==422){
            
               this.message = error.response.data.message;
               this.failed = true;
          }
      });
    },





    submit_mock_exam(){

        this.confirm_to_take_mock = false;
        clearInterval(this.the_interval);
        this.countdown_var = "";
        this.loading = true;
        this.exam_layout = false;
        var data = JSON.stringify(this.questions);
        
        var config = {
        method: 'post',
        url: this.api_url+this.result_uri,
        headers: { 
            'Content-Type': 'application/json',
            'exam_token': this.mock.exam_token,
            'user_token': localStorage.getItem('token'),
        },
        data : data
        };

        console.log(this.api_url+this.result_uri);

        //https://tmmbackend.herokuapp.com/examAPIs/v1/cisaQuestions
        
        axios(config).then(response => {
         this.loading = false;
        console.log(response);
       // console.log(JSON.stringify(response.data));
        this.isVisible = true;
        this.result_layout = true;
        this.results = response.data;
        
        }, error => {
             console.log(error);
        });
    
    },



    go_previous(){
         
        
        console.error("going previous");
        if(this.qindex>0){
           this.qindex--
        }
        this.current_question = this.questions[this.qindex];
        this.pick = this.current_question.candidateAnswer;
        
    },



    go_next(){
        this.pick = 0;
        console.error("going next");

          if(this.qindex<149){
            this.qindex++
        }
       this.current_question = this.questions[this.qindex];
       this.pick = this.current_question.candidateAnswer;

    }


   },

 

    created(){

         if(this.checking_session()){
                

                this.$watch('pick', (newQuestion) => {
                // ...
                console.log("====== printing new pick ==========");
                console.log(newQuestion);

                console.log("====== printing the question ==========");
                console.log(this.current_question);
                
                //if user hasn't moved to next question or previous question
                if(newQuestion!="0"){
                
                    this.questions[this.qindex].candidateAnswer = newQuestion;

                }

                })

       }else{
           this.$router.push('/login');
       }

    },







     mounted(){
       
        const urlParams = new URLSearchParams(window.location.search);
            this.examid = urlParams.get("examid");
            
            console.log("===========printing examid==========");
            console.log(this.examid);

            if(this.examid=="CISA"){
                this.mock_uri = "/examAPIs/v1/cisaQuestions";
                this.result_uri = "/examAPIs/v1/cisaResults";

            }else if(this.examid=="CISM"){

                this.mock_uri = "/examAPIs/v1/cismQuestions";
                this.result_uri = "/examAPIs/v1/cismResults";
            }

            //this.new_mock_exam() ;

           
      
    }
}



</script>