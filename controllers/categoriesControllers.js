const Categories = require('../models/categoriesModel');



//get all categories.
const getAllCategories = (req, res) => {
  Categories.find()
    .then((result) => {
      res.json({ result });
    })
    .catch(err => { console.log(err); });
};


// get a single category
const getSingleCategory = async (req, res) => {


  try{
    const id = req.query.id;
    const category = await Categories.findById(id);
    res.status(200).json({ category });
  } catch (err) {
    res.status(500).json({ err });
  }
  


};


const addSingleCategory = async (req, res) => {

  try {
    const { name, subcategory } = req.body;

    const category = await Categories.create({ name, subcategory });
    res.status(200).json(category);
  }
  catch (err) {
    console.log(err);
    res.json({err });
  }
}



module.exports = {
  getAllCategories,
  getSingleCategory,
  addSingleCategory,
}

