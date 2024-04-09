import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080'
});

export default {

  list() {
    return http.get(`/api/GroceryLists`)
  },
  get(id) {
    return http.get(`/api/GroceryLists/${id}`)
  },
  create(list) {
    return http.post(`/api/GroceryLists`, list,
    );
  },

  delete(id) {
    return http.delete(`/api/GroceryLists/${id}`);
  }

}