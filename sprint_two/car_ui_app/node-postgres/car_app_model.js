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

const getImg = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM image', (error, results) => {
      if (error) {
        reject(error)
      }
      //console.log(results)
      resolve(results.rows);
    })
  }) 
}

const createImg = (body) => {
  return new Promise(function(resolve, reject) {
    const { img_id, img_source, img_transform, img_transform_origin, profile_id } = body
    pool.query('INSERT INTO image (img_id, img_source, img_transform, img_transform_origin, profile_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [img_id, img_source, img_transform, img_transform_origin, profile_id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('A new image has been added added: ${results.rows[0]}')
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
}
