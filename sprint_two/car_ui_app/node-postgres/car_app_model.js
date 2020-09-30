const Pool = require('pg').Pool
const pool = new Pool({
  user: 'car_user',
  host: 'localhost',
  database: 'car_app_db',
  password: 'root',
  port: 5432,
});

const getImg = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM img_data', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createImg = (body) => {
  return new Promise(function(resolve, reject) {
    const { img_name, pos_x, pos_y, rotation, scale } = body
    pool.query('INSERT INTO img_data (img_name, pos_x, pos_y, rotation, scale) VALUES ($1, $2, $3, $4, $5) RETURNING *', [img_name, pos_x, pos_y, rotation, scale], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('A new image has been added added: ${results.rows[0]}')
    })
  })
}

const deleteImg = (img_name) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM img_data WHERE img_name = $test', [img_name], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('Image deleted with name: ${img_name}')
    })
  })
}

module.exports = {
  getImg,
  createImg,
  deleteImg,
}
