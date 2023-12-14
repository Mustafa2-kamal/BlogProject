import Sequelize from 'sequelize';

export const sequelize = new Sequelize('learn', 'root', '', {
    host: 'localhost',
    dialect:'mysql'
});

export const connectDB=()=>{

   return sequelize.sync().then((result)=>{ 
        console.log('Connection has been established successfully.');
    })
    .catch((error)=>{
        console.error('Unable to connect to the database:', error);
    })
    
}



