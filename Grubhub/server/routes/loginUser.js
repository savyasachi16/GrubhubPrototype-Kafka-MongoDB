import User from '../sequelize';
import jwtSecret from '../config/jwtConfig';
import jwt from 'jsonwebtoken';
import passport from 'passport';

module.exports = app => {
    app.get('/loginUser', (req, res, next) => {
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info !== undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                req.logIn(user, err => {
                    User.findOne({
                        where: {
                            email: user.email,
                        },
                    }).then(user => {
                        const token = jwt.sign({
                            id: user.email
                        }, jwtSecret.secret);
                        res.status(200).send({
                            auth: true,
                            token: token,
                            message: 'User found and logged in',
                        });
                    });
                });
            }
        })(req, res, next);
    });
};