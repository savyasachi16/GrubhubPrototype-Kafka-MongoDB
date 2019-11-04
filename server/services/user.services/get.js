import Users from "../../models/user"

const handle_request = async (user_id, callback) => {
    let user = await Users.findOne({
        _id: user_id
    })
    if (!user) {
        callback({
            message: "User not found in DB!"
        }, null)
    }
    callback(null, {
        user
    })
}

export {
    handle_request
};