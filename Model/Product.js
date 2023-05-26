const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db");
const Picture=require("./Picture")

const Product = sequelize.define(
 "Product",
 {
   idProduct: {
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true,
   },
   category:{
     type:DataTypes.ENUM('ENTREE', 'PLAT', 'DESSERT'),
     defaultValue: 'PLAT',
     allowNull: false,
   }, 
   nameProduct: {
     type: DataTypes.STRING,
     allowNull: false,
   }, 
   price: {
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
   tableName: "product",
   //timestamps: false,
 }
);
Product.hasMany(Picture,{as:'pictures',foreignKey:'idProduct'})
Picture.belongsTo(Product,{foreignKey:"idProduct"})


module.exports = Product;
