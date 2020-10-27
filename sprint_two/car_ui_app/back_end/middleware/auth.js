const jwt = require('jsonwebtoken');
const { pool } = require('../db/connect');

const authMiddleware = async function (req, res, next)
{
  try
  {
    const token = req.header('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret);

    const result = await pool.query('SELECT p.profile_id,p.profile_name,t.access_token from profile p inner join tokens t on p.profile_id=t.profile_id WHERE t.access_token=$1 AND t.profile_id=$2',[token, decoded.profile_id]);

    const user = result.rows[0];
    if (user)
    {
      req.user = user;
      req.token = token;
      next();
    }
    else
    {
      throw new Error('Error with authentication');
    }
  }
  catch (error)
  {
    res.status(400).send({auth_error: 'Authentication failed.'});
  }
};

module.exports = authMiddleware;
