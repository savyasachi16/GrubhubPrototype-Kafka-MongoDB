import {
    Users
} from '../src/sequelize';
import jwtScecret from '../config/jwtConfig'
import jwt from 'jsonwebtoken';

const registerUser = userDetails => {
    return Users.findOne({
        where: {
            email: userDetails.email
        }
    }).then(user => {
        if (!user) {
            throw new Error("Email already exists in DB!");
        }

        const {
            first_name,
            last_name,
            type
        } = userDetails;
        return user.update({
            first_name,
            last_name,
            type
        }).then(() => {
            return Users.findOne({
                where: {
                    email: userDetails.email
                }
            }).then(updatedUser => {
                const token = jwt.sign({
                    id: updatedUser.id
                }, jwtScecret.secret);
                const {
                    id,
                    first_name,
                    last_name,
                    email,
                    type
                } = updatedUser;
                return {
                    id,
                    first_name,
                    last_name,
                    email,
                    type,
                    token
                };
            });
        });
    });
}

const loginUser = userCredentials => {
    return Users.findOne({
        where: {
            email: userCredentials.email
        }
    }).then(user => {
        if (!user) {
            return new Error("User not registered!");
        }
        const token = jwt.sign({
            id: user.id
        }, jwtScecret.secret);
        const {
            id,
            first_name,
            last_name,
            email,
            type
        } = user;
        return {
            id,
            first_name,
            last_name,
            email,
            type,
            token
        };
    });
};

export {
    registerUser,
    loginUser
};