const mongoose = require("mongoose");
const Product = require("../models/product");

// ---- small helpers (kept here so no extra files are needed) ----
const httpError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const escapeRegex = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const checkId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw httpError(`Invalid product id: ${id}`, 400);
};

// remove fields a client must never set
const cleanBody = (body) => {
  if (!body || Object.keys(body).length === 0) throw httpError("Request body cannot be empty", 400);
  const data = { ...body };
  ["_id", "id", "createdAt", "updatedAt", "__v", "stockValue"].forEach((k) => delete data[k]);
  return data;
};

// POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(cleanBody(req.body));
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// GET /api/products  ?category&supplier&search&minPrice&maxPrice&inStock&sort&page&limit
exports.getProducts = async (req, res, next) => {
  try {
    const { category, supplier, search, minPrice, maxPrice, inStock } = req.query;
    const filter = {};

    if (category) filter.category = new RegExp(`^${escapeRegex(category)}$`, "i");
    if (supplier) filter.supplier = new RegExp(escapeRegex(supplier), "i");
    if (search) filter.name = new RegExp(escapeRegex(search), "i");

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) {
        if (isNaN(minPrice)) throw httpError("minPrice must be a number", 400);
        filter.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined) {
        if (isNaN(maxPrice)) throw httpError("maxPrice must be a number", 400);
        filter.price.$lte = Number(maxPrice);
      }
    }

    if (inStock === "true") filter.quantity = { $gt: 0 };
    if (inStock === "false") filter.quantity = 0;

    // Sorting: ?sort=-price,name
    const allowedSort = ["name", "sku", "category", "price", "quantity", "createdAt", "updatedAt"];
    let sortBy = "-createdAt";
    if (req.query.sort) {
      const fields = String(req.query.sort).split(",").map((f) => f.trim()).filter(Boolean);
      const invalid = fields.find((f) => !allowedSort.includes(f.replace(/^-/, "")));
      if (invalid) throw httpError(`Cannot sort by "${invalid}"`, 400);
      sortBy = fields.join(" ");
    }

    // Pagination
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);

    const [total, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter).sort(sortBy).skip((page - 1) * limit).limit(limit),
    ]);

    res.json({ total, page, totalPages: Math.ceil(total / limit), count: products.length, products });
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res, next) => {
  try {
    checkId(req.params.id);
    const product = await Product.findById(req.params.id);
    if (!product) throw httpError("Product not found", 404);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    checkId(req.params.id);
    const product = await Product.findByIdAndUpdate(req.params.id, cleanBody(req.body), {
      new: true,
      runValidators: true,
    });
    if (!product) throw httpError("Product not found", 404);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/products/:id/stock   body: { "change": 10 }  (+ restock, - sale)
exports.adjustStock = async (req, res, next) => {
  try {
    checkId(req.params.id);
    const change = req.body && req.body.change;
    if (typeof change !== "number" || !Number.isInteger(change) || change === 0) {
      throw httpError('"change" must be a non-zero whole number (e.g. 10 or -3)', 400);
    }

    const filter = { _id: req.params.id };
    // Atomic guard: a sale only succeeds if enough stock exists
    if (change < 0) filter.quantity = { $gte: -change };

    const product = await Product.findOneAndUpdate(
      filter,
      { $inc: { quantity: change } },
      { new: true, runValidators: true }
    );

    if (!product) {
      const exists = await Product.exists({ _id: req.params.id });
      if (!exists) throw httpError("Product not found", 404);
      throw httpError("Insufficient stock for this sale", 400);
    }

    res.json({ message: "Stock updated", product });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    checkId(req.params.id);
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw httpError("Product not found", 404);
    res.json({ message: "Product deleted", id: product.id });
  } catch (err) {
    next(err);
  }
};

// GET /api/products/low-stock  (quantity <= reorderLevel) - aggregation
exports.getLowStock = async (req, res, next) => {
  try {
    const docs = await Product.aggregate([
      { $match: { $expr: { $lte: ["$quantity", "$reorderLevel"] } } },
      { $sort: { quantity: 1 } },
    ]);
    const lowStockItems = docs.map((d) => Product.hydrate(d));
    res.json({ count: lowStockItems.length, lowStockItems });
  } catch (err) {
    next(err);
  }
};

// GET /api/products/summary  (category-wise aggregation)
exports.getCategorySummary = async (req, res, next) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" },
          totalStockValue: { $sum: { $multiply: ["$price", "$quantity"] } },
          avgPrice: { $avg: "$price" },
        },
      },
      { $sort: { totalStockValue: -1 } },
    ]);
    res.json({ categories: summary.length, summary });
  } catch (err) {
    next(err);
  }
};
