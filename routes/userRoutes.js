const router = require('express').Router();
const constants  = require('../constants/constants')
const controller = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/users', (req, res) => {
  res.send('This is the profile page')
})


router.delete('/users', controller.deleteUser);
router.put('/users',  controller.updateUser);
router.get('/users',controller.getSingleUser);


module.exports = router;