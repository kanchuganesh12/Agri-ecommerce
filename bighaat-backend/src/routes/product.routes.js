const router = require("express").Router();
const { getProducts, getFeatured, getTrending, getProductById, createProduct } = require("../controllers/product.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.get("/", getProducts);
router.get("/featured", getFeatured);
router.get("/trending", getTrending);
router.get("/:id", getProductById);
router.post("/", protect, adminOnly, upload.single("image"), createProduct);

module.exports = router;
