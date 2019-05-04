import axios from 'axios';

// const endpoint = "http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=177283&t.k=ffvMT8m8Fem&action=employers&userip=192.168.43.42&useragent=Mozilla/%2F4.0&callback=?";

export default {

  searchGlassdoor: function(search) {
    return axios.get(`http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=177283&t.k=ffvMT8m8Fem&action=employers&userip=192.168.43.42&useragent=Mozilla/%2F4.0&callback=?${search}`)
  },

  saveJob: function (jobData) {
    console.log(jobData);
    return axios.post('/api/jobs', jobData);
  },

  // getJobs: function () {
  //   return axios.get('/api/jobs/saved')
  // },



  getUserJobs: function (id) {
    return axios.get(`/api/jobs/${id}`)
  }

};
