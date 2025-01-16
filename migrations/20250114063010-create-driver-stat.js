'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Driver_stats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      drivers_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: {
            tableName: 'Pembalaps',
            schema: 'public'
          },
          key: "id",
          as: "pembalap"
        }
      },
      appearance: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      race_win: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      race_podium: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      world_champion: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pole_position: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fastest_lap: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      retire: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('driver_stats');
  }
};