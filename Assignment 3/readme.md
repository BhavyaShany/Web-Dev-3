
# Assignment 3 — Product CRUD API

A RESTful backend API built with Node.js and Express to manage products with full CRUD operations, database configuration, model validation/virtuals, and centralized error handling.

## Project Structure

```text
Assignment 3/
├── config/
│   └── db.js               # Database connection setup
├── controllers/
│   └── productController.js# Request handlers for product CRUD operations
├── middleware/
│   └── errorMiddleware.js  # Centralized error-handling middleware
├── models/
│   └── product.js          # Product schema, validation rules, and virtuals
├── routes/
│   └── productRoutes.js    # API route definitions for products
├── index.js                # Express app initialization and route mounting
└── readme.md               # Project documentation

```

## Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* Database service running (or connection URI configured)

### Installation

1. Clone the repository and navigate to the assignment folder:
```bash
git clone <repository-url>
cd "Web-Dev-3/Assignment 3"

```


2. Install dependencies:
```bash
npm install

```


3. Create a `.env` file in the root/assignment directory and add your environment variables:
```env
PORT=3000
DATABASE_URL=your_database_connection_string

```


4. Start the server:
```bash
node index.js

```



## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/products` | Retrieve all products |
| `GET` | `/api/products/:id` | Retrieve a single product by ID |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/:id` | Update an existing product by ID |
| `DELETE` | `/api/products/:id` | Delete a product by ID |

## Features

* Modular MVC-style folder layout (`config`, `models`, `controllers`, `routes`, `middleware`)
* Data validation and virtual properties in the product model
* Consistent error responses via `errorMiddleware.js`

## Author

* **BhavyaShany** — [GitHub Profile](https://github.com/BhavyaShany)



If you share your exact route paths, database type (such as MongoDB or PostgreSQL), or `package.json` scripts, I can tailor this even closer to your code.

```
