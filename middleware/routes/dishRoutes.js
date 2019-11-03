import express from 'express';

const dishRouter = express.Router();

dishRouter.post("/dish/add", (req, res) => {
    console.log('Inside POST Add Dish');

    kafka.make_request("addDish", req.body, (err, result) => {
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
            res.end('Added Dish');
        }
    });
});

dishRouter.get("/dish/:dish_id", (req, res) => {
    console.log('Inside GET Dish');

    kafka.make_request("getDishDetails", req.params.dish_id, (err, result) => {
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
            res.end('Fetched Dish Details');
        }
    });
});

dishRouter.post("/dish/update", (req, res) => {
    console.log('Inside POST Update Dish');

    kafka.make_request("updateDish", req.body, (err, result) => {
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
            res.end('Updated Dish Details');
        }
    });
});

dishRouter.post("/dish/delete/", (req, res) => {
    console.log('Inside POST Update Dish');

    kafka.make_request("deleteDish", req.body, (err, result) => {
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
            res.end('Deleted Dish');
        }
    });
});

dishRouter.get("/buyer/search", (req, res) => {
    console.log('Inside GET Search');

    kafka.make_request("search", req.query.key, (err, result) => {
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
            res.end('Fetched Search Results');
        }
    });
});

export default dishRouter;