const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});


const Subcategory = mongoose.model('subcategories', subCategorySchema);

module.exports = Subcategory;