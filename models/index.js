
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  foreingKey: 'category_id'
})

Category.hasMany(Product, {
  foreignKey: "category_id"
})


Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'product_tag'
});

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'Tag_product'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
