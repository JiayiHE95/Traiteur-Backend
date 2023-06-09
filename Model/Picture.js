const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db");
const Product=require("./Product")

const Picture = sequelize.define(
 "Picture",
 {
  idPicture: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
 }, 
  idProduct: {
     type: DataTypes.INTEGER,
     primaryKey: true,
   },
   namePicture: {
     type: DataTypes.STRING,
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
   tableName: "picture",
 }
);

module.exports = Picture;
