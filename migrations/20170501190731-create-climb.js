'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('climbs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            grade_id: {
                type: Sequelize.INTEGER
            },
            creator_id: {
                type: Sequelize.INTEGER
            },
            imgur: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            style: {
                type: Sequelize.TEXT
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('climbs');
    }
};
