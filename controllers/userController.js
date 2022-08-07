const generalUser = require('../models/generalUserModel');


// update the user from the database.
const updateUser = (req, res) => {

  const id = req.params.id;

  generalUser.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((result) => { res.status(200).json({ message: 'user was updated successfully' }) })
    .catch((err) => { res.status(500).json({ message: err.message }) });

}


//delete user from the database
const deleteUser = (req, res) => {
  const id = req.params.id;

  generalUser.findByIdAndDelete(id)
    .then((result) => { res.status(200).json({ message: 'user was deleted successfully' }) })
    .catch((err) => { res.status(500).json({ message: err.message }) });
}


// Get a single user 
const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await generalUser.findById(id);
    res.status(200).json({ user })

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}



module.exports = {
  updateUser,
  deleteUser,
  getSingleUser,

}