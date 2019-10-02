if (process.env.NODE_ENV !== "production") require("dotenv").config();
const config = require("config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4000;

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
