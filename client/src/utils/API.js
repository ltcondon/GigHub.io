import axios from 'axios';

export default {
  // getGoogleBooks: function (search) {
  //   console.log("request sent");
  //   return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=15`)
  // },

  saveJob: function (jobData) {
    console.log(jobData)
    return axios.post('/api/jobs', jobData);
  },

  // getSaved: function () {
  //   return axios.get('/api/books/saved')
  // },

  // deleteBook: function (id) {
  //   return axios.delete(`/api/books/saved/${id}`)
  // }
};
