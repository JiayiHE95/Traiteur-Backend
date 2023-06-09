const { DataTypes, BelongsTo } = require("sequelize");
const sequelize = require("../Config/db");
const CartDetail=require("./CartDetail")
const Order=require("./Order")

const User = sequelize.define(
  "User",
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isAdmin:{
      type:DataTypes.BOOLEAN,
      allowNull: true,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mdp: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    reset_password_token:{
      type: DataTypes.STRING,
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
    tableName: "user",
  }
)

User.hasMany(CartDetail, {as:'cartdetails',foreignKey:'idUser'})
CartDetail.belongsTo(User,{foreignKey:"idUser"})
User.hasMany(Order, {as:'orders',foreignKey:'idUser'})
Order.belongsTo(User,{as:'user',foreignKey:"idUser"})

module.exports = User;
