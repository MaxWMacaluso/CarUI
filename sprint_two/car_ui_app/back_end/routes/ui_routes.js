const express = require('express')
const fileUpload = require('express-fileupload');
const connect = require('../db/connect')
const ui_sql = require('../utils/ui_sql')
var fs = require('fs');

const Router = express.Router();

const authMiddleware = require('../middleware/auth');

//File Upload
//-------------------------------------------------------------
Router.use(fileUpload());

//Upload Endpoint
Router.post('/upload', (req, res) => {
  var route = `${__dirname}`
  route = route.substring(0, route.lastIndexOf("\\")) + '/public/uploads/';
  console.log (route);

  if (req.files == null) {
    return res.status(400).json({msg: 'No file uploaded' });
  }
  const file = req.files.file;
  const userToken = req.body.userToken;
  console.log(userToken)
  ui_sql.getProfile(userToken)
  .then(profileId => {
    console.log(profileId);
    var profileFolderName = `profile_${profileId}/`
    var fullFolderPath = route+profileFolderName;
    console.log(fullFolderPath);
    if (!fs.existsSync(fullFolderPath)){
        fs.mkdirSync(fullFolderPath);
    }
    var outputPath = fullFolderPath+file.name;
    file.mv(outputPath, err => {
      if(err) {
        console.log(err)
        return res.status(500).send(err);
      }
      console.log(outputPath);

      res.json({fileName: file.name, filePath: outputPath})
    })
  }).catch(error => {
    console.log(error);
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
  console.log("Request.access token = ")
  console.log(req.query.access_token)
  ui_sql.getImg({access_token : req.query.access_token})
  .then(response => {
    console.log('hi')
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
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

//Images export
Router.get('/defaultImages', (req, res) => {

})

Router.get('/userUploadedImages', (req, res) => {

})

module.exports = Router;
