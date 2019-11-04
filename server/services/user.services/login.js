import Users from "../../models/user"
import jwt from 'jsonwebtoken';
import jwtSecret from '../../config/jwtConfig'


const handle_request = async (userCredentials, callback) => {
    let user = await Users.findOne({
        email: userCredentials.email
    })
    if (!user) {
        callback({
            message: "User not registered!"
        }, null)
    }
    const token = jwt.sign({
        _id: user._id
    }, jwtSecret.secret)
    if (user.account_type === 'Vendor') {
        callback(null, {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            account_type: user.account_type,
            phone: user.phone,
            address: user.address,
            image: user.image,
            token: token,
            restaurant_id: user.restaurant_id
        })
    } else {
        callback(null, {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            account_type: user.account_type,
            phone: user.phone,
            address: user.address,
            image: user.image,
            token: token,
        })
    }
}

export {
    handle_request
};