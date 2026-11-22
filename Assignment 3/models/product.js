const mongoose = require("mongoose");

const CATEGORIES = ["Electronics", "Apparel", "Furniture", "Stationery", "Grocery", "Other"];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^[A-Z0-9]+(-[A-Z0-9]+)+$/, "SKU must look like FURN-TB-812"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: {
        values: CATEGORIES,
        message: `Category must be one of: ${CATEGORIES.join(", ")}`,
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
      validate: { validator: Number.isInteger, message: "Quantity must be a whole number" },
    },
    reorderLevel: {
      type: Number,
      default: 10,
      min: [0, "Reorder level cannot be negative"],
      validate: { validator: Number.isInteger, message: "Reorder level must be a whole number" },
    },
    supplier: { type: String, trim: true, default: "Unknown" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: total value of stock on hand
productSchema.virtual("stockValue").get(function () {
  return this.price * this.quantity;
});

module.exports = mongoose.model("Product", productSchema);
