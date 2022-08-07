const Subcategories = require('../models/subcategoriesModel');



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
    const result = await Subcategories.findById(id)
    res.status(200).json({ result: result });

  } catch (error) {
    res.status(500).send({ err: error.message });

  }
}

// TODO: Create an add Employer's ID controller over here.

module.exports = {
  getAllSubCategories,
  getSingleSubcategory,
}