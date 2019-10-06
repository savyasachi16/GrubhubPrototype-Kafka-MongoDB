import express from "express";
import * as orderHandler from "../handlers/order"
const orderRouter = express.Router();

orderRouter.get("/restaurant/:restaurant_id", (req, res) => {
    const restaurant_id = req.params.restaurant_id
    orderHandler.getOrdersByRestaurant(restaurant_id).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})
orderRouter.put("/update/:order_id", (req, res) => {
    const order_details = {
        id: req.params.order_id,
        status: req.body.status
    };
    orderHandler.updateOrder(order_details)
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(500).json({
                message: err.message
            });
        })
});

orderRouter.get("/order/:order_id", (req, res) => {
    const order_id = req.params.order_id;
    orderHandler.getOrderDetails(order_id)
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(500).json({
                message: err.message
            });
        })
});

orderRouter.get("/order/buyer/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    orderHandler
        .getOrdersByBuyer(user_id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log("ERROR: ", err)
            res.status(500).json({
                message: err.message
            });
        });
});

orderRouter.post("/order/confirm", (req, res) => {
    const order_details = req.body
    console.log("Order detls:", order_details)
    return orderHandler.createOrder(order_details).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log("Place Order: ", err)
        res.status(500).json({
            message: err.message
        })
    })
})
export default orderRouter;