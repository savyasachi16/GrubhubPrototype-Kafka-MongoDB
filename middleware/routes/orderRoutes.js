import express from "express";

const orderRouter = express.Router();

orderRouter.get("/order/restaurant/:restaurant_id", (req, res) => {
    console.log('Inside GET Orders for restaurant');

    kafka.make_request("getOrdersByRestaurant", req.params.restaurant_id, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error');
        } else {
            console.log("Success", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('Fetched Orders');
        }
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
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error');
        } else {
            console.log("Success", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('User Logged in');
        }
    });
});

orderRouter.get("/order/:order_id", (req, res) => {
    console.log('Inside GET Order Details');

    kafka.make_request("getOrderDetails", req.params.order_id, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error');
        } else {
            console.log("Success", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('Fetched Order details');
        }
    });
});

orderRouter.get("/order/buyer/:user_id", (req, res) => {
    console.log('Inside GET Buyer Orders');

    kafka.make_request("getOrdersByBuyer", req.params.order_id, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error');
        } else {
            console.log("Success", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('Fetched Orders for Buyer');
        }
    });
});

orderRouter.post("/order/confirm", (req, res) => {
    console.log('Inside POST Confirm Order');

    kafka.make_request("confirmOrder", req.body, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error');
        } else {
            console.log("Success", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('Confirm Order');
        }
    });
});

export default orderRouter;