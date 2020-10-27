const express = require('express');
const authMiddleware = require('../middleware/auth');
const { pool } = require('../db/connect');
const { isInvalidField } = require('../utils/common');
const Router = express.Router();

Router.post('/profile', authMiddleware, async (req, res) => {
  try
  {
    const {profile_name} = req.body;

    const validFieldsToUpdate = ['profile_name'];
    const receivedFields = Object.keys(req.body);
    const isInvalidFieldProvided = isInvalidField(receivedFields, validFieldsToUpdate);

    if (isInvalidFieldProvided)
    {
      return res.status(400).send({update_error: 'Invalid field'});
    }

    const result = await pool.query('UPDATE profile SET profile_name=$1 WHERE profile_id=$2 RETURNING profile_id,profile_name', [profile_name, req.user.profile_id]);

    res.send(result.rows[0]);
  }
  catch (error)
  {
    res.status(400).send({update_error: 'Error while updating profile.. Try again later'});
  }
});

Router.get('/profile', authMiddleware, async (req, res) => {
  try
  {
    res.send(req.user);
  }
  catch (error)
  {
    res.status(400).send({update_error: 'Error while getting profile data.. Try again later'});
  }
});

module.exports = Router;
