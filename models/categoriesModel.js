const mongoose = require('mongoose');


const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employees: {
    type: Array,
    required: false
  },
});

const Categories = mongoose.model('categories', categoriesSchema);
module.exports = Categories;


