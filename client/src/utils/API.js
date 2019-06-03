import axios from 'axios';

export default {

  searchGlassdoor: function(search) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=177283&t.k=ffvMT8m8Fem&action=employers&userip=192.168.43.42&useragent=Mozilla/%2F4.0&q=${search}`)
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
  },

  saveContact: function (contactData) {
    return axios.post('/api/contacts', contactData);
  },

  getUserContacts: function (id) {
    return axios.get(`/api/contacts/${id}`);
  },

  deleteContact: function (contactId) {
    return axios.delete(`/api/contacts/${contactId}`);
  }
};