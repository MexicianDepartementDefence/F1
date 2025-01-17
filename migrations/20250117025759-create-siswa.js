'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Siswas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tanggal_lahir: {
        type: Sequelize.STRING,
        allowNull: false
      },
      asal: {
        type: Sequelize.STRING,
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pendidikan_terakhir: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jurusan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: {
            tableName: "Jurusans",
            schema: 'public'
          },
          key: "id",
          as: "jurusan"
        }
      },
      kelas_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: {
            tableName: "Kelas",
            schema: "public"
          },
          key: "id",
          as: "kelas"
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
    await queryInterface.dropTable('Siswas');
  }
};