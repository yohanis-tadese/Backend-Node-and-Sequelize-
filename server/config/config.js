require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: "",
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

// "development": {
//   "username": "root",
//   "password": null,
//   "database": "sequelize-project",
//   "host": "127.0.0.1",
//   "dialect": "mysql"
// },
