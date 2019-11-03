import Orders from "../models/order"
import Restaurants from "../models/restaurant";
import Users from "../models/user";
import Dishes from "../models/dish"
import _ from "lodash";
import Promise from "bluebird"

const getOrdersByRestaurant = async restaurant_id => {
    let restaurant = await Restaurants.findOne({
        _id: restaurant_id
    })
    if (!restaurant) throw new Error("Error fetching restaurant!")
    let allOrders = await Orders.find({
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
}

const getOrdersByBuyer = async user_id => {
    let user = await Users.findOne({
        _id: user_id
    })
    if (!user) throw new Error("Error fetching user!")
    let allOrders = await Orders.find({
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
}

const updateOrder = async order_details => {
    let order = await Orders.findOne({
        _id: order_details._id
    })
    order.status = order_details.status
    let updatedOrder = await order.save()
    return getOrderDetails(updatedOrder._id)

}

const getOrderDetails = order_id => {
    return Orders.findById(order_id)
        .populate('dishes.dish_id')
        .lean()
        .then(order => {
            const dishes = order.dishes.map(dish => ({
                _id: dish.dish_id._id,
                name: dish.dish_id.name,
                quantity: dish.quantity,
                amount: dish.dish_id.amount
            }));
            return Users.findOne({
                orders: order_id
            }).then(user => {
                return {
                    _id: order._id,
                    buyer: {
                        name: user.first_name + " " + user.last_name,
                        address: user.address
                    },
                    dishes,
                    status: order.status,
                    amount: order.amount
                }
            })
        })
};
const createOrder = async order_details => {
    return Orders.create({
        amount: order_details.total_amount,
        status: "NEW"
    }).then(order => {
        if (order_details.cart && order_details.cart.length) {
            order_details.cart.map(dish => {
                order.dishes.push({
                    dish_id: dish._id,
                    quantity: dish.quantity
                })
            })
        }
        return order.save().then(updatedOrder => {
            const restaurantOrderPromise = Restaurants.findById(order_details.restaurant_id).then(restaurant => {
                restaurant.orders.push(updatedOrder._id)
                return restaurant.save();
            });
            const customerOrderPromise = Users.findById(order_details.user_id).then(user => {
                user.orders.push(updatedOrder._id)
                return user.save();
            });
            return Promise.all(restaurantOrderPromise, customerOrderPromise).then(() => {
                return updatedOrder;
            }).catch(err => {
                console.log(err)
            })
        });
    });
};

export {
    getOrdersByRestaurant,
    updateOrder,
    getOrderDetails,
    getOrdersByBuyer,
    createOrder
}