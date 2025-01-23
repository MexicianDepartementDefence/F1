const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// Model Pembalap
const Fixture = sequelize.define('Fixture', {
  negara_bagian: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tanggal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  circuit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: "Circuit",
      key: 'id'
    }
  }
}
);

// Fixture.associate = (models) => {
//   Fixture.hasMany(models.Circuit, {
//     foreignKey: "id",
//     as: "sirkuit"
//   })
// }


module.exports = Fixture