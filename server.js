const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
var path = require('path');

mongoose.set('useCreateIndex', true);

// view engine setup
app.set('views', path.join(__dirname, 'client/src/views'));
app.set('view engine', 'ejs');

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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gighub");


// Start the API server
app.listen(PORT, function() {
 console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
