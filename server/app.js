if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const cors = require("cors");
const env = process.env.NODE_ENV || "development";
const express = require("express");
const app = express();
const port = process.env.PORT || 4002;
const router = require("./router/index");
const { User, Customer } = require("./models");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world cuyy");
});

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = app;
