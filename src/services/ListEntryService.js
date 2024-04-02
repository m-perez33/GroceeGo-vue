import axios from 'axios';

const http = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080'
});

export default {

  get(id){
    return http.get(`/api/listEntry/list/${id} `)
  },
 
  create(entry) {
    return http.post(`/api/listEntry`, entry );
  },

  delete(id) {
    return http.delete(`/api/listEntry/${id}`);
  },

  updateEntry(id, entry){
    return http.put(`/api/listEntry/${id}`, entry)

  }

}