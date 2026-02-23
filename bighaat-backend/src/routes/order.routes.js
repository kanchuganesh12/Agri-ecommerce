const router = require("express").Router();
const { placeOrder, getOrders, getOrderById } = require("../controllers/order.controller");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.post("/place", placeOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);

module.exports = router;
