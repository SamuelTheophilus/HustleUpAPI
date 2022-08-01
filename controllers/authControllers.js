const generalUsers = require('../models/generalUserModel');
const jwt = require('jsonwebtoken');


//create a new webtoken
const maxAge = 3 * 24 * 60 * 60;
const createWebToken = function(id){
  return jwt.sign({id}, 'HUSTLEUPAISECRET', { expiresIn: maxAge })
}


//handle the errors
const handleError = (err) => {
  let customError = {email: '', password: ''};

  // incorrect email
  if (err.message ==="incorrect email"){
    customError.email = "This email does not exist"
  }

  // incorrect password
  if (err.message ==="Invalid password"){
    customError.password = "The password is invalid"
  }




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

const login_get =  (req, res) => {
  res.send('This is the login page')
}


const login_post = async (req, res) => {
  const {email, password} = req.body;
  
  try {
    const user = await generalUsers.login( email, password);
    const token = createWebToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
    res.status(200).json({user: user._id})
    
  } catch (error) {
    let customError = handleError(error)
    res.status(400).json(customError)
  }

}


//sign up controllers.
const signup_get = (req, res) => {
  res.send('this is the sign up page')
}


const signup_post = async (req, res) => {
  const {name, email, password} = req.body;

  try {
    const user = await generalUsers.create({ name, email, password })
    const token = await createWebToken(user._id)
    res.cookie('signupjwt', token, { expiresIn: maxAge*1000, httpOnly: true})

    // console.log(user);
    res.status(201).json(user);

  } catch (error) {
    let customError = handleError(error);
    res.status(404).json(customError);

  }

}

const logout_get = (req, res)=>{
 res.cookie('jwt', '', {maxAge: 1})
 res.redirect('/')
}


module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post, 
  logout_get
}