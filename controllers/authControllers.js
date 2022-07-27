const login_get = (req,res)=>{
  res.send('This is the login page')
}
const login_post = (req,res)=>{
  res.send('user logged in')

}
const signup_get = (req,res)=>{
  res.send('this is the sign up page')
}
const signup_post = (req,res)=>{
  res.send('user created')
}


module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post
}