//Creates the Back-End Express Server

//NOTES:
  //Route: section of Express code that associates an HTTP verb ( GET , POST , PUT , DELETE , etc.), a URL path/pattern, and a function that is called to handle that pattern
  //React router: to navigate within our app
  //Axios: communicate with our express server 
  //Express server: to communicate with our database
  //req: is short for request and contains the request data from our client. This is essentially how we get data from our front-end to our server. 
    //The data from our React frontend is contained in this req object and we use it here in our routes extensively to access the values. The data will be supplied to axios as a parameter as a javascript object.
    //For GET requests with an optional parameter, the data will be available with req.query. For PUT, POST and DELETE requests the data will be available directly in the body of the request with req.body. The data will be a javascript object and each property can be accessed with regular dot notation.
  //res: is short for response and contains the express server response. We want to send the response we get from our database to the client so we pass in the database response to this res function which then sends it to our client.
  //next: is middleware that allows you to pass callbacks to the next function.

const express = require('express')
const cors = require('cors');
//const fileUpload = require('express-fileupload');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
require('dotenv').config();

const app = express()
//const port = 3001
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(authRoute);
app.use(profileRoute);

//const connect = require('./db/connect')

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// //File Upload
// //-------------------------------------------------------------
// app.use(fileUpload());

// //Upload Endpoint
// app.post('/upload', (req, res) => {
//   if (req.files == null) {
//     return res.status(400).json({msg: 'No file uploaded' });
//   }
//   const file = req.files.file;
//   file.mv(`${__dirname}/uploads/${file.name}`, err => {
//     if(err) {
//       console.log(err)
//       return res.status(500).send(err);
//     }

//     res.json({fileName: file.name, filePath: `/public/uploads/${file.name}`})
//   })
// })

// var path = require('path');

// app.use(express.static('./public'));
// //-------------------------------------------------------------

// //Prevents Cross Origin Resource error in Browser. We ended up using proxy in package.json for this
// app.use(function (req, res, next) {
//   //res.setHeader('Access-Control-Allow-Origin', '*'); //Allows all connections
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //Maybe don't need
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });

// app.get('/images-by-profile', (req, res) => {
//   // console.log(req);
//   console.log("Request.profileId = ")
//   console.log(req.query.profile_id)
//   connect.getImg({profile_id : req.query.profile_id})
//   .then(response => {
//     console.log('hi')
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })

// app.get('/image', (req, res) => {
//   // console.log(req);
//   console.log("Request.profileId = ")
//   console.log(req.query.profile_id)
//   connect.getImg({profile_id : req.query.profile_id})
//   .then(response => {
//     console.log('hi')
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })

// app.post('/profile', (req, res) => {
//   connect.createProfile(req.body)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })

// app.get('/profile', (req, res) => {
//   connect.getProfile(req.body)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })

// app.post('/image', (req, res) => {
//   console.log(req);
//   connect.createImg(req.body)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })

// app.post('/update-image-transforms', (req, res) => {
//   connect.updateImageTransforms(req.body)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })

// app.delete('/image/:img_id', (req, res) => {
//   connect.deleteImg(req.params.id)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })
