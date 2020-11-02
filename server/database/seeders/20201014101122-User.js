/* eslint-disable linebreak-style */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        password: '12345678',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'johnsmith@example.com',
        password: '12345678',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
