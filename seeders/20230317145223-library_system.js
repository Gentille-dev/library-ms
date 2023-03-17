'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
    //  *   name: 'John Doe',
    //  *   isBetaMember: false
    //  * }], {});
    // */

    await queryInterface.bulkInsert('People', [{
      "name": "victor",
      "email": "victor@gmail.com",
      "updatedAt": "2023-03-17T12:05:56.129Z",
      "createdAt": "2023-03-17T12:05:56.120Z"

    }], {});

  },



  async down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
}