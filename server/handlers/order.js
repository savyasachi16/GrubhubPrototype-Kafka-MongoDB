import Users from "../models/user";
import Restaurants from "../models/restaurant"
import _ from "lodash";
import Promise from "bluebird"

const getOrdersByRestaurant = async restaurant_id => {
    try {
        let allOrders = await Orders.findAll({
            restaurant_id: restaurant_id
        })
        let current_orders, past_orders
        current_orders = allOrders.filter(order => ["NEW", "PREPARING", "READY"].includes(order.status))
        past_orders = allOrders.filter(order => ["DELIVERED", "CANCELED"].includes(order.status))
        return {
            current_orders,
            past_orders
        }
    } catch {
        err => {
            return ({
                message: err
            })
        }
    }
}

const updateOrder = async order_details => {
    try {
        let order = await Orders.findOne({
            _id: order_details.id
        })
        order.status = order_details.status
        updatedOrder = await order.save()
        return getOrdersByRestaurant(order.restaurant_id)
    } catch {
        err => {
            return ({
                message: err
            })
        }
    }
}

const getOrderDetails = async order_id => {
    try {
        let order = await Orders.findOne({
            _id: order_id
        })
        if (!order) throw new Error("Order not found in DB!")
        
    } catch {
        err => {
            return ({
                message: err
            })
        }
    }
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