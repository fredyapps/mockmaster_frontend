//import http from "../http-common";
import axios from "axios";

class DataService {


  // get_countries(data,token){
  //   let headers = {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Authorization': 'Bearer '+token,
  //   };
  //   //
  //   return http.get("/get_country_list", data,{headers: headers});
  // }


  create_cisa_exam(data,token){
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer '+token,
    };
    //
    return   this.$http.post("/examAPIs/v1/examQuestions", data,{headers: headers});
  }






 





  







}

export default new DataService();
