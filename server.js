if (process.env.NODE_ENV !== "production") require("dotenv").config();
const config = require("config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// custome middlewares
const serverResponse = require("./middlewares/serverResponse");

// routes
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serverResponse());

// routes
app.use("/", userRoutes);
app.use("/admin", adminRoutes);

mongoose
    .connect(config.get("db").get("connection-string"), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log("server started on port", PORT);
        });
    })
    .catch(err => {
        console.log(err);
    });
