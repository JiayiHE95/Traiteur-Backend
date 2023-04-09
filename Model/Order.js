const { DataTypes, BelongsTo } = require("sequelize");
const sequelize = require("../Config/db");
const OrderDetail = require("./OrderDetail");

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
   codePromo: {
     type: DataTypes.STRING,
     allowNull: true,
   },
   totalprice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }, 
   orderstatus:{
    type:DataTypes.ENUM('supprimée', 'passée', 'créée', 'préparation en cours', 'annulée', 'livrée'),
    defaultValue: 'créée',
    allowNull: false,
   }, 
  
    firstname: {
      type: DataTypes.STRING,
      //allowNull: false,
    }, 
    lastname: {
      type: DataTypes.STRING,
      //allowNull: false,
    }, 
    adresse: {
      type: DataTypes.STRING,
      //allowNull: false,
    }, 
    cp: {
      type: DataTypes.STRING,
      //allowNull: false,
    }, 
    city: {
      type: DataTypes.STRING,
      //allowNull: false,
    }, 
    telephone: {
      type: DataTypes.STRING,
      //allowNull: false,
    }, 
    mail: {
     type: DataTypes.STRING,
     //allowNull: false,
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
OrderDetail.belongsTo(Order,{foreignKey:"idOrder"})

module.exports = Order;
