const generalUser = require('../models/generalUserModel');
const subcategories = require('../models/subcategoriesModel');


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
    if (user.reference) {
      res.status(200).json({ user })
    } else {
      res.status(404).json({ message: 'User not found' });
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

const employeeReview = async (req, res) => {

  const review = req.body;
  const id = req.query.id;

  await generalUser.updateOne({_id: id}, { $push: { reviews: review } })
    .then((result) => {
      res.status(200).json({ message: 'Review was added was updated successfully' })
    })
    .catch((err) => { res.status(500).json({ message: err }) })
}



const employeeAddSubcategories = async(req, res)=>{

  const {subcategoryname }= req.body;
  const id = req.query.id;

  const sub = await subcategories.findOne({name: subcategoryname});

  if(sub){
    await generalUser.updateOne({_id: id }, {$push: {subcategoryId: sub._id.toString()}})
    .then((result)=> { res.status(200).json({message: 'New Subcategory Was Added successfully'})})
    .catch((err) => { res.status(500).json({message: err})})
  }
}






module.exports = {
  updateUser,
  deleteUser,
  getSingleEmployee,
  getSingleUser,
  updateEmployee,
  employeeReview,
  employeeAddSubcategories
}