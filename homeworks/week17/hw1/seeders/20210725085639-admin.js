'use strict';
const bcrypt = require('bcrypt')

const saltRounds = 10
const testAdmin = { username: 'allen', password: 'allen'}
const username = process.env.username || testAdmin.username
const password = process.env.password || testAdmin.password
const hash = bcrypt.hashSync(password, saltRounds)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Admins', [{
        username,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', null, {})
  }
};
