import express from "express";
const app = express();
app.listen(5001, () => {
    console.log("Test server running on port 5001");
    process.exit(0);
});
