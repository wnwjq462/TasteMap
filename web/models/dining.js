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
        imgUrl: Sequelize.STRING(500),
        totalScore: Sequelize.DECIMAL(3, 2),
        tasteScore: Sequelize.DECIMAL(3, 2),
        priceScore: Sequelize.DECIMAL(3, 2),
        serviceScore: Sequelize.DECIMAL(3, 2),
        moodScore: Sequelize.DECIMAL(3, 2),
        address: Sequelize.STRING(100),
        contact: Sequelize.STRING(100),
        operatingHour: Sequelize.STRING(200),
        latitude: Sequelize.DECIMAL(12, 10),
        longitude: Sequelize.DECIMAL(13, 10),
      },
      {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: "Dining",
        tableName: "dining",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Dining.belongsToMany(db.User, {
      foreignKey: "diningId",
      through: "like_dining",
      timestamps: false,
    });
    db.Dining.belongsToMany(db.Keyword, {
      foreignKey: "diningId",
      through: "dining_keyword",
      timestamps: false,
    });
  }
};
