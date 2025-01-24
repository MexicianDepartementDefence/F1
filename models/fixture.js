const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Circuit = require("./circuit");

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
      model: {
        tableName: 'Circuits'
      },
      key: 'id'
    }
  }
}
);

Fixture.associate = (db) => {
  Fixture.belongsTo(db.Circuit, {
    foreignKey: "circuit",
    as: "sirkuit"
  })
}


module.exports = Fixture