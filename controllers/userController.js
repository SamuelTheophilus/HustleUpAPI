const generalUser = require('../models/generalUserModel');
const subcategories = require('../models/subCategoriesModel');


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

  const { review } = req.body;
  const id = req.query.id;

  await generalUser.updateOne({ _id: id }, { $push: { reviews: review } })
    .then((result) => {
      res.status(200).json({ message: 'Review was added was updated successfully' })
    })
    .catch((err) => { res.status(500).json({ message: err }) })
}



const employeeAddSubcategories = async (req, res) => {

  const { subcategoryname } = req.body;
  const id = req.query.id;

  const sub = await subcategories.findOne({ name: subcategoryname });

  if (sub) {
    await generalUser.updateOne({ _id: id }, { $push: { subcategoryId: sub._id.toString() } })
      .then((result) => { res.status(200).json({ message: 'New Subcategory Was Added successfully' }) })
      .catch((err) => { res.status(500).json({ message: err }) })
  }
}


// New Controllers

async function employeeUpdateBio(req, res) {

  const { bio } = req.body;
  const id = req.query.id;

  const user = await generalUser.findByIdAndUpdate(id, { bio: bio }, { useFindAndModify: true });
  if (user) {
    return res.status(200).json({ message: 'Bio Added' })
  }
}

const employeeUpdateSkills = async (req, res) => {

  const { skills } = req.body;
  const id = req.query.id;

  const user = await generalUser.findByIdAndUpdate(id, { $set: { skills: skills } }, { useFindAndModify: true });
  if (user) {
    return res.status(200).json({ message: 'Skils Added' })
  }
}

const employeeUpdatePrice = async (req, res) => {
  let { price } = req.body;
  const id = req.query.id;

  try {
    const user = await generalUser.findByIdAndUpdate(id, { $set: { price: price } }, { new: true })
    if (user) {
      return res.status(200).json({ message: 'Price has been successfully added to your profile' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Price could not be updated' })

  }

}

const userAddRating = async (req, res) => {
  const { rating } = req.body;
  const id = req.query.id;

  let user = await generalUser.findById(id)
  if (user.rating) {
    let new_rating = Math.round((rating + user.rating) / 2)

    user = await generalUser.findByIdAndUpdate(id, { $set: { rating: new_rating } })
    return res.status(200).json({ message: 'Successfully added rating' })

  } else {
    let new_rating = rating
    user = await generalUser.findByIdAndUpdate(id, { $set: { rating: new_rating } })
    return res.status(200).json({ message: 'Successfully added rating' })
  }



}

const uploadImage = async (req, res) => {

  let id = req.query.id
  let image =`https://hustleup-api.herokuapp.com/${(req.file.path).substr(8)}` 
  console.log(image);
  


  try{
    let userImage = await generalUser.findByIdAndUpdate(id, {$set: {image: image}})
    if(userImage){
      return res.status(200).json({message: 'Image Added'})
    }

  }catch(error){
    console.log(error)
    res.status(500).json({message: 'Error in adding image'})
  }

}




module.exports = {
  updateUser,
  deleteUser,
  getSingleEmployee,
  getSingleUser,
  updateEmployee,
  employeeReview,
  employeeAddSubcategories,
  employeeUpdateBio,
  employeeUpdatePrice,
  employeeUpdateSkills,
  userAddRating,
  uploadImage
}