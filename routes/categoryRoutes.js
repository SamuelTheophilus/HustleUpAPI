const {Router} = require('express');
const controllers = require('../controllers/categoriesControllers');

const router = Router();

router.get('/categories', controllers.getAllCategories);
router.get('/categories/:id', controllers.getSingleCategory);
router.post('/categories', controllers.addSingleCategory);


module.exports =  router;