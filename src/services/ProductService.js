import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080'
});

export default {

  list(){
    return http.get(`/api/Product`)
  },
 
  create(product) {
    return http.post(`/api/Product`, product );
  },

 

}