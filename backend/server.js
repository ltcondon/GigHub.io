// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const PORT = 3000;
// const router = express.Router();
// const mongoose = require('mongoose');

// let Job = require('./models/job');

// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost/gighub', { useNewUrlParser: true });
// const connection = mongoose.connection;

// connection.once('open', function () {
//     console.log("MongoDB database connection established successfully");
// })

// // Routes

// router.route('/').get(function (req, res) {
//     Job.find(function (err, jobs) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(jobs);
//         }
//     });
// });

// router.route('/:id').get(function (req, res) {
//     let id = req.params.id;
//     Job.findById(id, function (err, job) {
//         res.json(job);
//     });
// });

// // router.route('/add').post(function(req, res) {
// //     console.log(req.body);
// //     let job = new Job(req.body);
// //     console.log(job);
// //     job.save(function(err) {
// //         if (err)
// //           res.send(err);
// //         res.send('Job successfully added!');
// //     });
// // });

// router.route('/update/:id').post(function (req, res) {
//     Job.findById(req.params.id, function (err, job) {
//         if (!job)
//             res.status(404).send("data is not found");
//         else
//             job.company = req.body.company;
//             job.role = req.body.role;
//             job.status = req.body.status.position;
//             job.createdAt = req.body.createdAt;

//         job.save().then(job => {
//             res.json('job updated!');
//         })
//             .catch(err => {
//                 res.status(400).send("Update not possible");
//             });
//     });
// });

// app.use('/gighub', router);

// app.listen(PORT, function () {
//     console.log("Server is running on Port: " + PORT);
// });