import express from "express";

const kafka = require('../kafka/client');
const orderRouter = express.Router();

orderRouter.get("/order/restaurant/:restaurant_id", (req, res) => {
    console.log('Inside GET Orders for restaurant');

    kafka.make_request("getOrdersByRestaurant", req.params.restaurant_id, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});

orderRouter.put("/order/update/:order_id", (req, res) => {
    console.log('Inside PUT Order Update');
    const order_details = {
        _id: req.params.order_id,
        status: req.body.status
    };
    kafka.make_request("updateOrder", order_details, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});


orderRouter.get("/order/:order_id", (req, res) => {
    console.log('Inside GET Order Details');

    kafka.make_request("getOrderDetails", req.params.order_id, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});

orderRouter.get("/order/buyer/:user_id", (req, res) => {
    console.log('Inside GET Buyer Orders');
    console.log("Here:", req.params.user_id)
    kafka.make_request("getOrdersByBuyer", req.params.user_id, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});

orderRouter.post("/order/confirm", (req, res) => {
    console.log('Inside POST Confirm Order');

    kafka.make_request("confirmOrder", req.body, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});

orderRouter.post("/message/push", (req, res) => {
    console.log('Inside POST push message');
    console.log("Message Details:", req.body)
    kafka.make_request("pushMessage", req.body.message_details, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});
export default orderRouter;