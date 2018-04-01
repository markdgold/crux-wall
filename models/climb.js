'use strict';
module.exports = function(sequelize, DataTypes) {
    var climb = sequelize.define('climb', {
        name: DataTypes.STRING,
        grade_id: DataTypes.INTEGER,
        creator_id: DataTypes.INTEGER,
        imgur: {
            type: DataTypes.TEXT,
            validate: {
                isURL: true

            }
        },
        style: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.climb.hasMany(models.comment);
                models.climb.belongsTo(models.user, { foreignKey: 'creator_id' });
                models.climb.belongsTo(models.grade, { foreignKey: 'grade_id' });
                models.climb.belongsToMany(models.user, { through: 'climb_fav', foreignKey: 'climb_id', otherKey: 'user_id' });
            }
        }
    });
    return climb;
};
