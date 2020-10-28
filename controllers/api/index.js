const router = require('express').Router();
const userRoutes = require('./user-routes');
const questionRoutes = require('./question-routes');

router.use('/users', userRoutes);
router.use('/questions', questionRoutes);

module.exports = router;