const express = require("express");
const mongoose = require("mongoose");
const seeder = require('mongoose-seed');
import seeds from "./backend/seeds.json";
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
mongoose.set('useCreateIndex', true);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets 
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Tell my app to use my routes
app.use(routes);

// Connect to the Mongo DB, and allow Heroku to connect to provisioned db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/jobsearch");

seeder.connect('mongodb://localhost/sample-dev', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    'backend/models/job.js',
    'backend/models/user.js'
  ]);
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
});
 
// Data array containing seed data - documents organized by Model
var data = seeds;


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});