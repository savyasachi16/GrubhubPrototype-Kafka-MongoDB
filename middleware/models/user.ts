import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    account_type: string;
    phone: string;
    address: string;
    image: string;
    restaurant_id?: mongoose.Types.ObjectId;
    orders: mongoose.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new Schema({
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

const Users: Model<IUser> = mongoose.model<IUser>("Users", userSchema)

export default Users;
