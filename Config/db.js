const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ordersystem", "hejAdmin", "123", {
  host: "127.0.0.1",
  port:3306,
  dialect: "mysql",
  //logging: false
});

//const sequelize =new Sequelize("postgres://root:root@127.0.0.1:/ordersystem")

module.exports = sequelize;