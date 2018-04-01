'use strict';
var bcrypt = require('bcrypt')

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        username: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: "Please enter valid email address"
                }
            }
        },
        password: DataTypes.STRING
    }, {
        hooks: {
            beforeCreate: function(user, options, cb) {
                if (user && user.password) {
                    var hash = bcrypt.hashSync(user.password, 10);
                    user.password = hash; // change password val to hash BEFORE insert in db
                }
                cb(null, user);
            }
        },
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.user.belongsToMany(models.climb, { through: 'climb_fav', foreignKey: 'user_id', otherKey: 'climb_id' });
                models.user.hasMany(models.comment, {foreignKey: 'userId'});
            }
        },
        instanceMethods: {
            isValidPassword: function(passwordTyped) {
                return bcrypt.compareSync(passwordTyped, this.password);

            },
            toJSON: function() {
                var data = this.get();
                delete data.password;
                return data;
            }
        }
    });
    return user;
};
