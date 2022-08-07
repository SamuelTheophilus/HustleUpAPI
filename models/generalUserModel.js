const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { isEmail } = require('validator');


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
    minlength: [8, 'Password must be at least 8 characters'],
  },
  reference: {
    type: Number,
    required: false,
  },
  phoneNumber: {
    type: Number,
    required: true,
  }
});



//mongoose hooks
generalUsersSchema.pre('findOneAndUpdate', async function(next){
  const salt = await bcrypt.genSalt()
  this._update.password = await bcrypt.hash(this._update.password, salt)
  next();
})


generalUsersSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


generalUsersSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user;
    }
    throw Error('Invalid password')
  }
  throw Error('incorrect email')
}



const GeneralUser = mongoose.model('generalusers', generalUsersSchema);
module.exports = GeneralUser;
