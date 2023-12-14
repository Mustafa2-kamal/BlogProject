import { DataTypes } from "sequelize";
import { sequelize } from "../../DB/connection.js";

const blogModel=sequelize.define('Blog',{

    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    body:{
        type:DataTypes.TEXT,
        allowNull:false
    }


})

export default blogModel;