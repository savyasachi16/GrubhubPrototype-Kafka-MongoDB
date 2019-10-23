import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    dishes: [{
        dish_id: {
            type: Schema.Types.ObjectId,
            ref: "Dishes"
        },
        quantity: Number
    }],
    amount: Number,
    status: String
})

const Orders = new mongoose.model("Orders", orderSchema)

export default Orders;