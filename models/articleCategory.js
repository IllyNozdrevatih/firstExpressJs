const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const articleCategory = sequelize.define('article_category', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});

module.exports = articleCategory;