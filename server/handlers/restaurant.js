import Restaurants from "../models/restaurant";
import _ from "lodash";
import Promise from "bluebird";

const createRestaurant = async restaurantDetails => {
    try {
        let restaurant = await Restaurants.create({
            name: restaurantDetails.restaurant_name,
            cuisine: restaurantDetails.cuisine,
            user_id: restaurantDetails.user_id,
            image: restaurantDetails.restaurant_image,
            address: restaurantDetails.address,
            zipcode: restaurantDetails.zipcode
        })
        if (!restaurant) throw new Error("Restaurant creation error!")
        return {
            id: restaurant._id,
            name: restaurant.name,
            cuisine: restaurant.cuisine,
            image: restaurant.image,
            address: restaurant.address,
            zipcode: restaurant.zipcode
        }
    } catch {
        err => {
            return ({
                message: err
            })
        }
    }

}

const getRestaurant = async user_id => {
    try {
        let restaurant = await Restaurants.findOne({
            user_id: user_id
        })
        if (!restaurant) {
            console.log("No restaurant in DB for current user...");
            return {}
        }
        return restaurant
    } catch {
        err => {
            return ({
                message: err
            })
        }
    }
}

const updateRestaurant = async restaurantDetails => {
    try {
        let restaurant = await Restaurants.findOne({
            _id: restaurantDetails.id
        })
        restaurant.name = restaurantDetails.restaurant_name
        restaurant.cuisine = restaurantDetails.cuisine
        restaurant.image = restaurantDetails.restaurant_image
        restaurant.address = restaurantDetails.address
        restaurant.zipcode = restaurantDetails.zipcode
        let updatedRestaurant = await restaurant.save()
        restaurant = await Restaurants.findOne({
            _id: updatedRestaurant._id
        })
        return {
            id: restaurant._id,
            name: restaurant.name,
            cuisine: restaurant.cuisine,
            address: restaurant.address,
            zipcode: restaurant.zipcode
        }
    } catch {
        err => {
            return ({
                message: err
            })
        }
    }
}

const getRestaurantMenu = async restaurant_id => {
    try {
        let restaurant = await Restaurants.findOne({
            _id: restaurant_id
        })
        if (!restaurant) {
            throw new Error("No restaurant found in DB!");
        }
        let allDishes = await Dishes.findAll({
            _id: restaurant.dishes
        })
        if (!allDishes || !allDishes.length) {
            return []
        }
        const groupedDishes = _.chain(allDishes).map('dish').groupBy('section').map((value, key) => ({
            section: key,
            id: value[0].id,
            dishes: value
        })).flatten().sortBy(each => each.section.toLowerCase()).value();
        return groupedDishes
    } catch {
        err => {
            return ({
                message: err
            })
        }
    }
}

const getRestaurantDetails = async restaurant_id => {
    try {
        let restaurant = await Restaurants.findOne({
            id: restaurant_id
        })
        if (!restaurant) {
            throw new Error("Restaurant not found in DB!");
        }
        let menu = await getRestaurantMenu(restaurant_id)
        restaurant.dataValues.menu = menu;
        return {
            current_restaurant: restaurant
        }
    } catch {
        err => {
            return ({
                message: err
            })
        }
    }
}


const updateSection = async section => {
    try {
        if (!section.dishes || !section.dishes.length) {
            throw new Error('No dishes in section.')
        }
        let currentDish = await Promise.map(section.dishes, dish => {
            Dishes.findOne({
                _id: dish
            })
        })
        currentDish.section = section.updated_name
        currentDish = await currentDish.save()
        return getRestaurantMenu(section.restaurant_id);
    } catch {
        err => {
            return ({
                message: err
            })
        }
    }
}

const deleteSection = async section => {
    if (!section.dishes || !section.dishes.length) {
        throw new Error("No dishes in section.")
    }
    ///continue later...
}

export default {
    createRestaurant,
    getRestaurant,
    updateRestaurant,
    getRestaurantMenu,
    getRestaurantDetails,
    updateSection,
    deleteSection

}