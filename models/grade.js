'use strict';
module.exports = function(sequelize, DataTypes) {
  var grade = sequelize.define('grade', {
    color: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return grade;
};