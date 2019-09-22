import Sequelize from 'sequelize';
import UserModel from './models/user';
//import RestaurantModel from ...

const sequelize = new Sequelize('grubhubDB', 'root', 'root1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const Users = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
    console.log("Users db and tables created!")
});

export {
    Users
};