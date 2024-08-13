const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.get('/', checkoutController.getAllCheckouts);
router.get('/:id', checkoutController.getCheckoutById);
router.post('/', checkoutController.createCheckout);
// router.put('/:id', checkoutController.updateCheckout);
router.delete('/:id', checkoutController.deleteCheckout);

router.post('/return/:id', checkoutController.returnCheckout);

module.exports = router;
