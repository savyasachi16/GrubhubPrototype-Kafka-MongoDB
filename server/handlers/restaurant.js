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
        throw new Error(err);
    }

}

const getRestaurant = async restaurant_id => {
    try {
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
    } catch {
        throw new Error(err);
    }
}

const updateRestaurant = async restaurantDetails => {
    try {
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
            zipcode: restaurant.zipcode
        }
    } catch {
        throw new Error(err);
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
        let allDishes = await Dishes.find({
            _id: {
                $in: restaurant.dishes
            }
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
            return err
        }
    }
}

const getRestaurantDetails = async restaurant_id => {
    try {
        let restaurant = await Restaurants.findOne({
            _id: restaurant_id
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
        throw new Error(err);
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
        throw new Error(err);
    }
}

const deleteSection = async section => {
    try {
        console.log("Section in deleteSection: ", section)
        if (!section.dishes || !section.dishes.length) {
            throw new Error("No dishes in section.")
        }
        sectionDelete = await Dishes.deleteMany({
            section: section.name
        })
        sectionDelete = await sectionDelete.save()
        return getRestaurantMenu(section.restaurant_id);
    } catch {
        throw new Error(err);
    }
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