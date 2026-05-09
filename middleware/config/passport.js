import bcrypt from 'bcrypt';
import jwtSecret from './jwtConfig.js';
import Users from '../models/user.js';

import passport from 'passport';,
    localStrategy = import 'passport-local';.Strategy,
    JWTStrategy = import 'passport-jwt';.Strategy,
    ExtractJWT = import 'passport-jwt';.ExtractJwt;

const SALT_ROUND = 7;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


passport.use("register", new localStrategy({
    usernameField: 'email',
    passwordField: 'password'

}, async (username, password, done) => {
    try {
        let user = await Users.findOne({
            email: username
        })
        if (user) {
            return done(null, false)
        } else {
            let hashPassword = await bcrypt.hash(password, SALT_ROUND);
            let newUser = await Users.create({
                email: username,
                password: hashPassword
            })
            if (newUser) {
                return done(null, true)
            }
        }
    } catch (err) {
        done(err)
    }
}))

passport.use("login", new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, async (username, password, done) => {
    try {
        let user = await Users.findOne({
            email: username
        })
        if (!user) {
            return done(null, false)
        } else {
            let result = await bcrypt.compare(password, user.password)
            if (!result) {
                console.log("Password does not match!");
                return done(null, false)
            }
            return done(null, true)
        }
    } catch (err) {
        done(err)
    }
}))

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret
};

passport.use('jwt', new JWTStrategy(options, async (jwt_payload, done) => {
    try {
        let user = await Users.findOne({
            _id: jwt_payload._id
        })
        if (user) done(null, true)
        else done(null, false)

    } catch (err) {
        done(err)
    }
}))