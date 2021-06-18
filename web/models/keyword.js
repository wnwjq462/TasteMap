const Sequelize = require("sequelize");

module.exports = class Keyword extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: true,
        modelName: "Keyword",
        tableName: "keyword",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Keyword.belongsToMany(db.User, {
      foreignKey: "userId",
      through: "user_keyword",
    });
    db.Keyword.belongsToMany(db.Dining, {
      foreignKey: "diningId",
      through: "dining_keyword",
    });
  }
};