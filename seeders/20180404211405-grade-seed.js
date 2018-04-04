'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('grades', [
      {
        id: 0,
        color: 'blue',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1,
        color: 'red',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        color: 'yellow',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        color: 'green',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        color: 'teal',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      ]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
