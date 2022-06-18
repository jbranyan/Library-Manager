'use strict';
// const sequelize = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   const Book = sequelize.define('Book', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true, 
//       autoIncrement: true
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: {
//           msg: 'Please enter a value for Title',
//         },
//         notNull: {
//           msg: 'Please provide a value for Title',
//         },
//       },
//     },
//     author: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: {
//           msg: 'Please enter a value for Author',
//         },
//         notNull: {
//           msg: 'Please provide a value for Author',
//         },
//       },
//     },
//     genre: DataTypes.STRING,
//     year: DataTypes.INTEGER
//   }, {});
//   Book.associate = function(models) {
//     // associations can be defined here
//   };
//   return Book;
// };


const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Book extends Model {}
module.exports = (sequelize, DataTypes) => {
  Book.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
      genre: DataTypes.STRING,
      year: DataTypes.INTEGER
    }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Book' // We need to choose the model name
  });
  return Book;
};
// the defined model is the class itself
console.log(Book === sequelize.models.Book); // true