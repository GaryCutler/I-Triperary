const router = require('express').Router();
const userRoutes = require("./user-routes");
const tripRoutes = require("./trip-routes");

router.use('/user', userRoutes);
router.use('/trip', tripRoutes);

module.exports = router;
