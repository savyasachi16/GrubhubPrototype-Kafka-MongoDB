import express from 'express';
import restaurantHandler from '../handlers/restaurant';

const restaurantRouter = express.Router();

restaurantRouter.get("/restaurant/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    restaurantHandler.getRestaurant(user_id).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json(err)
    })
})

restaurantRouter.get('/restaurant/menu/:restaurant_id', (req, res) => {
    const restaurant_id = req.params.restaurant_id;
    restaurantHandler.getRestaurantMenu(restaurant_id).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: err.message
        })
    })
})

restaurantRouter.get('/restaurant/details/:restaurant_id', (req, res) => {
    const restaurant_id = req.params.restaurant_id;
    restaurantHandler.getRestaurantDetails(restaurant_id).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
});

restaurantRouter.put('/restaurant/menu/section', (req, res) => {
    const section = req.body;
    restaurantHandler.updateSection(section).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})

restaurantRouter.put('/restaurant/menu/section/delete', (req, res) => {
    const section = req.body;
    restaurantHandler.deleteSection(section).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
});

export default restaurantRouter;