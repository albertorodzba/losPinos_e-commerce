const { Router } = require('express');
const router = Router();
const { isAdmin } = require('../middleware');
const { adminView, addProduct } = require('../controllers');


router.get("/", isAdmin, adminView);
router.post("/addProduct", isAdmin, addProduct);
module.exports = router;
