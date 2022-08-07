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
const getSingleCategory = (req, res) => {

  const id = req.query.id;

  Categories.findById(id)
    .then((result) => { res.json({ result: result }) })
    .catch((err) => { res.send(err); });


};


const addSingleCategory = async (req, res) => {

  try {
    const { name, subcategory } = req.body;

    const category = await Categories.create({ name, subcategory });
    res.status(200).json(category);
  }
  catch (err) {
    console.log(err);
  }
}



module.exports = {
  getAllCategories,
  getSingleCategory,
  addSingleCategory,
}

