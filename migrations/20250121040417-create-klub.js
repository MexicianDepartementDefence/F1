'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Klubs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_klub: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tahun_terbentuk: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gelar: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      daftar_pemain: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      stadion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Klubs');
  }
};