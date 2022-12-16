const { Router } = require('express');
const router = Router();
const { adminView, viewHomePage } = require('../controllers');

router.get("/", viewHomePage);
module.exports = router;