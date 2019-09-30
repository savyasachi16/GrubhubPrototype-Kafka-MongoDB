import Sequelize from 'sequelize';
import UserModel from '../models/user';
import RestaurantModel from '../models/restaurant';
import {
    dishModel,
    dishRestaurantModel
} from "../models/dish";

const sequelize = new Sequelize('grubhubDB', 'root', 'root1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const Users = UserModel(sequelize, Sequelize);
const Restaurants = RestaurantModel(sequelize, Sequelize);
const Dishes = dishModel(sequelize, Sequelize);
const Dishes_Restaurant = dishRestaurantModel(sequelize, Sequelize);

Dishes_Restaurant.belongsTo(Dishes);

sequelize.sync()
    .then(() => {
        console.log('DB Created Successfully...');
    }).catch(err => {
        console.log('DB Creation Error: ', err.message);
    })

export {
    Users,
    Restaurants,
    Dishes,
    Dishes_Restaurant
};