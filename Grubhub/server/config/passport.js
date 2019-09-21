import jwtSecret from './jwtConfig';
import bcrypt from 'bcrypt';

const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require('../sequelize'),
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

const BCRYPT_SALT_ROUNDS = 10;


passport.use('register', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    },
    (username, password, done) => {
        try {
            User.findOne({
                where: {
                    email: username,
                },
            }).then(user => {
                if (user !== null) {
                    console.log('Email already registered!');
                    return done(null, false, {
                        message: 'Email already registered!'
                    });
                } else {
                    bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                        User.create({
                            email: username,
                            password: hashedPassword
                        }).then(user => {
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

passport.use('login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
    },
    (username, password, done) => {
        try {
            User.findOne({
                where: {
                    email: username,
                },
            }).then(user => {
                if (!user) {
                    return done(null, false, {
                        message: 'bad email'
                    });
                } else {
                    bcrypt.compare(password, user.password).then(response => {
                        if (!response) {
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
                    id: jwt_payload.id,
                },
            }).then(user => {
                if (user) {
                    console.log('user found in db in passport');
                    done(null, user);
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