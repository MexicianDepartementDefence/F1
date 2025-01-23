'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Ligas', 'juara_bertahan', {
      type: Sequelize.STRING,
      allowNull: false
    })

    await queryInterface.addColumn('Ligas', 'juara_terbanyak', {
      type: Sequelize.STRING,
      allowNull: false
    })

    await queryInterface.addColumn('Ligas', 'tahun_berdiri', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
