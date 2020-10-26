const express = require('express');
const bcrypt = require('bcryptjs');
const {pool} = require('../db/connect'); //Enables us to Query to Postres DB
const {validateUser, isInvalidField, generateAuthToken} = require('../utils/common');
const authMiddleware = require('../middleware/auth');

const Router = express.Router();

//Sign up
Router.post('/signup', async (req, res) => {
  try
  {
    const {profile_name, password} = req.body;
    const validFieldsToUpdate = ['profile_name', 'password'];
    const receivedFields = Object.keys(req.body);

    const isInvalidFieldProvided = isInvalidField(receivedFields, validFieldsToUpdate);

    if (isInvalidFieldProvided)
    {
        return res.status(400).send({signup_error: 'Invalid field'});
    }

    //Ensuring no duplicate profiles are created
    const result = await pool.query('SELECT count(*) AS count FROM profile WHERE profile_name=$1', [profile_name]);
    const count = result.rows[0].count;
    if (count > 0)
    {
      return res.status(400).send({signup_error: 'User with this profile name already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    await pool.query('INSERT INTO profile(profile_name, profile_password_hashed) values($1,$2)', [profile_name, hashedPassword]);
    res.status(201).send();
  }
  catch (error)
  {
    res.status(400).send({signup_error: 'Error while signing up.. Try again later'});
  }
});

//Sign in
Router.post('/signin', async (req, res) => {
  try
  {
    const {profile_name, password} = req.body;
    const user = await validateUser(profile_name, password); //bool value

    if (!user)
    {
      res.status(400).send({sigin_error: 'Profile name and password do not match'});
    }

    const token = await generateAuthToken(user);
    const result = await pool.query('INSERT INTO tokens(access_token, profile_id) values($1,$2) returning *', [token, user.profile_id]);

    if (!result.rows[0])
    {
      return res.status(400).send({signin_error: 'Error while signing in..Try again later.'});
    }

    user.token = result.rows[0].access_token;
    res.send(user);
  }
  catch (error)
  {
    res.status(400).send({signin_error: 'Profile Name and password dont match'});
  }
});

//Logout
Router.post('/logout', authMiddleware, async (req, res) => {
  try
  {
    const {profile_id, access_token} = req.user;
    await pool.query('DELETE FROM tokens WHERE profile_id=$1 AND access_token=$2', [profile_id, access_token]);
    res.send();
  }
  catch (error)
  {
    res.status(400).send({logout_error: 'Error while logging out..Try again later.'});
  }
});

Router.post('/logout2', async (req, res) => {
  try
  {
    const access_token = req.body.access_token;
    await pool.query('DELETE FROM tokens WHERE access_token=$1', [access_token]);
    res.send();
  }
  catch (error)
  {
    res.status(400).send({logout_error: 'Error while logging out..Try again later.'});
  }
});

module.exports = Router;
