import Restaurants from "../models/restaurant";
import Dishes from "../models/dish"
import _ from "lodash";
import Promise from "bluebird"

const addDish = async dish_details => {
    try {
        let dish = await Dishes.create({
            name: dish_details.name,
            price: dish_details.price,
            description: dish_details.description,
            image: dish_details.image,
            section: dish_details.section
        })
        if (!dish) throw new Error("Unable to add new dish!")
        let restaurant = await Restaurants.updateOne({
            _id: dish_details.restaurant_id
        }, {
            $push: {
                dishes: dish._id
            }
        })
        if (!restaurant) throw new Error("Error mapping dish to restaurant!")
        return {
            id: dish._id,
            name: dish.name,
            price: dish.price,
            description: dish.description,
            image: dish.image,
            section: dish.section
        }
    } catch (err) {
        console.log("Add Dish Error: ", err)
        return err
    }
}
const getDishDetails = async dish_id => {
    try {
        let dish = await Dishes.findOne({
            _id: dish_id
        })
        if (!dish) throw new Error("Dish not found in DB!");
        return dish
    } catch (err) {
        console.log("Get Dish Details Error: ", err)
        return err
    }
}

const updateDish = async dish_details => {
    try {
        let dish = await Dishes.findAll({
            _id: dish_details.id
        })
        if (!dish) throw new Error("Dish not found in DB!")
        dish.name = dish_details.name
        dish.price = dish_details.price
        dish.section = dish_details.section
        dish.description = dish_details.description
        dish.image = dish_details.image
        let updatedDish = await dish.save()
        if (!updatedDish) throw new Error("Dish update failure!")
        return updatedDish
    } catch (err) {
        console.log("Update Dish Error: ", err)
        return err
    }
}
const deleteDish = async ids => {
    try {
        let restaurant = await Restaurants.dishes._id(ids.dish_id).remove()
        restaurant.save(err => {
            if (err) throw new Error("Delete dish failure!")
        })
    } catch (err) {
        console.log("Delete Dish Error: ", err)
        return err
    }
}

//const Op = Sequelize.Op;
const Op = "searchTerm";

const searchDishes = search_key => {
    try {
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
    } catch (err) {
        console.log("Search Dish Error: ", err)
        return err
    }
}
export {
    addDish,
    getDishDetails,
    updateDish,
    deleteDish,
    searchDishes
}