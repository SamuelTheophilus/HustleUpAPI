// TODO: Import the constants and use the appropriate strings for the redirections

// protect any route with this middleware.
const jwt = require('jsonwebtoken');
const generalUsers = require('../models/generalUserModel')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check if the token is valid.
  if (token) {
    jwt.verify(token, 'HUSTLEUPAISECRET', (err, decodedToken) => {
      if (err) {
        res.redirect('/loginpage')
      }
      else {
        console.log(decodedToken);
        next();
      }
    });
  }
  else {
    res.redirect('/loginpage')
  }
}


// check the current user

const checkUser = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.jwt;


  if (token) {
    jwt.verify(token, 'HUSTLEUPAISECRET', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next()
      } else {
        let user = await generalUsers.findById(decodedToken.id)
        next();
        res.locals.user = user;  // make the user data accessible for the front end
      }
    })

  }
  else {
    res.locals.user = null;
    next();
  }
}

module.exports = { requireAuth, checkUser };


