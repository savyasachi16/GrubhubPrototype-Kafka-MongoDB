import Sequelize from 'sequelize';
import UserModel from '../models/user';
import RestaurantModel from '../models/restaurant';
import {
    dishModel,
    dishRestaurantModel,
    dishOrderModel
} from "../models/dish";
import OrderModel from "../models/Order"

const sequelize = new Sequelize('grubhubDB', 'root', 'root1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const Users = UserModel(sequelize, Sequelize);
const Restaurants = RestaurantModel(sequelize, Sequelize);
const Dishes = dishModel(sequelize, Sequelize);
const Dishes_Restaurant = dishRestaurantModel(sequelize, Sequelize);
const Orders = OrderModel(sequelize, Sequelize);
const Dishes_Order = dishOrderModel(sequelize, Sequelize);

Dishes_Restaurant.belongsTo(Dishes);
Dishes_Restaurant.belongsTo(Restaurants);
Orders.belongsTo(Users);
Orders.belongsTo(Restaurants);
Dishes_Order.belongsTo(Orders);
Dishes_Order.belongsTo(Items);


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
    Dishes_Restaurant,
    Dishes_Order,
    Orders
};