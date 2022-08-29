const Categories = require('../models/categoriesModel');
const generalUser = require('../models/generalUserModel');


//get all categories.
const getAllCategories = (req, res) => {
  Categories.find()
    .then((result) => {
      res.send(result);
    })
    .catch(err => { console.log(err); });
};


// get a single category
const getSingleCategory = async (req, res) => {


  // try{
  //   const id = req.query.id;
  //   const category = await Categories.findById(id);
  //   res.status(200).json({ category });
  // } catch (err) {
  //   res.status(500).json({ err });
  // }

  try {
    const id = req.query.id;
    const employee = await generalUser.find({ categoryId: id });
    res.status(200).send(employee);

  } catch (error) {
    res.status(500).send({ err: error.message });

  }
};


const addSingleCategory = async (req, res) => {

  try {
    const { name, employee } = req.body;

    const category = await Categories.create({ name, employee });
    res.status(200).json(category);
  }
  catch (err) {
    console.log(err);
    res.json({ err: err });
  }
}

const deleteSingleCategory = async (req, res) => {
  const { name } = req.body;

  if (name){

    const category = await Categories.findOne({name: name})
    let id = category._id.toString();
    
    try {
      const result = await Categories.findByIdAndDelete(category._id.toString())
      if(result){
        return res.status(200).json({message:'Category deleted successfully'})
      }else{
        return res.status(400).json({message:'Category not found'})
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else{
    return res.status(400).json({ message: 'No Name Found'})

  }
    
}



module.exports = {
  getAllCategories,
  getSingleCategory,
  addSingleCategory,
  deleteSingleCategory,
}

