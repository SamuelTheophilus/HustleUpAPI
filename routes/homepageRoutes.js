const router = require('express').Router();
const { constants } = require('../constants/constants');
const { requireAuth } = require('../middleware/authMiddleware');


router.get(constants.hompage, requireAuth, (req, res) => {
  res.send('This is the home page')
})



module.exports = router;          