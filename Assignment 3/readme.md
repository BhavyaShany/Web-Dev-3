# Assignment 3 — Product CRUD API

A RESTful backend API built with Node.js and Express to manage products with full CRUD operations, database configuration, model validation/virtuals, and centralised error handling.

## Project Structure

```text
Assignment 3/
├── config/
│   └── db.js               # Database connection setup
├── controllers/
│   └── productController.js# Request handlers for product CRUD operations
├── middleware/
│   └── errorMiddleware.js  # Centralised error-handling middleware
├── models/
│   └── product.js          # Product schema, validation rules, and virtuals
├── routes/
│   └── productRoutes.js    # API route definitions for products
├── index.js                # Express app initialisation and route mounting
└── readme.md               # Project documentation
