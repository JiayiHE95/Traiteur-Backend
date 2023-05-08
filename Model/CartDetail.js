const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db");
const Product=require("./Product")

const CartDetail = sequelize.define(
 "CartDetail",
 {
   idUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
   },
   idProduct: {
     type: DataTypes.INTEGER,
     primaryKey: true,
   },
   quantity: {
     type: DataTypes.INTEGER,
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
   tableName: "cart_detail",
   //timestamps: false,
 }
);

Product.hasMany(CartDetail,{as:'cartdetails',foreignKey:'idProduct'})
CartDetail.belongsTo(Product,{as:'product',foreignKey:"idProduct"})

module.exports = CartDetail;
