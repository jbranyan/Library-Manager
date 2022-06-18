'use strict';
const sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter a value for Title',
        },
        notNull: {
          msg: 'Please provide a value for Title',
        },
      },
    },
    author: {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter a value for Author',
        },
        notNull: {
          msg: 'Please provide a value for Author',
        },
      },
    },
    genre: sequelize.STRING,
    year: sequelize.INTEGER
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};