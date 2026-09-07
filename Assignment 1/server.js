import http from "http";

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.url}`);

    res.setHeader("Content-Type", "text/plain");

    if (req.url === "/") {
        res.statusCode = 200;
        res.end("Welcome to Web Dev III Assignment 1");
    } 
    
    else if (req.url === "/about") {
        res.statusCode = 200;
        res.end("This is the About page");
    } 
    
    else if (req.url === "/contact") {
        res.statusCode = 200;
        res.end("This is the Contact page");
    } 
    
    else {
        res.statusCode = 404;
        res.end("404 - Page Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});