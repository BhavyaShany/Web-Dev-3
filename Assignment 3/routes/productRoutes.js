const express = require("express");
const c = require("../controllers/productController");

const router = express.Router();

// Static routes MUST come before "/:id"
router.get("/low-stock", c.getLowStock);
router.get("/summary", c.getCategorySummary);

router.route("/").get(c.getProducts).post(c.createProduct);

router
  .route("/:id")
  .get(c.getProductById)
  .put(c.updateProduct)
  .delete(c.deleteProduct);

router.patch("/:id/stock", c.adjustStock);

module.exports = router;
