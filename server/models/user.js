import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    first_name: {
        type: String,
        default: ""
    },
    last_name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: [true, "Email is a required field."]
    },
    password: {
        type: String,
        required: [true, "Password is a required field."]
    },
    account_type: String,
    phone: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    restaurant_id: {
        type: Schema.Types.ObjectId,
        ref: "Restaurants"
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Orders"
    }]
})

const Users = mongoose.model("Users", userSchema)

export default Users;