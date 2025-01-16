'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Principals', 'team_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultvalue: 0,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: {
          tableName: "Teams"
        },
        key: "id",
        as: "team"
      }
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
