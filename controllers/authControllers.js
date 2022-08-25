require('dotenv').config();

const generalUsers = require('../models/generalUserModel');
const subcategories = require('../models/subCategoriesModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cookie = require('cookie-parser');
const bcrypt = require('bcrypt');



//
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
}
)


//create a new webtoken
const maxAge = 3 * 24 * 60 * 60;
const createWebToken = function (id) {
  return jwt.sign({ id }, 'HUSTLEUPAISECRET', { expiresIn: maxAge })
}


//handle the errors
const handleError = (err) => {
  let customError = { email: '', password: '' };

  // incorrect email
  if (err.message === "incorrect email") {
    customError.email = "This email does not exist"
  }

  // incorrect password
  if (err.message === "Invalid password") {
    customError.password = "The password is invalid"
  }




  if (err.message.includes('generalusers validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      customError[properties.path] = properties.message;
    })



  }
  if (err.code == 11000) {
    customError.email = 'This email aleady exists'
    return customError
  }
  return customError;

};


/* lAuthentication Controllers.*/
const login_post = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;

  try {
    const user = await generalUsers.login(email, password);
    console.log(user)

    //Ensure the User is Verified
    if (!user.verified) {
      return res.status(403).send({ message: `Verify Your Account` })
    }

    const token = createWebToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ user: user._id })


  } catch (error) {
    let customError = handleError(error)
    res.status(400).json(customError)
  }



}

const employeesignup = async (req, res) => {
  const { name, email, password, reference, phoneNumber, subcategory } = req.body;

  const subcategoryObj = await subcategories.findOne({ name: `${subcategory}` });

  try {
    // creating the employee user
    const user = await generalUsers.create({ name, email, password, reference, phoneNumber, subcategoryId: subcategoryObj._id.toString() });

    //generating the verificaation Token
    const verificationToken = user.generateVerificationToken();

    //creating the url for the user
    const url = `https://hustleup-api.herokuapp.com/verify/${verificationToken}`;

    let options = {
      from: `"Verify Your Email", <${process.env.EMAIL_USERNAME}>`,
      to: user.email,
      subject: 'Verify Your Email Account',
      html: `<h1> ${user.name} Thanks for signing up on Hustle Up</h1>,
      <h3> Please click on the link below to veriy your account</h3>
      Click <a href = '${url}'>here</a> to confirm your email`

    }

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
      }

    });
    res.status(201).json({ message: `Sent a verification email to ${user.email}` });

    // token for the sign up
    const token = await createWebToken(user._id)
    res.cookie('signupjwt', token, { expiresIn: maxAge * 1000, httpOnly: true })



  } catch (error) {
    let customError = handleError(error);
    res.status(404).json(customError);

  }

}

const genUserSignup = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    const user = await generalUsers.create({ name, email, password, phoneNumber });
    //generating the verificaation Token
    const verificationToken = user.generateVerificationToken();

    //creating the url for the user
    const url = `https://hustleup-api.herokuapp.com/verify/${verificationToken}`;

    let options = {
      from: `"Verify Your Email", <${process.env.EMAIL_USERNAME}>`,
      to: user.email,
      subject: 'Verify Your Email Account',
      html: `<h1> ${user.name} Thanks for signing up on Hustle Up</h1>,
       <h3> Please click on the link below to veriy your account</h3>
       Click <a href = '${url}'>here</a> to confirm your email`

    }

    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err);
      }

    });


    res.status(201).json({ message: `Sent a verification email to ${user.email}` });


    // const token = await createWebToken(user._id)
    // res.cookie('signupjwt', token, { expiresIn: maxAge * 1000, httpOnly: true })


  } catch (error) {
    let customError = handleError(error);
    res.status(404).json(customError);

  }

}

const logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.send('Logged out')
  //  res.redirect('/')
}

const verify = async (req, res) => {
  const token = req.params.id;

  // Checking for the id
  if (!token) {
    return res.status(422).send({ message: 'Missing Token' })
  }

  //Verify the token 
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET);
  } catch (error) {
    return res.status(500).send(error)
  }

  try {
    const user = await generalUsers.findOneAndUpdate({ _id: payload.ID }, { verified: true })

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    } else {
      return res.status(200).json({ message: 'Account Verified' })
    }

  } catch (error) {
    return res.status(500).send(error)
  }


}

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await generalUsers.findOne({ email: email })

    const resetPasswordToken = user.generateVerificationToken();
    const url = `https://hustleup-api.herokuapp.com/verify/password/${resetPasswordToken}`

    let options = {
      from: `"Verify Your Email", <${process.env.EMAIL_USERNAME}>`,
      to: user.email,
      subject: 'Reset Your Password',
      html: `<h1> Hey ${user.name}! We've got you covered</h1>,
         <h3> Please click on the link below to reset your password</h3>
         Click <a href = '${url}'>here</a> to reset your password`

    }


    transporter.sendMail(options, function (err, info) {
      if (err) {
        console.log(err)
      }
    })


    res.status(201).json({ message: `Sent a reset Password email to ${user.email}` })
  } catch (error) {
    res.status(404).json({ message: 'Error in sending reset password link' })


  }
}

const passwordform = (req, res) => {
  res.render('resetpassword', { title: 'Reset Your Passowrd' })

}

async function passwordVerify(req, res) {
  const { email, password, password2 } = req.body;
  
  const existing_user = await generalUsers.findOne({ email: email });

  if (!existing_user) {
    return res.status(400).send({ message: 'user email does not exist' })
  }


  if (password !== password2) {
    res.status(400).json({ message: 'Passwords do not match' })
  }

  try {

    let salt = await bcrypt.genSalt();
    new_password = await bcrypt.hash(password, salt);

    let user = await generalUsers.findOneAndUpdate({ email: email }, { password: new_password }, {new: true})

    if (!user) {
      return res.status(400).send({ message: 'Password not set' });
    } else {
      return res.status(200).json({ message: 'New Password Reset' })
    }

  } catch (error) {
    return res.status(500).send(error.message)
  }


}

module.exports = {
  login_post,
  employeesignup,
  genUserSignup,
  logout_get,
  verify,
  forgotPassword,
  passwordform,
  passwordVerify,

}
