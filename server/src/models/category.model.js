const Category = require("./category.mongo");

async function AddnewCategory(category) {
  const newCate = await new Category({
    categoryName: category.categoryName,
  });

  const cate = await newCate.save();
  return cate;
}

async function GetCategories() {
  const categories = await Category.find({});
  return categories;
}

module.exports = {
  AddnewCategory,
  GetCategories,
};
