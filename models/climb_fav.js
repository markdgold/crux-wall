'use strict';
module.exports = function(sequelize, DataTypes) {
    var climb_fav = sequelize.define('climb_fav', {
        user_id: DataTypes.INTEGER,
        climb_id: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.climb_fav.belongsTo(models.user, { foreignKey: 'user_id' });
                models.climb_fav.belongsTo(models.climb, { foreignKey: 'climb_id' });
            }
        }
    });
    return climb_fav;
};
