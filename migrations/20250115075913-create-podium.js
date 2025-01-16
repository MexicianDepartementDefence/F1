'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Podiums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      calendar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
        references: {
          model: {
            tableName: 'Fixtures',
            schema: 'public'
          },
          key: "id",
          as: "jadwal"
        }
      },
      winner: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: {
            tableName: 'Pembalaps',
            schema: 'public'
          },
          key: 'id',
          as: "pemenang"
        }
      },
      second: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: {
            tableName: 'Pembalaps',
            schema: 'public'
          },
          key: 'id',
          as: "runnerup"
        }
      },
      third: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: {
            tableName: 'Pembalaps',
            schema: 'public'
          },
          key: 'id',
          as: "tiga"
        }
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
    await queryInterface.dropTable('podia');
  }
};