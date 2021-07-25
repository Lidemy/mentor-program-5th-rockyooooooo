'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.Admin)
      Article.belongsTo(models.Category)
    }
  };
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};
