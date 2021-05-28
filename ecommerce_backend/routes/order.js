const express = require('express');
const router = express.Router();


const {requireSignin, isAuth, isAdmin} = require("../controllers/auth");
const {create, listOrders, getStatusValues, orderById, updateOrderStatus, getModePaymentValues, getModeShipmentValues, orderByEmail, sendFeedbackEmail} = require("../controllers/order");
const {userById, addOrderToUserHistory} = require("../controllers/user");
const {decreaseQuantity, refundQuantity} = require("../controllers/product");

router.post('/ordertracker',orderByEmail);
router.post('/order/create/:userId', requireSignin, isAuth, decreaseQuantity, create, addOrderToUserHistory);
router.get('/order/list/:userId',requireSignin, isAuth, isAdmin, listOrders);
router.get('/order/payment-values/:userId',requireSignin, isAuth, getModePaymentValues);
router.get('/order/shipment-values/:userId',requireSignin, isAuth, getModeShipmentValues);
router.get('/order/status-values/:userId',requireSignin, isAuth, isAdmin, getStatusValues);
router.put('/order/:orderId/status/:userId',requireSignin, isAuth, isAdmin, updateOrderStatus);

router.put('/order/:orderId/refund/:userId',requireSignin, isAuth, isAdmin, refundQuantity);

router.post('/order/send/feedback/:orderId/:userId',requireSignin, isAuth, isAdmin, sendFeedbackEmail)

router.param("userId", userById);
router.param("orderId", orderById);



module.exports = router; 