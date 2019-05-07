<h1 align="center">
  <img src="./client/public/img/gighub-logo.png" alt="GigHub's Logo" width="200"></a>
</h1>

<h1 align="center">GigHub</h1>

Trying to find and then apply for jobs is no easy task. The sheer volume of applications a person needs to send out these days through the application process can be really daunting, and difficult to keep track of. There are many good applications for finding job listings (AngelList, Glassdoor, Indeed, etc.) and for building your network (LinkedIn), and we want out application to be a helpful middleman that pulls critical information from those applications and lets users keep track of what matters to them. 

Where have I applied to so far? How many applications have I sent out, and how frequently am I sending them? Did I send more in the last week than this week? These are all questions our app aims to help users answer, so that they have a way to visualize and organize their progress.

GigHub lets users log in to the app with their LinkedIn account and track their job search progress. It is designed with coders in mind, so many features are catered specifically to people applying for coding jobs. User data is going to be grabbed from the linkedin API, so that after logging in all of their relevant info is already there and available within our app (we want the sign up process to be seamless and quick so users can get right to keeping track of their important job related info). Users can add jobs that they’re interested in applying for and track progress on jobs they’ve already applied for, they can also view other user’s statistics in applying for similar positions to compare their own experience.

## 🔑 How to Use the App:

GigHub features a very intuitive interface and requires very little explanation for any user to jump in and get started. Currently, users do need to log in with a LinkedIn account, as that is our form of user authentication, so a LinkedIn account is a requirement to start using our app. We plan on implementing a local sign-in/sign-up somewhere down the line.

Jump in and get planning!

## 📁 Deployment Instructions

Deployed version of the app can be found [here](DEPLOYED LINK HERE). To run this app on your machine, follow these instructions. 

1. Clone this repository down to your machine.
   
2. You will need to have [Node.js](https://nodejs.org/en/) installed as well as [MongoDB](https://www.mongodb.com/) in order to continue.
   
3. Enter `mongod` in your command line to start your database listening for requests. 
   
4. Enter `npm install` in your command line after navigating into the root directory, which will install the dependencies listed in the package.json.
   
5. Enter `npm start`, which will start the app on http://localhost:3000. For more options on running the app on your own machine or setting up builds for deployment, check out the Create-React-App docs linked below.
   
6. Navigate to http://localhost:3000 in your browser, or ctrl-click the link that will be logged to your console. Enjoy!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 🔧 Technologies Used  

+ **HTML5** and **CSS3** for page content and styling.
  
+ [React.js](https://reactjs.org/) main UI library for serving up and manipulating front-end content.
  
+ [MongoDB](https://www.mongodb.com/) database.

+ [Javascript](https://www.javascript.com/) language used for writing app logic.
  
+ [Node.js](https://nodejs.org/en/) for the app's runtime environment.
  
+ [Express.js](https://expressjs.com/) for routing.

+ **NPM** for installation of the packages required by the app, listed as dependencies in the package.json.
  + [axios](https://www.npmjs.com/package/axios) a promise based HTTP client.
  + [mongoose](https://www.npmjs.com/package/mongoose) for querying the mongo database. 
  + [express](https://www.npmjs.com/package/express) as a routing framework.
  + [react-router-dom](https://www.npmjs.com/package/react-router-dom) as a React routing library for navigating between pages.
  + [react-reveal](https://www.npmjs.com/package/react-reveal) a lightweight animation library for revealing content on scroll.
  + [react-scrollchor](https://www.npmjs.com/package/react-scrollchor) a scrollspy package designed for React with built in smooth scrolling to different elements on the page.
  + [react-chartsjs2](https://www.npmjs.com/package/react-chartjs-2) data visualization library with various chart components.
  + [material-ui](https://www.npmjs.com/package/@material-ui/core) component library based on material design, we utilize a number of components as well as icons from here in the app. 

## 🌟 Acknowledgements

A huge thank you from our team to our instructor Jerome and our awesome TA's Sajeel, Jacob, and Jimmy for all their help throughout the process! 

## 💻 Authors 

Thor Nolan—https://github.com/ThorNolan

Liam Condon—https://github.com/ltcondon

Calvin Chau—https://github.com/bavarianstance

Eric Hager—https://github.com/ehager77
