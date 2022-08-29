const {Router} = require('express');
const controller = require('../controllers/categoriesControllers');
const constants = require('../constants/constants');

const router = Router();

router.get((constants.category + constants.ID), controller.getSingleCategory);
router.get(constants.category , controller.getAllCategories);
router.post(constants.category , controller.addSingleCategory);
router.delete(constants.category , controller.deleteSingleCategory);


module.exports =  router;