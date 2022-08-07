const { Router } = require('express');
const controller = require('../controllers/subcategoriesControllers');
const constants = require('../constants/constants');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();


router.get(constants.subcategories, controller.getAllSubCategories);
router.get(constants.subcategories+constants.ID, controller.getSingleSubcategory);


module.exports = router;