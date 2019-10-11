import {
    Orders,
    Users,
    Restaurants,
    Dishes,
    Dishes_Order
} from "../src/sequelize";
import _ from "lodash";
import Promise from "bluebird"

const getOrdersByRestaurant = restaurant_id => {
    return Orders.findAll({
        where: {
            restaurant_id
        }
    }).then(allOrders => {
        var current_orders, past_orders;
        current_orders = allOrders.filter(order => ["NEW", "PREPARING", "READY"].includes(order.status))
        past_orders = allOrders.filter(order => ["DELIVERED", "CANCELED"].includes(order.status))
        return {
            current_orders,
            past_orders
        }
    })
}

const updateOrder = order_details => {
    return Orders.findOne({
        where: {
            id: order_details.id
        }
    }).then(order => {
        return order.update({
            status: order_details.status
        }).then(() => {
            return getOrdersByRestaurant(order.restaurant_id)
        })
    })
}

const getOrderDetails = (order_id) => {
    return Orders.findOne({
        where: {
            id: order_id
        },
        include: [{
                model: Users
            },
            {
                model: Restaurants
            }
        ]
    }).then(order => {
        if (!order) {
            throw new Error("Order not found in DB!")
        }
        return Dishes_Order.findAll({
            where: {
                order_id: order.id
            },
            include: [{
                model: Dishes
            }]
        }).then(allDishes => {
            if (!allDishes) {
                throw new Error("Order does not have dishes! Weird...")
            }
            let dishes = []
            if (allDishes && allDishes.length) {
                dishes = allDishes.map(eachDish => {
                    const {
                        id,
                        name,
                        amount
                    } = eachDish.dish;
                    return {
                        id,
                        name,
                        amount,
                        quantity: eachDish.quantity
                    }
                })
            }
            return {
                id: order.id,
                buyer: {
                    name: order.user.first_name + " " + order.user.last_name,
                    address: order.user.address
                },
                dishes,
                status: order.status,
                amount: order.amount
            }
        })
    })
}

const getOrdersByBuyer = user_id => {
    return Orders.findAll({
        where: {
            user_id
        }
    }).then(allOrders => {
        var current_orders = [],
            past_orders = []
        current_orders = allOrders.filter(order => ["NEW", "PREPARING", "READY"].includes(order.status))
        past_orders = allOrders.filter(order => ["DELIVERED", "CANCELLED"].includes(order.status));
        return {
            current_orders,
            past_orders
        }
    })
}

const createOrder = order_details => {
    return Orders.create({
        user_id: order_details.user_id,
        restaurant_id: order_details.restaurant_id,
        amount: order_details.total_amount,
        status: "NEW"
    }).then(order => {
        return Promise.map(order_details.cart, dish => {
            return Dishes_Order.create({
                dish_id: dish.id,
                order_id: order.id,
                quantity: dish.quantity
            })
        }).then(() => {
            return order
        })
    })
}

export {
    getOrdersByRestaurant,
    updateOrder,
    getOrderDetails,
    getOrdersByBuyer,
    createOrder
}