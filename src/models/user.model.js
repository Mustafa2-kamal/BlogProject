import { Sequelize,DataTypes } from 'sequelize';
import {sequelize} from '../../DB/connection.js';
import blogModel from './blog.model.js';

const userModel = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate:{
          isEmail: true,
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    phone:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    gender:{
      type:DataTypes.ENUM('male', 'female'),
      allowNull: false,
      defaultvalue: 'male'
    }

  },{
    timestamps: false
  });


  userModel.hasMany(blogModel,{
    onDelete:'CASCADE'
  });

  blogModel.belongsTo(userModel);

  
export default userModel; 
