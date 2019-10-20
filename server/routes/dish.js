import express from 'express';
import * as dishHandler from "../handlers/dish";
const dishRouter = express.Router();


dishRouter.post("/dish/add", (req, res) => {
    const dish_details = req.body;
    console.log("Input in Add Dish Route: ", dish_details)
    dishHandler.addDish(dish_details).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})

dishRouter.get("/dish/:dish_id", (req, res) => {
    const dish_id = req.params.dish_id;
    dishHandler.getDishDetails(dish_id).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})

dishRouter.post("/dish/update", (req, res) => {
    const dish_details = req.body;
    dishHandler.updateDish(dish_details).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})

dishRouter.delete("/dish/delete/:dish_id", (req, res) => {
    const dish_id = req.params.dish_id;
    dishHandler.deleteDish(dish_id).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log("Dish delete Error:", err)
        res.status(500).json({
            message: err.message
        })
    })
})

dishRouter.get("/buyer/search", (req, res) => {
    const search_key = req.query.key;
    dishHandler.searchDishes(search_key).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})


export default dishRouter;