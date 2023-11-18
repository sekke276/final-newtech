const {
  httpAddCategory,
  httpGetAllCategory,
} = require("./category.controller.js");
const express = require("express");
const categoryRouter = express.Router();

categoryRouter.get("/allcategories", httpGetAllCategory);
categoryRouter.post("/addcategory", httpAddCategory);
module.exports = categoryRouter;
