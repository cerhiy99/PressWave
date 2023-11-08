const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
    'press_ware',
    'user',
    'password',
    {
        dialect: "mysql",
        host: process.env.HOST
    }
);