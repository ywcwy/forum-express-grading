'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [{
      text: 'nice',
      RestaurantId: 3,
      UserId: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      text: '五星好評',
      RestaurantId: 3,
      UserId: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      text: '還OK啦',
      RestaurantId: 9,
      UserId: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      text: '環境油膩',
      RestaurantId: 18,
      UserId: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      text: 'great',
      RestaurantId: 37,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      text: '非常普通',
      RestaurantId: 44,
      UserId: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {})
  }
};
