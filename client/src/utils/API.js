import axios from 'axios';

export default {

  searchGlassdoor: function(search) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=177283&t.k=ffvMT8m8Fem&action=employers&userip=192.168.43.42&useragent=Mozilla/%2F4.0&q=${search}`)
  },

  getJobsByDate: function(id, date) {
    return axios.get(`api/jobs/bydate${id}`, date)
  },

  saveJob: function (jobData) {
    console.log(jobData);
    return axios.post('/api/jobs', jobData);
  },

  getUserJobs: function (id) {
    return axios.get(`/api/jobs/${id}`)
  },

  getActiveUserJobs: function (id) {
    return axios.get(`/api/jobs/active/${id}`)
  },

  findJobsByMilestone: function (userId, milestone) {
    return axios.get(`/api/jobs/milestone/${userId}`, milestone)
  },

  updateJob: function(id, details) {
    console.log(details);
    return axios.put(`/api/jobs/update/${id}`, details)
  },

  deleteJob: function (id) {
    return axios.put(`/api/jobs/delete/${id}`);
  },

  saveContact: function (contactData) {
    return axios.post('/api/contacts', contactData);
  },

  updateContact: function(id, details) {
    console.log(details);
    return axios.put(`/api/contacts/update/${id}`, details)
  },
  
  getUserContacts: function (id) {
    return axios.get(`/api/contacts/${id}`);
  },

  deleteContact: function (contactId) {
    return axios.delete(`/api/contacts/delete/${contactId}`);
  }
};