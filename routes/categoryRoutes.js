const {Router} = require('express');
const controllers = require('../controllers/categoriesControllers');
const constants = require('../constants/constants');

const router = Router();

router.get(constants.category , controllers.getAllCategories);
router.get(constants.category + constants.ID, controllers.getSingleCategory);
router.post(constants.category , controllers.addSingleCategory);


module.exports =  router;