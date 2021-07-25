'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: '隨筆',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '好聽ㄉ歌',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '學習筆記',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '測試用',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
