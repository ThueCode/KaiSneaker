const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');


router.get('/brands', brandController.getAllBrands);
router.get('/brands/:id', brandController.getById);
router.post('/brands',brandController.createBrand);
router.put('/brands/:id',brandController.updateBrand);
//

module.exports = router;