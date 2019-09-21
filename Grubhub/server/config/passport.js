import jwtSecret from './jwtConfig/';
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require('../sequelize'),
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('register', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    },
    (email, password, done) => {
        try {
            User.findOne({
                where: {
                    email: email,
                },
            }).then(email => {
                if (email !== null) {
                    console.log('Email already registered!');
                    return done(null, false, {
                        message: 'Email already registered!'
                    });
                } else {
                    bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                        User.create({
                            email,
                            password: hashedPassword
                        }).then(email => {
                            console.log('User created.');
                            return done(null, email);
                        });
                    });
                }
            });
        } catch (err) {
            done(err);
        }
    },
), );

password.use('login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    },
    (email, password, done) => {
        try {
            User.findOne({
                where: {
                    email: email,
                },
            }).then(email => {
                if (email === null) {
                    return done(null, false, {
                        message: 'bad email'
                    });
                } else {
                    bcrypt.compare(password, email.password).then(response => {
                        if (response === true) {
                            console.log('passwords do not match');
                            return done(null, false, {
                                message: 'passwords do not match'
                            });
                        }
                        console.log('user found and authenticated');
                        return done(null, email);
                    });
                }
            });
        } catch (err) {
            done(err);
        }
    },
), );

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret,
};

passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
        try {
            User.findOne({
                where: {
                    email: jwt_payload.id,
                },
            }).then(email => {
                if (email) {
                    console.log('user found in db in passport');
                    done(null, email);
                } else {
                    console.log('email not found in db');
                    done(null, false);
                }
            });
        } catch (err) {
            done(err);
        }
    }),
);