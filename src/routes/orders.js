const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderController.js');

router.get('/:user_id', ordersController.getOrdersByID)
router.post('/neworder', ordersController.newOrder);

module.exports = router;