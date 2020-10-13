const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()
const port = 3001

const app_model = require('./car_app_model')

//File Upload stuff
app.use(fileUpload());
//Upload Endpoint
app.post('/upload', (req, res) => {
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

app.use(express.json())
app.use(express.static('./public'));
app.use(function (req, res, next) {
  //res.setHeader('Access-Control-Allow-Origin', '*'); //I added, allows all connections
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //Maybe don't need
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/images-by-profile', (req, res) => {
  // console.log(req);
  console.log("Request.profileId = ")
  console.log(req.query.profile_id)
  app_model.getImg({profile_id : req.query.profile_id})
  .then(response => {
    console.log('hi')
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/image', (req, res) => {
  // console.log(req);
  console.log("Request.profileId = ")
  console.log(req.query.profile_id)
  app_model.getImg({profile_id : req.query.profile_id})
  .then(response => {
    console.log('hi')
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/profile', (req, res) => {
  app_model.createProfile(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/profile', (req, res) => {
  app_model.getProfile(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/image', (req, res) => {
  app_model.createImg(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/image/:img_id', (req, res) => {
  app_model.deleteImg(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
