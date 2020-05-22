const express = require("express");
const router = express.Router();
const { requiredSignin, isAuth, isAdmin } = require("../controllers/auth");
const { getUserById, addOrderToUserHistory } = require("../controllers/user");
const { create, listOrders, getStatusValues, getOrderById, updateOrderStatus } = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.post('/order/create/:userId', requiredSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create);

router.get('/order/list/:userId', requiredSignin, isAuth, isAdmin, listOrders);
router.get('/order/status-values/:userId', requiredSignin, isAuth, isAdmin, getStatusValues);
router.put('/order/:orderId/status/:userId', requiredSignin, isAuth, isAdmin, updateOrderStatus);

router.param("userId", getUserById);
router.param("orderId", getOrderById);

module.exports = router;