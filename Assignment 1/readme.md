# Smart Utility Toolkit

## Course

Web Development III - Node.js & Express Backend

## Unit

Unit 1

## Assignment Overview

The Smart Utility Toolkit is a collection of mini backend utilities built using Node.js core modules. This project demonstrates fundamental Node.js concepts such as command-line arguments, custom modules, HTTP servers, file handling, and secure random number generation.

No external packages or frameworks are used in this project.

---

## Features

### 1. CLI Calculator

Uses `process.argv` to perform mathematical operations:

* Addition
* Subtraction
* Multiplication
* Division

Example:

```bash
node calculator.js add 10 5
```

---

### 2. Custom Module

A custom `isEven` module is created and reused in another file.

Files:

* `isEven.js`
* `index.js`

Run:

```bash
node checkNumber.js
```

---

### 3. HTTP Server

A basic HTTP server is created using the built-in `http` module.

Available routes:

* `/` - Home Page
* `/about` - About Page
* `/contact` - Contact Page

Run:

```bash
node server.js
```

Then open:

```text
http://localhost:3000/
```

---

### 4. File Manager

Uses the Node.js `fs` module to perform file operations:

* Create a file
* Read a file
* Update a file
* Delete a file

Run:

```bash
node fileManager.js
```

---

### 5. Random Dice Generator

Uses the Node.js `crypto` module to generate a secure random number between 1 and 6.

Run:

```bash
node dice.js
```

Example output:

```text
You rolled: 4
```

---

## Project Structure

```text
Smart-Utility-Toolkit/
│
├── calculator.js
├── math.js
├── index.js
├── server.js
├── fileManager.js
├── dice.js
├── package.json
└── README.md
```

---

## Technologies Used

* Node.js
* JavaScript
* ES Modules

## Node.js Core Modules Used

* `process`
* `http`
* `fs`
* `crypto`

---

## Installation and Setup

Make sure Node.js is installed on your system.

Check the Node.js version:

```bash
node -v
```

Clone or download the project, open the project folder in VS Code, and run the individual files using Node.js.

---

## ES Module Configuration

This project uses ES Modules.

The `package.json` file contains:

```json
{
  "type": "module"
}
```

Therefore, `import` and `export` syntax is used instead of `require()` and `module.exports`.

---

## Learning Outcomes

Through this project, the following concepts were practiced:

* Command-line argument handling
* Modular programming
* Creating custom modules
* Creating HTTP servers
* Basic routing
* File CRUD operations
* Secure random number generation
* Using Node.js built-in modules
