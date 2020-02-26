const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Category = sequelize.define('category', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Category;