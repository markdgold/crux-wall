'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    climbId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.comment.belongsTo(models.climb);
        models.comment.belongsTo(models.user);
      }
    }
  });
  return comment;
};
