import bcrypt from 'bcrypt';
import jwtSecret from './jwtConfig';
import {
    Users
} from '../src/sequelize';

const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

const SALT_ROUND = 12;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use("register", new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, done) => {
        try {
            Users.findOne({
                where: {
                    email: username
                }
            }).then(user => {
                if (user !== null) {
                    return done(null, false);
                } else {
                    bcrypt.hash(password, SALT_ROUND).then(hashPassword => {
                        Users.create({
                            email: username,
                            password: hashPassword
                        }).then(user => {
                            return done(null, true);
                        });
                    });
                }
            });
        } catch (err) {
            done(err);
        }
    }
));

passport.use("login", new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, (username, password, done) => {
    try {
        Users.findOne({
            where: {
                email: username
            }
        }).then(user => {
            if (!user) {
                return done(null, false)
            } else {
                bcrypt.compare(password, user.password).then(result => {
                    if (!result) {
                        console.log("Password does not match");
                        return done(null, false);
                    }
                    return done(null, true);
                })
            }
        })
    } catch (err) {
        done(err);
    }
}));

const options = {
    jwtFormRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret
};

passport.use('jwt', new JWTStrategy(options, (jwt_payload, done)=>{
    try{
        Users.findOne({
            where:{
                id: jwt_payload.id
            }
        }).then(user =>{
            if(user){
                done(null, true);
            } else {
                done(null, false);
            }
        });
    } catch(err){
        done(err);
    }
}));