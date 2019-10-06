import {
    Dishes,
    Dishes_Restaurant,
    Restaurants
} from "../src/sequelize";
import Sequelize from "Sequelize";
import _ from "lodash";
import Promise from "bluebird"

const addDish = dish_details => {
    const {
        name,
        price,
        description,
        image,
        section
    } = dish_details;
    return Dishes.create({
        name,
        price,
        description,
        image,
        section
    }).then(dish => {
        if (!dish) {
            throw new Error("Dish created in DB failed!");
        }
        return Dishes_Restaurant.create({
            dish_id: dish.id,
            restaurant_id: dish_details.restaurant_id
        }).then(() => {
            return dish
        })
    })
};
const getDishDetails = dish_id => {
    return Dishes.findOne({
        where: {
            id: dish_id
        }
    }).then(dish => {
        if (!dish) {
            throw new Error("Dish not found in DB!");
        }
        return dish
    })
};

const updateDish = (dish_details) => {
    console.log("updateDish:", dish_details)
    return Dishes.findOne({
        where: {
            id: dish_details.id
        }
    }).then(dish => {
        if (!dish) {
            throw new Error("Dish not found in DB!");
        }
        const {
            name,
            price,
            section,
            description,
            image
        } = dish_details;
        return dish.update({
            name,
            section,
            price,
            description,
            image
        }).then(() => {
            return Dishes.findOne({
                where: {
                    id: dish_details.id
                }
            }).then(updatedDish => {
                if (!updatedDish) {
                    throw new Error("Updated dish not found!")
                }
                return updatedDish
            })
        })
    })
};
const deleteDish = dish_id => {
    return Dishes_Restaurant.destroy({
        where: {
            dish_id
        }
    }).then(rows => {
        if (!rows) {
            throw new Error("Dish not deleted in DB!");
        }
        return Dishes.destroy({
            where: {
                id: dish_id
            }
        }).then(rows => {
            if (!rows) {
                throw new Error("Dish not deleted in DB!");
            }
            return {
                message: "Dish deleted Successfully"
            }
        })
    })
};

const Op = Sequelize.Op;
const searchDishes = search_key => {
    search_key = `%${search_key}%`;
    return Dishes.findAll({
        where: {
            name: {
                [Op.like]: search_key
            }
        }
    }).then(searchDishes => {
        return Promise.map(searchDishes, dish => {
            return Dishes_Restaurant.findOne({
                where: {
                    dish_id: dish.id
                },
                include: [{
                    model: Restaurants
                }]
            }).then(dish_restaurant => {
                if (dish_restaurant) {
                    return dish_restaurant.restaurant;
                }
            })
        }).then(restaurants => {

            return {
                search_results: _.chain(restaurants).compact().uniqBy('id').value()
            };
        })
    })
}
export {
    addDish,
    getDishDetails,
    updateDish,
    deleteDish,
    searchDishes
}