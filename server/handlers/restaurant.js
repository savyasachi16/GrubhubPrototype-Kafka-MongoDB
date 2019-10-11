import {
    Restaurants,
    Dishes_Restaurant,
    Dishes
} from "../src/sequelize";
import _ from "lodash";
import Promise from "bluebird";

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
            return {}
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

const getRestaurantMenu = (restaurant_id) => {
    return Restaurants.findOne({
        where: {
            id: restaurant_id
        }
    }).then(restaurant => {
        if (!restaurant) {
            throw new Error("No restaurant found in DB!");
        }
        return Dishes_Restaurant.findAll({
            where: {
                restaurant_id
            },
            include: [{
                model: Dishes
            }, {
                model: Restaurants
            }]
        }).then(allDishes => {
            if (!allDishes || !allDishes.length) {
                return []
            }
            const groupedDishes = _.chain(allDishes).map('dish').groupBy('section').map((value, key) => ({
                section: key,
                id: value[0].id,
                dishes: value
            })).flatten().sortBy(each => each.section.toLowerCase()).value();
            return groupedDishes
        })
    })
}

const getRestaurantDetails = restaurant_id => {
    return Restaurants.findOne({
        where: {
            id: restaurant_id
        }
    }).then(restaurant => {
        if (!restaurant) {
            throw new Error("Restaurant not found in DB!");
        }
        return getRestaurantMenu(restaurant_id).then(menu => {
            restaurant.dataValues.menu = menu;
            return {
                current_restaurant: restaurant
            };
        });
    });
};

const updateSection = section => {
    if (!section.dishes || !section.dishes.length) {
        throw new Error('No dishes in section.')
    }
    return Promise.map(section.dishes, dish => {
        return Dishes.findOne({
            where: {
                id: dish
            }
        }).then(currentDish => {
            return currentDish.update({
                section: section.updated_name
            })
        })
    }).then(() => {
        return getRestaurantMenu(section.restaurant_id);
    }).catch(err => {
        return ({
            message: err
        });
    });
}

const deleteSection = section => {
    if (!section.dishes || !section.dishes.length) {
        throw new Error('No dishes in section.')
    }
    return Promise.map(section.dishes, dish => {
        return Dishes_Restaurant.destroy({
            where: {
                dish_id: dish
            }
        }).then(() => {
            return Dishes.destroy({
                where: {
                    id: dish
                }
            });
        });
    }).then(() => {
        return getRestaurantMenu(section.restaurant_id);
    }).catch(err => {
        return ({
            message: err
        });
    });
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