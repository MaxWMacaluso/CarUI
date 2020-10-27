const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {pool} = require('../db/connect');

//Send back error if there is some invalid field to insert
const isInvalidField = (receivedFields, validFieldsToUpdate) => {
  return receivedFields.some((field) => validFieldsToUpdate.indexOf(field) === -1);
};

//async await syntax instead of promises syntax
const validateUser = async (profile_name, password) => {
  const result = await pool.query('SELECT profile_id, profile_name, profile_password_hashed FROM profile WHERE profile_name = $1', [profile_name]);
  const user = result.rows[0]; //ASK ABOUT THIS LINE
  if (user) 
  {
    const isMatch = await bcrypt.compare(password, user.profile_password_hashed);
    if (isMatch) 
    {
      delete user.profile_password_hashed;
      return user;
    } 
    //Password doesn't match
    else 
    {
      throw new Error();
    }
  } 
  //Something went wrong
  else 
  {
    throw new Error();
  }
};

const generateAuthToken = async (user) => {
  const {profile_id, profile_name} = user;
  const secret = process.env.secret;
  const token = await jwt.sign({profile_id, profile_name}, secret);
  return token;
};

module.exports = {
  isInvalidField,
  validateUser,
  generateAuthToken
};