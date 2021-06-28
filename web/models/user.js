const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        account: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: "User",
        tableName: "user",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.belongsToMany(db.Keyword, {
      foreignKey: "userId",
      through: "user_keyword",
      timestamps: false,
    });
    db.User.belongsToMany(db.Dining, {
      foreignKey: "userId",
      through: "like_dining",
      timestamps: false,
    });
  }
};
