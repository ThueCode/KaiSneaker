const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');



router.get('/role',roleController.getAllRole);
router.get('/role/:id',roleController.getById);
router.post('/role',roleController.createRole);
router.put('/role/:id',roleController.updateRole);

module.exports = router;