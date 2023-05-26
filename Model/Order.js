const { DataTypes, BelongsTo } = require("sequelize");
const sequelize = require("../Config/db");
const OrderDetail = require("./OrderDetail");
const Product=require("../Model/Product")

const Order = sequelize.define(
  "Order",
  {
   idOrder: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
   }, 
   idUser: {
     type: DataTypes.INTEGER,
     primaryKey: true,
    },
   totalprice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }, 
  paid: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }, 
  discount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  }, 
   orderstatus:{
    type:DataTypes.ENUM('CREEE', 'EN PREPARATION', 'LIVREE'),
    defaultValue: 'CREEE',
    allowNull: true,
   }, 
  
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    adresse: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    cp: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    mail: {
     type: DataTypes.STRING,
     allowNull: false,
   },
   deliverydate:{
    type:DataTypes.DATE,
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
    tableName: "order",
    //timestamps: false,
  }
)

Order.hasMany(OrderDetail, {as:'orderdetails',foreignKey:'idOrder'})
OrderDetail.belongsTo(Order,{as:'order',foreignKey:"idOrder"})


module.exports = Order;
