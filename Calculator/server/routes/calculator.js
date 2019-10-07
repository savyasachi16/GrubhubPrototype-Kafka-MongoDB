var express = require('express');
var router = express.Router();
var {
    calculate
} = require('../businessLogic/calculator')

//Post Calculator result
router.post("/calculate", (req, res, next) => {
    const {
        expr
    } = req.body;
    return calculate(expr).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).send('Error: ', error)
    })
});

module.exports = router;