const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Keyword = require("./keyword");
const Dining = require("./dining");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Keyword = Keyword;
db.Dining = Dining;

User.init(sequelize);
Keyword.init(sequelize);
Dining.init(sequelize);

User.associate(db);
Keyword.associate(db);
Dining.associate(db);

module.exports = db;
