# Student Management REST API

**Web Dev III (Node.js & Express Backend)**


## 📌 Overview

The **Student Management REST API** is a practical backend assignment built using **Express.js**. This application manages student records using standard CRUD operations while demonstrating modular routing, custom middleware implementation, RESTful standards, and robust error handling.

---

## 🎯 Learning Objectives

* Set up an Express.js server
* Build RESTful APIs
* Implement full CRUD (Create, Read, Update, Delete) operations
* Create and apply custom Express middleware
* Handle application errors and return proper HTTP status codes
* Test and verify API endpoints using Postman

---


## 📁 Project Structure

Organize your application according to the following structure:

```text
student-management-api/
│
├── data/
│   └── students.js           # Initial array/JSON data for students
│
├── middleware/
│   └── logger.js             # Custom logger middleware function
│
├── routes/
│   └── studentRoutes.js      # Express router for student CRUD endpoints
│
├── app.js                    # Main server setup and entry point
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation

```

---

## ⚙️ Functional Requirements

1. **Express Server:** Set up and launch an Express server.
2. **Student CRUD APIs:** Implement routes to Create, Read, Update, and Delete student records.
3. **Custom Logger Middleware:** Implement request logging functionality.
4. **Modular Routing:** Separate routing logic using `express.Router()` in `studentRoutes.js`.
5. **Error Handling:** Validate input parameters and return appropriate status codes and formatted JSON error messages.
6. **API Testing:** Verify all endpoints functionality using Postman.

---

## 📡 API Endpoints Summary

| HTTP Method | Endpoint | Description | Expected Status Codes |
| --- | --- | --- | --- |
| **GET** | `/students` | Retrieve all student records | `200 OK` |
| **GET** | `/students/:id` | Retrieve a single student by ID | `200 OK`, `404 Not Found` |
| **POST** | `/students` | Create a new student record | `201 Created`, `400 Bad Request` |
| **PUT** | `/students/:id` | Update an existing student by ID | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/students/:id` | Delete a student record by ID | `200 OK`, `404 Not Found` |

---

## ⚠️ HTTP Status Codes Reference

Ensure proper status codes are returned depending on the scenario:

* `200 Success` - Request completed successfully.
* `201 Created` - Resource created successfully.
* `400 Bad Request` - Invalid data sent in request body or invalid parameters.
* `404 Not Found` - Student record or route not found.

---

## 🚀 Getting Started

### **Prerequisites**

* [Node.js](https://nodejs.org/) installed on your system.
* [Postman](https://www.postman.com/) installed for API testing.

### **Installation & Execution**

1. **Clone repository:**
```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd student-management-api

```


2. **Initialize Node application and install dependencies:**
```bash
npm init -y
npm install express

```


3. **Start server:**
```bash
node app.js

```



