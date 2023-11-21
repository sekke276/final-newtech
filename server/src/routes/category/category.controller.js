const {
  AddnewCategory,
  GetCategories,
} = require("../../models/category.model");

async function httpAddCategory(req, res) {
  try {
    const category = req.body;
    const newCate = await AddnewCategory(category);
    res.status(200).json(newCate);
  } catch (err) {
    console.log(err);
    return res.status(504).json(err);
  }
}

async function httpGetAllCategory(_, res) {
  try {
    const categories = await GetCategories();
    return res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    return res.status(504).json(err);
  }
}

module.exports = {
  httpAddCategory,
  httpGetAllCategory,
};
