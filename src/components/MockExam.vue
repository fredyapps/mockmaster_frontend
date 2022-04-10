

<template>

        <profile-header></profile-header>    

        <!-- Profile Start -->
        <section class="section mt-60">
            <div class="container mt-lg-4">
                <div class="row">

                     <side-menu :initiating_session="initiating_session"  :checking_session="checking_session"  :closing_session="closing_session"></side-menu>

                    <div class="col-lg-8 col-12">
                        <div class="rounded shadow p-4">
                              <div class="row justify-content-center">
                    <div class="col-12 text-center">
                        <div class="section-title mb-4 pb-2">
                            <h4 class="title mb-4">CISA Mock Exam</h4>
                        </div>
                    </div><!--end col-->
                </div><!--end row-->

                <div v-if="loading" class="text-center">

                        <div class="spinner-border" role="status">
                                                               
                        </div>
                </div>

                         
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

                                <a v-if="qindex > 10" @click="submit_cisa_exam" class="btn btn-info me-3 mt-3">Submit answers</a>
                            </div>
                      
                </div><!--end row-->
            </div><!--end container-->
    

          
            <div v-if="result_layout" class="container">
                <div class="row justify-content-center">
                        <div id="countdown"></div>
                            <div class="card-body">
                                <h5 class="card-title">Your CISA Exam Score is : {{results.exam_score}}</h5>
                                
                                 <h5 class="card-title">Status : 

                                      <span v-if="results.status=='Passed'"  class="badge rounded-pill bg-soft-success"> {{results.status}} </span>

                                      <span v-if="results.status=='Failed'"  class="badge rounded-pill bg-soft-danger"> {{results.status}} </span>
                                 </h5>

                                <h5 class="card-title">Find below your score per domain: </h5>
                                <div class="p-4">
                                        <div v-for="domain in results.examResult" :key="domain.result_id" class="custom-control custom-radio custom-control-inline">
                                            <div class="form-check mb-0">
                                               <p class="text-muted"> {{domain.domain_id}} : {{domain.first_score}}</p>
                                            </div>
                                        </div>
                                    <!-- :value="option.option_code" -->
                                </div>
                            </div>
                </div><!--end row-->
            </div><!--end container-->
       
                  
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


      }

  }, 


   methods: {



    new_cisa_exam() {
      
      this.loading = true;

       var config = {
        method: 'GET',
        url: this.api_url+'/examAPIs/v1/cisaQuestions',
        headers: { 
            'user_token': localStorage.getItem('token'),
        }
        };
      axios(config).then(result => {
        
         console.log(result.data);
         this.questions = result.data.questions;
         this.mock = result.data.mock;
         this.loading = false;
         this.exam_layout = true;
         this.current_question = this.questions[this.qindex];
      }, error => {
          this.loading = false;
          console.log(error);
      });
    },





    submit_cisa_exam(){
        this.loading = true;
        this.exam_layout = false;
        var data = JSON.stringify(this.questions);
        
        var config = {
        method: 'post',
        url: this.api_url+'/examAPIs/v1/cisaResults',
        headers: { 
            'Content-Type': 'application/json',
            'exam_token': this.mock.exam_token,
            'user_token': localStorage.getItem('token'),
        },
        data : data
        };

        //https://tmmbackend.herokuapp.com/examAPIs/v1/cisaQuestions
        
        axios(config).then(response => {
         this.loading = false;
        console.log(response);
        console.log(JSON.stringify(response.data));
        
        this.result_layout = true;
        this.results = response.data;
        
        }, error => {
        console.log(error.response);
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

                this.new_cisa_exam() ;

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

      
    }
}

// var timeleft = 14400;
// var downloadTimer = setInterval(function(){
//   if(timeleft <= 0){
//     clearInterval(downloadTimer);
//     document.getElementById("countdown").innerHTML = "Finished";
//   } else {
//     document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
//   }
//   timeleft -= 1;
// }, 1000);

</script>