import express from 'express';

const kafka = require('../kafka/client');
const restaurantRouter = express.Router();

restaurantRouter.get("/restaurant/:restaurant_id", (req, res) => {
    console.log('Inside GET Restaurant');

    kafka.make_request("getRestaurant", req.params.restaurant_id, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});

restaurantRouter.get('/restaurant/menu/:restaurant_id', (req, res) => {
    console.log('Inside GET Menu');

    kafka.make_request("getMenu", req.params.restaurant_id, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});
restaurantRouter.get('/restaurant/details/:restaurant_id', (req, res) => {
    console.log('Inside GET Restaurant Details');

    kafka.make_request("getRestaurantDetails", req.params.restaurant_id, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});

restaurantRouter.put('/restaurant/menu/section', (req, res) => {
    console.log('Inside PUT Section');

    kafka.make_request("updateSection", req.body, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});

restaurantRouter.put('/restaurant/menu/section/delete', (req, res) => {
    console.log('Inside PUT Section Delete');

    kafka.make_request("deleteSection", req.body, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});
export default restaurantRouter;