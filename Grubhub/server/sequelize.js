import Sequelize from 'sequelize';
import UserModel from './models/user';

const sequelize = new Sequelize('grubhubDB', 'root', 'root1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
    console.log("Users db and tables created!")
});

module.exports = User;