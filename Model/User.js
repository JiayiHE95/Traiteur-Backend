const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db");

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
    //timestamps: false,
  }
);

module.exports = User;
