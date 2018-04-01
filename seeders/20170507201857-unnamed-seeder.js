'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('Person', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        return queryInterface.bulkInsert('climbs', [{
                name: 'Big Cross Right',
                creator_id: 4,
                imgur: 'http://i.imgur.com/lxIqrUn.jpg',
                createdAt: '2016-12-13 12:31:41.732956-07',
                updatedAt: '2016-12-13 12:31:41.732956-07',
                style: 'crimp',
                grade_id: 3
            }

        ]);
    },

    down: function(queryInterface, Sequelize) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
    }
};
