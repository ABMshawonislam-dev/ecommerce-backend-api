const express = require("express");
const _ = express.Router();
const authRoutes = require("./auth");
const categoryRoutes = require("./category")

_.use("/auth", authRoutes);
_.use("/category", categoryRoutes);

module.exports = _;