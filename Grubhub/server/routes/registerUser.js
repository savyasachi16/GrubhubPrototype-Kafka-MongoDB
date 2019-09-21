import User from '../sequelize';
import passport from 'passport'

module.exports = app => {
    app.post('/registerUser', (req, res, next) => {
        passport.authenticate('register', (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info !== undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                req.logIn(user, err => {
                    const data = {
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        email: req.body.email,
                        account_type: req.body.accountType,
                    };
                    User.findOne({
                        where: {
                            email: data.email,
                        },
                    }).then(user => {
                        user.update({
                            first_name: data.firstName,
                            last_name: data.lastName,
                            email: data.email,
                            account_type: req.body.accountType,

                        }).then(() => {
                            console.log('User created in DB');
                            res.status(200).send({
                                message: 'User Created'
                            });
                        });
                    });
                });
            }
        })(req, res, next);
    });
};