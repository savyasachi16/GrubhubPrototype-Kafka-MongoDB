import bcrypt from 'bcrypt';
import jwtSecret from './jwtConfig';
import Users from '../models/user';

const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

const SALT_ROUND = 7;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use("register", new localStrategy({
        usernameField: "email",
        passwordField: "password"
    },
    (username, password, done) => {
        try {
            Users.findOne({
                "first_name": username
            })
        }
    }))