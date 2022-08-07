const { Router } = require('express');
const controller = require('../controllers/subcategoriesControllers');
const constants = require('../constants/constants');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();


router.get('/subcategories', controller.getAllSubCategories);
router.get('/subcategories/:id', controller.getSingleSubcategory);


module.exports = router;