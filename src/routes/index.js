const routes = require('./v1');

const router = require('express').Router();

router.use(routes)


module.exports = router;
