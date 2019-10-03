import {
    Orders,
    Users,
    Restaurants,
    Dishes,
    Dishes_Order
} from "../src/sequelize";
import _ from "lodash";

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
        }).then(order => {
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
                order_id: order.Dishes
            },
            include: [{
                model: Dishes
            }]
        }).then(allDishes => {
            if (!allDishes) {
                throw new Error("Order does not have dishes! Weird...")
            }
            var dishes = []
            if (allDishes && allDishes.length) {
                dishes = allDishes.map(eachDish => {
                    const {
                        id,
                        name,
                        rate
                    } = eachDish.dish;
                    return {
                        id,
                        name,
                        rate,
                        quantity: eachDish.quantity
                    }
                })
            }
            return {
                id: order.id,
                customer: {
                    name: order.suer.first_name + order.user.last_name,
                    address: order.user.address
                },
                items,
                status: order.status,
                amount: order.amount
            }
        })
    })
}

const getOrdersByCustomer = user_id => {
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

export {
    getOrdersByRestaurant,
    updateOrder,
    getOrderDetails,
    getOrdersByCustomer
}