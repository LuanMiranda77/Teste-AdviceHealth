import { api } from "../../../../config/api";

/**
*@Author
*@Issue
*/
export class AgendaService {

    //end-point da api
    url='api/Agendamento';

    //modelo de request post
    async post(pEntity: String){
      const response = await api.post(this.url, pEntity).then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });;
      return response;
    }

    //modelo de request get
    async get(){
      const response = await api.get(this.url).then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });;
      return response;
    }
    
  
}