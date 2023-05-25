const req = require("express/lib/request");
const { Sequelize } = require("sequelize");

const mdp = process.env.MDP
const login=process.env.LOGIN
const host=process.env.HOST
const port=process.env.PORT

const sequelize = new Sequelize("ordersystem",'mysql', '753ed129c298e00e', {
  host:"localhost",
  dialect: "mysql",
  //logging: false
});

/*
const sequelize = new Sequelize("ordersystem", "hejAdmin", "123", {
  host: "127.0.0.1",
  port:3306,
  dialect: "mysql",
  //logging: false
});
*/




module.exports = sequelize;