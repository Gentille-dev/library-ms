'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'author_id'})
    }
  }
  Book.init({
    
    author_id: DataTypes.INTEGER,
    bookTitle: DataTypes.STRING,
    bookGenre: DataTypes.STRING,
    ISBN: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};