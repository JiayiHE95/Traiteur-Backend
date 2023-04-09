const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db");
const Product=require("./Product")
const OrderDetail = sequelize.define(
 "OrderDetail",
 {
   idOrder: {
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
   totalprice: {
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
   tableName: "order_detail",
   //timestamps: false,
 }
);

OrderDetail.hasOne(Product,{as:'product', foreignKey:"idProduct"})
module.exports = OrderDetail;
