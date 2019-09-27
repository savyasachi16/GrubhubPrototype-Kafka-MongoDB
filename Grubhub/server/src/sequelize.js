import Sequelize from 'sequelize';
import UserModel from '../models/user';
import RestaurantModel from '../models/restaurant'

const sequelize = new Sequelize('grubhubDB', 'root', 'root1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const Users = UserModel(sequelize, Sequelize);
const Restaurants = RestaurantModel(sequelize, Sequelize);

sequelize.sync()
    .then(() => {
        console.log('DB Created Successfully...');
    }).catch(err => {
        console.log('DB Creation Error: ', err.message);
    })

export {
    Users,
    Restaurants
};