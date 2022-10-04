const { Router } = require('express');
const controller = require('../controllers/subCategoriesControllers');
const constants = require('../constants/constants');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();


router.get(constants.subcategories, controller.getAllSubCategories);
router.get(constants.subcategories + constants.ID, controller.getSingleSubcategory);


//Temporary Route . Delete After Creating the Subcategory
router.post(constants.subcategories, controller.addsubcategory)


module.exports = router;
