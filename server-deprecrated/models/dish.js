import mongoose from "mongoose";
const Schema = mongoose.Schema;
const dishSchema = new Schema({
    name: String,
    section: String,
    description: String,
    image: String,
    price: Number
})
const Dishes = new mongoose.model("Dishes", dishSchema)

export default Dishes;