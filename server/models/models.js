const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Categories=sequelize.define("categories",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name1:{type:DataTypes.STRING,allowNull:false},
    name2:{type:DataTypes.STRING,allowNull:false},
    name3:{type:DataTypes.STRING,allowNull:false}
})

module.exports={Categories}