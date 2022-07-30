const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { isEmail , isNumber } = require('validator');


const generalUsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
    unique: false,
  },
  email: {
    type: String,
    required: [true, 'Please enter an email address'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email address']
  },
  password: {
    type: String,
    unique: true,
    required: [true, 'Please enter a password'],
    minlength:[8, 'Password must be at least 8 characters'],
  },
})



//mongoose hooks
generalUsersSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

generalUsersSchema.post('save', async function (doc, next){
  console.log("new user has been saved ", doc)
  next();
})


const GeneralUser = mongoose.model('generalusers', generalUsersSchema);


module.exports = GeneralUser;
