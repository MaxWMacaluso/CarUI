const express = require('express')
const fileUpload = require('express-fileupload');
const connect = require('../db/connect')
const ui_sql = require('../utils/ui_sql')
const Router = express.Router();

const authMiddleware = require('../middleware/auth');

//File Upload
//-------------------------------------------------------------
Router.use(fileUpload());

//Upload Endpoint
Router.post('/upload', (req, res) => {
  if (req.files == null) {
    return res.status(400).json({msg: 'No file uploaded' });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/uploads/${file.name}`, err => {
    if(err) {
      console.log(err)
      return res.status(500).send(err);
    }

    res.json({fileName: file.name, filePath: `/public/uploads/${file.name}`})
  })
})

var path = require('path');

Router.use(express.static('./public'));
//-------------------------------------------------------------

//Prevents Cross Origin Resource error in Browser. We ended up using proxy in package.json for this
Router.use(function (req, res, next) {
  //res.setHeader('Access-Control-Allow-Origin', '*'); //Allows all connections
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //Maybe don't need
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

Router.get('/images-by-profile', (req, res) => {
  // console.log(req);
  console.log("Request.profileId = ")
  console.log(req.query.profile_id)
  ui_sql.getImg({profile_id : req.query.profile_id})
  .then(response => {
    console.log('hi')
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

Router.get('/image', (req, res) => {
  // console.log(req);
  console.log("Request.profileId = ")
  console.log(req.query.profile_id)
  ui_sql.getImg({profile_id : req.query.profile_id})
  .then(response => {
    console.log('hi')
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

//TODO: MAYBE DELTE
Router.post('/profile', (req, res) => {
  ui_sql.createProfile(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

//TODO: MAYBE DELTE
Router.get('/profile', (req, res) => {
  ui_sql.getProfile(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

Router.post('/image', (req, res) => {
  console.log(req);
  ui_sql.createImg(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

Router.post('/update-image-transforms', (req, res) => {
  ui_sql.updateImageTransforms(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

Router.delete('/image/:img_id', (req, res) => {
  ui_sql.deleteImg(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

module.exports = Router;