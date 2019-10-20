import Orders from "../models/order"
import Restaurants from "../models/restaurant";
import Users from "../models/user"
import _ from "lodash";
import Promise from "bluebird"

const getOrdersByRestaurant = async ids => {
    try {
        let restaurant = await Restaurants.findOne({
            _id: ids.restaurant_id
        })
        if (!restaurant) throw new Error("Error fetching restaurant!")
        let allOrders = await Orders.findAll({
            _id: {
                $in: restaurant.orders
            }
        })
        let current_orders, past_orders
        current_orders = allOrders.filter(order => ["NEW", "PREPARING", "READY"].includes(order.status))
        past_orders = allOrders.filter(order => ["DELIVERED", "CANCELED"].includes(order.status))
        return {
            current_orders,
            past_orders
        }
    } catch (err) {
        console.log("Get Orders By Restaurant Error: ", err)
        return err
    }
}

const getOrdersByBuyer = async ids => {
    try {
        let user = await Users.findOne({
            _id: ids.user_id
        })
        if (!user) throw new Error("Error fetching user!")
        let allOrders = await Orders.findOne({
            _id: {
                $in: user.orders
            }
        })
        let current_orders, past_orders
        current_orders = allOrders.filter(order => ["NEW", "PREPARING", "READY"].includes(order.status))
        past_orders = allOrders.filter(order => ["DELIVERED", "CANCELED"].includes(order.status))
        return {
            current_orders,
            past_orders
        }
    } catch (err) {
        console.log("Get Orders By Buyer Error: ", err)
        return err
    }
}

const updateOrder = async order_details => {
    try {
        let order = await Orders.findOne({
            _id: order_details.id
        })
        order.status = order_details.status
        updatedOrder = await order.save()
        return getOrdersByRestaurant(order_details.restaurant_id)
    } catch (err) {
        console.log("Update Order Error: ", err)
        return err
    }
}

const getOrderDetails = async order_id => {
    try {
        let order = await Orders.findOne({
            _id: order_id
        })
        if (!order) throw new Error("Order not found in DB!")
    } catch (err) {
        console.log("Get Orders Details Error: ", err)
        return err
    }
}

const createOrder = async order_details => {
    try {
        //do this later

    } catch (err) {
        console.log("Create Order Error: ", err)
        return err
    }
}

export {
    getOrdersByRestaurant,
    updateOrder,
    getOrderDetails,
    getOrdersByBuyer,
    createOrder
}