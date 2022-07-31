// protect any route with this middleware.
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check if the token is valid.
  if (token) {
    jwt.verify(token, 'HUSTLEUPAISECRET', (err, decodedToken) => {
      if (err) {
        res.redirect('/loginpage')
      }
      else{
        console.log(decodedToken);
        next();
      }
    });
  }
  else {
    res.redirect('/loginpage')
  }
}

module.exports = requireAuth;