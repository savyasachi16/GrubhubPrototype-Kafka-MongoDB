import mongoose from "mongoose";
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    zipcode: {
        type: String,
        default: ""
    },
    cuisine: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    dish: [{
        name: String,
        section: String,
        description: String,
        image: String,
        price: Number
    }],
    orders: [{
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "Users"
        },
        dishes: [{
            dish_id: {
                type: Schema.Types.ObjectId,
                ref: "Dishes"
            },
            quantity: Number
        }],
        amount: Number,
        status: String
    }]
})

const Restaurants = new mongoose.model("Restaurants", restaurantSchema)


export default Restaurants;