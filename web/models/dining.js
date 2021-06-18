const Sequelize = require("sequelize");

module.exports = class Dining extends Sequelize.Model {
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
        totalScore: Sequelize.DECIMAL(3, 2),
        tasteScore: Sequelize.DECIMAL(3, 2),
        priceScore: Sequelize.DECIMAL(3, 2),
        serviceScore: Sequelize.DECIMAL(3, 2),
        moodScore: Sequelize.DECIMAL(3, 2),
        address: Sequelize.STRING(100),
        contact: Sequelize.STRING(50),
        operatingHours: Sequelize.STRING(50),
      },
      {
        sequelize,
        underscored: true,
        modelName: "Dining",
        tableName: "dining",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Dining.belongsToMany(db.User, {
      foreignKey: "userId",
      through: "like_dining",
    });
    db.Dining.belongsToMany(db.Keyword, {
      foreignKey: "keywordId",
      through: "dining_keyword",
    });
  }
};
