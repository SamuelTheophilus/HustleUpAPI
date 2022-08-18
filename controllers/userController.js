const generalUser = require('../models/generalUserModel');


// update the user from the database.
const updateUser = (req, res) => {

  const id = req.query.id;

  generalUser.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((result) => { res.status(200).json({ message: 'user was updated successfully' }) })
    .catch((err) => { res.status(500).json({ message: err.message }) });

}
 

//delete user from the database
const deleteUser = (req, res) => {
  const id = req.query.id;

  generalUser.findOneAndDelete(id)
    .then((result) => { res.status(200).json({ message: 'user was deleted successfully' }) })
    .catch((err) => { res.status(500).json({ message: err.message }) });
}


// Get a single user 
const getSingleEmployee = async (req, res) => {
  const id = req.query.id;

  try {
    const user = await generalUser.findById(id);
    if(user.reference){
      res.status(200).json({ user })
    }  else {
      res.status(404).json({message: 'User not found'});
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

const getSingleUser = async (req, res) => {
  const id = req.query.id;

  try {
    const user = await generalUser.findById(id);
      res.status(200).json({ user })

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}



const updateEmployee = (req, res) => {

  const id = req.query.id;

  generalUser.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((result) => { res.status(200).json({ message: 'user was updated successfully' }) })
    .catch((err) => { res.status(500).json({ message: err.message }) });

}



//AND statement for ID and Reference




module.exports = {
  updateUser,
  deleteUser,
  getSingleEmployee,
  getSingleUser,
  updateEmployee,

}