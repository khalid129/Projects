const express = require("express");
const router = express.Router();
const { newOrder, getSingleOrder, myOrders, updateOrderStatus, deleteOrder, getAllOrders } = require("../controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)

router.route("/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)

module.exports = router;