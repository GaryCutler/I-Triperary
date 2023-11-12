const router = require('express').Router();
const { createUser, getSingleUser, addDestination, deleteDestination, login } = require('../../controllers/user-controller');
const { authMiddleware } = require('../../utils/auth');

router.route('/')
  .post(createUser)
  .put(authMiddleware, addDestination); 

router.route('/login')
  .post(login);

router.route('/me')
  .get(authMiddleware, getSingleUser);

router.route('/destinations/:destinationId')
  .delete(authMiddleware, deleteDestination);

module.exports = router;