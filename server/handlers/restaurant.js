import Restaurants from "../models/restaurant";
import Dishes from "../models/dish";
import _ from "lodash";
import Promise from "bluebird";
import mongoose from "mongoose";

const createRestaurant = async restaurantDetails => {
    let restaurant = await Restaurants.create({
        name: restaurantDetails.restaurant_name,
        cuisine: restaurantDetails.cuisine,
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
}

const getRestaurant = async restaurant_id => {
    let restaurant = await Restaurants.findOne({
        _id: restaurant_id
    })
    if (!restaurant) {
        throw new Error("No restaurant in DB!")
    }
    return {
        id: restaurant._id,
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        image: restaurant.image,
        address: restaurant.address,
        zipcode: restaurant.zipcode
    }
}

const updateRestaurant = async restaurantDetails => {
    let restaurant = await Restaurants.findOne({
        _id: restaurantDetails.restaurant_id
    })
    restaurant.name = restaurantDetails.restaurant_name
    restaurant.cuisine = restaurantDetails.cuisine
    restaurant.image = restaurantDetails.restaurant_image
    restaurant.address = restaurantDetails.address
    restaurant.zipcode = restaurantDetails.zipcode
    let updatedRestaurant = await restaurant.save()
    if (!restaurant) throw new Error("No restaurant in DB!")
    restaurant = await Restaurants.findOne({
        _id: updatedRestaurant._id
    })
    return {
        id: restaurant._id,
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        address: restaurant.address,
        zipcode: restaurant.zipcode,
        image: restaurant.image
    }
}

const getRestaurantMenu = async restaurant_id => {
    let restaurant = await Restaurants.findOne({
        _id: restaurant_id
    })
    if (!restaurant) {
        throw new Error("No restaurant found in DB!");
    }
    let allDishes = await Dishes.find({
        _id: {
            $in: restaurant.dishes
        }
    })
    if (!allDishes || !allDishes.length) {
        return []
    }
    const groupedDishes = _.chain(allDishes).map().groupBy('section').map((value, key) => ({
        section: key,
        id: value[0].id,
        dishes: value
    })).flatten().sortBy(each => each.section.toLowerCase()).value();
    return groupedDishes
}

const getRestaurantDetails = async restaurant_id => {
    let restaurant = await Restaurants.findOne({
        _id: restaurant_id
    }).lean();
    if (!restaurant) {
        throw new Error("Restaurant not found in DB!");
    }
    let menu = await getRestaurantMenu(restaurant_id)
    restaurant.menu = menu;
    return {
        current_restaurant: restaurant
    }
}


const updateSection = async section => {
    if (!section.dishes || !section.dishes.length) {
        throw new Error('No dishes in section.')
    }
    return Promise.map(section.dishes, dish => {
        return Dishes.findOne({
            _id: dish
        }).then(currentDish => {
            return currentDish.updateOne({
                section: section.updated_name
            })
        })
    }).then(() => {
        return getRestaurantMenu(section.restaurant_id);
    })
}

const deleteSection = async section => {
    if (!section.dishes || !section.dishes.length) {
        throw new Error("No dishes in section.")
    }
    let restaurant = await Restaurants.findOne({
        _id: section.restaurant_id
    })
    let objectIdArray = section.dishes.map(s => mongoose.Types.ObjectId(s));
    restaurant.dishes = _.difference(restaurant.dishes, objectIdArray)

    restaurant = await restaurant.save()
    let dish = await Dishes.deleteMany({
        _id: section.dishes
    })
    return getRestaurantMenu(section.restaurant_id);
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