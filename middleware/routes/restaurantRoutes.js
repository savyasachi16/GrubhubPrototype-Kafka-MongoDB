import express from 'express';

const restaurantRouter = express.Router();

restaurantRouter.get("/restaurant/:restaurant_id", (req, res) => {
    console.log('Inside GET Restaurant');

    kafka.make_request("getRestaurant", req.params.restaurant_id, (err, result) => {
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
            res.end('Fetched Restaurant');
        }
    });
});

restaurantRouter.get('/restaurant/menu/:restaurant_id', (req, res) => {
    console.log('Inside GET Menu');

    kafka.make_request("getMenu", req.params.restaurant_id, (err, result) => {
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
            res.end('Fetched Menu');
        }
    });
});

restaurantRouter.get('/restaurant/details/:restaurant_id', (req, res) => {
    console.log('Inside GET Restaurant Details');

    kafka.make_request("getRestaurantDetails", req.params.restaurant_id, (err, result) => {
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
            res.end('Fetched Restaurant Details');
        }
    });
});

restaurantRouter.put('/restaurant/menu/section', (req, res) => {
    console.log('Inside PUT Section');

    kafka.make_request("updateSection", req.body, (err, result) => {
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
            res.end('Updated Section');
        }
    });

});

restaurantRouter.put('/restaurant/menu/section/delete', (req, res) => {
    console.log('Inside PUT Section Delete');

    kafka.make_request("deleteSection", req.body, (err, result) => {
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
            res.end('Deleted Section');
        }
    });
});

export default restaurantRouter;