import Restaurants from "../models/restaurant";
import Dishes from "../models/dish"
import _ from "lodash";
import Promise from "bluebird"

const addDish = async dish_details => {
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

}
const getDishDetails = async dish_id => {
    let dish = await Dishes.findOne({
        _id: dish_id
    })
    if (!dish) throw new Error("Dish not found in DB!");
    return {
        id: dish._id,
        name: dish.name,
        price: dish.price,
        description: dish.description,
        image: dish.image,
        section: dish.section
    }

}

const updateDish = async dish_details => {
    let dish = await Dishes.findOne({
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
    return {
        id: dish._id,
        name: dish.name,
        price: dish.price,
        description: dish.description,
        image: dish.image,
        section: dish.section
    }
}

const deleteDish = async ids => {
    console.log(ids)
    let restaurant = await Restaurants.update({
        dishes: ids.dish_id
    }, {
        $pull: {
            dishes: ids.dish_id
        }
    })
    let dish = await Dishes.findOneAndRemove({
        _id: ids.dish_id
    })
}

const searchDishes = search_key => {
    return Dishes.aggregate([{
        $match: {
            name: {
                $regex: search_key,
                $options: 'i'
            }
        }
    }]).then(searchDishes => {
        return Promise.map(searchDishes, dish => {
            return Restaurants.findOne({
                dishes: dish._id
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