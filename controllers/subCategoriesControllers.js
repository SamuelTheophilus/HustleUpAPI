const Subcategories = require('../models/subcategoriesModel');



// Returns All the Subcategories From a Specified Category.
const getAllSubCategories = (req, res) => {
  Subcategories.find()
    .then((result) => { res.json({ result: result }) })
    .catch((err) => { res.status(err.statusCode || 500).json({ err: err }) })
}


//Get Single Subcategory By ID
const getSingleSubcategory = async (req, res) => {
  const id = req.params.id;

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