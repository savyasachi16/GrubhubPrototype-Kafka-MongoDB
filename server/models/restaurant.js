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
    dishes: [{
        type: Schema.Types.ObjectId,
        ref: "Dishes"

    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Orders"
    }]
})

const Restaurants = new mongoose.model("Restaurants", restaurantSchema)


export default Restaurants;