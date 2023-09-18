const express = require('express');
const router = express.Router();
const basketsController = require('../controllers/basketController.js');

router.get('/', basketsController.getBaskets);
router.get('/:user_id', basketsController.getBasketByUser);
router.post('/newbasket', basketsController.createBasket);
router.post('/additem', basketsController.addToBasket);
router.delete('/removeitem', basketsController.removeItem)
router.delete('/clearbasket/:user_id', basketsController.clear)

module.exports = router;