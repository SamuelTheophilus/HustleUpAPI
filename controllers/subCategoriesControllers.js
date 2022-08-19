const Subcategories = require('../models/subcategoriesModel');
const generalUser = require('../models/generalUserModel');



// Returns All the Subcategories From a Specified Category.
const getAllSubCategories = async (req, res) => {
  try {
    const result = await Subcategories.find()
    res.json({ result})
  } catch( error){
    res.status(505).json({error: error.message})
    console.log(error)
  }
   
}


//Get Single Subcategory By ID
const getSingleSubcategory = async (req, res) => {
  const id = req.query.id;

  try {
    const employee = await generalUser.find({subcategoryId: id});
    res.status(200).json({ employee: employee });

  } catch (error) {
    res.status(500).send({ err: error.message });

  }
}




//Temporary Controller, Delete after Creating the Subcategory
const addsubcategory = async (req, res) => {
  const {name} = req.body;

  const newsub = await Subcategories.create({name: name});
  if (newsub){
    res.send('Sub created')
  }

}

// TODO: Create an add Employer's ID controller over here.

module.exports = {
  getAllSubCategories,
  getSingleSubcategory,
  addsubcategory
}