'use strict';
module.exports = function(sequelize, DataTypes) {
  var climb_send = sequelize.define('climb_send', {
    user_id: DataTypes.INTEGER,
    climb_id: DataTypes.INTEGER,
    date_sent: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return climb_send;
};