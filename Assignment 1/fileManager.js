import fs from "fs";

// Create a file
fs.writeFile("data.txt", "Hello, this is my file.", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("File written successfully");
        
        // Read the file
        fs.readFile("data.txt", "utf-8", (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File content:", res);

                // Update the file
                fs.appendFile("data.txt", " This is additional content.", (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("File updated successfully");

                        fs.readFile("data.txt", "utf-8", (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("Updated content:", res);

                                // Delete the file
                                fs.unlink("data.txt", (err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("File deleted successfully");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});