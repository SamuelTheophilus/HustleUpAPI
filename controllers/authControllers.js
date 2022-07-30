const generalUsers = require('../models/generalUserModel');


//handle the errors
const handleError = (err) => {
  let customError = {email: '', password: ''};
  // console.log(err.message);

  if (err.message.includes('generalusers validation failed')){
    Object.values(err.errors).forEach(({properties}) =>{
      customError[properties.path] = properties.message;
    })

  }
  if (err.code ==11000){
    customError.email = 'This email aleady exists'
    return customError
  }
  return customError;
  
};




// login controllers.

const login_get = (req, res) => {
  res.send('This is the login page')
}
const login_post = (req, res) => {
  res.send('user logged in')

}


//sign up controllers.
const signup_get = (req, res) => {
  res.send('this is the sign up page')
}


const signup_post = async (req, res) => {
  const {name, email, password} = req.body;

  try {
    const user = await generalUsers.create({ name, email, password })

    // console.log(user);
    res.status(201).json(user);

  } catch (error) {
    let customError = handleError(error);
    res.status(404).json(customError);

  }

}


module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post
}