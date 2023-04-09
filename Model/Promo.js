const { DataTypes } = require("sequelize")
const sequelize = require("../Config/db")

const Promo = sequelize.define(
 "Promo",
 {
   codePromo: {
    type: DataTypes.STRING,
    primaryKey: true,
   }, 
   percent: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }, 
   createdAt:{
    type:DataTypes.DATE,
    allowNull: true,
   },
   deletedAt:{
     type:DataTypes.DATE,
     allowNull: true,
   },
   updatedAt:{
     type:DataTypes.DATE,
     allowNull: true,
   }
 },
 {
   tableName: "promo",
   //timestamps: false,
 }
);

module.exports = Promo;
