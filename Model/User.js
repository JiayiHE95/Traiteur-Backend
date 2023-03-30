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
