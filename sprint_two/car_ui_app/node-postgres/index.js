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
  file.mv(`${__dirname}/image_uploads/${file.name}`, err => {
    if(err) {
      console.log(err)
      return res.status(500).send(err);
    }

    res.json({fileName: file.name, filePath: `/image_uploads/${file.name}`})
  })
})


app.use(express.json())
app.use(function (req, res, next) {
  //res.setHeader('Access-Control-Allow-Origin', '*'); //I added, allows all connections
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //Maybe don't need
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  app_model.getImg()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/img_data', (req, res) => {
  app_model.createImg(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/img_data/:img_name', (req, res) => {
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
