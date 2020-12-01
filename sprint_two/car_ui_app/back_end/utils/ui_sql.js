const {pool} = require('../db/connect');

const getImg = (body) => {
    return new Promise(function(resolve, reject) {
      var { access_token } = body
      if (access_token === 'null' ) {
        access_token = '1 OR 1 = 1'
      }
      pool.query(`SELECT * FROM image i LEFT JOIN tokens t ON t.profile_id = i.profile_id WHERE access_token = '${access_token}'`, (error, results) => {
        if (error) {
          console.log(error);
          reject(error)
        }
        console.log(results)
        resolve(results.rows);
        console.log(results.rows);
      })
    })
  }

  const createImg = (body) => {
    return new Promise(function(resolve, reject) {
      const { img_source, img_transform, img_transform_origin, user_token } = body
      // pool.query("SELECT * FROM image;", (error, results) => {
      // pool.query("ALTER TABLE image ALTER COLUMN img_transform TYPE varchar(500);", (error, results) => {
      pool.query('INSERT INTO image (img_source, img_transform, img_transform_origin, profile_id) SELECT $1, $2, $3, profile_id FROM tokens WHERE tokens.access_token = $4 RETURNING *', [ img_source, img_transform, img_transform_origin, user_token], (error, results) => {
        if (error) {
          reject(error)
          console.log(error);
        }
        // console.log(results.rows);
        resolve('A new image has been added added: ${results.rows}')
      })
    })
  }

  const updateImageTransforms = (body) => {
    return new Promise(function(resolve, reject) {
      var images = body
      // console.log(body);
      var updateString = "";
      // updateString +=     "ALTER TABLE image ALTER COLUMN img_transform TYPE varchar(500);"

      for (var i = 0; i < images.length; i++) {
        updateString += `UPDATE image SET img_transform = '${images[i].img_transform}', img_transform_origin = '${images[i].img_transform_origin}', img_z_index = '${images[i].img_z_index}' WHERE img_id = ${images[i].img_id};`
      }
      //  console.log(updateString)

      // pool.query("ALTER TABLE image ALTER COLUMN img_source TYPE varchar(1000);", (error, results) => {
      pool.query(updateString, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve('Updated! ${results.rows}')
      })
    })
  }

  //Deletes image from database with matching img_id
  const deleteImg = (body) => {
    return new Promise(function(resolve, reject) {

      //Has to be an integer to compare it to the psql entry because there it is a 'BIGSERIAL'
      //body vals are in JSON format so this is how you access the value from the key
      var img_id = BigInt(body.selected_img)
      pool.query('DELETE FROM image WHERE img_id = $1', [img_id], (error, results) => {
        if (error)
        {
          reject(error)
        }
        resolve('Image deleted with id: ', img_id)
      })
    })
  }

  const getProfile = (user_token) => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM tokens WHERE access_token = $1', [user_token], (error, results) => {
        if (error) {
          reject(error)
        }
        // console.log(results.rows[0].profile_id);
        // console.log(typeof results)
        resolve(results.rows[0].profile_id)
        // resolve(results.rows).profile_id;
      })
    })
  }

  module.exports = {
    getImg,
    createImg,
    deleteImg,
    updateImageTransforms,
    getProfile
  }
