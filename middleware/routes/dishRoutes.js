import express from 'express';

const kafka = require('../kafka/client');
const dishRouter = express.Router();

dishRouter.post("/dish/add", (req, res) => {
    console.log('Inside POST Add Dish');

    kafka.make_request("addDish", req.body, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});

dishRouter.get("/dish/:dish_id", (req, res) => {
    console.log('Inside GET Dish');

    kafka.make_request("getDishDetails", req.params.dish_id, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});

dishRouter.post("/dish/update", (req, res) => {
    console.log('Inside POST Update Dish');

    kafka.make_request("updateDish", req.body, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});

dishRouter.post("/dish/delete/", (req, res) => {
    console.log('Inside POST Update Dish');

    kafka.make_request("deleteDish", req.body, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});

dishRouter.get("/buyer/search", (req, res) => {
    console.log('Inside GET Search');

    kafka.make_request("search", req.query.key, (err, result) => {
        if (err) {
            console.log("Error ", err);
            res.status(500).json({
                message: err.message
            })
        }
        res.status(200).json(result)
    });
});
export default dishRouter;