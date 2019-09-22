import express from 'express';
import passport from 'passport';
import * as userHandler from '../handlers/user'

const userRouter = express.Router();

userRouter.post('/register', passport.authenticate('register'), (req, res) => {
    const userDetails = req.body;
    return userHandler.registerUser(userDetails).then(result => {
        res.cookie('grubhubCookie', result.token, {
            maxAge: 900000,
            httpOnly: false
        });
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(500).json(err);
    });
});

userRouter.post('/login', passport.authenticate('login'), (req, res) => {
    const userCredentials = req.body;
    return userHandler.loginUser(userCredentials).then(result => {
        console.log(result);
        res.cookie('grubhubCookie', result.token, {
            maxAge: 900000,
            httpOnly: false
        });
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(500).json(err);
    });
});

export default userRouter;