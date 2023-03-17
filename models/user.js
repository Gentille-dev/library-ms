'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Book, Borrower}) {
      // define association here
      this.hasMany(Book,{foreignKey: 'author_id'});
      this.hasMany(Borrower,{foreignKey: 'user_id'});
    }
  }
  User.init({
 
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};