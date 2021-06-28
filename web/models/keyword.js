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
        timestamps: false,
        modelName: "Keyword",
        tableName: "keyword",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Keyword.belongsToMany(db.User, {
      foreignKey: "keywordId",
      through: "user_keyword",
      timestamps: false,
    });
    db.Keyword.belongsToMany(db.Dining, {
      foreignKey: "keywordId",
      through: "dining_keyword",
      timestamps: false,
    });
  }
};
