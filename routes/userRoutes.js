const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtVerify = require('../middlewares/verifyjwt');

//route for user registration
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', jwtVerify, userController.logout);
router.post('/googlelogin', userController.googlelogin);
router.post('/alter/cart', jwtVerify, userController.alterCart);
router.post('/alter/wishlist', jwtVerify, userController.alterWishlist);
router.post('/set/productState/forUser/:id', jwtVerify, userController.setProductsUser);
router.post('/get/cartItems', jwtVerify, userController.getCart);
router.post('/get/wishlistItems', jwtVerify, userController.getWishlist);
router.post('/checkout', jwtVerify, userController.checkout);
router.post('/checkout/success/:id', jwtVerify, userController.checkoutSuccess);
router.post('/bought', jwtVerify, userController.productsBought);
router.post('/sold', jwtVerify, userController.productsSold);
router.post('/checklogin', jwtVerify, userController.checkLogin);
router.post('/send/sample/email', userController.sendSampleMail);
module.exports = router;