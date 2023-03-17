'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Borrower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id'})
    }
  }
  Borrower.init({
    user_id: DataTypes.INTEGER,
    book_isbn: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Borrower',
  });
  return Borrower;
};