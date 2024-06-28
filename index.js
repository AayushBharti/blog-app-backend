const express = require("express");
const app = express();

require("dotenv").config();
PORT = process.env.PORT || 4000;

//middleware to parse json request body
app.use(express.json());

//import routes
const blog = require("./routes/blog");

//mount the route
app.use("/api/v1", blog);

const connectWithDb = require("./config/database");
connectWithDb();

//start the server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

//default route
app.get("/", (req, res) => res.send("Hello World!"));