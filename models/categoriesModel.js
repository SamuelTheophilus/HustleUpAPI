const mongoose = require('mongoose');


const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subcategory: {
    type: Array,
  },
});

const Categories = mongoose.model('categories', categoriesSchema);

module.exports = Categories;


