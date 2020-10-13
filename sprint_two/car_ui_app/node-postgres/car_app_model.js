const Pool = require('pg').Pool

//IF HAVING TROUBLE CONNECTING TO DB, MAKE SURE CREDENTIALS ARE CORRECT
const pool = new Pool({
  user: 'oibnpyyowvtdwk',
  host: 'ec2-52-87-22-151.compute-1.amazonaws.com',
  database: 'dfmvc8d1pd6s9s',
  password: '76da5a9a0eb67a94b779d4481a4eb524a0633baa7631a3567d5df1dbb8dc5088',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

const getImg = (body) => {
  return new Promise(function(resolve, reject) {
    var { profile_id } = body
    if (profile_id === 'null' ) {
      profile_id = '1 OR 1 = 1'
    }
    pool.query(`SELECT * FROM image WHERE profile_id = ${profile_id}`, (error, results) => {
      if (error) {
        reject(error)
      }
      //console.log(results)
      resolve(results.rows);
      console.log(results.rows);
    })
  })
}

const createImg = (body) => {
  return new Promise(function(resolve, reject) {
    const { img_source, img_transform, img_transform_origin, profile_id } = body
    console.log(body);
    // pool.query("SELECT * FROM image;", (error, results) => {
    // pool.query("ALTER TABLE image ALTER COLUMN img_transform TYPE varchar(500);", (error, results) => {
    pool.query('INSERT INTO image (img_source, img_transform, img_transform_origin, profile_id) VALUES ($1, $2, $3, $4) RETURNING *', [ img_source, img_transform, img_transform_origin, profile_id], (error, results) => {
      if (error) {
        reject(error)
      }
      // console.log(results.rows);

      resolve('A new image has been added added: ${results.rows}')
    })
  })
}

const updateImageTransforms = (body) => {
  return new Promise(function(resolve, reject) {
    var images = body
    console.log(body);
    var updateString = "";
    for (var i = 0; i < images.length; i++) {
      updateString += `UPDATE image SET img_transform = '${images[i].img_transform}', img_transform_origin = '${images[i].img_transform_origin}' WHERE img_id = ${images[i].img_id};`
    }

    console.log(updateString)

    // pool.query("ALTER TABLE image ALTER COLUMN img_source TYPE varchar(1000);", (error, results) => {
    pool.query(updateString, (error, results) => {
      if (error) {
        reject(error)
      }

      resolve('Updated! ${results.rows}')
    })
  })
}

const createProfile = (body) => {
  return new Promise(function(resolve, reject) {
    const { profile_id, profile_name, profile_last_updated , profile_password_hashed } = body
    pool.query('INSERT INTO profile (profile_name, profile_last_updated , profile_password_hashed ) VALUES ($1, $2, $3) RETURNING *', [ profile_name, profile_last_updated , profile_password_hashed], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('A new image has been added added: ${results.rows[0]}')
    })
  })
}

const getProfile = (body) => {
  return new Promise(function(resolve, reject) {
    pool.query(`SELECT TOP 1 * FROM Profile WHERE profile_name = '${body.profile_name}'`, (error, results) => {
      if (error) {
        reject(error)
      }
      //console.log(results)
      resolve(results.rows);
    })
  })
}

const deleteImg = (img_id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM image WHERE img_id = $test', [img_id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('Image deleted with name: ${img_id}')
    })
  })
}

module.exports = {
  getImg,
  createImg,
  deleteImg,
  updateImageTransforms
}
