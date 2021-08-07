'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Prizes', [{
      name: '麥當勞',
      description: '雙層純牛肉，獨特醬料加生菜，吉事洋蔥酸黃瓜，芝麻麵包蓋上去，好吃過癮麥香堡。',
      imgUrl: 'https://www.mcdonalds.com/etc/designs/mcd/tw/zh-tw/_jcr_content/logo/image.img.jpg/1625837077562.jpg',
      weight: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Prizes', null, {});
  }
};
