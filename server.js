const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const favicon = require('express-favicon');
const PORT = process.env.PORT || 3001;
const path = require('path');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

// View engine setup
app.set('views', path.join(__dirname, 'client/src/views'));
app.set('view engine', 'ejs');

// Require and tell app to use cors to prevent blocking of requests
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));


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

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start the API server
app.listen(PORT, function() {
 console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
