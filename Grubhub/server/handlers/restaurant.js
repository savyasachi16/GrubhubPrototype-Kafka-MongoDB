import {
    Restaurants
} from "../src/sequelize";

const createRestaurant = restaurantDetails => {
    return Restaurants.create({
        name: restaurantDetails.restaurant_name,
        cuisine: restaurantDetails.cuisine,
        user_id: restaurantDetails.user_id,
        image: restaurantDetails.restaurant_image,
        address: restaurantDetails.address,
        zipcode: restaurantDetails.zipcode
    }).then(restaurant => {
        if (!restaurant) {
            throw new Error("Restaurant creation error!");
        }
        return {
            id: restaurant.id,
            name: restaurant.name,
            cuisine: restaurant.cuisine,
            image: restaurant.image,
            address: restaurant.address,
            zipcode: restaurant.zipcode
        }
    })
}

const getRestaurant = user_id => {
    return Restaurants.findOne({
        where: {
            user_id
        }
    }).then(restaurant => {
        if (!restaurant) {
            console.log("No restaurant in DB for current user...");
        }
        return restaurant
    })
}

const updateRestaurant = restaurantDetails => {
    return Restaurants.findOne({
        where: {
            id: restaurantDetails.id
        }
    }).then(restaurant => {
        return restaurant.update({
            name: restaurantDetails.restaurant_name,
            cuisine: restaurantDetails.cuisine,
            image: restaurantDetails.restaurant_image,
            address: restaurantDetails.address,
            zipcode: restaurantDetails.zipcode
        }).then(updatedRestaurant => {
            return Restaurants.findOne({
                where: {
                    id: updatedRestaurant.id
                }
            }).then(restaurant => {
                return {
                    id: restaurant.id,
                    name: restaurant.name,
                    cuisine: restaurant.cuisine,
                    address: restaurant.address,
                    zipcode: restaurant.zipcode
                }
            })
        })
    })
}

export default {
    createRestaurant,
    getRestaurant,
    updateRestaurant
}