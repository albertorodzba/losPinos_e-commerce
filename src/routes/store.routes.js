const {Router} = require('express');
const router = Router();
const { productsView } = require('../controllers');

router.get('/products', productsView);

module.exports = router;